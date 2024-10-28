import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", faturamentoTotal: 186, pagamentoColaboradores: 80, lucroLiquido: 50 },
    { month: "February", faturamentoTotal: 305, pagamentoColaboradores: 200, lucroLiquido: 120 },
    { month: "March", faturamentoTotal: 237, pagamentoColaboradores: 120, lucroLiquido: 70 },
    { month: "April", faturamentoTotal: 273, pagamentoColaboradores: 190, lucroLiquido: 110 },
    { month: "May", faturamentoTotal: 209, pagamentoColaboradores: 130, lucroLiquido:  65},
    { month: "June", faturamentoTotal: 214, pagamentoColaboradores: 140, lucroLiquido: 85 },
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
        <ChartContainer config={chartConfig} className="h-full w-full border rounded-xl">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="faturamentoTotal" fill="var(--color-faturamentoTotal)" radius={4} />
                <Bar dataKey="pagamentoColaboradores" fill="var(--color-pagamentoColaboradores)" radius={4} />
                <Bar dataKey="lucroLiquido" fill="var(--color-lucroLiquido)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
