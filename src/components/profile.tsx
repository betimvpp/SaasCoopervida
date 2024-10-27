import { CircleUserRound } from 'lucide-react'

export function Profile() {
    return (
        <span className='flex flex-col items-center justify-center'>
            <CircleUserRound className='' size={48} />
            <p className='text-center text-sm font-semibold '>Roberto Junior</p>
            <p className='text-xs  font-semibold text-center opacity-80'>Admin</p>
        </span>
    )
}
