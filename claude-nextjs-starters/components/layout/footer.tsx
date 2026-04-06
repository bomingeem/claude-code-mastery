import * as React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        {/* 로고 */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Zap className="size-4 text-primary" />
          <span>Next.js 스타터킷</span>
        </div>

        {/* 저작권 */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next.js 스타터킷. All rights reserved.
        </p>

        {/* 외부 링크 */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Next.js
          </Link>
        </div>
      </div>
    </footer>
  )
}
