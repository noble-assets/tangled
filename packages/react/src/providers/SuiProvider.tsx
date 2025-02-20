import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { useMemo, useState } from 'react';
import { SuiChainType } from '../types/index.js';

/**
 * @notice This provider is used to connect to the Sui using @mysten/sui sdk.
 * @param adapters - Supported wallet adapters for the Sui.
 * @returns The Sui provider context with the connect and disconnect functions.
 */
export const SuiProvider = ({ children, chains }: { children: React.ReactNode; chains: SuiChainType[] }) => {
  const { networkConfig } = useMemo(() => {
    const config = chains.reduce(
      (acc, chain) => {
        const networkType = chain.suiNetwork;
        acc[chain.id] = { url: getFullnodeUrl(networkType) };
        return acc;
      },
      {} as Record<string, { url: string }>,
    );

    return createNetworkConfig(config);
  }, [chains]);

  const [activeNetwork, setActiveNetwork] = useState<string>(chains[0].id);

  return (
    <SuiClientProvider
      networks={networkConfig}
      network={activeNetwork}
      onNetworkChange={(network) => {
        setActiveNetwork(network);
      }}
    >
      <WalletProvider autoConnect>{children}</WalletProvider>
    </SuiClientProvider>
  );
};
