import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { ServiceExchange, useScale } from '@/contexts/scaleContext'
import { useState } from 'react';
import { toast } from 'sonner';

export const PermutationRow = ({ scale }: { scale: ServiceExchange }) => {
    const { updateServiceExchange } = useScale();
    const [loading, setLoading] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    const handleApprove =() => {

    };

    const handleReject =() => {

    };

    return (
        <TableRow>
            <TableCell className="text-center">
                {scale?.nomeFuncionarioOrigem}
            </TableCell>

            <TableCell className="text-center">
                {scale?.nomeFuncionarioDestino}
            </TableCell>

            <TableCell className="text-center">
                {scale?.nomePaciente}
            </TableCell>

            <TableCell className="text-center">
                {scale?.data_servico_colaborador_origem ? formatDate(scale.data_servico_colaborador_origem) : 'N/A'}
            </TableCell>

            <TableCell className="text-center">
                {scale?.data_servico_destino ? formatDate(scale.data_servico_destino) : 'N/A'}
            </TableCell>

            <TableCell className="text-center">
                {scale?.servico_origem}
            </TableCell>

            <TableCell className="text-center">
                {scale?.servico_destino}
            </TableCell>

            <TableCell className="text-center">
                {scale?.status_func_destino === 'pendente' && (
                    <Button disabled>
                        Pendente
                    </Button>
                )}
                {scale?.status_func_destino === 'aprovado' && (
                    <>
                        <Button onClick={handleApprove} disabled={loading}>
                            Aprovar
                        </Button>
                        <Button onClick={handleReject} disabled={loading}>
                            X
                        </Button>
                    </>
                )}
                {scale?.status_func_destino === 'rejeitado' && (
                    <Button disabled>
                        Rejeitado
                    </Button>
                )}
            </TableCell>
        </TableRow >
    )
}


