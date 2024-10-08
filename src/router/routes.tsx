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
      // { path: '/', element: <Dashboard /> },
      // { path: '/orders', element: <Order /> },
      // { path: '/products', element: <Products /> },
      // { path: '/employees', element: <Employees /> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
    ],
  },

])