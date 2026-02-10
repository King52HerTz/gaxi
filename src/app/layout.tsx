import type { Metadata } from "next";
import { Courier_Prime, Noto_Serif_SC } from "next/font/google";
import localFont from "next/font/local";
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

const handwrittenFont = localFont({
  src: [
    {
      path: "./fonts/ZiYouLangManTi-2.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-custom-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "《轧戏》胡羞&肖稚宇",
  description: "《轧戏》胡羞与肖稚宇的同人收藏。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${courierPrime.variable} ${notoSerifSC.variable} ${handwrittenFont.variable} antialiased bg-deep-black text-warm-light overflow-x-hidden`}
      >
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
