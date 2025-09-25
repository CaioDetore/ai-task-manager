import prisma from "prisma/prisma";
import type { Route } from "./+types/api.chat";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userMessage = formData.get('message')
  const chatId = formData.get('chatId') as string

  // Validação dos dados
  if (!userMessage || typeof userMessage !== 'string') {
    return new Response('Mensagem é obrigatória', { status: 400 })
  }

  const chatMessage = {
    id: Date.now().toFixed(),
    content: userMessage,
    role: "user",
    timestamp: new Date().toISOString()
  }

  let chat

  if (chatId) {
    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId
      }
    })

    if (existingChat) {
      try {
        const existingMessages = JSON.parse(existingChat.content)
        chat = await prisma.chat.update({
          where: {
            id: chatId
          },
          data: {
            content: JSON.stringify([...existingMessages, chatMessage])
          }
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
    try {
      chat = await prisma.chat.create({
        data: {
          content: JSON.stringify([chatMessage])
        }
      })

      return redirect(`/task/new?chat=${chat.id}`)
    } catch (error) {
      console.error('Erro ao criar novo chat:', error)
      return new Response('Erro ao criar novo chat', { status: 500 })
    }
  }
}