import { Helmet } from "react-helmet-async"
import { HumanResourcesTable } from "./HumanResourcesTable"
import { HumanResourcesFilters } from "./HumanResourcesFilters"
import { useHumanResources } from "@/contexts/rhContext";
import { Pagination } from "@/components/pagination";
import { useState } from "react";

export const HumanResources = () => {
  const { employees, loading } = useHumanResources();
  const [pageIndex, setPageIndex] = useState(0);
  const totalCount = employees?.length || 0;

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };
  
  return (
    <div className="flex flex-col w-full gap-2">
      <Helmet title="RH" />
      <h1 className="text-4xl font-bold textslate mb-4">Painel de RH</h1>
      <HumanResourcesFilters />
      <div className=" h-full w-full shadow-lg border rounded-md">
        <HumanResourcesTable />
        {employees?.length === 0 && loading === false &&
          <div className="w-full h-full m-auto text-center text-lg font-semibold text-muted-foreground flex items-center justify-center">Nenhum usuário encontrado!</div>
        }
      </div>
      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
