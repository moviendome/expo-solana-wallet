import * as solanaWeb3 from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { accountFromSeed } from "../utils";

const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;

const SPL_TOKEN = "FyUYPbYiEFjC5LG4oYqdBfiA6PwgC78kbVyWAoYkwMTC";

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

const getConfirmedTransaction = async (signature: string) => {
  const connection = createConnection();
  const transaction = await connection.getParsedConfirmedTransaction(signature);
  return transaction;
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
  console.log("Executing transaction...");
  // console.log(amount);

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: publicKeyFromString(from.publicKey.toString()),
      toPubkey: publicKeyFromString(to),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  // // Sign transaction, broadcast, and confirm
  const connection = createConnection();
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from]
  );

  return signature;
};

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> {
  return (
    await solanaWeb3.PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
}

const getTokenBalance = async (publicKey: string, splToken: string) => {
  const connection = createConnection();

  const account = await findAssociatedTokenAddress(
    publicKeyFromString(publicKey),
    publicKeyFromString(splToken)
  );

  try {
    const balance = await connection.getTokenAccountBalance(
      publicKeyFromString(account.toString())
    );
    return balance.value.amount / LAMPORTS_PER_SOL;
  } catch (e) {
    return 0;
  }
};

export {
  LAMPORTS_PER_SOL,
  SPL_TOKEN,
  createConnection,
  getBalance,
  getConfirmedTransaction,
  getHistory,
  getSolanaPrice,
  publicKeyFromString,
  requestAirDrop,
  transaction,
  getTokenBalance,
};
