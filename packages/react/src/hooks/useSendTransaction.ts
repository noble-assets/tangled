import { useMutation } from '@tanstack/react-query';
import { SendTransactionParams, sendTransactionToChain } from '../actions/sendTransaction.js';
import { ChainData, ChainId } from '../types/index.js';
import { useConnectionOrConfig } from './useConnectionOrConfig.js';
import { useCurrentAccount } from './useCurrentAccount.js';
import { useCurrentWallet } from './useCurrentWallet.js';
import { useNetwork } from './useNetwork.js';
import { useWallet } from './useWallet.js';

export type SendTransactionMutationParams = Omit<SendTransactionParams<ChainData>, 'config'>;
/**
 * Send transaction Hook
 * @returns Mutation object
 */
export const useSendTransaction = (
  wallet?: ReturnType<typeof useCurrentWallet>,
  account?: ReturnType<typeof useCurrentAccount>,
) => {
  const connectionOrConfig = useConnectionOrConfig();

  const defaultAccount = useCurrentAccount();
  const currentAccount = account ?? defaultAccount;

  const defaultWallet = useCurrentWallet();
  const currentWallet = wallet ?? defaultWallet;

  const walletInstance = useWallet(currentWallet?.type, currentWallet?.id);
  const { network, switchNetworkAsync } = useNetwork();

  return useMutation({
    mutationKey: ['sendTransaction'],
    mutationFn: async ({ chain, to, from, value, args, overrides }: SendTransactionMutationParams) => {
      if (!to || !from) {
        throw new Error('Missing required parameters');
      }
      if (!chain) {
        throw new Error('Chain not found');
      }
      if (!connectionOrConfig) {
        throw new Error('Connection or config not found');
      }

      // check if chain type wallet is connected to chain
      if (!currentAccount || walletInstance?.type !== chain.type || !walletInstance?.connector) {
        throw new Error(`${chain.type} wallet is not connected`);
      }

      // check if from address matches currentAccount
      if (from !== currentAccount.address) {
        throw new Error('From address does not match current account');
      }

      // check chain id of wallet
      if (network !== chain.id.toString()) {
        console.log('Switching network to', chain.id.toString());
        const switchedChain = await switchNetworkAsync(chain.id.toString() as ChainId).catch((e) => {
          console.error(e);
          throw e;
        });
        if (!switchedChain || switchedChain.id.toString() !== chain.id.toString()) {
          throw new Error('Failed to switch network');
        }
      }

      return sendTransactionToChain({
        chain,
        to,
        from,
        value,
        args,
        config: { ...connectionOrConfig, connector: walletInstance.connector },
        overrides,
      });
    },
  });
};
