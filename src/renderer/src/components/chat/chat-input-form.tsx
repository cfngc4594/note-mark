import { ChatStatus } from '@shared/type'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpIcon, RotateCcwIcon, StopCircleIcon } from 'lucide-react'

interface ChatInputFormProps {
  value: string
  status: ChatStatus
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ChatInputForm = ({ value, status, onChange, onSubmit }: ChatInputFormProps) => {
  return (
    <footer className="container mx-auto px-4 pb-4">
      <form onSubmit={onSubmit} className="flex flex-col p-2.5 bg-input/30 border rounded-2xl">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className="min-h-[56px] max-h-[336px] p-0 bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 dark:bg-transparent rounded-none"
        />
        <div className="flex items-center justify-end h-8 mt-1">
          <Button
            variant="outline"
            type={status === 'ready' ? 'submit' : 'button'}
            disabled={status === 'ready' && !value.trim()}
            className="size-8 rounded-full cursor-pointer"
          >
            {status === 'ready' && <ArrowUpIcon size={16} aria-hidden="true" />}
            {status === 'error' && <RotateCcwIcon size={16} aria-hidden="true" />}
            {(status === 'streaming' || status === 'submitted') && (
              <StopCircleIcon size={16} aria-hidden="true" />
            )}
          </Button>
        </div>
      </form>
    </footer>
  )
}
