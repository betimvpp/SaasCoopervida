import supabase from '@/lib/supabase';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { z } from 'zod';

const patientSchema = z.object({
  paciente_id: z.string(),
  nome: z.string(),
  cpf: z.string(),
  plano_saude: z.string(),
  telefone: z.string(),
  pagamento_dia: z.number(),
  email: z.string(),
  rua: z.string(),
  cidade: z.string(),
});

export type Patient = z.infer<typeof patientSchema>;

interface PatientContextType {
  patients: Patient[];
  loading: boolean;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);


export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPatients() {
    setLoading(true);

    const { data: pacientes, error } = await supabase
        .from('paciente')
        .select('*')

    if (error) {
        console.error('Erro ao buscar dados do Paciente:', error);
        setLoading(false);
        return;
    }

    if (pacientes) {

        const parsedData = pacientes.map((item) => patientSchema.safeParse(item));

        const validPatients = parsedData
            .filter((item) => item.success)
            .map((item) => item.data);

        setPatients(validPatients);
    }

    setLoading(false)
}

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <PatientContext.Provider value={{ patients, loading }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients deve ser usado dentro do PatientProvider');
  }
  return context;
};
