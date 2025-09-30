import { TaskChatbot } from "~/features/tasks/tasks-chatbot";
import type { Route } from "./+types/task-new";
import prisma from "prisma/prisma";
import { redirect } from "react-router";
import { ChatMessageRole, type ChatMessage } from "~/generated/prisma/client";

type Task = {
  title: string;
  description: string;
  steps: string[];
  acceptance_criteria: string[];
  suggested_tests: string[];
  estimated_time: string;
  implementation_suggestion: string;
};

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url)
  const chatId = url.searchParams.get('chat')

  let messages = [] as ChatMessage[]
  let taskJSON

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId
      },
      include: {
        messages: true
      }
    })
    
    if (!chat) {
      return redirect('/task/new')
    }

    messages = chat.messages.map((message) => ({
      ...message,
      content:
        message.role === ChatMessageRole.assistant
          ? message.content === "{}"
            ? "🤷‍♂️ Sua pergunta gerou uma resposta inválida"
            : "✅ Solicitação atendida. Verifique o painel ao lado 👉"
          : message.content,
    }));
    ``;

    taskJSON = chat.messages[messages.length - 1].content

  }


  return {
    chatId,
    messages,
    task: JSON.parse(taskJSON ?? "{}") as Task
  }
}

export default function() {
  return <TaskChatbot />
}