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
  mnemonic: string[];
  seed: string;
}

export interface Account {
  index: number;
  title: string;
  derivationPath: string;
}

export interface WalletModel<K> {
  wallet: Generic<K>;
  accounts: Account[];
  hasWallet: Computed<WalletModel<K>, Wallet | false>;
  addWallet: Action<WalletModel<K>, K>;
  addDefaultAccount: Action<WalletModel<K>, K>;
  addAccount: Action<WalletModel<K>, K>;
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: generic({}),
      accounts: [],
      hasWallet: computed(
        (state) =>
          Object.keys(state.wallet).length !== 0 && state.accounts.length !== 0
      ),
      addWallet: action((state, payload) => {
        state.wallet = {
          passcode: payload.passcode,
          mnemonic: payload.mnemonic,
          seed: payload.seed,
        };
      }),
      addDefaultAccount: action((state, payload) => {
        state.accounts.push({
          index: 0,
          title: "default",
          derivationPath: "bip44Change",
        });
      }),
      addAccount: action((state, payload) => {
        state.accounts.push({
          index: payload.index,
          title: payload.title,
          derivationPath: "bip44Change",
        });
      }),
    },
    {
      storage: storage,
    }
  )
);

export default store;
