import superjson from 'superjson'
import type { AppRouter } from '@shared/api'
import { createTRPCClient } from '@trpc/client'
import { QueryClient } from '@tanstack/react-query'
import { ipcLink } from 'electron-trpc-experimental/renderer'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'

export const queryClient = new QueryClient()

const trpcClient = createTRPCClient<AppRouter>({
  links: [ipcLink({ transformer: superjson })]
})

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient
})
