import { z } from 'zod';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
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
    scalesNotPaginated: Scale[];
    loading: boolean;
    fetchScales: (filters?: ScaleFiltersSchema, pageIndex?: number) => Promise<void>;
    fetchScalesNotPaginated: (filters?: ScaleFiltersSchema) => Promise<void>;
}>({
    scales: [],
    scalesNotPaginated: [],
    loading: true,
    fetchScales: async () => { },
    fetchScalesNotPaginated: async () => { },
});

export const useScale = () => useContext(ScaleContext);

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
    const [scales, setScales] = useState<Scale[]>([]);
    const [scalesNotPaginated, setScalesNotPaginated] = useState<Scale[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchScales = useCallback(async (filters: ScaleFiltersSchema = {}, pageIndex: number = 0) => {
        setLoading(true);

        let query = supabase
            .from('escala')
            .select(`*
                ,funcionario:funcionario_id (nome),
                paciente:paciente_id (nome)`)
            .range(pageIndex * 10, pageIndex * 10 + 9);

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
            console.error('Erro ao buscar dados de escalas:', error);
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
        }

        setLoading(false);
    }, []);

    const fetchScalesNotPaginated = useCallback(async (filters: ScaleFiltersSchema = {}) => {
        setLoading(true);

        let query = supabase
            .from('escala')
            .select(`*
                ,funcionario:funcionario_id (nome),
                paciente:paciente_id (nome)`);

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
            console.error('Erro ao buscar dados de escalas:', error);
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

            setScalesNotPaginated(validScales);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchScales();
        fetchScalesNotPaginated();
    }, [fetchScales, fetchScalesNotPaginated]);

    return (
        <ScaleContext.Provider value={{ scales, scalesNotPaginated, fetchScales, fetchScalesNotPaginated, loading }}>
            {children}
        </ScaleContext.Provider>
    );
};
