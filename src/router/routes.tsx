import { Collaborator } from '@/pages/app/collaborator/Collaborator'
import { Dashboard } from '@/pages/app/dashboard/Dashboard'
import { Escala } from '@/pages/app/escala/Escala'
import { HumanResources } from '@/pages/app/humanResources/HumanResources'
import { Patient } from '@/pages/app/patient/Patient'
import { AppLayout } from '@/pages/layouts/app'
import { AuthLayout } from '@/pages/layouts/auth'
import { Login } from '@/pages/login/Login'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <NotFound/>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/escala', element: <Escala /> },
      { path: '/colaboradores', element: <Collaborator /> },
      { path: '/recursoshumanos', element: <HumanResources /> },
      { path: '/pacientes', element: <Patient /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
    ],
  },

])