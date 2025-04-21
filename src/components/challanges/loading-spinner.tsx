import { Loader2 } from "lucide-react"

export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 size={size} className="animate-spin text-white" />
    </div>
  )
}

