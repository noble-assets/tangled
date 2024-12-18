import { ParsedAccountData, PublicKey } from '@solana/web3.js';
import { getBalance } from '@wagmi/core';
import { Address as EVMAddress } from 'viem';
import { ETH_ADDRESS, SOL_ADDRESS } from '../constants/index.js';
import { TokenMetadata } from '../hooks/useToken.js';
import {
  ChainData,
  ChainId,
  ChainType,
  ConnectionOrConfig,
  GetTokenMetadataParams,
  OtherChainData,
} from '../types/index.js';
import { areTokensEqual } from '../utils/index.js';
import { getFormattedBalance as getBitcoinBalance } from './bitcoin/balance.js';
import { getCosmosTokenBalanceAndAllowance, getCosmosTokenMetadata } from './cosmos/getCosmosToken.js';
import { getEVMTokenBalanceAndAllowance, getEVMTokenMetadata } from './evm/getEVMToken.js';
import { viewMethodOnNear } from './near/readCalls.js';
import { getSolanaTokenBalanceAndAllowance } from './solana/getSolanaToken.js';

/**
 * Get token metadata
 * @param token - Token address
 * @param chain - {@link ChainData}
 * @param config {@link ConnectionOrConfig}
 * @returns Token metadata {@link TokenMetadata}
 */
export const getTokenMetadata = async ({ token, chain, config }: GetTokenMetadataParams): Promise<TokenMetadata> => {
  // console.log('[Token] configs', { token, chain, config });
  // evm chain
  if (chain?.type === 'evm') {
    if (areTokensEqual(token, ETH_ADDRESS)) {
      return {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals,
        address: ETH_ADDRESS,
        chainId: chain.id.toString() as ChainId,
      };
    }

    const { name, symbol, decimals } = await getEVMTokenMetadata(token, Number(chain.id), config.wagmiConfig);
    return { name, symbol, decimals, address: token, chainId: chain.id.toString() as ChainId };
  }

  if (chain.type === 'solana') {
    if (areTokensEqual(token, SOL_ADDRESS)) {
      return { ...chain.nativeCurrency, address: SOL_ADDRESS, chainId: chain.id };
    }

    const pbKey = new PublicKey(token);
    const mint = await config.solanaConnection.getParsedAccountInfo(pbKey);
    const parsed = (mint.value?.data as ParsedAccountData)?.parsed;

    // TODO: add token fetch from metadata
    if (parsed.info?.decimals) {
      return {
        name: '',
        symbol: '',
        decimals: parsed.info.decimals,
        address: token,
        chainId: chain.id,
      };
    } else {
      throw new Error('Token metadata not found');
    }
  }

  if (chain.type === 'cosmos') {
    if (areTokensEqual(token, ETH_ADDRESS)) {
      return { ...chain.nativeCurrency, address: ETH_ADDRESS, chainId: chain.id };
    }
    const res = await getCosmosTokenMetadata({ token, chain, getCosmosClient: config.getCosmosClient });

    return {
      ...res,
      chainId: chain.id,
    };
  }

  if (chain.type === 'bitcoin') {
    if (areTokensEqual(token, ETH_ADDRESS)) {
      return { ...chain.nativeCurrency, address: ETH_ADDRESS, chainId: chain.id };
    }
  }

  if (chain.type === 'near') {
    if (areTokensEqual(token, ETH_ADDRESS)) {
      return { ...chain.nativeCurrency, address: ETH_ADDRESS, chainId: chain.id };
    }
    const res = await viewMethodOnNear(chain as OtherChainData<'near'>, token, 'ft_metadata');

    return {
      name: res.name,
      symbol: res.symbol,
      decimals: res.decimals,
      address: token,
      chainId: chain.id,
    };
  }

  throw new Error('Chain type not supported');
};

export type GetTokenBalanceAndAllowanceParams<CData extends ChainData> = {
  token: string;
  account: string;
  spender: string | undefined;
  chain: CData;
  config: ConnectionOrConfig;
};
export type GetTokenBalanceAndAllowanceResponse<CType extends ChainType> = CType extends 'solana'
  ? {
      balance: bigint;
      associatedTokenAccountAddress: string | undefined;
      isAtaDeployed: boolean;
      /** Delegated amount */
      allowance: bigint;
    }
  : {
      balance: bigint;
      allowance: bigint;
    };
export type GetTokenBalanceAndAllowanceFunction = <CData extends ChainData>(
  params: GetTokenBalanceAndAllowanceParams<CData>,
) => Promise<GetTokenBalanceAndAllowanceResponse<CData['type']>>;
/**
 * Get token balance and allowance for a given account and spender
 * @param token - Token address
 * @param account - Account address
 * @param spender - Spender address
 * @param chain - Chain data
 * @param config - {@link ConnectionOrConfig}
 * @returns Token balance and allowance as bigint
 */
export const getTokenBalanceAndAllowance = (async (params) => {
  const { token, account, spender, chain, config } = params;

  // evm chain
  if (chain.type === 'evm') {
    if (areTokensEqual(token, ETH_ADDRESS)) {
      const result = {
        balance: await getBalance(config.wagmiConfig, {
          address: account as EVMAddress,
          chainId: Number(chain.id),
        }).then((res) => BigInt(res.value)),
        allowance: BigInt(0),
      };
      return result;
    }
    return await getEVMTokenBalanceAndAllowance(token, account, spender, Number(chain.id), config.wagmiConfig);
  }

  if (chain.type === 'solana') {
    const pbKey = new PublicKey(token);

    // if asset is native solana token
    if (areTokensEqual(token, SOL_ADDRESS)) {
      const balance = BigInt(await config.solanaConnection.getBalance(pbKey));
      return { balance, allowance: 0n };
    }

    const { balance, associatedTokenAccountAddress, isAtaDeployed, delegatedAmount } =
      await getSolanaTokenBalanceAndAllowance({
        connection: config.solanaConnection,
        account: new PublicKey(account),
        token: pbKey,
        spender: spender ? new PublicKey(spender) : undefined,
      });

    return { balance, associatedTokenAccountAddress, isAtaDeployed, allowance: delegatedAmount };
  }

  if (chain.type === 'cosmos') {
    return getCosmosTokenBalanceAndAllowance({
      account,
      token,
      spender,
      chain,
    });
  }

  if (chain.type === 'bitcoin') {
    const balance = await getBitcoinBalance(account);

    return { balance, allowance: 0n };
  }

  if (chain.type === 'near') {
    const balance = await viewMethodOnNear(chain as OtherChainData<'near'>, token, 'ft_balance_of', {
      account_id: account,
    });
    const allowance = await viewMethodOnNear(chain as OtherChainData<'near'>, token, 'storage_balance_of', {
      account_id: account,
    });

    return { balance, allowance };
  }

  throw new Error('Chain type not supported');
}) as GetTokenBalanceAndAllowanceFunction;
