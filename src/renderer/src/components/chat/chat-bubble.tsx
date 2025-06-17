import { cn } from '@/lib/utils'
import { ChatMessage } from '@shared/type'
import { MdxRenderer } from '@/components/mdx/renderer'

interface ChatBubbleMessageProps {
  message: ChatMessage
}

const ChatBubbleMessage = ({ message }: ChatBubbleMessageProps) => {
  return (
    <div className={cn('border rounded-lg px-4 py-2', message.role === 'user' ? 'bg-muted' : '')}>
      {message.role === 'user' ? (
        <span className="whitespace-pre-wrap">{message.content}</span>
      ) : (
        <MdxRenderer source={message.content} />
      )}
    </div>
  )
}

interface ChatBubbleProps {
  message: ChatMessage
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
      <ChatBubbleMessage message={message} />
    </div>
  )
}
