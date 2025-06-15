interface HomeContainerProps {
  children: React.ReactNode
}

export const HomeContainer = ({ children }: HomeContainerProps) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <div className="h-full flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  )
}
