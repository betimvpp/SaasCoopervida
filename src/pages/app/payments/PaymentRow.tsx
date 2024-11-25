import { TableCell, TableRow } from '@/components/ui/table'
import { PaymentInfo } from '@/contexts/paymentContext'

export const PaymentRow = ({ payment }: { payment: PaymentInfo }) => {

    return (
        <TableRow key={payment.funcionario_id}>
            <TableCell className="text-center">{payment.nome}</TableCell>
            <TableCell className="text-center">{payment?.telefone}</TableCell>
            <TableCell className="text-center">{payment.cargo}</TableCell>
            <TableCell className="text-center">{payment.valor_recebido}</TableCell>
            <TableCell className="text-center">{payment.valor_pago}</TableCell>
            <TableCell className="text-center">{payment.chave_pix}</TableCell>
        </TableRow>
    )
}