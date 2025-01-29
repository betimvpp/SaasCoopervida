import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { produtivityInfo } from "@/contexts/produtivityContext.tsx";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProdutivityDetails } from "./ProdutivityDetails";

export const ProdutivityRow = ({ produtivity, month }: { produtivity: produtivityInfo, month: string }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    return (
        <TableRow key={produtivity.paciente_id}>
            <TableCell className="text-center">
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen} key={produtivity.paciente_id}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do RH</span>
                        </Button>
                    </DialogTrigger>
                    <ProdutivityDetails produtivity={produtivity} loading={false} open={false} month={month} />
                </Dialog>
            </TableCell>
            <TableCell className="text-center">{produtivity.nome_paciente}</TableCell>
            <TableCell className='text-center'>{produtivity.cidade}</TableCell>
            <TableCell className="text-center">{produtivity.plano_saude}</TableCell>
            <TableCell className="text-center">{produtivity.M}</TableCell>
            <TableCell className="text-center">{produtivity.T}</TableCell>
            <TableCell className="text-center">{produtivity.SD}</TableCell>
            <TableCell className="text-center">{produtivity.SN}</TableCell>
            <TableCell className="text-center">{produtivity.P}</TableCell>
            <TableCell className="text-center">{produtivity.G}</TableCell>
        </TableRow>
    )
}