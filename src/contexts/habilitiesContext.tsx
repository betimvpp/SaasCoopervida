import supabase from '@/lib/supabase';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';

export const habilitieSchema = z.object({
    especialidade_id: z.number(),
    nome: z.string(),
});

export type Hability = z.infer<typeof habilitieSchema>;

interface HabilityContextType {
    habilities: Hability[];
    loading: boolean;
    fetchHabilitys: () => Promise<void>;
}

const HabilityContext = createContext<HabilityContextType | undefined>(undefined);

export const HabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [habilities, setHabilitys] = useState<Hability[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchHabilitys() {
        setLoading(true);

        const { data: habilitiesData, error } = await supabase
            .from('especialidade')
            .select('*');

        if (error) {
            console.error('Erro ao buscar dados da Hability:', error);
            setLoading(false);
            return;
        }

        if (habilitiesData) {
            const parsedData = habilitiesData.map((item) => habilitieSchema.safeParse(item));

            const validHabilitys = parsedData
                .filter((item) => item.success)
                .map((item) => item.data);

            setHabilitys(validHabilitys);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchHabilitys();
    }, []);

    return (
        <HabilityContext.Provider value={{ habilities, loading, fetchHabilitys }}>
            {children}
        </HabilityContext.Provider>
    );
};

export const useHabilitys = () => {
    const context = useContext(HabilityContext);
    if (!context) {
        throw new Error('useHabilitys deve ser usado dentro do HabilityProvider');
    }
    return context;
};
