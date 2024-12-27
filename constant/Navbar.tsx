import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="absolute bg-white dark:bg-black left-0 right-0 top-0">
      <div className="p-3 mx-auto max-w-7xl border-b-[0.2px] navbar bg-opacity-10">
        <div className="flex-1">
          <Link href="/" className="text-xl flex gap-x-2 font-bold">
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
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
