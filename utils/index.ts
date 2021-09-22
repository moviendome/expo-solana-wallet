/* eslint-disable no-case-declarations */
import * as solanaWeb3 from "@solana/web3.js";
import * as Random from "expo-random";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import * as ed25519 from "ed25519-hd-key";
import nacl from "tweetnacl";

export const DERIVATION_PATH = {
  bip44Change: "bip44Change",
};

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(32);
  const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
  return mnemonic;
};

const mnemonicToSeed = (mnemonic: string) => {
  const seed = ethers.utils.mnemonicToSeed(mnemonic);
  return seed;
};

const accountFromSeed = (
  seed: string,
  walletIndex: number,
  derivationPath: string,
  accountIndex: 0
) => {
  const derivedSeed = deriveSeed(
    seed,
    walletIndex,
    derivationPath,
    accountIndex
  );
  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
  return new solanaWeb3.Account(keyPair.secretKey);
};

const maskedAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 8)}...${address.slice(address.length - 8)}`;
};

const deriveSeed = (
  seed: string,
  walletIndex: number,
  derivationPath: string,
  accountIndex: number
): Buffer | undefined => {
  const path44Change = `m/44'/501'/${walletIndex}'/0'`;
  return ed25519.derivePath(path44Change, seed).key;
};

export {
  generateMnemonic,
  mnemonicToSeed,
  accountFromSeed,
  maskedAddress,
  deriveSeed,
};
