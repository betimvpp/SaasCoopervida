import { Admin } from '@/pages/app/admin/Admin'
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
      { path: '/admin', element: <Admin /> },
      // { path: '/orders', element: <Order /> },
      // { path: '/products', element: <Products /> },
      // { path: '/employees', element: <Employees /> },
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