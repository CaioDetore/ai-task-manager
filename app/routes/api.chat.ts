import prisma from "prisma/prisma";
import type { Route } from "./+types/api.chat";
import { redirect } from "react-router";
import { getChatCompletions } from "~/services/openai.server";
import { ChatMessageRole } from "~/generated/prisma/enums";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userMessage = formData.get('message')
  const chatId = formData.get('chatId') as string

  // Validação dos dados
  if (!userMessage || typeof userMessage !== 'string') {
    return new Response('Mensagem é obrigatória', { status: 400 })
  }

  const chatMessage = {
    content: userMessage as string,
    role:ChatMessageRole.user,
  }

  let chat

  if (chatId) {
    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId
      },
      include: {
        messages: true
      }
    })

    if (existingChat) {
      const answer = {
        content: await getChatCompletions([...existingChat.messages, chatMessage]) ?? "",
        role: ChatMessageRole.assistant,
      }

      try {
        await prisma.chatMessage.createMany({
          data: [
            {chat_id: existingChat.id, ...chatMessage},
            {chat_id: existingChat.id, ...answer},
          ]
        })
      } catch (error) {
        console.error('Erro ao processar mensagens existentes:', error)
        return new Response('Erro ao processar chat existente', { status: 500 })
      }
    } else {
      return new Response('Chat não encontrado', { status: 404 })
    }
  }
  else {
    const answer = {
      id: Date.now().toFixed(),
      content: await getChatCompletions([chatMessage]) ?? "",
      role: ChatMessageRole.assistant,
      timestamp: new Date()
    }

    try {
      chat = await prisma.chat.create({
        data: {}
      })

      await prisma.chatMessage.createMany({
        data: [
          {chat_id: chat.id, ...chatMessage},
          {chat_id: chat.id, ...answer}
        ]
      })

      return redirect(`/task/new?chat=${chat.id}`)
    } catch (error) {
      console.error('Erro ao criar novo chat:', error)
      return new Response('Erro ao criar novo chat', { status: 500 })
    }
  }
}