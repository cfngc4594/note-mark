import { dialog } from 'electron'
import { OpenFileResponse } from '@shared/types'

export const handleFileOpen = async (): Promise<OpenFileResponse> => {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  return !canceled ? filePaths[0] : null
}
