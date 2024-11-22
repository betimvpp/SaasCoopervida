import { TableSkeleton } from '@/components/table-skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Collaborator, useCollaborator } from '@/contexts/collaboratorContext';
import { Scale, useScale } from '@/contexts/scaleContext'
import { useEffect, useState } from 'react';
import { z } from 'zod';

const PaymentInfoSchema = z.object({
    funcionario_id: z.string().uuid(),
    nome: z.string().optional(),
    telefone: z.string().optional(),
    cargo: z.string().optional(),
    valor_recebido: z.number().optional(),
    valor_pago: z.number().optional(),
});

type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

export const generatePaymentInfo = (scales: Scale[], collaborators: Collaborator[]): PaymentInfo[] => {
    return collaborators
        .map((collaborator) => {
            const collaboratorScales = scales.filter(
                (scale) => scale.funcionario_id === collaborator.funcionario_id
            );

            if (collaboratorScales.length > 0) {
                const totalReceived = collaboratorScales.reduce(
                    (sum, scale) => sum + scale.valor_recebido, 0
                );
                const totalPaid = collaboratorScales.reduce(
                    (sum, scale) => sum + scale.valor_pago, 0
                );

                return PaymentInfoSchema.parse({
                    funcionario_id: collaborator.funcionario_id,
                    nome: collaborator.nome,
                    cargo: collaborator.role,
                    telefone: collaborator.telefone,
                    valor_recebido: totalReceived,
                    valor_pago: totalPaid,
                });
            }
            return null;
        })
        .filter((info) => info !== null) as PaymentInfo[];
};

// export const generatePaymentInfo = (scales: Scale[], collaborators: Collaborator[], month: string): PaymentInfo[] => {
//     return collaborators
//         .map((collaborator) => {
//             // Filtra as escalas que correspondem ao mês selecionado
//             const collaboratorScales = scales.filter((scale) => {
//                 const scaleDate = new Date(scale.data);
//                 const scaleMonth = scaleDate.toLocaleString('default', { month: 'long' }).toLowerCase();
//                 return scale.funcionario_id === collaborator.funcionario_id && scaleMonth === month;
//             });

//             if (collaboratorScales.length > 0) {
//                 const totalReceived = collaboratorScales.reduce(
//                     (sum, scale) => sum + scale.valor_recebido, 0
//                 );
//                 const totalPaid = collaboratorScales.reduce(
//                     (sum, scale) => sum + scale.valor_pago, 0
//                 );

//                 return PaymentInfoSchema.parse({
//                     funcionario_id: collaborator.funcionario_id,
//                     nome: collaborator.nome,
//                     cargo: collaborator.role,
//                     telefone: collaborator.telefone,
//                     valor_recebido: totalReceived,
//                     valor_pago: totalPaid,
//                 });
//             }
//             return null;
//         })
//         .filter((info) => info !== null) as PaymentInfo[];
// };

type PaymentTableProps = {
    selectedMonth: string;
    onFilter: (month: string) => void;
};
export const PaymentTable = ({ selectedMonth }: PaymentTableProps) => {
    const { scales } = useScale();
    const { collaborators } = useCollaborator();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentInfo[]>([]);

    useEffect(() => {
        setLoading(true);
        if (scales && collaborators) {
            const data = generatePaymentInfo(scales, collaborators);
            setPaymentData(data);
        }
        setLoading(false);
    }, [scales, collaborators, selectedMonth]);

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="text-center">Nome do Colaborador</TableHead>
                    <TableHead className="text-center">Telefone do Colaborador</TableHead>
                    <TableHead className="text-center">Cargo do Colaborador</TableHead>
                    <TableHead className="text-center">Valor/Recebido</TableHead>
                    <TableHead className="text-center">Valor/Pago</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paymentData.length > 0 && paymentData.map((payment) => (
                    <TableRow key={payment.funcionario_id}>
                        <TableCell className="text-center">{payment.nome}</TableCell>
                        <TableCell className="text-center">{payment?.telefone}</TableCell>
                        <TableCell className="text-center">{payment.cargo}</TableCell>
                        <TableCell className="text-center">{payment.valor_recebido}</TableCell>
                        <TableCell className="text-center">{payment.valor_pago}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {loading === true && <TableSkeleton />}
        </Table>
    )
}
