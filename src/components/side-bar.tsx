import { NavLink } from './nav-link'
import { Contact2, Home, PackageSearch, ScrollText } from 'lucide-react'

export function SideBar() {
    return (
        <nav className='flex flex-col items-start mt-6 gap-3'>
            <NavLink to="/" >
                <Home className='h-6 w-6' />
                Inicio
            </NavLink>

            <NavLink to="/orders" >
                <ScrollText className='h-6 w-6' />
                Escalas
            </NavLink>

            <NavLink to="/products" >
                <PackageSearch className='h-6 w-6' />
                Pacientes
            </NavLink>

            <NavLink to="/employees" >
                <Contact2 className='h-6 w-6' />
                Recursos Humanos
            </NavLink>

            <NavLink to="/employees" >
                <Contact2 className='h-6 w-6' />
                Colaboradores
            </NavLink>
        </nav>
    )
}
