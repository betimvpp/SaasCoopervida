import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Collaborator } from '@/contexts/collaboratorContext'
import { Search} from 'lucide-react'
import { useState } from 'react'

export const CollaboratorRow = ({ collaborator }: { collaborator: Collaborator }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    
    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do Colaborador</span>
                        </Button>
                    </DialogTrigger>
                    {/* <OrderDetails open={isDetailsOpen} orderId={order.orderId} /> */}
                </Dialog>
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.email}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.nome}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.cpf}
            </TableCell >

            <TableCell className="text-center">
               {collaborator.telefone}
            </TableCell>

            <TableCell className="text-center">
              {collaborator?.rua}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.cidade}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.banco}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.agencia}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.conta}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.role}
            </TableCell>
        </TableRow >
    )
}
