import type { HTMLAttributes } from 'react'
import type { MDXProvider } from '@mdx-js/react'
import { Pre } from '@/components/mdx/components/pre'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export type MDXComponents = React.ComponentProps<typeof MDXProvider>['components']

export const mdxComponents: MDXComponents = {
  pre: (props: HTMLAttributes<HTMLPreElement>) => <Pre {...props} />,
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ listStyle: 'revert' }} {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ listStyle: 'revert' }} {...props} />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <ScrollArea>
      <table {...props} />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
