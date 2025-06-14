import { ThemeProvider } from '@/components/theme-provider'
import { HomeView } from './modules/home/ui/views/home-view'
import { HomeLayout } from '@/modules/home/ui/layouts/home-layout'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HomeLayout>
        <HomeView />
      </HomeLayout>
    </ThemeProvider>
  )
}

export default App
