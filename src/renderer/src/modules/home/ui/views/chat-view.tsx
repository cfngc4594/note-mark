import { useChat } from '@/hooks/use-chat'
import { ChatInputForm } from '@/components/chat/chat-input-form'
import { ChatMessageList } from '@/components/chat/chat-message-list'

export const ChatView = () => {
  const { input, handleInputChange, status, messages, handleSubmit, stop } = useChat()

  return (
    <div className="h-full flex flex-col">
      <ChatMessageList messages={messages} status={status} />
      <ChatInputForm
        input={input}
        status={status}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        stop={stop}
      />
    </div>
  )
}
