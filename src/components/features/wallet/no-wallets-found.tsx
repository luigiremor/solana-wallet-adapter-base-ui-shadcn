export function NoWalletsFound() {
  return (
    <div className="text-center p-6">
      <h2 className="text-lg font-semibold">No wallets found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You&apos;ll need a wallet on Solana to continue. Please install a wallet
        and refresh the page.
      </p>
    </div>
  );
}
