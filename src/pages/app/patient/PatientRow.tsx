import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Patient } from '@/contexts/patientContext'
import { Search} from 'lucide-react'
import { useState } from 'react'

export const PatientRow = ({ patient }: { patient: Patient }) => {
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
                    {/* <OrderDetails open={isDetailsOpen} orderId={order.orderId} /> */}
                </Dialog>
            </TableCell>

            <TableCell className="text-center">
                {patient.email}
            </TableCell>

            <TableCell className="text-center">
                {patient.nome}
            </TableCell>

            <TableCell className="text-center">
                {patient.cpf}
            </TableCell >

            <TableCell className="text-center">
               {patient.telefone}
            </TableCell>

            <TableCell className="text-center">
               {patient.plano_saude}
            </TableCell>

            <TableCell className="text-center">
              {patient.rua}
            </TableCell>

            <TableCell className="text-center">
                {patient.cidade}
            </TableCell>

            <TableCell className="text-center">
                {patient.pagamento_dia}
            </TableCell>
        </TableRow >
    )
}
