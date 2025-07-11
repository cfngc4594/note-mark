import { ChatStatus } from '@shared/type'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StatusIcon } from '@/components/status-icon'

interface ChatInputFormProps {
  input: string
  status: ChatStatus
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  stop: () => void
  reload: () => void
}

export const ChatInputForm = ({
  input,
  status,
  handleInputChange,
  handleSubmit,
  stop,
  reload
}: ChatInputFormProps) => {
  const handleClick = () => {
    if (status === 'error') {
      reload()
    } else if (status === 'streaming' || status === 'submitted') {
      stop()
    }
  }

  return (
    <footer className="container mx-auto px-4 pb-4">
      <form onSubmit={handleSubmit} className="flex flex-col p-2.5 bg-input/30 border rounded-2xl">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="min-h-[56px] max-h-[336px] p-0 bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 dark:bg-transparent rounded-none"
        />
        <div className="flex items-center justify-end h-8 mt-1">
          <Button
            variant="outline"
            type={status === 'ready' ? 'submit' : 'button'}
            disabled={status === 'ready' && !input.trim()}
            onClick={handleClick}
            className="size-8 rounded-full cursor-pointer"
          >
            <StatusIcon status={status} type="button" />
          </Button>
        </div>
      </form>
    </footer>
  )
}
