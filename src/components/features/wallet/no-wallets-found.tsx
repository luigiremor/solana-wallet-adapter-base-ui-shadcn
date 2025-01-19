import { Wallet } from "lucide-react";

export function NoWalletsFound() {
  return (
    <div className="text-center p-6">
      <Wallet className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
      <h2 className="text-lg font-semibold">No wallets found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You&apos;ll need a wallet on Solana to continue. Please install a wallet and refresh the page.
      </p>
    </div>
  )
}

