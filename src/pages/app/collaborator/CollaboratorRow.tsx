import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Collaborator } from '@/contexts/collaboratorContext'
import { Search} from 'lucide-react'
import { useState } from 'react'
import { CollaboratorDetails } from './CollaboratorDetails'

export const CollaboratorRow = ({ collaborator }: { collaborator: Collaborator }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    
    return (
        <TableRow className=''>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-2 w-2" />
                            <span className="sr-only">Detalhes do Colaborador</span>
                        </Button>
                    </DialogTrigger>
                    <CollaboratorDetails open={isDetailsOpen} collaborator={collaborator} />
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

            <TableCell className="text-center overflow-hidden">
                {collaborator?.chave_pix}
            </TableCell>

            <TableCell className="text-center">
                {collaborator?.role}
            </TableCell>
        </TableRow >
    )
}
