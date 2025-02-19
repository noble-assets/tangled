import { ChainRegistryChainUtil, ChainRegistryClientOptions, ChainRegistryFetcher } from '@chain-registry/client';

function isTestnet(chainName: string) {
  return chainName.trim().toLowerCase().endsWith('testnet');
}

export const getCosmosChainRegistryClient = async (chains: string[]) => {
  const client = new ChainRegistryClient({
    chainNames: chains,
    assetListNames: chains.map((chain) => (isTestnet(chain) ? `testnets/${chain}` : chain)),
  });

  await client.fetchUrls();
  return client;
};

export class ChainRegistryClient extends ChainRegistryFetcher {
  protected _options: ChainRegistryClientOptions;

  constructor(options: ChainRegistryClientOptions) {
    const mergedOptions = {
      baseUrl: 'https://raw.githubusercontent.com/cosmos/chain-registry/master',
      ...options,
    };

    super(mergedOptions);
    this._options = mergedOptions;
    this.urls = this.generateUrls();
  }

  generateUrls() {
    const { chainNames, assetListNames, ibcNamePairs, baseUrl } = this._options;

    const chainUrls = chainNames.map((chain) => {
      return isTestnet(chain) ? `${baseUrl}/testnets/${chain}/chain.json` : `${baseUrl}/${chain}/chain.json`;
    });

    const assetlistUrls = (assetListNames || chainNames).map((chain) => {
      return `${baseUrl}/${chain}/assetlist.json`;
    });

    let namePairs = ibcNamePairs;
    if (!namePairs) {
      const mainnetChains = chainNames.filter((chain) => !isTestnet(chain));
      namePairs = [];
      for (let i = 0; i < mainnetChains.length; i++) {
        for (let j = i + 1; j < mainnetChains.length; j++) {
          namePairs.push([mainnetChains[i], mainnetChains[j]]);
        }
      }
    }
    const ibcUrls = namePairs.map((namePair) => {
      const fileName =
        namePair[0].localeCompare(namePair[1]) <= 0
          ? `${namePair[0]}-${namePair[1]}.json`
          : `${namePair[1]}-${namePair[0]}.json`;

      return `${baseUrl}/_IBC/${fileName}`;
    });

    return [...new Set([...chainUrls, ...assetlistUrls, ...ibcUrls])];
  }

  getChainUtil(chainName: string) {
    const chainInfo = this.getChainInfo(chainName);
    return new ChainRegistryChainUtil({
      chainName: chainName,
      chainInfo: chainInfo,
    });
  }

  async fetchUrls() {
    const results = await Promise.allSettled(this.urls.map((url) => this.fetch(url)));

    const failedResults = results
      .filter((result) => result.status === 'rejected')
      .map((result) => (result as PromiseRejectedResult).reason);

    if (failedResults.length > 0) {
      console.error('Some URLs failed to fetch:', failedResults);
    }

    return results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<never>).value);
  }
}
