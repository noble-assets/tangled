import { ChainWalletBase, MainWalletBase, WalletManager } from '@cosmos-kit/core';
import { createStore } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import {
  ChainRegistryClient as CosmosChainRegistryClient,
  getCosmosChainRegistryClient,
} from '../actions/cosmos/getCosmosChainRegistryClient.js';
import { ChainData, CosmosChainType } from '../types/index.js';

export type GetCosmosClient = () => {
  walletManager: WalletManager | undefined;
  chainWallets: Record<string, ChainWalletBase>;
  getChainRegistry: () => Promise<CosmosChainRegistryClient>;
  getChainWallet: (chainId: string) => ChainWalletBase | undefined;
};

export interface CosmosState {
  connectedMainWallet: MainWalletBase | undefined;
  chainWallets: Record<string, ChainWalletBase>;
  walletManager: WalletManager | undefined;

  chainRegistry: CosmosChainRegistryClient | undefined;
  wallets: MainWalletBase[];

  recentAdapterId: string | undefined;

  // Actions
  setConnectedMainWallet: (wallet: MainWalletBase | undefined) => void;
  setChainWallets: (chainWallets: ChainWalletBase[]) => void;
  setWalletManager: (adapter: WalletManager | undefined) => void;
  setWallets: (wallets: MainWalletBase[]) => void;

  getCosmosClient: GetCosmosClient;
  getChainWallet: (chainId: string) => ChainWalletBase | undefined;
  getChainRegistry: () => Promise<CosmosChainRegistryClient>;

  setRecentAdapterId: (adapterId: string | undefined) => void;

  reset: () => void;
}

export type CosmosStore = ReturnType<typeof createCosmosStore>;

export const createCosmosStore = (chains: ChainData[]) => {
  return createStore<CosmosState>()(
    devtools(
      persist(
        (set, get) => ({
          connectedMainWallet: undefined,
          chainWallets: {},
          walletManager: undefined,
          address: null,

          chainRegistry: undefined,
          wallets: [],

          recentAdapterId: undefined,

          getChainWallet: (chainId: string) =>
            Object.values(get().chainWallets).find((wallet) => wallet.chainId === chainId),

          getChainRegistry: async () => {
            if (get().chainRegistry) return get().chainRegistry!;

            const chainRegistry = await getCosmosChainRegistryClient(
              chains.map((chain) => (chain as CosmosChainType).chainName.toString()),
            );

            set(() => ({ chainRegistry: chainRegistry }));
            return chainRegistry;
          },

          getCosmosClient: () => ({
            walletManager: get().walletManager,
            chainWallets: get().chainWallets,
            getChainRegistry: get().getChainRegistry,
            getChainWallet: get().getChainWallet,
          }),

          // Updates the wallet client for a specific connector
          setConnectedMainWallet: (wallet) => set(() => ({ connectedMainWallet: wallet })),
          setChainWallets: (chainWalletsArray) => {
            const chainWallets = chainWalletsArray.reduce(
              (acc, wallet) => {
                const key = `${wallet.walletName}:${wallet.chainId}`;
                acc[key] = wallet;
                return acc;
              },
              {} as Record<string, ChainWalletBase>,
            );

            set(() => ({ chainWallets }));
          },

          setWallets: (wallets) => set(() => ({ wallets })),
          // Sets the current connected adapter
          setWalletManager: (walletManager) => set(() => ({ walletManager })),

          setRecentAdapterId: (adapterId) => set(() => ({ recentAdapterId: adapterId })),

          // Resets the store to its default state
          reset: () =>
            set(() => ({
              connectors: {},
              walletManager: undefined,
              address: null,
              connectedMainWallet: undefined,
              chainWallets: {},
            })),
        }),
        {
          name: 'tangled-cosmos-adapterId',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({
            recentAdapterId: state.recentAdapterId,
          }),
        },
      ),
    ),
  );
};
