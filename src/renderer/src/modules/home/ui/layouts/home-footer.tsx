import { cn } from '@/lib/utils'

interface HomeFooterProps {
  isCenter?: boolean
  children: React.ReactNode
}

export const HomeFooter = ({ isCenter = true, children }: HomeFooterProps) => {
  return (
    <div
      className={cn('w-full bg-background', isCenter ? '' : 'sticky bottom-0 pb-6.5 rounded-t-2xl')}
    >
      {children}
    </div>
  )
}
