import { trpcClient } from '@/lib/trpc'
import { useEffect, useRef, useState } from 'react'
import { ChatMessage, ChatStatus } from '@shared/type'
import { Unsubscribable } from '@trpc/server/observable'

export const useChat = () => {
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<ChatStatus>('ready')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const subscriptionRef = useRef<Unsubscribable | null>(null)

  const clearSubscription = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe()
      subscriptionRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      clearSubscription()
    }
  }, [])

  const streamChat = (messages: ChatMessage[]) => {
    try {
      setStatus('submitted')

      subscriptionRef.current = trpcClient.chat.subscribe(
        { messages },
        {
          onData: (value) => {
            if (status !== 'streaming') setStatus('streaming')
            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1]
              if (lastMessage.role === 'user') {
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
            console.error(error)
            setStatus('error')
            clearSubscription()
          },
          onComplete: () => {
            setStatus('ready')
            clearSubscription()
          }
        }
      )
    } catch (error) {
      console.error(error)
      setStatus('error')
      clearSubscription()
    }
  }

  const reload = () => {
    if (!(status === 'error')) return
    streamChat(messages)
  }

  const stop = () => {
    clearSubscription()
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== 'ready') return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    const newMessages = [...messages, userMessage]

    setInput('')
    setMessages(newMessages)

    streamChat(newMessages)
  }

  return {
    input,
    handleInputChange,
    status,
    messages,
    setMessages,
    handleSubmit,
    stop,
    reload
  }
}
