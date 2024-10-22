import { z } from 'zod';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export const collaboratorSchema = z.object({
    colaborador_id: z.string().uuid(),
    nome: z.string(),
    cpf: z.string(),
    telefone: z.string().optional(),
    email: z.string().email(),
    rua: z.string().optional(),
    status: z.string(),
    role: z.string(),
    cidade: z.string().optional(),
    banco: z.string().optional(),
    agencia: z.string().optional(),
    conta: z.string().optional(),
    data_nascimento: z.string(),
});


export type Collaborator = z.infer<typeof collaboratorSchema>;

export const collaboratorFiltersSchema = z.object({
    collaboratorId: z.string().optional(),
    collaboratorName: z.string().optional(),
    role: z.string().optional(),
})

export type CollaboratorFiltersSchema = z.infer<typeof collaboratorFiltersSchema>

const CollaboratorContext = createContext<{
    collaborators: Collaborator[];
    loading: boolean;
    fetchCollaborator: (filters?: CollaboratorFiltersSchema) => Promise<void>
}>({
    collaborators: [],
    loading: true,
    fetchCollaborator: async () => { },
});

export const useCollaborator = () => useContext(CollaboratorContext);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCollaborator(filters: CollaboratorFiltersSchema = { collaboratorId: '', collaboratorName: '', role: 'all' }) {
        setLoading(true);

        let query = supabase.from('funcionario').select('*').neq("role", "rh").neq("role", "admin");

        if (filters.collaboratorId) {
            query = query.eq('funcionario_id', filters.collaboratorId); // Aqui ajustamos para 'funcionario_id'
        }

        if (filters.collaboratorName) {
            query = query.ilike('nome', `%${filters.collaboratorName}%`);
        }

        if (filters.role && filters.role !== 'all') {
            query = query.eq('role', filters.role);
        }

        const { data: colaborador, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
            setLoading(false);
            return;
        }

        setCollaborators(colaborador);
        setLoading(false);
    }



    useEffect(() => {
        fetchCollaborator();
    }, []);

    return (
        <CollaboratorContext.Provider value={{ collaborators, fetchCollaborator, loading }}>
            {children}
        </CollaboratorContext.Provider>
    );
};