import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Import() {
  const tabs = [
    {
      name: "Enter secret recovery phrase",
      link: "/input",
      description:
        "Securely import your existing wallet using 12 or 24-word recovery phrase",
      image: "/Img2.svg",
    },
    {
      name: "Import Private Key",
      link: "/input-passkey",
      description:
        "Import a single-chain account (Support: Etheruem, Solana, Bitcoin, and others)",
      image: "/Img1.svg",
    },
  ];

  return (
    <div className="p-3 flex flex-col mt-16 lg:mt-0 lg:justify-center items-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="w-full sm:w-3/4 lg:w-[67%] max-w-md">
        <div className="mb-4">
          <Link href="/">
            <FontAwesomeIcon className="w-4" icon={faLeftLong} />
            <p className="p-0 text-[0.4rem]">BACK</p>
          </Link>
        </div>
        <div className="mb-4">
          <h1 className=" text-2xl font-bold">Use an existing wallet</h1>
          <p className="py-5">
            Select how you&apos;d like to access your existing wallet
          </p>
        </div>
        <div className="space-y-4">
          {tabs.map((tab, index) => (
            <Link
              href={tab.link}
              key={index}
              className="block p-5 outline outline-1 outline-gray-500 rounded-lg">
              <div className="flex justify-center justify-items-center gap-2">
                <div className="flex-1 w-11/12">
                  <h2 className=" text-lg font-semibold">{tab.name}</h2>
                  <p className="text-gray-400 mt-2">{tab.description}</p>
                </div>
                <div className="flex w-10">
                  <Image src={tab.image} alt={tab.name} className="w-full" width="10" height="10" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="mt-8 text-center">
          <p className=" text-2 font-bold">Link CoinBit Wallet mobile app</p>
        </div> */}
      </div>
    </div>
  );
}
