import { TableRow, TableCell } from '@/components/ui/table'
import { Scale } from '@/contexts/scaleContext'

export const ScaleCalendarDetailsRow = ({ scale }: { scale: Scale }) => {
    return (
        <TableRow className='text-center' key={scale?.escala_id}>
            <TableCell>{scale?.tipo_servico}</TableCell>
            <TableCell>{scale?.nomeFuncionario}</TableCell>
            <TableCell>{scale?.nomePaciente}</TableCell>
            <TableCell>{scale?.valor_recebido}</TableCell>
            <TableCell>{scale?.valor_pago}</TableCell>
            <TableCell>{scale?.pagamentoAR_AV}</TableCell>
        </TableRow>
    )
}
