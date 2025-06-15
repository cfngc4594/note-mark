import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-12 flex items-center px-2 pr-5 z-50 border-b drag bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center flex-shrink-0 no-drag">
          <SidebarTrigger />
        </div>
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto" />
        <div className="flex-shrink-0 items-center flex gap-4 no-drag">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
