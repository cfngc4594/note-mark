import { Toggle } from '@/components/ui/toggle'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Toggle
      variant="outline"
      className="group data-[state=on]:hover:bg-muted size-7 min-w-7 px-1.5 border-none shadow-none data-[state=on]:bg-transparent"
      pressed={theme === 'dark'}
      onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <MoonIcon
        size={16}
        className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
        aria-hidden="true"
      />
      <SunIcon
        size={16}
        className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  )
}
