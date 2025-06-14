import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const ChatInputForm = () => {
  return (
    <footer className="container mx-auto px-4 pb-4">
      <form className="flex flex-col p-2.5 bg-input/30 border rounded-2xl">
        <Textarea className="min-h-[56px] max-h-[336px] p-0 bg-transparent border-0 shadow-none resize-none focus-visible:ring-0 dark:bg-transparent rounded-none" />
        <div className="flex items-center justify-end h-8 mt-1">
          <Button variant="outline" className="size-8 rounded-full cursor-pointer">
            <ArrowUpIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </form>
    </footer>
  )
}
