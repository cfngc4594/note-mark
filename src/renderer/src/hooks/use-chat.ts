import { useState } from 'react'
import { trpcClient } from '@/lib/trpc'
import { ChatMessage, ChatStatus } from '@shared/type'

export const useChat = () => {
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<ChatStatus>('ready')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<Error | null>(null)

  const handleInputChange = (value: string) => {
    setInput(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'streaming' || status === 'submitted') return

    try {
      setStatus('submitted')
      setError(null)

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: input
      }

      const newMessages = [...messages, userMessage]

      setMessages(newMessages)
      setInput('')

      const subscription = trpcClient.chat.subscribe(
        { messages: newMessages },
        {
          onStarted: () => {},
          onData: (value) => {
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1]
              if (lastMessage.role === 'user') {
                setStatus('streaming')
                return [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: value
                  }
                ]
              } else {
                return [
                  ...prev.slice(0, -1),
                  { ...lastMessage, content: lastMessage.content + value }
                ]
              }
            })
          },
          onError: (error) => {
            setError(error)
            setStatus('error')
          },
          onStopped: () => {},
          onComplete: () => {
            setStatus('ready')
          },
          onConnectionStateChange: () => {}
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An unknown error occurred'))
      setStatus('error')
      return
    }
  }

  return {
    input,
    handleInputChange,
    status,
    messages,
    setMessages,
    error,
    handleSubmit
  }
}
