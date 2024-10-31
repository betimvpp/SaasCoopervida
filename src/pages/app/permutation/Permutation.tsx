import { Helmet } from "react-helmet-async"

import { Pagination } from "@/components/pagination";
import { useState } from "react";
import { useScale } from "@/contexts/scaleContext";

export const Permutation = () => {
    const { scales } = useScale();
    const [pageIndex, setPageIndex] = useState(0);
    const totalCount = scales?.length || 0;

    const handlePageChange = (newPageIndex: number) => {
        setPageIndex(newPageIndex);
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <Helmet title="Pacientes" />
            <h1 className="text-4xl font-bold textslate mb-4">Painel de Pacientes</h1>

            <div className=" h-full w-full shadow-lg border rounded-md">

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
