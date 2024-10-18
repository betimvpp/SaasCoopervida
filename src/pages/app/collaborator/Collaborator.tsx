import { Helmet } from "react-helmet-async"
import { CollaboratorTable } from "./CollaboratorTable"
import { CollaboratorFilters } from "./CollaboratorFilters"
import { useCollaborator } from "@/contexts/collaboratorContext";

export const Collaborator = () => {
  const { collaborators, loading } = useCollaborator();
  return (
    <div className="flex flex-col w-full gap-2">
      <Helmet title="Colaboradores" />
      <h1 className="text-4xl font-bold textslate mb-4">Painel de Colaboradores</h1>
      <CollaboratorFilters />
      <div className=" h-full w-full shadow-lg border rounded-md">
        <CollaboratorTable />
        {collaborators?.length === 0 && loading === false &&
          <div className="w-full h-full m-auto text-center text-lg font-semibold text-muted-foreground flex items-center justify-center">Nenhum usuário encontrado!</div>
        }
      </div>
    </div>
  )
}
