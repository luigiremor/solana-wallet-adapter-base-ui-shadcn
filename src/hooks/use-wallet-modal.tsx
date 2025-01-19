import { WalletModalContext } from "@/provider/wallet-modal";
import { useContext } from "react";

export function useWalletModal() {
  const context = useContext(WalletModalContext);

  if (!context) {
    throw new Error("useWalletModal must be used within a WalletModalProvider");
  }
  return context;
}
