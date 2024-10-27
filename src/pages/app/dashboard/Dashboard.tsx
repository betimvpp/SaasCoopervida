import { Helmet } from 'react-helmet-async'

export const Dashboard = () => {
    return (
        <div className="flex flex-col w-full gap-2">
            <Helmet title="Dashboard" />
            <h1 className="text-4xl font-bold textslate mb-4">Dashboard</h1>
        </div>
    )
}
