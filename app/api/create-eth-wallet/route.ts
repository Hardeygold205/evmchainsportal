import { NextResponse } from "next/server";
import { createEthWallet } from "@/utils/walletHelpers";

export async function POST() {
  try {
    const newWallet = await createEthWallet();
    return NextResponse.json({ success: true, wallet: newWallet });
  } catch (error) {
    console.error("Error creating Ethereum wallet:", error);
    return NextResponse.json(
      { success: false, message: "Error creating Ethereum wallet" },
      { status: 500 }
    );
  }
}
