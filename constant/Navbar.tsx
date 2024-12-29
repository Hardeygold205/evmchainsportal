import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="absolute bg-white dark:bg-black left-0 right-0 top-0">
      <div className="p-3 mx-auto items-center flex max-w-7xl border-b-[0.2px] navbar bg-opacity-10">
        <div className="flex-1">
          <Link href="/" className="md:text-xl text-md items-center flex gap-x-2 font-bold">
            <Image
              width="10"
              height="10"
              src="/free-coinbase-9420774-7651204.webp"
              alt="Coinbase Logo"
              className="w-7 h-7"
            />
            EVMChainsPortal
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/import" className="md:btn btn-sm md:bg-blue-500 text-white md:text-white bg-blue-500 p-1 md:px-5 rounded-lg md:rounded-full">
            Connect Wallet
          </Link>
        </div>
      </div>
    </div>
  );
}
