import supabase from "@/lib/supabase";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";

export const paymentInfoSchema = z.object({
    funcionario_id: z.string().uuid(),
    nome: z.string().optional(),
    telefone: z.string().optional(),
    cargo: z.string().optional(),
    chave_pix: z.string().optional(),
    valor_recebido: z.number().optional(),
    valor_pago: z.number().optional(),
    mes: z.string().optional(),
});

export type PaymentInfo = z.infer<typeof paymentInfoSchema>;

export const paymentFiltersSchema = z.object({
    collaboratorName: z.string().optional(),
    role: z.string().optional(),
    month: z.string().optional(),
});

export type PaymentFilters = z.infer<typeof paymentFiltersSchema>

const PaymentContext = createContext<{
    fetchPayments: (filters?: PaymentFilters, pageIndex?: number) => Promise<void>;
    paymentData: PaymentInfo[];
    loading: boolean;
    totalCount: number;
}>({
    fetchPayments: async () => { },
    paymentData: [],
    loading: false,
    totalCount: 0
});

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [paymentData, setPaymentData] = useState<PaymentInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState(0);

    const fetchPayments = useCallback(async (filters: PaymentFilters = {}, pageIndex: number = 0) => {
        try {
            setLoading(true);
            const perPage = 10;
            const offset = pageIndex * perPage;
            const { collaboratorName, role, month } = filters;

            let totalQuery = supabase
                .from("funcionario")
                .select("*", { count: "exact", head: true })
                .neq("role", "rh")
                .neq("role", "admin");

            if (collaboratorName) {
                totalQuery = totalQuery.ilike("nome", `%${collaboratorName}%`);
            }

            if (role && role !== "all") {
                totalQuery = totalQuery.eq("role", role);
            }

            const { count: totalCount, error: totalError } = await totalQuery;
            if (totalError) {
                console.error("Erro ao buscar total de colaboradores:", totalError);
                return;
            }
            let query = supabase
                .from("funcionario")
                .select("funcionario_id, nome, role")
                .range(offset, offset + perPage - 1)
                .neq("role", "rh")
                .neq("role", "admin");

            if (collaboratorName) {
                query = query.ilike("nome", `%${collaboratorName}%`);
            }

            if (role && role !== "all") {
                query = query.eq("role", role);
            }

            const { data: collaborators, error: collaboratorError } = await query;

            if (collaboratorError) {
                console.error("Erro ao buscar colaboradores:", collaboratorError);
                setPaymentData([]);
                return;
            }

            const currentMonth = month || new Date().toISOString().slice(0, 7);
            const year = parseInt(currentMonth.split("-")[0], 10);
            const monthNumber = parseInt(currentMonth.split("-")[1], 10);
            const lastDayOfMonth = new Date(year, monthNumber, 0).getDate();

            const { data: allScales, error: scalesError } = await supabase
                .from("escala")
                .select("funcionario_id, valor_recebido, valor_pago, data")
                .gte("data", `${currentMonth}-01`)
                .lte("data", `${currentMonth}-${lastDayOfMonth}`);

            if (scalesError) {
                console.error("Erro ao buscar escalas:", scalesError);
                setPaymentData([]);
                return;
            }

            const paymentResults: PaymentInfo[] = collaborators.map((collaborator) => {
                const collaboratorScales = allScales.filter(
                    (scale) => scale.funcionario_id === collaborator.funcionario_id
                );

                const valorRecebido = collaboratorScales.reduce(
                    (acc, scale) => acc + (scale.valor_recebido || 0),
                    0
                );
                const valorPago = collaboratorScales.reduce(
                    (acc, scale) => acc + (scale.valor_pago || 0),
                    0
                );

                return {
                    funcionario_id: collaborator.funcionario_id,
                    nome: collaborator.nome,
                    cargo: collaborator.role,
                    valor_recebido: valorRecebido,
                    valor_pago: valorPago,
                    mes: currentMonth
                };
            });

            setPaymentData(paymentResults);
            setTotalCount(totalCount || 0); 
        } catch (error) {
            console.error("Erro ao buscar pagamentos:", error);
            setPaymentData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments])

    return (
        <PaymentContext.Provider value={{ fetchPayments, loading, paymentData, totalCount }}>
            {children}
        </PaymentContext.Provider>
    )
}