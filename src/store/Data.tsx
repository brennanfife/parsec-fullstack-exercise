import { create } from 'zustand';

interface IDataStore {
  address: string;
  func: string;
  args: string[];
  setAddress: (address: string) => void;
  setFunc: (func: string) => void;
  setArgs: (args: string[]) => void;
}

export const useDataStore = create<IDataStore>((set) => ({
  address: '',
  func: '',
  args: [''],
  setAddress: (address) => set({ address }),
  setFunc: (func) => set({ func }),
  setArgs: (args) => set({ args }),
}));
