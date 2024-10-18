import { Helmet } from "react-helmet-async"
import { PatientTable } from "./PatientTable"
import { PatientFilters } from "./PatientFilters"
import { usePatients } from "@/contexts/patientContext";

export const Patient = () => {
  const { patients, loading } = usePatients();
  
  return (
    <div className="flex flex-col w-full gap-2">
      <Helmet title="Pacientes" />
      <h1 className="text-4xl font-bold textslate mb-4">Painel de Pacientes</h1>
      <PatientFilters />
      <div className=" h-full w-full shadow-lg border rounded-md">
        <PatientTable />
        {patients?.length === 0 && loading === false &&
          <div className="w-full h-full m-auto text-center text-lg font-semibold text-muted-foreground flex items-center justify-center">Nenhum usuário encontrado!</div>
        }
      </div>
    </div>
  )
}
