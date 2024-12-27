"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CreateWallet() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [walletType, setWalletType] = useState<"ETH" | "TON">("ETH");
  const router = useRouter();

  const createWallet = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const endpoint =
        walletType === "TON"
          ? "/api/create-ton-wallet"
          : "/api/create-eth-wallet";

      const response = await axios.post(`${endpoint}`);

      setTimeout(() => {
        if (response.data.success) {
          router.push(
            `/new-wallet?wallet=${encodeURIComponent(response.data.wallet)}`
          );
        } else {
          setErrorMessage(response.data.message || "Error creating wallet");
          setLoading(false);
        }
      }, 3500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setTimeout(() => {
        setErrorMessage("Server error: " + error.message);
        setLoading(false);
      }, 3500);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen text-black dark:text-white">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <h1 className="mt-4">Please wait...</h1>
        </div>
      ) : (
        <div className="p-3 flex flex-col mt-16 lg:mt-0 lg:justify-center items-center min-h-screen w-full space-y-5">
          <div className="w-full sm:w-3/4 lg:w-[67%] max-w-md">
            <div className="mb-14 p-3">
              <Link href="/">
                <FontAwesomeIcon icon={faLeftLong} />
                <p className="p-0 text-[0.4rem]">BACK</p>
              </Link>
            </div>
            <div className="w-full justify-center flex flex-col items-center space-y-3 p-3">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Select Wallet Type
                </label>
                <select
                  className="mt-2 select select-info w-full"
                  value={walletType}
                  onChange={(e) =>
                    setWalletType(e.target.value as "ETH" | "TON")
                  }>
                  <option value="ETH">EVM-Compatible Wallets</option>
                  <option value="TON">TON Wallet</option>
                </select>
              </div>
              <button
                className="btn py-2 rounded-full w-full text-center bg-white hover:bg-white/50"
                onClick={createWallet}>
                {loading ? "Creating Wallet" : "Create New Wallet"}
              </button>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
