import { ModeToggle } from '@/components/mode-toggle'
import { Profile } from '@/components/profile'
import { SideBar } from '@/components/side-bar'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
    return (
        <div className='h-screen flex overflow-hidden'>
            <div className='h-full w-[10%] p-8 '>
                <Profile />
                <SideBar />
            </div>
            <Separator orientation='vertical' />
            <div className='h-[2500px] w-full p-8'>
                <span className="absolute top-8 right-8">
                    <ModeToggle />
                </span>
                <Outlet />
            </div>
        </div>
    )
}
