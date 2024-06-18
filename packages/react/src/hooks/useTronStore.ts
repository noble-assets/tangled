import { useContext } from 'react';
import { useStore } from 'zustand';
import { TronStoreContext } from '../providers/TronProvider.js';
import { TronState } from '../store/Tron.js';

export function useTronStore<T>(selector: (state: TronState) => T): T {
  const store = useContext(TronStoreContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store, selector);
}