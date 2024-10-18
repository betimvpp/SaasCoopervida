import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HumanResourcesRow } from "./HumanResourcesRow"
import { useHumanResources } from "@/contexts/rhContext"
import { HumanResourcesTableSkeleton } from "./HumanResourcesTableSkeleton";

export const HumanResourcesTable = () => {
    const { employees, loading } = useHumanResources(); 

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="w-4"></TableHead>
                    <TableHead className="text-center">E-mail</TableHead>
                    <TableHead className="text-center">Nome Completo</TableHead>
                    <TableHead className="text-center">CPF</TableHead>
                    <TableHead className="text-center">Telefone</TableHead>
                    <TableHead className="text-center">Rua</TableHead>
                    <TableHead className="text-center">Cidade</TableHead>
                    <TableHead className="text-center">Banco</TableHead>
                    <TableHead className="text-center">Agencia</TableHead>
                    <TableHead className="text-center">Conta</TableHead>
                    <TableHead className="text-center">Cargo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { employees && employees.map((employee) => (
                    <HumanResourcesRow employee={employee}/>
                ))}
            </TableBody>
            {loading === true && <HumanResourcesTableSkeleton />}
        </Table>
    )
}
