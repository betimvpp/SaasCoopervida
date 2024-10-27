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
            <nav className='flex flex-col items-start mt-6 gap-3 break-words text-muted-foreground'>
                <NavLink to="/dashboard" >
                    <Home className='h-6 w-6' />
                    Inicio
                </NavLink>

                <NavLink to="/escala" >
                    <CalendarDays className='h-6 w-6' />
                    Escala
                </NavLink>

                <NavLink to="/pacientes" >
                    <Stethoscope className='h-6 w-6' />
                    Pacientes
                </NavLink>

                <NavLink to="/recursoshumanos" >
                    <Speech className='min-h-6 min-w-6' />
                    Recursos Humanos
                </NavLink>

                <NavLink to="/colaboradores">
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
