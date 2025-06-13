import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "./(ui)/header";
import CatEasterEgg from "./(ui)/cateasteregg.module";
import { Suspense } from "react";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Visiorganize",
    template: "%s • Visiorganize",
  },
  description: "An app for organizing software development projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Header />
        {children}
        <Suspense>
          <CatEasterEgg />
        </Suspense>
      </body>
    </html>
  );
}
