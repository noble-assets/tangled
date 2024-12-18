export const polkadotTokenAbi = {
  contract: {
    name: 'token',
    version: '0.1.0',
    authors: ['Priyanshu Mishra <priyanshu@routerprotocol.com>'],
    description: 'Mintable Route Token implementation for the substrate based chains',
    repository: 'https://github.com/router-protocol/router-gateway-contracts.git',
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: 'name',
            type: {
              displayName: ['Option'],
              type: 16,
            },
          },
          {
            label: 'symbol',
            type: {
              displayName: ['Option'],
              type: 16,
            },
          },
          {
            label: 'decimals',
            type: {
              displayName: ['u8'],
              type: 4,
            },
          },
          {
            label: 'supply',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'new',
        payable: false,
        returnType: {
          displayName: ['ink_primitives', 'ConstructorResult'],
          type: 17,
        },
        selector: '0x9bae9d5e',
      },
    ],
    docs: [],
    environment: {
      accountId: {
        displayName: ['AccountId'],
        type: 2,
      },
      balance: {
        displayName: ['Balance'],
        type: 0,
      },
      blockNumber: {
        displayName: ['BlockNumber'],
        type: 29,
      },
      chainExtension: {
        displayName: ['ChainExtension'],
        type: 30,
      },
      hash: {
        displayName: ['Hash'],
        type: 27,
      },
      maxEventTopics: 4,
      staticBufferSize: 16384,
      timestamp: {
        displayName: ['Timestamp'],
        type: 28,
      },
    },
    events: [
      {
        args: [
          {
            docs: ['Account providing allowance.'],
            indexed: true,
            label: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            docs: ['Allowance beneficiary.'],
            indexed: true,
            label: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            docs: ['New allowance amount.'],
            indexed: false,
            label: 'amount',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        docs: ['Event emitted when allowance by `owner` to `spender` changes.'],
        label: 'Approval',
        module_path: 'psp22::events',
        signature_topic: '0x25cdb6c93882e925abbfc9a8b7c85884b73c038c03a2492f238a5e5ba3fbff8c',
      },
      {
        args: [
          {
            docs: ['Transfer sender. `None` in case of minting new tokens.'],
            indexed: true,
            label: 'from',
            type: {
              displayName: ['Option'],
              type: 26,
            },
          },
          {
            docs: ['Transfer recipient. `None` in case of burning tokens.'],
            indexed: true,
            label: 'to',
            type: {
              displayName: ['Option'],
              type: 26,
            },
          },
          {
            docs: ['Amount of tokens transferred (or minted/burned).'],
            indexed: false,
            label: 'value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        docs: ['Event emitted when transfer of tokens occurs.'],
        label: 'Transfer',
        module_path: 'psp22::events',
        signature_topic: '0x990df076cb1e9527aa102cd100c1481efe393eeabb5825f9af1f5e58221864de',
      },
    ],
    lang_error: {
      displayName: ['ink', 'LangError'],
      type: 18,
    },
    messages: [
      {
        args: [],
        default: false,
        docs: [' Returns the token name.'],
        label: 'PSP22Metadata::token_name',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 19,
        },
        selector: '0x3d261bd4',
      },
      {
        args: [],
        default: false,
        docs: [' Returns the token symbol.'],
        label: 'PSP22Metadata::token_symbol',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 19,
        },
        selector: '0x34205be5',
      },
      {
        args: [],
        default: false,
        docs: [' Returns the token decimals.'],
        label: 'PSP22Metadata::token_decimals',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 20,
        },
        selector: '0x7271b782',
      },
      {
        args: [],
        default: false,
        docs: [],
        label: 'PSP22::total_supply',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 21,
        },
        selector: '0x162df8c2',
      },
      {
        args: [
          {
            label: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::balance_of',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 21,
        },
        selector: '0x6568382f',
      },
      {
        args: [
          {
            label: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::allowance',
        mutates: false,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 21,
        },
        selector: '0x4d47d921',
      },
      {
        args: [
          {
            label: 'to',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
          {
            label: '_data',
            type: {
              displayName: ['Vec'],
              type: 22,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::transfer',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0xdb20f9f5',
      },
      {
        args: [
          {
            label: 'from',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'to',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
          {
            label: '_data',
            type: {
              displayName: ['Vec'],
              type: 22,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::transfer_from',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0x54b3c76e',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::approve',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0xb20f1bbd',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'delta_value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::increase_allowance',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0x96d6b57a',
      },
      {
        args: [
          {
            label: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 2,
            },
          },
          {
            label: 'delta_value',
            type: {
              displayName: ['u128'],
              type: 0,
            },
          },
        ],
        default: false,
        docs: [],
        label: 'PSP22::decrease_allowance',
        mutates: true,
        payable: false,
        returnType: {
          displayName: ['ink', 'MessageResult'],
          type: 23,
        },
        selector: '0xfecb57d5',
      },
    ],
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          primitive: 'u128',
        },
      },
    },
    {
      id: 1,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'K',
            type: 2,
          },
          {
            name: 'V',
            type: 0,
          },
          {
            name: 'KeyType',
            type: 5,
          },
        ],
        path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
      },
    },
    {
      id: 2,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 3,
                typeName: '[u8; 32]',
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'AccountId'],
      },
    },
    {
      id: 3,
      type: {
        def: {
          array: {
            len: 32,
            type: 4,
          },
        },
      },
    },
    {
      id: 4,
      type: {
        def: {
          primitive: 'u8',
        },
      },
    },
    {
      id: 5,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'L',
            type: 6,
          },
          {
            name: 'R',
            type: 7,
          },
        ],
        path: ['ink_storage_traits', 'impls', 'ResolverKey'],
      },
    },
    {
      id: 6,
      type: {
        def: {
          composite: {},
        },
        path: ['ink_storage_traits', 'impls', 'AutoKey'],
      },
    },
    {
      id: 7,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'ParentKey',
            type: 8,
          },
        ],
        path: ['ink_storage_traits', 'impls', 'ManualKey'],
      },
    },
    {
      id: 8,
      type: {
        def: {
          tuple: [],
        },
      },
    },
    {
      id: 9,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'K',
            type: 10,
          },
          {
            name: 'V',
            type: 0,
          },
          {
            name: 'KeyType',
            type: 11,
          },
        ],
        path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
      },
    },
    {
      id: 10,
      type: {
        def: {
          tuple: [2, 2],
        },
      },
    },
    {
      id: 11,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'L',
            type: 6,
          },
          {
            name: 'R',
            type: 12,
          },
        ],
        path: ['ink_storage_traits', 'impls', 'ResolverKey'],
      },
    },
    {
      id: 12,
      type: {
        def: {
          composite: {},
        },
        params: [
          {
            name: 'ParentKey',
            type: 8,
          },
        ],
        path: ['ink_storage_traits', 'impls', 'ManualKey'],
      },
    },
    {
      id: 13,
      type: {
        def: {
          primitive: 'str',
        },
      },
    },
    {
      id: 14,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'data',
                type: 15,
                typeName:
                  '<PSP22Data as::ink::storage::traits::AutoStorableHint<::ink::\nstorage::traits::ManualKey<1355527684u32, ()>,>>::Type',
              },
              {
                name: 'decimals',
                type: 4,
                typeName:
                  '<u8 as::ink::storage::traits::AutoStorableHint<::ink::storage::\ntraits::ManualKey<2233024958u32, ()>,>>::Type',
              },
              {
                name: 'name',
                type: 16,
                typeName:
                  '<Option<String> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<2459941612u32, ()>,>>::Type',
              },
              {
                name: 'symbol',
                type: 16,
                typeName:
                  '<Option<String> as::ink::storage::traits::AutoStorableHint<::\nink::storage::traits::ManualKey<1189101269u32, ()>,>>::Type',
              },
            ],
          },
        },
        path: ['token', 'token', 'Token'],
      },
    },
    {
      id: 15,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: 'total_supply',
                type: 0,
                typeName:
                  '<u128 as::ink::storage::traits::AutoStorableHint<::ink::storage\n::traits::ManualKey<2948691470u32, ()>,>>::Type',
              },
              {
                name: 'balances',
                type: 1,
                typeName:
                  '<Mapping<AccountId, u128> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<1170687700u32,\n()>,>>::Type',
              },
              {
                name: 'allowances',
                type: 9,
                typeName:
                  '<Mapping<(AccountId, AccountId), u128> as::ink::storage::traits::\nAutoStorableHint<::ink::storage::traits::ManualKey<15709089u32, ()\n>,>>::Type',
              },
            ],
          },
        },
        path: ['psp22', 'data', 'PSP22Data'],
      },
    },
    {
      id: 16,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'None',
              },
              {
                fields: [
                  {
                    type: 13,
                  },
                ],
                index: 1,
                name: 'Some',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 13,
          },
        ],
        path: ['Option'],
      },
    },
    {
      id: 17,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 8,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 18,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 8,
          },
          {
            name: 'E',
            type: 18,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 18,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 1,
                name: 'CouldNotReadInput',
              },
            ],
          },
        },
        path: ['ink_primitives', 'LangError'],
      },
    },
    {
      id: 19,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 16,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 18,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 16,
          },
          {
            name: 'E',
            type: 18,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 20,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 4,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 18,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 4,
          },
          {
            name: 'E',
            type: 18,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 21,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 0,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 18,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 0,
          },
          {
            name: 'E',
            type: 18,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 22,
      type: {
        def: {
          sequence: {
            type: 4,
          },
        },
      },
    },
    {
      id: 23,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 24,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 18,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 24,
          },
          {
            name: 'E',
            type: 18,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 24,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 8,
                  },
                ],
                index: 0,
                name: 'Ok',
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: 'Err',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 8,
          },
          {
            name: 'E',
            type: 25,
          },
        ],
        path: ['Result'],
      },
    },
    {
      id: 25,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 13,
                    typeName: 'String',
                  },
                ],
                index: 0,
                name: 'Custom',
              },
              {
                index: 1,
                name: 'InsufficientBalance',
              },
              {
                index: 2,
                name: 'InsufficientAllowance',
              },
              {
                index: 3,
                name: 'ZeroRecipientAddress',
              },
              {
                index: 4,
                name: 'ZeroSenderAddress',
              },
              {
                fields: [
                  {
                    type: 13,
                    typeName: 'String',
                  },
                ],
                index: 5,
                name: 'SafeTransferCheckFailed',
              },
            ],
          },
        },
        path: ['psp22', 'errors', 'PSP22Error'],
      },
    },
    {
      id: 26,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: 'None',
              },
              {
                fields: [
                  {
                    type: 2,
                  },
                ],
                index: 1,
                name: 'Some',
              },
            ],
          },
        },
        params: [
          {
            name: 'T',
            type: 2,
          },
        ],
        path: ['Option'],
      },
    },
    {
      id: 27,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 3,
                typeName: '[u8; 32]',
              },
            ],
          },
        },
        path: ['ink_primitives', 'types', 'Hash'],
      },
    },
    {
      id: 28,
      type: {
        def: {
          primitive: 'u64',
        },
      },
    },
    {
      id: 29,
      type: {
        def: {
          primitive: 'u32',
        },
      },
    },
    {
      id: 30,
      type: {
        def: {
          variant: {},
        },
        path: ['ink_env', 'types', 'NoChainExtension'],
      },
    },
  ],
  version: 5,
} as const;
