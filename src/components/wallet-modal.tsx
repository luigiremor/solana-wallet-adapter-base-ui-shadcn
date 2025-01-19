'use client'

import { useState, useMemo } from 'react'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWalletModal } from '@/hooks/use-wallet-modal'
import { WalletListItem } from '@/components/wallet-list-item'
import { MoreWalletsButton } from '@/components/more-wallets-button'
import { NoWalletsFound } from '@/components/no-wallets-found'
import { Wallet } from 'lucide-react'

export function WalletModal() {
  const { wallets, select } = useWallet()
  const { visible, setVisible } = useWalletModal()
  const [expanded, setExpanded] = useState(false)

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed = wallets.filter(wallet => wallet.readyState === WalletReadyState.Installed)
    const notInstalled = wallets.filter(wallet => wallet.readyState !== WalletReadyState.Installed)
    return installed.length ? [installed, notInstalled] : [notInstalled, []]
  }, [wallets])

  const handleWalletClick = (walletName: WalletName) => {
    select(walletName)
    setVisible(false)
  }

  const handleExpandClick = () => setExpanded(!expanded)

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="bg-primary/80 text-primary-foreground p-4 rounded-full w-fit mx-auto">
            <Wallet className="size-10" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Connect a wallet on Solana to continue</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[300px]">
          <div className="flex flex-col gap-2 p-1">
            {listedWallets.map((wallet) => (
              <WalletListItem
                key={wallet.adapter.name}
              wallet={wallet}
              handleClick={() => handleWalletClick(wallet.adapter.name)}
              />
            ))}
          </div>
          {collapsedWallets.length > 0 && (
            <>
              <MoreWalletsButton expanded={expanded} onClick={handleExpandClick} />
              {expanded && collapsedWallets.map((wallet) => (
                <WalletListItem
                  key={wallet.adapter.name}
                  wallet={wallet}
                  handleClick={() => handleWalletClick(wallet.adapter.name)}
                />
              ))}
            </>
          )}
          {wallets.length === 0 && <NoWalletsFound />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

