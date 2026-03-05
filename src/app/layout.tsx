import type { Metadata } from "next";
import { Jost } from "next/font/google";

import "./globals.css";

const font = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Assignment Builder",
};

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
