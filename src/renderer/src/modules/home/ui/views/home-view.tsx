import { useState } from 'react'
import { ChatInputForm } from '@/components/chat/chat-input-form'
import { HomeFooter } from '@/modules/home/ui/layouts/home-footer'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import { HomeContainer } from '@/modules/home/ui/layouts/home-container'

export const HomeView = () => {
  const [isCenter, setIsCenter] = useState<boolean>(false)

  return (
    <HomeContainer>
      {!isCenter && <ChatMessageList />}

      <HomeFooter>
        <ChatInputForm />
        <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-6.5">
          <span className="text-xs">Powered by Vercel AI SDK</span>
        </footer>
      </HomeFooter>
    </HomeContainer>
  )
}
