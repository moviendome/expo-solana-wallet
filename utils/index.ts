/* eslint-disable no-case-declarations */
import * as solanaWeb3 from "@solana/web3.js";
import * as Random from "expo-random";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import nacl from "tweetnacl";

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(32);
  const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
  return mnemonic;
};

const mnemonicToSeed = (mnemonic: string) => {
  const seed = ethers.utils.mnemonicToSeed(mnemonic);
  return seed;
};

const accountFromSeed = (seed: string) => {
  const hex = Uint8Array.from(Buffer.from(seed));
  const keyPair = nacl.sign.keyPair.fromSeed(hex.slice(0, 32));
  const account = new solanaWeb3.Account(keyPair.secretKey);
  return account;
};

const maskedAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 8)}...${address.slice(address.length - 8)}`;
};

export { generateMnemonic, mnemonicToSeed, accountFromSeed, maskedAddress };
