import prisma from "prisma/prisma";
import type { Route } from "./+types/api.chat";
import { redirect } from "react-router";
import { createChatMessages, getChatCompletions } from "~/services/chat.server";
import { ChatMessageRole } from "~/generated/prisma/enums";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userInput = formData.get('message')
  const chatId = formData.get('chatId') as string

  // Validação dos dados
  if (!userInput || typeof userInput !== 'string') {
    return new Response('Mensagem é obrigatória', { status: 400 })
  }

  const userMessage = {
    content: userInput as string,
    role:ChatMessageRole.user,
  }

  let chat

  if (chatId) {
    chat = await prisma.chat.findUnique({
      where: {
        id: chatId
      },
      include: {
        messages: true
      }
    })

    if (chat) {
      const assistantMessage = {
        content: await getChatCompletions([...chat.messages, userMessage]) ?? "",
        role: ChatMessageRole.assistant,
      }

      try {
        await createChatMessages(chatId, userMessage, assistantMessage)

      } catch (error) {
        console.error('Erro ao processar mensagens existentes:', error)
        return new Response('Erro ao processar chat existente', { status: 500 })
      }
    } else {
      return new Response('Chat não encontrado', { status: 404 })
    }
  }
  else {
    const assistantMessage = {
      id: Date.now().toFixed(),
      content: await getChatCompletions([userMessage]) ?? "",
      role: ChatMessageRole.assistant,
      timestamp: new Date()
    }

    try {
      chat = await prisma.chat.create({
        data: {}
      })

      await createChatMessages(chatId, userMessage, assistantMessage)

      return redirect(`/task/new?chat=${chat.id}`)
    } catch (error) {
      console.error('Erro ao criar novo chat:', error)
      return new Response('Erro ao criar novo chat', { status: 500 })
    }
  }
}