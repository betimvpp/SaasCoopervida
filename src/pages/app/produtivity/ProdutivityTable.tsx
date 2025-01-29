import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useEffect } from "react";
import { TableSkeleton } from "@/components/table-skeleton";
import { ProdutivityRow } from "./ProditivityRow";
import jsPDF from "jspdf";
import { useProdutivity } from "@/contexts/produtivityContext.tsx";
interface PaymentTableProps {
    selectedMonth: string;
}

export const ProdutivityTable = ({ selectedMonth }: PaymentTableProps) => {
    const { produtivityData, loading, paymentDataNotPaginated } = useProdutivity();


    useEffect(() => { }, []);

    const currentMonth = selectedMonth || new Date().toISOString().slice(0, 7);
    const [year, month] = currentMonth.split('-').map(Number);
    const monthDate = new Date(year, month - 1);
    const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(monthDate);

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text(`Relatório de Produtivity\nMês: ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} \nTotal de Pacientes: ${paymentDataNotPaginated.length}`, 14, 10);

        const tableData = paymentDataNotPaginated.map((produtivity: any) => ([
            produtivity.nome_paciente,
            produtivity.city,
            produtivity.plano_saude,
            produtivity.M,
            produtivity.T,
            produtivity.SD,
            produtivity.SN,
            produtivity.P,
            produtivity.G,

        ]));

        doc.autoTable({
            head: [[
                'Nome do Paciente',
                'City',
                'Contratante',
                'M',
                'T',
                'SD',
                'SN',
                'P',
                'G',

            ]],
            body: tableData,
            startY: 20,
        });

        doc.save('relatorio_pagamentos.pdf');
    };

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead className="w-4"></TableHead>
                    <TableHead className="text-center">Nome do Paciente</TableHead>
                    <TableHead className="text-center">City</TableHead>
                    <TableHead className="text-center">Contratante</TableHead>
                    <TableHead className="text-center">M</TableHead>
                    <TableHead className="text-center">T</TableHead>
                    <TableHead className="text-center">SD</TableHead>
                    <TableHead className="text-center">SN</TableHead>
                    <TableHead className="text-center">P</TableHead>
                    <TableHead className="text-center">G</TableHead>
                    <TableHead className="text-center">
                        <button
                            onClick={generatePDF}
                            className="px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Gerar Produtivity
                        </button>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {produtivityData && produtivityData.map((produtivity: any) => (
                    <ProdutivityRow key={produtivity.paciente_id} produtivity={produtivity} month={currentMonth} />
                ))}
            </TableBody>
            {loading === true && produtivityData.length <= 0 && <TableSkeleton />}
        </Table>
    );

}