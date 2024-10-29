import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PatientRow } from "./PatientRow"
import { usePatients } from "@/contexts/patientContext";
import { PatientTableSkeleton } from "./PatientTableSkeleton";

export const PatientTable = () => {
    const { patients, loading } = usePatients();

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="w-4"></TableHead>
                    <TableHead className="text-center">E-mail</TableHead>
                    <TableHead className="text-center">Nome Completo</TableHead>
                    <TableHead className="text-center">CPF</TableHead>
                    <TableHead className="text-center">Telefone</TableHead>
                    <TableHead className="text-center">Plano de Saúde</TableHead>
                    <TableHead className="text-center">Rua</TableHead>
                    <TableHead className="text-center">Cidade</TableHead>
                    <TableHead className="text-center">Pagamento/Dia</TableHead>
                    <TableHead className="text-center">Pagamento/Profissional</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {patients && patients.map((patient) => (
                    <PatientRow key={patient.paciente_id} patient={patient} />
                ))}
            </TableBody>
            {loading === true && <PatientTableSkeleton />}

        </Table>
    )
}
