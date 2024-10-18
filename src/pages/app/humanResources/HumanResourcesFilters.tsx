import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const humanResourcesFiltersSchema = z.object({
  humanResourcesId: z.string().optional(),
  humanResourcesName: z.string().optional(),
})

type HumanResourcesFiltersSchema = z.infer<typeof humanResourcesFiltersSchema>

export function HumanResourcesFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const humanResourcesId = searchParams.get('funcionario_id')
  const humanResourcesName = searchParams.get('nome')


  const { register, handleSubmit, reset } =
    useForm<HumanResourcesFiltersSchema>({
      resolver: zodResolver(humanResourcesFiltersSchema),
      defaultValues: {
        humanResourcesId: humanResourcesId ?? '',
        humanResourcesName: humanResourcesName ?? '',
      },
    })

  function handleFilter({ humanResourcesId, humanResourcesName }: HumanResourcesFiltersSchema) {
    setSearchParams((state) => {
      if (humanResourcesId) {
        state.set('humanResourcesId', humanResourcesId)
      } else {
        state.delete('humanResourcesId')
      }

      if (humanResourcesName) {
        state.set('humanResourcesName', humanResourcesName)
      } else {
        state.delete('humanResourcesName')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('humanResourcesId')
      state.delete('humanResourcesName')
      state.set('page', '1')

      return state
    })

    reset({
      humanResourcesId: '',
      humanResourcesName: '',
    })
  }

  return (
    <div className='flex justify-between'>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-semibold">Filtros:</span>
        <Input
          placeholder="ID do RH"
          className="h-8 w-auto"
          {...register('humanResourcesId')}
        />
        <Input
          placeholder="Nome do RH"
          className="h-8 w-[320px]"
          {...register('humanResourcesName')}
        />

        <Button variant="default" size="xs" type="submit">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          onClick={handleClearFilters}
          variant="outline"
          size="xs"
          type="button"
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Button variant={'secondary'}>
        Adcionar RH
      </Button>
    </div>
  )
}
