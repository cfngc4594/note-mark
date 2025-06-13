export type OpenFileResponse = string | null

export type OpenFile = () => Promise<OpenFileResponse>
