'use client'

import React, { useRef } from 'react'
import { CopyButton } from '@/components/copy-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
  className?: string
  'data-language'?: string
}

export const Pre = ({ children, className, ...props }: PreProps) => {
  const language = props['data-language']
  const preRef = useRef<HTMLPreElement>(null)

  return (
    <div className="rounded-lg overflow-hidden border">
      <header className="h-10 pl-3.5 pr-2 py-1.5 bg-muted flex items-center justify-between border-b">
        <span className="text-sm">{language ?? 'text'}</span>
        <CopyButton
          text={preRef.current?.textContent ?? ''}
          variant="ghost"
          className="h-7 w-7 cursor-pointer"
        />
      </header>
      <ScrollArea>
        <pre
          ref={preRef}
          className={className}
          style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}
          {...props}
        >
          {children}
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
