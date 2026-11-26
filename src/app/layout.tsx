import type { Metadata, Viewport } from "next";
import { SerwistProvider } from "./serwist-provider";
import "./globals.css";

export const metadata: Metadata = { title: "Gear Vault" };
export const viewport: Viewport = { themeColor: "#0b0f0e" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
      </body>
    </html>
  );
}
