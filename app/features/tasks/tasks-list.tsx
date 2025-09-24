import { useLoaderData } from "react-router";
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
            <TableHead className="px-4 py-2 border-b">Descrição</TableHead>
            <TableHead className="px-4 py-2 border-b">Tempo Estimado</TableHead>
            <TableHead className="px-4 py-2 border-b">Criado em</TableHead>
            <TableHead className="px-4 py-2 border-b">Atualizado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.tasks?.map((task) => (
            <TableRow key={task.id} className="hover:bg-gray-50">
              <TableCell className="max-w-[400px] truncate px-4 py-2 border-b">{task.id}</TableCell>
              <TableCell className="max-w-[400px] truncate px-4 py-2 border-b">{task.title}</TableCell>
              <TableCell className="max-w-[400px] truncate px-4 py-2 border-b">{task.description}</TableCell>
              <TableCell className="px-4 py-2 border-b">{task.estimated_time}</TableCell>
              <TableCell className="px-4 py-2 border-b">{new Date(task.created_at).toLocaleString("pt-BR")}</TableCell>
              <TableCell className="px-4 py-2 border-b">{new Date(task.updated_at).toLocaleString("pt-BR")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}