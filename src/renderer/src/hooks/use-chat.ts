import { trpcClient } from '@/lib/trpc'
import { useEffect, useRef, useState } from 'react'
import { ChatMessage, ChatStatus } from '@shared/type'
import { Unsubscribable } from '@trpc/server/observable'

export const useChat = () => {
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<ChatStatus>('ready')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<Error | null>(null)
  const subscriptionRef = useRef<Unsubscribable | null>(null)

  useEffect(() => {
    return () => {
      subscriptionRef.current?.unsubscribe()
    }
  }, [])

  const stop = () => {
    subscriptionRef.current?.unsubscribe()
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value)
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

      subscriptionRef.current = trpcClient.chat.subscribe(
        { messages: newMessages },
        {
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
            subscriptionRef.current = null
          },
          onComplete: () => {
            setStatus('ready')
            subscriptionRef.current = null
          }
        }
      )
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
    handleSubmit,
    stop
  }
}
