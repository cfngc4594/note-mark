import { useEffect, useRef } from 'react'
import { StatusIcon } from '@/components/status-icon'
import { ChatMessage, ChatStatus } from '@shared/type'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatBubble } from '@/components/chat/chat-bubble'

interface ChatMessageListProps {
  messages: ChatMessage[]
  status: ChatStatus
}

export const ChatMessageList = ({ messages, status }: ChatMessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollAreaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
      <ScrollArea className="h-full">
        <div className="container p-4 mx-auto">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          <StatusIcon status={status} type="indicator" />
          <div ref={scrollAreaRef} />
        </div>
      </ScrollArea>
    </div>
  )
}
