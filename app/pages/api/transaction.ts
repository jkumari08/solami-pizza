// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { CONNECTION, MERCHANT_WALLET } from "@/src/util/const";
import { createTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";

type POST = {
  transaction: string;
  message: string;
};

type GET = {
  label: string;
  icon: string;
};

function getFromPayload(
  req: NextApiRequest,
  payload: string,
  field: string
): string {
  function parseError() {
    throw new Error(`${payload} parse error: missing ${field}`);
  }
  let value;
  if (payload === "Query") {
    if (!(field in req.query)) parseError();
    value = req.query[field];
  }
  if (payload === "Body") {
    if (!req.body || !(field in req.body)) parseError();
    value = req.body[field];
  }
  if (value === undefined || value.length === 0) parseError();
  return typeof value === "string" ? value : value[0];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return get(req, res);
  }

  if (req.method === "POST") {
    return post(req, res);
  }
}

const get = async (req: NextApiRequest, res: NextApiResponse<GET>) => {
  const label = "Valentin's Pizza";
  const icon =
    "https://media.discordapp.net/attachments/964525722301501477/978683590743302184/sol-logo1.png";

  res.status(200).json({
    label,
    icon,
  });
};

const post = async (req: NextApiRequest, res: NextApiResponse<POST>) => {
  try {
    const message = "Thanks for buying Valentin's pizza with USDC!";

    // Get account from body
    const account = req.body?.account;
    if (!account) {
      throw new Error("Missing account in request body");
    }

    const sender = new PublicKey(account);
    
    // Use default USDC mint and small amount for devnet demo
    const usdcMint = new PublicKey("EmXQ3SRJBt6j6SnCnqfnLmK3GEHMiA51msCft1r5num");
    const amount = new BigNumber(1000); // 0.001 USDC for devnet

    // Create a reference for this transaction (random UUID)
    const reference = new PublicKey(
      Buffer.concat([
        Buffer.from("solami"),
        Buffer.from(Math.random().toString().slice(2), "utf8"),
      ]).slice(0, 32)
    );

    // Create transfer configuration
    const transferConfig = {
      recipient: MERCHANT_WALLET,
      amount: amount,
      splToken: usdcMint,
      reference,
      memo: message,
    };

    // Create the transaction using Solana Pay
    const transaction = await createTransfer(CONNECTION, sender, transferConfig);

    // Get recent blockhash
    const { blockhash } = await CONNECTION.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender;

    // Serialize and return the unsigned transaction
    const serializedTransaction = transaction.serialize({
      verifySignatures: false,
      requireAllSignatures: false,
    });

    const base64Transaction = serializedTransaction.toString("base64");

    res.status(200).json({ transaction: base64Transaction, message });
  } catch (error) {
    console.error("Transaction creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ 
      transaction: "", 
      message: `Error: ${errorMessage}` 
    });
  }
};
