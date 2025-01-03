"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();
  const isInputPage = pathname === "/input" || pathname === "/input-passkey" || pathname === "/submit";

  return (
    <div className="absolute bg-white dark:bg-black left-0 right-0 top-0">
      <div className="p-3 mx-auto items-center flex max-w-7xl border-b-[0.2px] navbar bg-opacity-10">
        <div className="flex-1">
          <Link
            href="/"
            className="custom:text-xl text-md items-center flex gap-x-1 custom:gap-x-2 font-bold">
            <Image
              width="10"
              height="10"
              src="/free-coinbase-9420774-7651204.webp"
              alt="Coinbase Logo"
              className="w-5 custom:h-7 custom:w-7 h-5"
            />
            EVMChainsPortal
          </Link>
        </div>
        <div className="flex-none">
          {isInputPage ? (
            <button type="button" className="md:btn btn-sm text-gray-300 bg-gray-700 md:px-5 rounded-lg md:rounded-full md:cursor-not-allowed cursor-not-allowed">
              Connecting...
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                router.push("/import");
              }}
              className="md:btn btn-sm md:bg-blue-500 text-white md:text-white bg-blue-500 rounded-lg md:rounded-full">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
