"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, LogOut } from "lucide-react";
import { WalletIcon } from "@/components/wallet-icon";
import { useWalletModal } from "@/hooks/use-wallet-modal";

interface WalletMultiButtonProps {
  labels?: {
    "copy-address": string;
    copied: string;
    "change-wallet": string;
    disconnect: string;
    connecting: string;
    connected: string;
    "has-wallet": string;
    "no-wallet": string;
  };
}

export function WalletMultiButton({
  labels = {
    "copy-address": "Copy address",
    copied: "Copied",
    "change-wallet": "Change wallet",
    disconnect: "Disconnect",
    connecting: "Connecting...",
    connected: "Connected",
    "has-wallet": "Connect",
    "no-wallet": "Connect Wallet",
  },
}: WalletMultiButtonProps) {
  const { publicKey, wallet, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      if (!node || node.contains(event.target as Node)) return;

      setDropdownOpen(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (connecting) return labels["connecting"];
    if (wallet)
      return base58
        ? `${base58.slice(0, 4)}...${base58.slice(-4)}`
        : labels["connected"];
    return labels["no-wallet"];
  }, [connecting, wallet, base58, labels]);

  const copyAddress = async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  };

  const openModal = () => {
    console.log("openModal");
    setVisible(true);
    setDropdownOpen(false);
  };

  const disconnectWallet = () => {
    disconnect();
    setDropdownOpen(false);
  };

  console.log(wallet);

  if (!wallet) {
    return <Button onClick={openModal}>{content}</Button>;
  }

  return (
    <div ref={ref}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2">
            {wallet.adapter.icon && (
              <WalletIcon
                wallet={{
                  icon: wallet.adapter.icon,
                  name: wallet.adapter.name,
                }}
              />
            )}
            {content}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {base58 && (
            <DropdownMenuItem onClick={copyAddress}>
              <Copy className="mr-2 h-4 w-4" />
              <span>{copied ? labels["copied"] : labels["copy-address"]}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={openModal}>
            <WalletIcon
              wallet={{
                icon: wallet.adapter.icon,
                name: wallet.adapter.name,
              }}
            />
            <span>{labels["change-wallet"]}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{labels["disconnect"]}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
