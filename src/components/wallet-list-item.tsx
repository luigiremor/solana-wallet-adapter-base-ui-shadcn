import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Wallet } from "@solana/wallet-adapter-react";

interface WalletListItemProps {
  wallet: Wallet;
  handleClick: () => void;
}

export function WalletListItem({ wallet, handleClick }: WalletListItemProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-4 px-4 py-2 first:mt-2 last:mb-2"
      onClick={handleClick}
    >
      <Image
        src={wallet.adapter.icon || "/placeholder.svg"}
        alt={`${wallet.adapter.name} icon`}
        width={24}
        height={24}
      />
      <span>{wallet.adapter.name}</span>
    </Button>
  );
}
