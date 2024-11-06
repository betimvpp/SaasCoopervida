import { z } from 'zod';
import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
import supabase from '@/lib/supabase';

export const humanResourceSchema = z.object({
    funcionario_id: z.string().uuid().optional(),
    nome: z.string().optional(),
    cpf: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().email(),
    rua: z.string().optional(),
    status: z.string().optional(),
    role: z.string().optional(),
    cidade: z.string().optional(),
    banco: z.string().optional(),
    agencia: z.string().optional(),
    conta: z.string().optional(),
    data_nascimento: z.date().optional(),
    chave_pix: z.string().optional(),
});

export type HumanResource = z.infer<typeof humanResourceSchema>;

export const humanResourcesFiltersSchema = z.object({
    humanResourcesId: z.string().optional(),
    humanResourcesName: z.string().optional(),
});

export type HumanResourcesFiltersSchema = z.infer<typeof humanResourcesFiltersSchema>;

const HumanResourcesContext = createContext<{
    humanResources: HumanResource[];
    humanResourcesNotPaginated: HumanResource[];
    loading: boolean;
    fetchHumanResources: (filters?: HumanResourcesFiltersSchema, pageIndex?: number) => Promise<void>;
    fetchHumanResourcesNotPaginated: (filters?: HumanResourcesFiltersSchema, pageIndex?: number) => Promise<void>;
    addHumanResources: (newHumanResources: Omit<HumanResource, 'funcionario_id'>) => Promise<void>; // Adicione esta linha
    updateHumanResources: (updatedData: Partial<HumanResource>, funcionarioId: string) => Promise<void>; // Adicione esta linha
}>({
    humanResources: [],
    humanResourcesNotPaginated: [],
    loading: true,
    fetchHumanResources: async () => { },
    fetchHumanResourcesNotPaginated: async () => { },
    addHumanResources: async () => { },
    updateHumanResources: async () => { },
});

export const useHumanResources = () => useContext(HumanResourcesContext);

export const HumanResourcesProvider = ({ children }: { children: ReactNode }) => {
    const [humanResources, setHumanResources] = useState<HumanResource[]>([]);
    const [humanResourcesNotPaginated, setHumanResourcesNotPaginated] = useState<HumanResource[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHumanResources = useCallback(async (filters: HumanResourcesFiltersSchema = { humanResourcesId: '', humanResourcesName: '' }, pageIndex: number = 0) => {
        setLoading(true);

        let query = supabase
            .from('funcionario')
            .select('*')
            .eq("role", "rh")
            .range(pageIndex * 10, pageIndex * 10 + 9);

        if (filters.humanResourcesId) {
            query = query.eq('funcionario_id', filters.humanResourcesId);
        }

        if (filters.humanResourcesName) {
            query = query.ilike('nome', `%${filters.humanResourcesName}%`);
        }

        const { data: funcionario, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
        } else {
            setHumanResources(funcionario);
        }
        setLoading(false);

        setLoading(false);
    }, []);

    const fetchHumanResourcesNotPaginated = useCallback(async (filters: HumanResourcesFiltersSchema = { humanResourcesId: '', humanResourcesName: '' }) => {
        setLoading(true);

        let query = supabase
            .from('funcionario')
            .select('*')
            .eq("role", "rh")

        if (filters.humanResourcesId) {
            query = query.eq('funcionario_id', filters.humanResourcesId);
        }

        if (filters.humanResourcesName) {
            query = query.ilike('nome', `%${filters.humanResourcesName}%`);
        }

        const { data: funcionario, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
        } else {
            setHumanResourcesNotPaginated(funcionario);
        }
        setLoading(false);

        setLoading(false);
    }, []);

   

    const addHumanResources = async (newHumanResources: Omit<HumanResource, 'funcionario_id'>) => {
        try {
            if (!newHumanResources.email || !newHumanResources.cpf) {
                throw new Error('Dados inválidos');
            }

            const { data, error: signUpError } = await supabase.auth.signUp({
                email: newHumanResources.email,
                password: newHumanResources.cpf,
            });

            if (signUpError) {
                throw new Error(`Erro ao criar usuário: ${signUpError.message}`);
            }

            const humanResourcesWithId = {
                ...newHumanResources,
                funcionario_id: data.user?.id, 
                status: newHumanResources.status || "Ativo",
                role: "rh",
            };

            const { error: insertError } = await supabase
                .from('funcionario')
                .insert(humanResourcesWithId);

            if (insertError) {
                throw new Error(`Erro ao inserir colaborador: ${insertError.message}`);
            }

            console.log('Colaborador de RH adicionado com sucesso!');
        } catch (error) {
            console.error("Erro ao adicionar colaborador de RH:", error);
        }
    };

    const updateHumanResources = async (updatedData: Partial<HumanResource>, funcionarioId: string) => {
        try {
            const { error: updateError } = await supabase
                .from('funcionario')
                .update(updatedData)
                .eq('funcionario_id', funcionarioId);

            if (updateError) {
                console.error("Erro ao atualizar colaborador de RH:", updateError);
                throw new Error("Erro ao atualizar colaborador de RH");
            }
        } catch (error) {
            console.error("Erro geral ao atualizar colaborador de RH:", error);
        }
    };



    useEffect(() => {
        fetchHumanResources();
        fetchHumanResourcesNotPaginated();
    }, [fetchHumanResources, fetchHumanResourcesNotPaginated]);

    return (
        <HumanResourcesContext.Provider value={{ humanResources, humanResourcesNotPaginated, fetchHumanResources, fetchHumanResourcesNotPaginated, loading, addHumanResources, updateHumanResources }}>
            {children}
        </HumanResourcesContext.Provider>
    );
};
