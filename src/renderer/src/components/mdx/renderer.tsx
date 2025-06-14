'use client'

import { cn } from '@/lib/utils'
import 'katex/dist/katex.min.css'
import '@/assets/mdx-renderer.css'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import '@/assets/github-markdown.css'
import rehypeKatex from 'rehype-katex'
import { useEffect, useState } from 'react'
import rehypePretty from 'rehype-pretty-code'
import { CircleAlertIcon } from 'lucide-react'
import { serialize } from 'next-mdx-remote/serialize'
import { useTheme } from '@/components/theme-provider'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { mdxComponents, type MDXComponents } from '@/components/mdx/components/mdx-components'

interface MdxRendererProps {
  source: string
  components?: MDXComponents
  className?: string
}

export const MdxRenderer = ({
  source,
  components = mdxComponents,
  className
}: MdxRendererProps) => {
  const { theme } = useTheme()
  const rehypeTheme = theme === 'light' ? 'vitesse-light' : 'vitesse-dark'
  const [serializedSource, setSerializedSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const serializeSource = async () => {
      try {
        const serializedSource = await serialize(source, {
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [
              rehypeKatex,
              [rehypePretty, { theme: rehypeTheme, keepBackground: false }]
            ]
          }
        })
        setSerializedSource(serializedSource)
      } catch (error) {
        console.error('Error serializing MDX source:', error)
        setError('Failed to render content. Please try again later.')
      }
    }
    setError(null)
    serializeSource()
  }, [rehypeTheme, source])

  if (error) {
    return (
      <div className="rounded-md border border-red-500/50 px-5 py-2 text-red-600 w-fit">
        <p className="text-sm">
          <CircleAlertIcon
            className="me-3 -mt-0.5 inline-flex opacity-60"
            size={16}
            aria-hidden="true"
          />
          {error}
        </p>
      </div>
    )
  }

  if (!serializedSource) return null

  return (
    <article className={cn('markdown-body', className)}>
      <MDXRemote {...serializedSource} components={components} />
    </article>
  )
}
