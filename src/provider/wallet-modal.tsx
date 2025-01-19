import { WalletModal } from "@/components/wallet-modal";
import { createContext, useState } from "react";

interface WalletModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const WalletModalContext = createContext<WalletModalContextState | null>(
  null
);

export function WalletModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider value={{ visible, setVisible }}>
      {children}

      {visible && <WalletModal />}
    </WalletModalContext.Provider>
  );
}
