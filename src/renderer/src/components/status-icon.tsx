import {
  ArrowUpIcon,
  LoaderCircleIcon,
  RotateCcwIcon,
  StopCircleIcon,
  TriangleAlertIcon
} from 'lucide-react'
import { ChatStatus } from '@shared/type'

interface StatusIconProps {
  status: ChatStatus
  type: 'button' | 'indicator'
}

export const StatusIcon = ({ status, type }: StatusIconProps) => {
  if (type === 'button') {
    return (
      <>
        {(status === 'submitted' || status === 'streaming') && (
          <StopCircleIcon size={16} aria-hidden="true" />
        )}
        {status === 'ready' && <ArrowUpIcon size={16} aria-hidden="true" />}
        {status === 'error' && <RotateCcwIcon size={16} aria-hidden="true" />}
      </>
    )
  } else if (type === 'indicator') {
    return (
      <>
        {status === 'submitted' && (
          <LoaderCircleIcon className="animate-spin" size={16} aria-hidden="true" />
        )}
        {status === 'error' && (
          <TriangleAlertIcon className="animate-pulse" size={16} aria-hidden="true" />
        )}
      </>
    )
  } else {
    return null
  }
}
