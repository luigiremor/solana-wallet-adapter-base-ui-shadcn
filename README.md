# Solana Wallet Adapter Base UI (ShadCN)

## 🚀 Overview

I've often found myself constrained by `@solana/wallet-adapter-react-ui` when it comes to UI and UX customization. This project is my take on a fully modular and customizable wallet adapter UI for Solana applications.

Inspired by [@solana/wallet-adapter-react-ui](https://github.com/solana-labs/wallet-adapter), I aimed to create a more developer-friendly, extendable, and style-agnostic wallet connection experience using [shadcn/ui](https://ui.shadcn.com/) and `tailwindcss`.

🔗 **GitHub Repo**: [solana-wallet-adapter-base-ui-shadcn](https://github.com/luigiremor/solana-wallet-adapter-base-ui-shadcn)

## 🎯 Objectives

- **Decouple UI from Business Logic**: Provide flexibility to developers who want a fully controlled experience.
- **Enhance Developer Experience**: Make integration straightforward and intuitive.
- **Improve Theming & Styling**: Leveraging TailwindCSS for easy customization.
- **Support More Wallet Integration Flows**: Ensure smooth compatibility with Solana wallets.

## ✨ Features

- 🔌 **Customizable Wallet UI**: Easily adapt the wallet connection UI to your app’s design.
- 🏗 **Modular Architecture**: Add specific flows like authentication, Ledger connection, and more.
- 🎨 **Built with ShadCN & TailwindCSS**: Customize styles effortlessly.
- 💡 **Simple & Flexible API**: Designed to be easy to use and integrate.
- 🛠 **Supports Multiple Wallets**: Compatible with Solana Wallet Standard and legacy adapters.

## 📦 Installation

To get started, install the necessary dependencies:

```sh
npm install --save \
    @solana/wallet-adapter-base \
    @solana/wallet-adapter-react \
    @solana/wallet-adapter-react-ui \
    @solana/wallet-adapter-wallets \
    @solana/web3.js \
    react
```

## ⚡ Step-by-Step Guide

### 1️⃣ Setup Components

Ensure you have the following component structure:

```
components/
┣ ui/
┃ ┣ button.tsx
┃ ┣ dialog.tsx
┃ ┣ dropdown-menu.tsx
┃ ┗ scroll-area.tsx
┣ more-wallets-button.tsx
┣ no-wallets-found.tsx
┣ wallet-icon.tsx
┣ wallet-list-item.tsx
┣ wallet-modal-button.tsx
┣ wallet-modal.tsx
┗ wallet-multi-button.tsx
```

Each of these components is responsible for handling different parts of the Wallet Adapter UI, keeping logic modular and reusable.

### 2️⃣ Setup Wallet Provider

Create a `wallet.tsx` file and configure the wallet provider:

```tsx
import { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletMultiButton } from "@/components/wallet-multi-button";
import { WalletModalProvider } from "@/provider/wallet-modal";

export const Wallet: FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

### 3️⃣ Add Wallet Modal

Create a `wallet-modal.tsx` file for handling wallet connections:

```tsx
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
```

### 4️⃣ Integrate Wallet Provider

Modify your `App.tsx` or main layout file to wrap your application with the wallet provider:

```tsx
import { Wallet } from "@/components/wallet";

function App() {
  return (
    <div>
      <Wallet />
      {/* Your app content */}
    </div>
  );
}
```

## 📌 Why Use This?

This project is an alternative take on `@solana/wallet-adapter-react-ui`, designed to provide a more modular and customizable experience.

By leveraging:

- **ShadCN**: We gain full control over UI components without being locked into a predefined styling system.
- **TailwindCSS**: Developers can quickly and easily modify spacing, typography, and layout.
- **Solana Wallet Adapter**: Ensures compatibility with existing Solana wallet infrastructure while allowing deeper integration.

If you're looking for an alternative to the default wallet adapter UI, this project gives you the flexibility to build the best experience for your Solana application.

## 🚀 Next Steps & Improvements

To be honest, there’s still a lot to improve, but this serves as a proof of concept. If there's enough interest, I plan to add:

- **More Wallet Connection Flows** (e.g., Ledger, Mobile Wallets)
- **Improved Error Handling & UX**
- **Dynamic Themes & Dark Mode Support**
- **More Configurable Components**

Let me know your feedback and feel free to contribute!

---

☀️ **PEACE** - Luigi 🇧🇷 | Phase Labs
