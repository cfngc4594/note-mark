import { trpc } from '@/lib/trpc'
import { useQuery } from '@tanstack/react-query'
import { MdxRenderer } from '@/components/mdx/renderer'
import { ScrollArea } from '@/components/ui/scroll-area'

export const ChatMessageList = () => {
  const { data, isLoading, error } = useQuery(trpc.getMdxSource.queryOptions({ id: 1 }))

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <ScrollArea className="h-full">
        <div className="container p-4 mx-auto">
          <MdxRenderer source={data?.source ?? ''} />
        </div>
      </ScrollArea>
    </div>
  )
}
