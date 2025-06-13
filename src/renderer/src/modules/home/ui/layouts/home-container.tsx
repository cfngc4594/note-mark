import { cn } from '@/lib/utils'

interface HomeContainerProps {
  isCenter?: boolean
  children: React.ReactNode
}

export const HomeContainer = ({ isCenter = true, children }: HomeContainerProps) => {
  return (
    <div className="container flex flex-col flex-1 px-4 mx-auto h-full">
      <div
        className={cn(
          'flex flex-col flex-1 min-w-[343px] w-full mx-auto',
          isCenter ? 'items-center justify-center' : '', // position
          isCenter ? 'max-w-[672px]' : 'max-w-[800px]' //width
        )}
      >
        {children}
      </div>
    </div>
  )
}
