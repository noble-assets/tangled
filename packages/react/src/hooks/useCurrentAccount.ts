import { useWalletsStore } from '../store/Wallet.js';
import { ChainType } from '../types/index.js';

export const useCurrentAccount = () => {
  return useWalletsStore((state) => state.currentAccount);
};

export const useCurrentAccountForChainType = (type: ChainType) => {
  return useWalletsStore((state) => state.currentAccountForChainType[type]);
};
