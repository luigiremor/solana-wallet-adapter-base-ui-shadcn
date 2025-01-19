import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface MoreWalletsButtonProps {
  expanded: boolean
  onClick: () => void
}

export function MoreWalletsButton({ expanded, onClick }: MoreWalletsButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full mt-2"
      onClick={onClick}
    >
      <span>{expanded ? 'Less' : 'More'} options</span>
      {expanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
    </Button>
  )
}

