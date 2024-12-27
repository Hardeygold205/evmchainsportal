import sql from "@/utils/db";
import { Wallet } from "ethers";

/**
 * Generates a new Ethereum wallet and stores it in the database.
 * @returns {Promise<Object>} The generated Ethereum wallet data.
 */

export const createEthWallet = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS eth_wallets (
      id SERIAL PRIMARY KEY,
      address VARCHAR(255) NOT NULL,
      private_key TEXT NOT NULL,
      mnemonic TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const wallet = Wallet.createRandom();

  if (!wallet.mnemonic) {
    throw new Error("Mnemonic generation failed.");
  }

  const newWallet = {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
    createdAt: new Date().toISOString(),
  };

  await sql`
    INSERT INTO eth_wallets (address, private_key, mnemonic, created_at)
    VALUES (${newWallet.address}, ${newWallet.privateKey}, ${newWallet.mnemonic}, ${newWallet.createdAt});
  `;

  return newWallet;
};
