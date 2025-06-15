import '@/assets/main.css'

import App from '@/App'
import { StrictMode } from 'react'
import { queryClient } from '@/lib/trpc'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
