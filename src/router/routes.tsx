import { Collaborator } from '@/pages/app/collaborator/Collaborator'
import { Dashboard } from '@/pages/app/dashboard/Dashboard'
import { Scale } from '@/pages/app/scale/Scale'
import { HumanResources } from '@/pages/app/humanResources/HumanResources'
import { Patient } from '@/pages/app/patient/Patient'
import { AppLayout } from '@/pages/layouts/app'
import { AuthLayout } from '@/pages/layouts/auth'
import { Login } from '@/pages/login/Login'
import { createBrowserRouter } from 'react-router-dom'
import { Permutation } from '@/pages/app/permutation/Permutation'
import { CreateSchedule } from '@/pages/app/createSchedule/CreateSchedule'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <NotFound/>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/escala', element: <Scale /> },
      { path: '/escala/permutas', element: <Permutation /> },
      { path: '/escala/criar', element: <CreateSchedule /> },
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