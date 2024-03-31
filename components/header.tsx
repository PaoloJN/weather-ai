import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

import {
  IconGitHub,
  IconSeparator,
  IconSparkles,
  IconVercel
} from '@/components/ui/icons'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">
        {/* <a href="https://vercel.com" rel="noopener" target="_blank">
          <IconVercel className="w-5 h-5 sm:h-6 sm:w-6" />
        </a>
        <IconSeparator className="w-6 h-6 text-muted-foreground/20" /> */}

        <Link href="/">
          <span className="text-lg font-bold flex items-center">
            {/* <span className="text-lg font-semibold">Weather</span> */}
            Weather
            <IconSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
            AI
            <span className="text-xs ml-2 font-normal text-muted-foreground">
              By Paolo Nessim
            </span>
          </span>
        </Link>
        {/* <IconSeparator className="w-6 h-6 text-muted-foreground/20" /> */}

        {/* <span className="text-lg font-semibold">Weather</span> */}
      </span>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="ghost" size={'icon'} asChild>
          <a
            target="_blank"
            href="https://github.com/vercel/ai/tree/main/examples/next-ai-rsc"
            rel="noopener noreferrer"
          >
            <IconGitHub />
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
