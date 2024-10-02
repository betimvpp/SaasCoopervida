import { NavLink } from './nav-link'
import { CalendarDays, Contact2, Home, Speech, Stethoscope } from 'lucide-react'

export function SideBar() {
    return (
        <nav className='flex flex-col items-start mt-6 gap-3 break-words'>
            <NavLink to="/" >
                <Home className='h-6 w-6' />
                Inicio
            </NavLink>

            <NavLink to="/orders" >
                <CalendarDays className='h-6 w-6' />
                Escalas
            </NavLink>

            <NavLink to="/products" >
                <Stethoscope className='h-6 w-6' />
                Pacientes
            </NavLink>

            <NavLink to="/employees" >
                <Speech className='min-h-6 min-w-6' />
                Recursos Humanos
            </NavLink>

            <NavLink to="/employees">
                <Contact2 className='h-6 w-6' />
                Colaboradores
            </NavLink>
        </nav>
    )
}
