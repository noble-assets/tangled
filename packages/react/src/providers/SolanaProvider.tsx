import type { Adapter } from '@solana/wallet-adapter-base';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useState, type FC, type PropsWithChildren } from 'react';
import { ChainData } from '../types/index.js';

/**
 * Wallets that implement either of these standards will be available automatically.
 *
 *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
 *     (https://github.com/solana-mobile/mobile-wallet-adapter)
 *   - Solana Wallet Standard
 *     (https://github.com/solana-labs/wallet-standard)
 *
 * If you wish to support a wallet that supports neither of those standards,
 * instantiate its legacy wallet adapter here. Common legacy adapters can be found
 * in the npm package `@solana/wallet-adapter-wallets`.
 */
const wallets: Adapter[] = [];

export const SolanaProvider: FC<PropsWithChildren & { network: ChainData<'solana'> }> = ({ children, network }) => {
  const [endpoint] = useState(() => {
    if (!network) return undefined;

    if (network.id === 'solana') {
      return clusterApiUrl(WalletAdapterNetwork.Mainnet);
    }
    if (network.id === 'solanaTestnet') {
      return clusterApiUrl(WalletAdapterNetwork.Testnet);
    }
    if (network.id === 'solanaDevnet') {
      return clusterApiUrl(WalletAdapterNetwork.Devnet);
    }
    return undefined;
  });

  return endpoint === undefined ? (
    <>{children}</>
  ) : (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider
        wallets={wallets}
        autoConnect
      >
        {children}
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};