import supabase from "@/lib/supabase";

import { useContext, createContext, ReactNode, useState, useCallback } from "react";
import { z } from "zod";

export const cidadeDeAtuacaoSchmea = z.object({
    id: z.number(),
    cidade: z.string(),
});

export const ProdutividadeSchema = z.object({
    paciente_id: z.string().uuid("ID do paciente deve ser um UUID válido"),
    nome_paciente: z.string().min(1, "O nome do paciente é obrigatório"),
    cidade: z.string().min(1, "A cidade é obrigatória"),
    plano_saude: z.string().min(1, "O contratante é obrigatório"),
    mes: z.string().optional(),
    tipodeServico: z.string().optional(),
    M: z.number().nonnegative().default(0),
    T: z.number().nonnegative().default(0),
    SD: z.number().nonnegative().default(0),
    SN: z.number().nonnegative().default(0),
    P: z.number().nonnegative().default(0),
    G: z.number().nonnegative().default(0),
});

export const EscalaSchema = z.object({
    escala_id: z.number().int('ID da escala deve ser um número inteiro'),
    paciente_id: z.string().uuid('ID do paciente deve ser um UUID válido'),
    funcionario_id: z.string().uuid('ID do funcionário deve ser um UUID válido'),
    data: z.string().date('Data deve ser uma data válida'),
    tipo_servico: z.string().min(1, 'Tipo de serviço é obrigatório'),
    valor_recebido: z.number().nonnegative('Valor recebido deve ser um número não negativo'),
    valor_pago: z.number(),
    pagamentoAR_AV: z.string(),
    horario_gerenciamento: z.string().nullable(),
    funcionario: z.object({
        nome: z.string(),
        role: z.string()
    }),
});

export type EscalaInfor = z.infer<typeof EscalaSchema>;
export type produtividadeInfor = z.infer<typeof ProdutividadeSchema>;

export type cidadedeAtuacaoInfor = z.infer<typeof cidadeDeAtuacaoSchmea>;

export const produtividadeFilterSchema = z.object({
    pacienteName: z.string().optional(),
    contratante: z.string().optional(),
    cidade: z.string().optional(),
    month: z.string().optional(),
});

export type ProdutividadeFilter = z.infer<typeof produtividadeFilterSchema>;

const produtividadeeContext = createContext<{
    fetchProdutividade: (filter?: ProdutividadeFilter, pageIndex?: number) => Promise<void>;
    fetachEscapaByPacienteId: (paciente_id: string, month: string, pageIndex?: number) => Promise<void>;
    produtividadeData: produtividadeInfor[];
    protutividadeByPacienteID: EscalaInfor[];
    paymentDataNotPaginated: produtividadeInfor[];
    ProdutividadePacienteDataNotPaginated: EscalaInfor[];
    loading: boolean;
    totalCount: number,
    cidadesData: cidadedeAtuacaoInfor[];
    pacienteTotalCont: number;

}>({
    fetchProdutividade: async () => { },
    fetachEscapaByPacienteId: async () => { },
    produtividadeData: [],
    protutividadeByPacienteID: [],
    paymentDataNotPaginated: [],
    ProdutividadePacienteDataNotPaginated: [],
    loading: false,
    totalCount: 0,
    cidadesData: [],
    pacienteTotalCont: 0,

});

export const useProdutividade = () => useContext(produtividadeeContext);

