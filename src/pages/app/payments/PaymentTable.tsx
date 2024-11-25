import { TableSkeleton } from '@/components/table-skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePayment } from '@/contexts/paymentContext';
import { PaymentRow } from './PaymentRow';


export const PaymentTable = () => {
    const { paymentData, loading } = usePayment();

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="text-center">Nome do Colaborador</TableHead>
                    <TableHead className="text-center">Telefone do Colaborador</TableHead>
                    <TableHead className="text-center">Cargo do Colaborador</TableHead>
                    <TableHead className="text-center">Valor/Recebido</TableHead>
                    <TableHead className="text-center">Valor/Pago</TableHead>
                    <TableHead className="text-center">Chave Pix</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paymentData && paymentData.map((payment) => (
                    <PaymentRow key={payment.funcionario_id} payment={payment} />
                ))}
            </TableBody>
            {loading === true && <TableSkeleton />}
        </Table>
    )
}
