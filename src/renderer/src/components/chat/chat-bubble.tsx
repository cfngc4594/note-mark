import { ChatMessage } from '@shared/type'
import { MdxRenderer } from '@/components/mdx/renderer'

interface ChatBubbleProps {
  message: ChatMessage
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {isUser ? (
        <p className="rounded-lg px-4 py-2 bg-blue-500 text-white whitespace-pre-wrap">
          {message.content}
        </p>
      ) : (
        <div className="rounded-lg border px-4 py-2">
          <MdxRenderer source={message.content} />
        </div>
      )}
    </div>
  )
}
