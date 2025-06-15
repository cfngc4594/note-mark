import { z } from 'zod'
import superjson from 'superjson'
import { mdxSource } from '@shared/mock'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.create({
  isServer: true,
  transformer: superjson
})

export const router = t.router({
  getMdxSource: t.procedure.input(z.object({ id: z.number() })).query((req) => {
    const { id } = req.input
    const source = mdxSource

    if (!source) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `MDX source with id '${id}' not found.`
      })
    }

    return {
      source: source
    }
  })
})

export type AppRouter = typeof router
