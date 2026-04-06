'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // hydration 불일치 방지를 위해 마운트 후 렌더링
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button size="icon-sm" variant="ghost" disabled aria-label="테마 전환" />
  }

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="테마 전환"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
