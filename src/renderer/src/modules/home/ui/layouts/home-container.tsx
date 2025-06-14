import { ScrollArea } from '@/components/ui/scroll-area'

interface HomeContainerProps {
  children: React.ReactNode
}

export const HomeContainer = ({ children }: HomeContainerProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="relative flex-1">
        <div className="absolute h-full w-full">
          <ScrollArea className="h-full">
            <div className="container px-4 mx-auto">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
