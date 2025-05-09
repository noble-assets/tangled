# @tangled3/react

## 1.0.11

### Patch Changes

- Remove redundant switchAminoForLedger function and directly check for Nano Ledger using activeAccount to improve code clarity and maintainability

## 1.0.10

### Patch Changes

- refactor(useSendTransaction): allow passing wallet and account as parameters

  This change modifies the `useSendTransaction` hook to accept `wallet` and `account` as optional parameters, providing flexibility for external usage. Default values are retained if parameters are not provided, ensuring backward compatibility.

## 1.0.9

### Patch Changes

- feat(cosmos): add recent adapter ID for auto-connect and persistence

  Introduce recentAdapterId state to track the most recently used wallet adapter. This allows for auto-connect functionality and persists the adapter ID in localStorage for seamless reconnection across sessions. The changes also ensure proper handling of wallet disconnection and account updates based on the recent adapter ID.

## 1.0.8

### Patch Changes

- feat(wallet): add support for current account by chain type

  Introduce a new hook useCurrentAccountForChainType to retrieve the current account based on the specified chain type. This enhances the wallet functionality by allowing users to access accounts specific to different chain types (e.g., EVM, Cosmos). The changes include updates to the store, provider, and example component to support this feature.

## 1.0.7

### Patch Changes

- switch to amino signer on keplr for ledger connections

## 1.0.6

### Patch Changes

- make types values optional

## 1.0.5

### Patch Changes

- "feat: support user defined sign mode

## 1.0.4

### Patch Changes

- 239b296: Set preffered sign-mode to direct for signing cosmwasm options. Fix undetected registry.

## 1.0.3

### Patch Changes

- 9b210da: add support for signing options with custom registry types in chainConfig

## 1.0.2

### Patch Changes

- Updates the custom chain registry client to support testnet urls, improved the cosmos provider to ensure the testnet assets and chain information is used with the wallet manager

## 1.0.1

### Patch Changes

- 4ce7d55: automated publish test

## 1.13.0

### Minor Changes

- feat bitcoin balance fetch

## 1.12.0

### Minor Changes

- stable routerchain release

## 1.12.0-routerchain-beta-0.2

### Patch Changes

- fix routerchain balance fetch

## 1.12.0-routerchain-beta-0.1

### Minor Changes

- update cosmos integrations

## 1.10.0-routerchain-beta-0.1

### Minor Changes

- feat router chain integration

## 1.9.11-cosmos-beta

### Patch Changes

- fix cosmos balance queries

## 1.9.10

### Patch Changes

- fix cosmos connections

## 1.9.9

### Patch Changes

- chore: remove console log

## 1.9.8

### Patch Changes

- fix tron store initial value

## 1.9.7

### Patch Changes

- fix tron store initial value

## 1.9.6

### Patch Changes

- fix tron store error

## 1.9.5

### Patch Changes

- fix cosmos gas prices

## 1.9.4

### Patch Changes

- add fee params to cosmos tx overrides

## 1.9.3

### Patch Changes

- fix cosmos chain wallet values

## 1.9.2

### Patch Changes

- fix cosmos integrations

## 1.9.1

### Patch Changes

- fix near deps

## 1.9.0

### Minor Changes

- add bitcoin and near support

## 1.8.0

### Minor Changes

- added cosmos support

## 1.7.4

### Patch Changes

- make tron handlers hex compliant

## 1.7.3

### Patch Changes

- chore: update tron chain ids

## 1.7.2

### Patch Changes

- export hook types

## 1.7.1

### Patch Changes

- fix poll callback

## 1.7.0

### Minor Changes

- add sui and ton support

## 1.6.11

### Patch Changes

- fix polling callback util

## 1.6.10

### Patch Changes

- export abi constants

## 1.6.9

### Patch Changes

- fix useNetwork chain search

## 1.6.8

### Patch Changes

- fix: chain id comparison

## 1.6.7

### Patch Changes

- fix undefined allowance conversion to bigint

## 1.6.6

### Patch Changes

- fix: multicall allowance fetching condition

## 1.6.5

### Patch Changes

- fix: return transaction hash for evm token handler

## 1.6.4

### Patch Changes

- fix exports... again

## 1.6.3

### Patch Changes

- fix exports

## 1.6.2

### Patch Changes

- export token handler hook

## 1.6.1

### Patch Changes

- fix: return ata results on useTokenForAccount

## 1.6.0

### Minor Changes

- refactor chain types and add token handler hooks

## 1.5.3

### Patch Changes

- fix send transaction mutation arguments

## 1.5.2

### Patch Changes

- export useConnectionOrConfig hook

## 1.5.1

### Patch Changes

- export actions

## 1.5.0

### Minor Changes

- feat: token balances multicall action

## 1.4.8

### Patch Changes

- fix get token balance return

## 1.4.7

### Patch Changes

- fix solana autoconnect conditions
- Updated dependencies
  - @tangled3/solana-react@1.1.2

## 1.4.6

### Patch Changes

- fix: fresh build

## 1.4.5

### Patch Changes

- fix: added async connect

## 1.4.4

### Patch Changes

- fix: hide coinbase injected connector

## 1.4.3

### Patch Changes

- fix coinbase duplicate connectors

## 1.4.2

### Patch Changes

- fix: memoise hook returns

## 1.4.1

### Patch Changes

- Fixed aleph zero ws provider initialisation

## 1.4.0

### Minor Changes

- Added utility hooks to interact with chains, tokens, and transactions
  1. useSendTransaction
  2. useToken
  3. useTransactionReceipt
  4. useWaitForTransaction

## 1.3.0

### Minor Changes

- fix evm connection and add walletconnect, coinbase support

## 1.2.2

### Patch Changes

- fix tron and evm installed-only list

## 1.2.1

### Minor Changes

- add filters to useWallets options and bug fixes for server env

## 1.1.1

### Minor Changes

- remove react query provider from tangled context

## 1.0.1

### Patch Changes

- Updated dependencies
  - @tangled3/solana-react@1.1.1
- fix publishing directory

## 1.0.0

### Major Changes

- 29a1636: v1 basics

  Basic connections and wallet discovery for evm, solana, tron and aleph zero wallets.

  Added the following hooks:

  - useAccounts
  - useAlpehContext
  - useAlephStore
  - useChain
  - useChains
  - useConnect
  - useConnect
  - useConnectedWallets
  - useConnections
  - useDisconnect
  - useTangledConfig
  - useTronContext
  - useTronStore
  - useWallets

### Patch Changes

- Updated dependencies [29a1636]
  - @tangled3/solana-react@1.0.0
