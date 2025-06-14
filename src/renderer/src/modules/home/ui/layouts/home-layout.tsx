import { SidebarProvider } from '@/components/ui/sidebar'
import { HomeNavbar } from '@/modules/home/ui/components/home-navbar'
import { HomeSidebar } from '@/modules/home/ui/components/home-sidebar'

interface HomeLayoutProps {
  children: React.ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full flex flex-col">
        <HomeNavbar />
        <div className="flex flex-1 pt-12">
          <HomeSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
