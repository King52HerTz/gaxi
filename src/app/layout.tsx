import type { Metadata } from "next";
import { Courier_Prime, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hu Xiu & Xiao Zhiyu | The Script is Fiction, The Love is Real",
  description: "A fan collection for the couple Hu Xiu and Xiao Zhiyu from Double Booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${courierPrime.variable} ${notoSerifSC.variable} antialiased bg-deep-black text-warm-light overflow-x-hidden`}
      >
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
