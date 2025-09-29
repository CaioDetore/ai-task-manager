import { TaskChatbot } from "~/features/tasks/tasks-chatbot";
import type { Route } from "./+types/task-new";
import prisma from "prisma/prisma";
import { redirect } from "react-router";
import type { ChatMessage } from "~/features/tasks/types";

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url)
  const chatId = url.searchParams.get('chat')

  let messages = []

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId
      }
    })
    
    if (!chat) {
      return redirect('/task/new')
    }

    messages = JSON.parse(chat?.content ?? "") 
  }


  return {
    chatId,
    messages: messages as ChatMessage[]
  }
}

export default function() {
  return <TaskChatbot />
}