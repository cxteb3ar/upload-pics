"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeChanger from "@/components/theme-changer";
import AOS from "aos";

import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";

export default function MainContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 0,
      once: false,
      offset: 50,
    });

    setIsMounted(true);
  }, []);

  return (
    <SessionProvider>
      <header className="relative z-[9999]">
        <ThemeChanger />
      </header>
      <main
        id="app-main-content"
        className={clsx(
          `flex h-full max-h-full w-full flex-col items-center justify-center`,
        )}
      >
        {children}
      </main>
    </SessionProvider>
  );
}
