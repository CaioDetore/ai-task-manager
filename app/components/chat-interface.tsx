import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import { useFetcher, useLoaderData } from "react-router"
import { loader } from "~/routes/task-new"

export default function ChatInterface() {
  const fetcher = useFetcher()

  const isLoading = fetcher.state !== 'idle'

  const { chatId, messages } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-background border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-card-foreground">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">How can I help you today?</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground mb-2">Welcome to AI Chat</h2>
              <p className="text-muted-foreground text-balance">
                Start a conversation by typing a message below. I'm here to help with questions, creative tasks,
                problem-solving, and more.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[70%] ${msg.role === "user"
                    ? "flex-row-reverse"
                    : "flex-row"
                  }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary" : "bg-muted"}`}>
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 text-sm ${msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  {msg.content}
                  <div className="text-[10px] text-muted-foreground mt-1 text-right">
                    {new Date(msg.created_at)?.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <fetcher.Form action="/api/chat" method="POST" className="flex gap-2">
          <input type="hidden" name="chatId" value={chatId ?? ""} />
          <Input
            name="message"
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-input"
          />
          <Button type="submit" disabled={isLoading} className="px-4">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </fetcher.Form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  )
}
