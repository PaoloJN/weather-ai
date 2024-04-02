'use client'

import { IconAI, IconUser } from '@/components/ui/icons'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { cn } from '@/lib/utils'
import { StreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from '../markdown'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '../ui/codeblock'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground">
        <IconAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  )
}

export function BotMessageText({
  content,
  className
}: {
  content: string
  className?: string
}) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground">
        <IconAI />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 mb-3 space-y-2"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            h2({ children }) {
              return <h2 className="text-lg font-semibold">{children}</h2>
            },
            h3({ children }) {
              return <h3 className="text-md font-semibold">{children}</h3>
            },
            ul({ children }) {
              return <ul className="list-disc pl-5">{children}</ul>
            },
            li({ children }) {
              return <li className="mb-2 last:mb-0">{children}</li>
            },
            ol({ children }) {
              return <ol className="list-decimal pl-5">{children}</ol>
            },
            blockquote({ children }) {
              return (
                <blockquote className="pl-4 border-l-4 border-primary-foreground">
                  {children}
                </blockquote>
              )
            },
            strong({ children }) {
              return <strong className="font-semibold">{children}</strong>
            },
            em({ children }) {
              return <em className="italic">{children}</em>
            },

            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            }
            // code({ node, inline, className, children, ...props }: any) {
            //   if (children.length) {
            //     if (children[0] == '▍') {
            //       return (
            //         <span className="mt-1 animate-pulse cursor-default">▍</span>
            //       )
            //     }

            //     children[0] = (children[0] as string).replace('`▍`', '▍')
            //   }

            //   const match = /language-(\w+)/.exec(className || '')

            //   if (inline) {
            //     return (
            //       <code className={className} {...props}>
            //         {children}
            //       </code>
            //     )
            //   }

            //   return (
            //     <CodeBlock
            //       key={Math.random()}
            //       language={(match && match[1]) || ''}
            //       value={String(children).replace(/\n$/, '')}
            //       {...props}
            //     />
            //   )
            // }
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
          !showAvatar && 'invisible'
        )}
      >
        <IconAI />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  )
}
