import { z } from 'zod';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';

export const employeeSchema = z.object({
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

export type Employee = z.infer<typeof employeeSchema>;

export const humanResourcesFiltersSchema = z.object({
    humanResourcesId: z.string().optional(),
    humanResourcesName: z.string().optional(),
  })
  
export type HumanResourcesFiltersSchema = z.infer<typeof humanResourcesFiltersSchema>

const HumanResourcesContext = createContext<{
    employees: Employee[];
    loading: boolean;
    fetchHumanResources: (filters?: HumanResourcesFiltersSchema) => Promise<void>
}>({
    employees: [],
    loading: true,
    fetchHumanResources: async () => { },
});

export const useHumanResources = () => useContext(HumanResourcesContext);

export const HumanResourcesProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchHumanResources(filters: HumanResourcesFiltersSchema = { humanResourcesId: '', humanResourcesName: '' }) {
        setLoading(true);

        let query = supabase.from('funcionario').select('*').eq('role', 'rh');

        if (filters.humanResourcesId) {
            query = query.eq('funcionario_id', filters.humanResourcesId);
        }

        if (filters.humanResourcesName) {
            query = query.ilike('nome', `%${filters.humanResourcesName}%`);
        }

        const { data: funcionario, error } = await query;

        if (error) {
            console.error('Erro ao buscar dados de RH:', error);
            setLoading(false);
            return;
        }

        if (funcionario) {
            const parsedData = funcionario.map((item) => employeeSchema.safeParse(item));

            const validEmployees = parsedData
                .filter((item) => item.success)
                .map((item) => item.data);

            setEmployees(validEmployees);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchHumanResources();
    }, []);

    return (
        <HumanResourcesContext.Provider value={{ employees, fetchHumanResources, loading }}>
            {children}
        </HumanResourcesContext.Provider>
    );
};