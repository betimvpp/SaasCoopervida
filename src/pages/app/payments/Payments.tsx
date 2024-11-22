import { Helmet } from 'react-helmet-async'
import { PaymentFilters } from './PaymentsFilter'
import { PaymentTable } from './PaymentTable'
import { useEffect, useState } from 'react';
import { useScale } from '@/contexts/scaleContext';
import { useCollaborator } from '@/contexts/collaboratorContext';

export const Payments = () => {
  const { fetchScales } = useScale();
  const { fetchCollaborator } = useCollaborator();
  const [pageIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollaborator({}, pageIndex);
      await fetchScales()
    };

    fetchData();
  }, [fetchCollaborator, fetchScales]);

  const handleFilter = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Helmet title="Pagamentos" />
      <h1 className="text-4xl font-bold textslate mb-2">Painel de Pagamentos</h1>
      <PaymentFilters selectedMonth={selectedMonth} onFilter={handleFilter} />
      <div className=" h-full w-full max-h-[700px] shadow-lg border rounded-md">
        <PaymentTable selectedMonth={selectedMonth} onFilter={handleFilter} /> {/* Pass onFilter here */}
      </div>
      {/* <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={10}
        onPageChange={handlePageChange}
      /> */}
    </div>
  )
}
