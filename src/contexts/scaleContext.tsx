import { z } from 'zod';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export const scaleSchema = z.object({
    escala_id: z.number(),
    paciente_id: z.string().uuid(),
    funcionario_id: z.string().uuid(),
    data: z.string(),
    tipo_servico: z.string(),
    valor_recebido: z.number(),
    valor_pago: z.number(),
    pagamentoAR_AV: z.string().nullable(),
    nomeFuncionario: z.string().optional().nullable(),
    nomePaciente: z.string().optional().nullable()
});

export type Scale = z.infer<typeof scaleSchema>;

export const scaleFiltersSchema = z.object({
    pacienteId: z.string().optional(),
    funcionarioId: z.string().optional(),
    data: z.string().optional(),
    tipoServico: z.string().optional(),
});

export type ScaleFiltersSchema = z.infer<typeof scaleFiltersSchema>;

const ScaleContext = createContext<{
    scales: Scale[];
    loading: boolean;
    fetchScales: (filters?: ScaleFiltersSchema) => Promise<void>;
}>({
    scales: [],
    loading: true,
    fetchScales: async () => { },
});

export const useScale = () => useContext(ScaleContext);

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
    const [scales, setScales] = useState<Scale[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchScales(filters: ScaleFiltersSchema = {}) {
        setLoading(true);

        let query = supabase
            .from('escala')
            .select(`
            *,
            funcionario:funcionario_id (nome),
            paciente:paciente_id (nome)
          `);

        if (filters.pacienteId) {
            query = query.eq('paciente_id', filters.pacienteId);
        }
        if (filters.funcionarioId) {
            query = query.eq('funcionario_id', filters.funcionarioId);
        }
        if (filters.data) {
            query = query.eq('data', filters.data);
        }
        if (filters.tipoServico) {
            query = query.ilike('tipo_servico', `%${filters.tipoServico}%`);
        }

        const { data: escalas, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de escala:', error);
            setLoading(false);
            return;
        }

        if (escalas) {
            const parsedData = escalas.map((item) => scaleSchema.safeParse({
                ...item,
                nomeFuncionario: item.funcionario?.nome || null,
                nomePaciente: item.paciente?.nome || null,
            }));

            const validScales = parsedData
                .filter((item) => item.success)
                .map((item) => item.data);

            setScales(validScales);
        } else {
            setScales([]);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchScales();
    }, []);

    return (
        <ScaleContext.Provider value={{ scales, fetchScales, loading }}>
            {children}
        </ScaleContext.Provider>
    );
};
