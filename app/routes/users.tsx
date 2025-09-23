import { turso } from "~/tursor"
import type { Route } from "./+types/users"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table"

export async function loader() {
  const response = await turso.execute("SELECT * FROM USUARIOS")

  return {
    users: response.rows
  }
}

export default function ({loaderData}: Route.ComponentProps) {
  return (
    <div className="p-6">
      <Table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 border-b">ID</TableHead>
            <TableHead className="px-4 py-2 border-b">Nome</TableHead>
            <TableHead className="px-4 py-2 border-b">Email</TableHead>
            <TableHead className="px-4 py-2 border-b">Criado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loaderData?.users.map((user: any) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-2 border-b">{user.id}</TableCell>
              <TableCell className="px-4 py-2 border-b">{user.nome}</TableCell>
              <TableCell className="px-4 py-2 border-b">{user.email}</TableCell>
              <TableCell className="px-4 py-2 border-b">
                {user.criado_em
                  ? new Date(user.criado_em).toLocaleString("pt-BR")
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}