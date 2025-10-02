import prisma from "prisma/prisma";
import { TaskList } from "~/features/tasks/tasks-list";

export async function loader() {
  return {
    tasks: await prisma.task.findMany({
      include: {
        chat_message: true
      }
    })
  }
}

export default function Page() {
  return <TaskList />
}