import type { Route } from "./+types/users"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table"
import prisma from "prisma/prisma"

export async function loader() {
  return {
    users: await prisma.user.findMany()
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
            <TableHead className="px-4 py-2 border-b">Idade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loaderData?.users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-2 border-b">{user.id}</TableCell>
              <TableCell className="px-4 py-2 border-b">{user.name}</TableCell>
              <TableCell className="px-4 py-2 border-b">{user.email}</TableCell>
              <TableCell className="px-4 py-2 border-b">{user.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}