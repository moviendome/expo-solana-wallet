import {
  Generic,
  generic,
  Computed,
  computed,
  createStore,
  action,
  Action,
  persist,
} from "easy-peasy";
import storage from "../storage";

export interface Wallet {
  passcode: number;
  account: string;
  mnemonic: string[];
  seed: string;
}

export interface WalletModel<K> {
  wallet: Generic<K>;
  hasWallet: Computed<WalletModel<K>, Wallet | false>;
  addWallet: Action<WalletModel<K>, K>;
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: generic({}),
      hasWallet: computed((state) => Object.keys(state.wallet).length !== 0),
      addWallet: action((state, payload) => {
        state.wallet = {
          passcode: payload.passcode,
          account: payload.account,
          mnemonic: payload.mnemonic,
          seed: payload.seed,
        };
      }),
    },
    {
      storage: storage,
    }
  )
);

export default store;
