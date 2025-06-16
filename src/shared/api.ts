import { z } from 'zod'
import dotenv from 'dotenv'
import { streamText } from 'ai'
import superjson from 'superjson'
import { ChatMessage } from '@shared/type'
import { deepseek } from '@ai-sdk/deepseek'
import { initTRPC, TRPCError } from '@trpc/server'

dotenv.config()

const t = initTRPC.create({
  isServer: true,
  transformer: superjson
})

export const router = t.router({
  chat: t.procedure
    .input(
      z.object({
        messages: z.array(ChatMessage)
      })
    )
    .subscription(async function* ({ input }) {
      const { messages } = input

      try {
        const result = await streamText({
          model: deepseek('deepseek-chat'),
          system: 'You are a helpful assistant.',
          messages: messages
        })

        for await (const delta of result.textStream) {
          yield delta
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while communicating with the AI service.',
          cause: error
        })
      }
    })
})

export type AppRouter = typeof router
