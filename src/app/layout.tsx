import type { Metadata, Viewport } from "next";
import { Barlow_Condensed } from "next/font/google";
import { SerwistProvider } from "./serwist-provider";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
});

export const metadata: Metadata = { title: "Gear Vault" };
export const viewport: Viewport = { themeColor: "#0b0f0e" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={barlow.variable}>
      <body className="antialiased">
        <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
      </body>
    </html>
  );
}
