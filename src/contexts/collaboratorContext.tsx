import { z } from 'zod';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export const collaboratorSchema = z.object({
    funcionario_id: z.string().uuid(),
    nome: z.string(),
    cpf: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().email(),
    rua: z.string().optional(),
    status: z.string(),
    role: z.string(),
    cidade: z.string().optional(),
    banco: z.string().optional(),
    agencia: z.string().optional(),
    conta: z.string().optional(),
    data_nascimento: z.string().optional(),
    chave_pix: z.string().optional(),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;

export const collaboratorFiltersSchema = z.object({
    collaboratorId: z.string().optional(),
    collaboratorName: z.string().optional(),
    role: z.string().optional(),
});

export type CollaboratorFiltersSchema = z.infer<typeof collaboratorFiltersSchema>;

const CollaboratorContext = createContext<{
    collaborators: Collaborator[];
    collaboratorsNotPaginated: Collaborator[];
    loading: boolean;
    fetchCollaborator: (filters?: CollaboratorFiltersSchema, pageIndex?: number) => Promise<void>
    fetchCollaboratorNotPaginated: (filters?: CollaboratorFiltersSchema, pageIndex?: number) => Promise<void>
    updateCollaborator: (updatedData: Partial<Collaborator>, funcionarioId: string) => Promise<void>;
    addCollaborator: (newData: Omit<Collaborator, 'funcionario_id'>) => Promise<void>;
    getCollaboratorById: (id: string) => Promise<Collaborator | null>;
}>({
    collaborators: [],
    collaboratorsNotPaginated: [],
    loading: true,
    fetchCollaborator: async () => { },
    fetchCollaboratorNotPaginated: async () => { },
    updateCollaborator: async () => { },
    addCollaborator: async () => { },
    getCollaboratorById: async () => null,
});

export const useCollaborator = () => useContext(CollaboratorContext);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [collaboratorsNotPaginated, setCollaboratorsNotPaginated] = useState<Collaborator[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCollaborator = useCallback(async (filters: CollaboratorFiltersSchema = { collaboratorId: '', collaboratorName: '', role: 'all' }, pageIndex: number = 0) => {
        setLoading(true);

        let query = supabase.from('funcionario')
            .select('*')
            .neq("role", "rh")
            .neq("role", "admin")
            .range(pageIndex * 10, pageIndex * 10 + 9); // Atualiza o range com base no pageIndex

        if (filters.collaboratorId) {
            query = query.eq('funcionario_id', filters.collaboratorId);
        }

        if (filters.collaboratorName) {
            query = query.ilike('nome', `%${filters.collaboratorName}%`);
        }

        if (filters.role && filters.role !== 'all') {
            query = query.eq('role', filters.role);
        }

        const { data: funcionario, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
        } else {
            setCollaborators(funcionario);
        }
        setLoading(false);
    }, []);


    const fetchCollaboratorNotPaginated = useCallback(async (filters: CollaboratorFiltersSchema = { collaboratorId: '', collaboratorName: '', role: 'all' }) => {
        setLoading(true);

        let query = supabase.from('funcionario')
            .select('*')
            .neq("role", "rh")
            .neq("role", "admin");

        if (filters.collaboratorId) {
            query = query.eq('funcionario_id', filters.collaboratorId);
        }

        if (filters.collaboratorName) {
            query = query.ilike('nome', `%${filters.collaboratorName}%`);
        }

        if (filters.role && filters.role !== 'all') {
            query = query.eq('role', filters.role);
        }

        const { data: funcionario, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
        } else {
            setCollaboratorsNotPaginated(funcionario);
        }
        setLoading(false);
    }, []);

    const addCollaborator = async (newCollaborator: Partial<Collaborator>) => {
        try {
            if (!newCollaborator.email || !newCollaborator.cpf) {
                throw new Error('Dados inválidos');
            }

            const { data, error: signUpError } = await supabase.auth.signUp({
                email: newCollaborator.email,
                password: newCollaborator.cpf,
            });

            if (signUpError) {
                throw new Error(`Erro ao criar usuário: ${signUpError.message}`);
            }

            const collaboratorWithId = {
                ...newCollaborator,
                funcionario_id: data.user?.id,
                status: newCollaborator.status || "Ativo",
            };

            const { error: insertError } = await supabase
                .from('funcionario')
                .insert(collaboratorWithId);

            if (insertError) {
                throw new Error(`Erro ao inserir colaborador: ${insertError.message}`);
            }

            console.log('Colaborador adicionado com sucesso!');
        } catch (error) {
            console.error("Erro ao adicionar colaborador:", error);
        }
    };

    async function updateCollaborator(updatedData: Partial<Collaborator>, funcionarioId: string) {
        try {
            const { error: updateError } = await supabase
                .from('funcionario')
                .update(updatedData)
                .eq('funcionario_id', funcionarioId);

            if (updateError) {
                console.error("Erro ao atualizar funcionario:", updateError);
                throw new Error("Erro ao atualizar funcionario");
            }
        } catch (error) {
            console.error("Erro geral ao atualizar funcionario:", error);
        }
    }

    const getCollaboratorById = async (id: string): Promise<Collaborator | null> => {
        const { data, error } = await supabase
            .from('funcionario')
            .select('*')
            .eq('funcionario_id', id)
            .single();

        if (error) {
            console.error('Erro ao buscar dados do colaborador:', error);
            return null;
        }
        return data || null;
    };

    useEffect(() => {
        fetchCollaborator();
        fetchCollaboratorNotPaginated();
    }, [fetchCollaborator, fetchCollaboratorNotPaginated]);

    return (
        <CollaboratorContext.Provider
            value={{ collaborators, collaboratorsNotPaginated, loading, fetchCollaborator, fetchCollaboratorNotPaginated, updateCollaborator, addCollaborator, getCollaboratorById }}
        >
            {children}
        </CollaboratorContext.Provider>
    );
};