export const ProdutividadeProvider = ({ children }: { children: ReactNode }) => {
    const [produtividadeData, setprodutividadeDataData] = useState<produtividadeInfor[]>([]);
    const [protutividadeByPacienteID, setProtutividadeByPacienteID] = useState<EscalaInfor[]>([]);
    const [paymentDataNotPaginated, setPaymentDataNotPaginated] = useState<produtividadeInfor[]>([]);
    const [ProdutividadePacienteDataNotPaginated, setProdutividadePacienteDataNotPaginated] = useState<EscalaInfor[]>([]);
    const [cidadesData, setCidadesData] = useState<cidadedeAtuacaoInfor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pacienteTotalCont, setPacienteTotalCont] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchProdutividade = useCallback(async (filters: ProdutividadeFilter = {}, pageIndex: number = 0) => {
        try {
            setLoading(true);
            const perPage = 10;
            const offset = pageIndex * perPage;
            const { pacienteName, cidade, contratante, month } = filters;

            // Validação do mês
            const currentMonth = month || new Date().toISOString().slice(0, 7);
            const year = parseInt(currentMonth.split("-")[0], 10);
            const monthNumber = parseInt(currentMonth.split("-")[1], 10);
            const lastDayOfMonth = new Date(year, monthNumber, 0).getDate();

            const { data: allCitys, error: citysError } = await supabase.from("cidade_de_atuacao").select("*");
            if (citysError) throw citysError;
            const allCidades = allCitys.map((cidade) => {
                return {
                    id: cidade.id,
                    cidade: cidade.cidade,
                };

            });
            setCidadesData(allCidades);


            // Query inicial com filtro de pacientes
            let baseSupaBaseQueryByName = supabase
                .from("paciente")
                .select("*")
                .ilike("cidade", `%${cidade || ""}%`)
                .ilike("nome", `%${pacienteName || ""}%`)
                .ilike("plano_saude", `%${contratante || ""}%`);

            const { data: allPacientes, error: fullError } = await baseSupaBaseQueryByName;
            if (fullError) throw fullError;


            // Filtrar escalas pelo mês
            const { data: allScales, error: scalesError } = await supabase
                .from("escala")
                .select("*")
                .gte("data", `${currentMonth}-01`)
                .lte("data", `${currentMonth}-${lastDayOfMonth}`);

            if (scalesError) throw scalesError;

            // Mapeando produtividade
            const allprodutividade = allPacientes.map((paciente) => {
                const pacienteEscala = allScales.filter((escala) => escala.paciente_id === paciente.paciente_id);
                const totaldeServicoM = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "M" ? 1 : 0), 0);
                const totaldeServicoT = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "T" ? 1 : 0), 0);
                const totaldeServicoSD = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "SD" ? 1 : 0), 0);
                const totaldeServicoSN = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "SN" ? 1 : 0), 0);
                const totaldeServicoP = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "P" ? 1 : 0), 0);
                const totaldeServicoGR = pacienteEscala.reduce(
                    (acc, scale) => acc + (scale.tipo_servico === "GR" ? 1 : 0), 0);

                return {
                    paciente_id: paciente.paciente_id,
                    nome_paciente: paciente.nome,
                    cidade: paciente.cidade || "",
                    plano_saude: paciente.plano_saude || "",
                    M: totaldeServicoM,
                    T: totaldeServicoT,
                    SD: totaldeServicoSD,
                    SN: totaldeServicoSN,
                    P: totaldeServicoP,
                    G: totaldeServicoGR,
                };
            });
            // Paginação
            const paginatedPayments = allprodutividade.slice(offset, offset + perPage);

            // Atualizando estados
            setprodutividadeDataData(paginatedPayments);
            setPaymentDataNotPaginated(allprodutividade);
            setTotalCount(allprodutividade.length);

        } catch (error) {
            console.error("Erro ao buscar Produtividade:", error);
            setprodutividadeDataData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetachEscapaByPacienteId = useCallback(async (paciente_id: string = '', month: string = '', pageIndex: number = 0) => {
        try {
            setLoading(true);
            const perPage = 10;
            const offset = pageIndex * perPage;
            const year = parseInt(month.split("-")[0], 10);
            const monthNumber = parseInt(month.split("-")[1], 10);
            const lastDayOfMonth = new Date(year, monthNumber, 0).getDate();

            const { count: totalScalesCount, error: totalError } = await supabase
                .from("escala")
                .select("*", { count: "exact", head: true })
                .eq("paciente_id", paciente_id)
                .gte("data", `${month}-01`)
                .lte("data", `${month}-${lastDayOfMonth}`);

            if (totalError) {
                console.error("Erro ao buscar contagem de escalas pacinte:", totalError);
                return;
            }

            const { data: allScales, error: scalesError } = await supabase
                .from("escala")
                .select('*,funcionario:funcionario_id (nome, role)')
                .eq("paciente_id", paciente_id)
                .gte("data", `${month}-01`)
                .lte("data", `${month}-${lastDayOfMonth}`)



            if (scalesError) {
                console.error("Erro ao buscar escalas:", scalesError);
                setProtutividadeByPacienteID([]);
                return;
            }

            const allprodutividade = allScales.map((escala) => {
                return {
                    escala_id: escala.escala_id,
                    paciente_id: escala.paciente_id,
                    funcionario_id: escala.funcionario_id,
                    data: escala.data,
                    tipo_servico: escala.tipo_servico,
                    valor_recebido: escala.valor_recebido,
                    valor_pago: escala.valor_pago,
                    pagamentoAR_AV: escala.pagamentoAR_AV,
                    horario_gerenciamento: escala.horario_gerenciamento,
                    funcionario: {
                        nome: escala.funcionario.nome,
                        role: escala.funcionario.role
                    }
                }
            });

            const paginatedPayments = allprodutividade.slice(offset, offset + perPage);


            setProtutividadeByPacienteID(paginatedPayments);
            setPacienteTotalCont(totalScalesCount ?? 0);
            setProdutividadePacienteDataNotPaginated(allScales);
        } catch (error) {
            console.error("Erro ao buscar escalas do pacinte:", error);
            setProtutividadeByPacienteID([]);
            setProdutividadePacienteDataNotPaginated([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <produtividadeeContext.Provider value={{ fetchProdutividade, fetachEscapaByPacienteId, produtividadeData, protutividadeByPacienteID, paymentDataNotPaginated, loading, totalCount, cidadesData, pacienteTotalCont, ProdutividadePacienteDataNotPaginated }}>
            {children}
        </produtividadeeContext.Provider>
    );
};