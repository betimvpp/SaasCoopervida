import { Helmet } from 'react-helmet-async'
import { ScaleCalendar } from './ScaleCalendar'

export const Scale = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Helmet title="Escala" />
      <h1 className="text-4xl font-bold textslate mb-4">Escala</h1>

      <div className="h-full w-full shadow-lg border rounded-md ">
        <ScaleCalendar />
      </div>
    </div>
  )
}
