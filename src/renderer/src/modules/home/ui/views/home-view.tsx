import { ChatInputForm } from '@/components/chat/chat-input-form'
import { ChatMessageList } from '@/components/chat/chat-message-list'
import { HomeContainer } from '@/modules/home/ui/layouts/home-container'

export const HomeView = () => {
  return (
    <HomeContainer>
      <ChatMessageList />
      <ChatInputForm />
    </HomeContainer>
  )
}
