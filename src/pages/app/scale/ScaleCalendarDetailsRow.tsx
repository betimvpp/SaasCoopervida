import { TableRow, TableCell } from '@/components/ui/table'
import { useAuth } from '@/contexts/authContext';
import { Collaborator, useCollaborator } from '@/contexts/collaboratorContext';
import { Scale } from '@/contexts/scaleContext'
import { useEffect, useState } from 'react';

export const ScaleCalendarDetailsRow = ({ scale }: { scale: Scale }) => {
    const { user } = useAuth();
    const { getCollaboratorById } = useCollaborator();
    const [collaboratorData, setCollaboratorData] = useState<Collaborator | null>(null);

    useEffect(() => {
        if (user) {
            getCollaboratorById(user.id)
                .then(data => setCollaboratorData(data))
        }
    }, [user, getCollaboratorById]);

    return (
        <TableRow className='text-center' key={scale?.escala_id}>
            <TableCell>{scale?.tipo_servico}</TableCell>
            <TableCell>{scale?.nomeFuncionario}</TableCell>
            <TableCell>{scale?.nomePaciente}</TableCell>
            {collaboratorData?.role === 'admin' ? (
                <TableCell className="text-center font-semibold">{scale?.valor_recebido}</TableCell>
            ) : (
                <></>
            )}
            <TableCell>{scale?.valor_pago}</TableCell>
            <TableCell>{scale?.pagamentoAR_AV}</TableCell>
        </TableRow>
    )
}
