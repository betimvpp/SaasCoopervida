
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export const DailyProfitCard = () => {
    const value = Math.floor(Math.random() * (90 | 2900)) + (10 | 100)
    return (
        <Card>
            <CardHeader className='flex-row space-y-0 items-center justify-between pb-2'>
                <CardTitle className='text-base font-semibold'>Lucro Liquido por Dia:</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent className='space-y-1'>
                <span className="text-xl font-bold tracking-tight">
                    {value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </span>
                <p className='text-xs text-muted-foreground'>
                    <span className='text-emerald-500 dark:text-emerald-400'>+{Number(Math.floor(Math.random() * 10) + 1)}% </span>
                    em relação ao dia anterior
                </p>
            </CardContent>
        </Card>
    )
}
