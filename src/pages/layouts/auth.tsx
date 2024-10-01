import { ModeToggle } from "@/components/mode-toggle"
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex">
      <div className='h-screen w-9/12 flex flex-col justify-between border-r border-foreground/5 bg-banner bg-no-repeat bg-cover bg-top object-cover p-4 text-muted-foreground'>
        <div className='flex items-center gap-3 text-lg text-foreground'>
        </div>
        <footer className='text-sm text-white font-semibold'>
          All rights reserved to CodeHere® - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex items-center justify-center h-screen m-auto">
        <span className="absolute top-8 right-8">
          <ModeToggle />
        </span>
        <Outlet />
      </div>
    </div>
  )
}