interface HomeFooterProps {
  children: React.ReactNode
}

export const HomeFooter = ({ children }: HomeFooterProps) => {
  return <div className="w-full bg-background sticky bottom-0 pb-6.5 rounded-t-2xl">{children}</div>
}
