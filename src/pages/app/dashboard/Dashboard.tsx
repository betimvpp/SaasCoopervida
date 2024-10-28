import { Helmet } from 'react-helmet-async'
import { BillingChart } from './charts/billingChart'
import { MostUsedServices } from './charts/mostUsedServices'
import { EmployeeSpecialty } from './charts/employeeSpecialty'
import { EmployeeBilling } from './charts/employeeBilling'

export const Dashboard = () => {
    return (
        <div className="flex flex-col w-full gap-2">
            <Helmet title="Dashboard" />
            <h1 className="text-4xl font-bold textslate mb-4">Dashboard</h1>
            <div className="h-full w-full overflow-hidden shadow-lg border rounded-md p-4 grid grid-cols-3 grid-rows-2 gap-6 gap-y-10 pb-10">
                <div>
                    Faturamento Mensal
                    <BillingChart />
                </div>
                <div>
                    Serviços Mais Utilizados
                    <MostUsedServices />
                </div>
                <div>
                    Colaborador X Especialidade
                    <EmployeeSpecialty />
                </div>
                <div>
                    Faturamento X Colaborador
                    <EmployeeBilling />
                </div>
                <div>
                    Serviços Mais Utilizados
                    <MostUsedServices />
                </div>
                <div>
                    Colaborador X Especialidade
                    <EmployeeSpecialty />
                </div>
             
            </div>
        </div>
    )
}
