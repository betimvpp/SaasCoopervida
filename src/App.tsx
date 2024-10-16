import '@/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { AuthProvider } from './contexts/authContext'
import { HumanResourcesProvider } from './contexts/rhContext'
import { PatientProvider } from './contexts/patientContext'
import { CollaboratorProvider } from './contexts/collaboratorContext'

export function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider>
        <HumanResourcesProvider>
          <PatientProvider>
            <CollaboratorProvider>
              <HelmetProvider>
                <Helmet titleTemplate='%s | CooperVida' />
                <Toaster richColors />
                <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
                </QueryClientProvider>
              </HelmetProvider>
            </CollaboratorProvider>
          </PatientProvider>
        </HumanResourcesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
