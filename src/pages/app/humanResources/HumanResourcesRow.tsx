import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Employee } from '@/contexts/rhContext'
import { Search } from 'lucide-react'
import { useState } from 'react'

export const HumanResourcesRow = ({ employee }: { employee: Employee }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do RH</span>
                        </Button>
                    </DialogTrigger>
                    {/* <HumanResourceDetails open={isDetailsOpen} humanResourceId={humanResource.humanResourceId} /> */}
                </Dialog>
            </TableCell>

            <TableCell className="text-center">{employee?.email}</TableCell>
            <TableCell className="text-center">{employee?.nome}</TableCell>
            <TableCell className="text-center">{employee?.cpf}</TableCell>
            <TableCell className="text-center">{employee?.telefone}</TableCell>
            <TableCell className="text-center">{employee?.rua}</TableCell>
            <TableCell className="text-center">{employee?.cidade}</TableCell>
            <TableCell className="text-center">{employee?.banco}</TableCell>
            <TableCell className="text-center">{employee?.agencia}</TableCell>
            <TableCell className="text-center">{employee?.conta}</TableCell>
            <TableCell className="text-center">{employee?.role}</TableCell>
        </TableRow >
    )
}
