import { NavLink } from './nav-link'
import { CalendarDays, Contact2, Home, Speech, Stethoscope } from 'lucide-react'
import { Separator } from './ui/separator'
import { useAuth } from '@/contexts/authContext'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function SideBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    function handleLogout() {
        logout(); 
        navigate("/login");
    }
    
    return (
        <div className='flex flex-col items-center'>
            <nav className='flex flex-col items-start mt-6 gap-3 break-words text-secondary'>
                <NavLink to="/" className='flex items-center gap-1'>
                    <Home className='h-6 w-6' />
                    Inicio
                </NavLink>

                <NavLink to="/" className='flex items-center gap-1'>
                    <CalendarDays className='h-6 w-6' />
                    Escalas
                </NavLink>

                <NavLink to="/pacientes" className='flex items-center gap-1'>
                    <Stethoscope className='h-6 w-6' />
                    Pacientes
                </NavLink>

                <NavLink to="/recursoshumanos" className='flex items-center gap-1'>
                    <Speech className='min-h-6 min-w-6' />
                    Recursos Humanos
                </NavLink>

                <NavLink to="/colaboradores"className='flex items-center gap-1'>
                    <Contact2 className='h-6 w-6' />
                    Colaboradores
                </NavLink>
            </nav>
            <Separator className='mt-6 mb-2 w-full' />
            <Button className='w-32' variant={'destructive'} onClick={handleLogout}>
                Sair
            </Button>
        </div>
    )
}
