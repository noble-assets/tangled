import { useConnectWallet as useSuiConnectWallet } from '@mysten/dapp-kit';
import { useWallet as useSolanaWallet } from '@noble-assets/tangled-solana-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useConnect as useWagmiConnect } from 'wagmi';
import { useWalletsStore } from '../store/Wallet.js';
import { ChainType } from '../types/index.js';
import { DefaultConnector, Wallet, WalletInstance } from '../types/wallet.js';
import { useBitcoinContext } from './useBitcoinContext.js';
import { useCosmosContext } from './useCosmosContext.js';
import { useNearContext } from './useNearContext.js';
import { useWallets } from './useWallets.js';

export const useConnect = () => {
  const wallets = useWallets({
    onlyInstalled: true,
  });
  const { connectAsync: connectEVM } = useWagmiConnect();
  const { connect: connectSolanaWallet } = useSolanaWallet();
  const { mutateAsync: connectSuiWallet } = useSuiConnectWallet();
  const { connect: connectCosmosWallet } = useCosmosContext();
  const { connect: connectBitcoinWallet } = useBitcoinContext();
  const { connect: connectNearWallet } = useNearContext();

  const connectedWallets = useWalletsStore((state) => state.connectedWalletsByChain);
  const setCurrentWallet = useWalletsStore((state) => state.setCurrentWallet);
  const setRecentWallet = useWalletsStore((state) => state.setRecentWallet);

  const connectWallet = useCallback(
    async (params: {
      walletId: string;
      chainType: ChainType;
      nearContractId?: string;
    }): Promise<{
      chainType: ChainType;
      name: string;
      walletId: string;
    }> => {
      let walletInstance: Wallet | undefined = wallets[params.chainType].find(
        (wallet) => wallet.id === params.walletId,
      );
      let chainId: string | undefined;

      // cosmos wallets have chain ids appended to the wallet id
      // eg: 'keplr:cosmoshub-4'
      if (params.chainType === 'cosmos') {
        const [walletId, _chainId] = params.walletId.split(':');
        chainId = _chainId;
        walletInstance = wallets[params.chainType].find((wallet) => walletId === wallet.id);
      }

      if (!walletInstance) {
        throw new Error('Wallet not found');
      }

      if (!walletInstance.connector) {
        throw new Error('Wallet connector not found');
      }

      if (connectedWallets[params.chainType][walletInstance.id]) {
        console.error('Wallet already connected');

        return { name: walletInstance.name, walletId: params.walletId, chainType: params.chainType };
      }

      if (params.chainType === 'solana') {
        await connectSolanaWallet({ walletName: walletInstance.name as WalletName });
      } else if (params.chainType === 'evm') {
        await connectEVM({ connector: walletInstance.connector as WalletInstance<'evm'> });
      } else if (params.chainType === 'sui') {
        // @ts-expect-error: connector is not a WalletInstance
        connectSuiWallet({ wallet: walletInstance.connector as WalletInstance<'sui'> });
      } else if (params.chainType === 'cosmos') {
        await connectCosmosWallet({ adapterId: walletInstance.id, chainId });

        // if chainId is provided, set chainId for cosmos wallets
        if (chainId) params.walletId = `${walletInstance.id}:${chainId}`;
      } else if (params.chainType === 'bitcoin') {
        await connectBitcoinWallet(walletInstance.id);
      } else if (params.chainType === 'near') {
        await connectNearWallet({ adapterId: walletInstance.id, contractId: params.nearContractId });
      } else {
        const connector = walletInstance.connector as DefaultConnector;
        await connector.connect();
      }

      return { chainType: params.chainType, name: walletInstance.name, walletId: params.walletId };
    },
    [
      wallets,
      connectedWallets,
      connectSolanaWallet,
      connectBitcoinWallet,
      connectEVM,
      connectSuiWallet,
      connectCosmosWallet,
      connectNearWallet,
    ],
  );

  const mutation = useMutation({
    mutationKey: ['connect-wallet'],
    mutationFn: connectWallet,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ chainType, walletId }) => {
      setCurrentWallet({
        id: walletId,
        type: chainType,
      });
      setRecentWallet({
        id: walletId,
        type: chainType,
      });
    },
  });

  return {
    connect: mutation.mutate,
    connectAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
