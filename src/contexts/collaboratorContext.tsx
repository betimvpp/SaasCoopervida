import { z } from 'zod';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export const collaboratorSchema = z.object({
    funcionario_id: z.string().uuid(),
    nome: z.string(),
    cpf: z.string(),
    telefone: z.string(),
    email: z.string().email(),
    rua: z.string(),
    status: z.string(),
    role: z.string(),
    cidade: z.string(),
    banco: z.string(),
    agencia: z.string(),
    conta: z.string(),
    data_nascimento: z.string(),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;

const CollaboratorContext = createContext<{
    collaborators: Collaborator[];
    loading: boolean;
    fetchCollaborator: () => Promise<void>;
}>({
    collaborators: [],
    loading: true,
    fetchCollaborator: async () => { },
});

export const useCollaborator = () => useContext(CollaboratorContext);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCollaborator() {
        setLoading(true);

        const { data: funcionario, error } = await supabase
            .from('funcionario')
            .select('*')
            .not("role", "in", ["rh", "admin"]);

        if (error) {
            console.error('Erro ao buscar dados de Colaboradores:', error);
            setLoading(false);
            return;
        }

        if (funcionario) {

            const parsedData = funcionario.map((item) => collaboratorSchema.safeParse(item));

            const validCollaborators = parsedData
                .filter((item) => item.success)
                .map((item) => item.data);

            setCollaborators(validCollaborators);
        }

        setLoading(false)

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