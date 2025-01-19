import { Button } from "@/components/ui/button"
import { useWalletModal } from "@/hooks/use-wallet-modal"

interface WalletModalButtonProps {
  children?: React.ReactNode
}

export function WalletModalButton({ children = 'Select Wallet' }: WalletModalButtonProps) {
  const { setVisible } = useWalletModal()

  return (
    <Button onClick={() => setVisible(true)}>
      {children}
    </Button>
  )
}

