import { useAuth } from '@/contexts/authContext'
import { useCollaborator, Collaborator } from '@/contexts/collaboratorContext';
import { CircleUserRound } from 'lucide-react'
import { useEffect, useState } from 'react';

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function Profile() {
    const { user } = useAuth();
    const { getCollaboratorById } = useCollaborator();
    const [collaboratorData, setCollaboratorData] = useState<Collaborator | null>(null);

    useEffect(() => {
        if (user) {
            getCollaboratorById(user.id).then(data => setCollaboratorData(data));
        }
    }, [user, getCollaboratorById]);

    return (
        <span className='flex flex-col items-center justify-center'>
            <CircleUserRound size={48} />
            <p className='text-center text-sm font-semibold '>{collaboratorData?.nome}</p>
            <p className='text-xs  font-semibold text-center opacity-80'>{collaboratorData?.role ? capitalizeFirstLetter(collaboratorData.role) : ''}</p>
        </span>
    )
}
