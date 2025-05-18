"use client"

import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Image from "next/image";
import cat from "@/public/cat-easter-egg/cat.webp";
import catBlink from "@/public/cat-easter-egg/cat-blink.webp";
import { useSearchParams } from "next/navigation";

export default function CatEasterEgg() {
  const searchParams = useSearchParams();
  const [showCat, setShowCat] = useState(searchParams.has("cat") && searchParams.get("cat") !== "false");
  const [isBlinking, setIsBlinking] = useState(false);
  const [shownMessage, setShownMessage] = useState("");
  useHotkeys('ctrl+alt+tab', () => setShowCat(!showCat), [showCat])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      const timeout = setTimeout(() => {
        setIsBlinking(false);
      }, 400);
      return () => clearTimeout(timeout);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  function handlePet() {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 600);
    const messages = ["meow", "mrow", "mrrp"];
    setShownMessage(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => {
      setShownMessage("");
    }, 1500);
  }

  return (
    <div className="fixed bottom-0 right-4 z-50">
      {showCat && (
        <div>
          {shownMessage !== "" && <p className="bg-slate-300 dark:bg-slate-700 p-2 rounded-3xl text-center w-3/4">{shownMessage}</p>}
          <button onClick={() => handlePet()}>
            <Image src={isBlinking ? catBlink : cat} alt="A cat drawing!" width={200} height={200} />
          </button>
        </div>
      )}
    </div>
  )
}