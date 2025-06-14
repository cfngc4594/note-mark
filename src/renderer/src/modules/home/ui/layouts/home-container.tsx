interface HomeContainerProps {
  children: React.ReactNode
}

export const HomeContainer = ({ children }: HomeContainerProps) => {
  return (
    <div className="container flex flex-col flex-1 px-4 mx-auto h-full">
      <div className="flex flex-col flex-1 min-w-[343px] w-full mx-auto max-w-[800px]">
        {children}
      </div>
    </div>
  )
}
