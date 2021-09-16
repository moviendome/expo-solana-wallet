import * as solanaWeb3 from "@solana/web3.js";

import { accountFromSeed } from "../utils";

const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;
//
const createConnection = () => {
  return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
};

const getBalance = async (publicKey) => {
  const connection = createConnection();
  const _publicKey = publicKeyFromString(publicKey);

  const lamports = await connection.getBalance(_publicKey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  const sol = lamports / LAMPORTS_PER_SOL;
  return sol;
};

const getHistory = async (publicKeyString, options = { limit: 20 }) => {
  const connection = createConnection();
  const history = await connection.getConfirmedSignaturesForAddress2(
    publicKeyFromString(publicKeyString),
    options
  );

  return history;
};

const getSolanaPrice = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data.solana.usd;
};

const requestAirDrop = async (publicKeyString: string) => {
  const connection = createConnection();

  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKeyString),
    LAMPORTS_PER_SOL
  );

  const signature = await connection.confirmTransaction(airdropSignature);
  return signature;
};

const publicKeyFromString = (publicKeyString: string) => {
  return new solanaWeb3.PublicKey(publicKeyString);
};

const transaction = async (from, to, amount) => {
  const account = accountFromSeed(from.seed);

  console.log("Executing transaction...");
  console.log(amount);

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKeyFromString(from.account),
      toPubkey: publicKeyFromString(to),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction, broadcast, and confirm
  const connection = createConnection();
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [account]
  );
  console.log("SIGNATURE", signature);
};

export {
  LAMPORTS_PER_SOL,
  createConnection,
  getBalance,
  getHistory,
  getSolanaPrice,
  publicKeyFromString,
  requestAirDrop,
  transaction,
};
