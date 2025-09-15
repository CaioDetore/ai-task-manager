import ChatInterface from "~/components/chat-interface";
import TaskContent from "./task-content";

export function TaskChatbot() {
  return (
    <div className="flex-1 p-6 grid grid-cols-2 gap-6">
      <ChatInterface />
      <TaskContent />
    </div>
  )
}