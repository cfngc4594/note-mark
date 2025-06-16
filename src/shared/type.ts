import { z } from 'zod'

export const ChatMessage = z.object({
  id: z.string(),
  role: z.enum(['system', 'assistant', 'user']),
  content: z.string()
})

export type ChatMessage = z.infer<typeof ChatMessage>

export type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error'
