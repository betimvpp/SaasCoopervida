import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const currentMonth = new Date().getMonth();
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const chartData = [
    { month: months[(currentMonth - (5 - 0) + 12) % 12], faturamentoTotal: 186, pagamentoColaboradores: 80, lucroLiquido: 50 },
    { month: months[(currentMonth - (5 - 1) + 12) % 12], faturamentoTotal: 305, pagamentoColaboradores: 200, lucroLiquido: 120 },
    { month: months[(currentMonth - (5 - 2) + 12) % 12], faturamentoTotal: 237, pagamentoColaboradores: 120, lucroLiquido: 70 },
    { month: months[(currentMonth - (5 - 3) + 12) % 12], faturamentoTotal: 273, pagamentoColaboradores: 190, lucroLiquido: 110 },
    { month: months[(currentMonth - (5 - 4) + 12) % 12], faturamentoTotal: 209, pagamentoColaboradores: 130, lucroLiquido: 65 },
    { month: months[(currentMonth - (5 - 5) + 12) % 12], faturamentoTotal: 214, pagamentoColaboradores: 140, lucroLiquido: 85 },
]

const chartConfig = {
    faturamentoTotal: {
        label: "Faturamento Total",
        color: "hsl(var(--chart-1))",
    },
    pagamentoColaboradores: {
        label: "Pagamento aos Colaboradores",
        color: "hsl(var(--chart-2))",
    },
    lucroLiquido: {
        label: "Lucro Liquido",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export const BillingChart = () => {
    return (
        <Card className="h-full w-full border rounded-xl shadow-lg">
            <CardHeader className="-mb-4">
                <CardTitle>Faturamento Mensal da Empresa</CardTitle>
                <CardDescription>{months[(currentMonth - (5 - 0) + 12) % 12]} - {months[(currentMonth - (5 - 5) + 12) % 12]} {new Date().getFullYear()}</CardDescription>
            </CardHeader>
            <ChartContainer config={chartConfig} className="h-[75%] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        dataKey="faturamentoTotal"
                        tickLine={false}
                        axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="faturamentoTotal" fill="var(--color-faturamentoTotal)" radius={4} />
                    <Bar dataKey="pagamentoColaboradores" fill="var(--color-pagamentoColaboradores)" radius={4} />
                    <Bar dataKey="lucroLiquido" fill="var(--color-lucroLiquido)" radius={4} />
                </BarChart>
            </ChartContainer>
        </Card>
    )
}
