import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

import NavHeader from "./components/NavHeader";

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "Radical",
  description: "A web app to track your favourite books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`flex ${lato.className}`}>
        <NavHeader />
        <main className="flex flex-1 min-h-[calc(100vh - 74px)] w-full lg:ml-[81px] mt-[74px] flex-col items-center p-[14px] xs:px-6 sm:px-24 lg:p-14 xl:p-24 pt-[55px]">
          {children}
        </main>
      </body>
    </html>
  );
}
