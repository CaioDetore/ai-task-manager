import { MessageCircle, Pencil } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "~/components/ui/table";
import { loader } from "~/routes/tasks";

export function TaskList() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <Table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 border-b">ID</TableHead>
            <TableHead className="px-4 py-2 border-b">Título</TableHead>
            <TableHead className="px-4 py-2 border-b">Tempo Estimado</TableHead>
            <TableHead className="px-4 py-2 border-b">Criado em</TableHead>
            <TableHead className="px-4 py-2 border-b">Atualizado em</TableHead>
            <TableHead className="px-4 py-2 border-b">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.tasks?.map((task) => (
            <TableRow key={task.id} className="hover:bg-gray-50">
              <TableCell className="max-w-[400px] truncate px-4 py-2 border-b">{task.id}</TableCell>
              <Link to={`/task/view/${task.id}`} className="underline underline-offset-4">
                <TableCell className="max-w-[400px] truncate px-4 py-2 border-b">{task.title}</TableCell>
              </Link>
              <TableCell className="px-4 py-2 border-b">{task.estimated_time}</TableCell>
              <TableCell className="px-4 py-2 border-b">{new Date(task.created_at).toLocaleString("pt-BR")}</TableCell>
              <TableCell className="px-4 py-2 border-b">{new Date(task.updated_at).toLocaleString("pt-BR")}</TableCell>
              <TableCell className="px-4 py-2 border-b flex gap-2">
                {!!task.chat_message && (
                  <Link
                    to={`/task/new?chat=${task.chat_message?.id}`}
                    title="Chat"
                  >
                    <MessageCircle className="size-4" />
                  </Link>
                )}
                {/* Botão Editar */}
                <Link
                  to={`/task/edit/${task.id}`}
                  title="Editar"
                >
                  <Pencil className="size-4" />
                </Link>
                {/* Botão Remover (placeholder) */}
                <button
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
                  title="Remover"
                  onClick={() => alert('Remover task ainda não implementado')}
                >
                  Remover
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}