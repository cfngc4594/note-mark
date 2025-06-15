// src/renderer/src/modules/home/ui/views/home-view.tsx

import { useState, FormEvent, useRef, useEffect } from 'react'
import { trpc } from '@/lib/trpc'
import type { Message } from 'ai/react'

// 一个简单的消息气泡组件
function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
      </div>
    </div>
  )
}

export function HomeView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 滚动到底部的效果
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 使用 tRPC 的 useSubscription hook
  // 注意：这个 hook 的参数是响应式的。我们只在 isLoading 为 true 时才建立订阅
  // 这是一个简化的处理方式，更健壮的方式是使用命令式的 client.subscription
  const handleNewAIData = (data: string | null) => {
    if (data === null) return
    setMessages((currentMessages) => {
      // 找到最后一条消息（应该是 AI 的消息）并追加内容
      const lastMessage = currentMessages[currentMessages.length - 1]
      if (lastMessage && lastMessage.role === 'assistant') {
        return [
          ...currentMessages.slice(0, -1),
          { ...lastMessage, content: lastMessage.content + data }
        ]
      }
      // 如果没有 AI 消息，则创建一个新的
      return [...currentMessages, { id: Date.now().toString(), role: 'assistant', content: data }]
    })
  }

  // 获取 tRPC client 实例以进行命令式调用
  const trpcClient = trpc.useUtils().client

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }

    const newMessages = [...messages, newUserMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    // 创建一个空的 AI 消息占位符
    setMessages((prev) => [...prev, { id: 'ai-response', role: 'assistant', content: '' }])

    // **命令式地调用订阅**
    const subscription = trpcClient.chat.subscribe(
      { messages: newMessages },
      {
        onData(data) {
          // 每当有新数据块从主进程传来时调用
          console.log('Received data chunk:', data)
          handleNewAIData(data)
        },
        onError(err) {
          // 发生错误时调用
          console.error('Subscription error:', err)
          setIsLoading(false)
          // 可以设置一条错误消息
          setMessages((prev) =>
            prev.slice(0, -1).concat({
              id: 'error',
              role: 'assistant',
              content: `An error occurred: ${err.message}`
            })
          )
        },
        onComplete() {
          // 流结束时调用
          console.log('Subscription completed.')
          setIsLoading(false)
        }
      }
    )

    // 如果需要，可以保存 `subscription` 对象以便后续调用 `subscription.unsubscribe()`
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      <header className="p-4 border-b dark:border-gray-700 shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Electron AI Chat
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Powered by electron-trpc & Vercel AI SDK
        </p>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
          {isLoading && (
            <ChatBubble message={{ id: 'loading', role: 'assistant', content: '...' }} />
          )}
        </div>
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 border-t dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  )
}
