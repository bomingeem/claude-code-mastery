import * as React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Zap className="size-5 text-primary" />
          <span>Next.js 스타터킷</span>
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="text-foreground/70 transition-colors hover:text-foreground">
            홈
          </Link>
          <Link href="/docs" className="text-foreground/70 transition-colors hover:text-foreground">
            문서
          </Link>
          <Link href="/about" className="text-foreground/70 transition-colors hover:text-foreground">
            소개
          </Link>
        </nav>

        {/* 우측 영역 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm">시작하기</Button>
        </div>
      </div>
    </header>
  )
}
