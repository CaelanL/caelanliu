import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-sydney-serif",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  description: "A private transmission.",
  robots: {
    follow: false,
    index: false,
    nocache: true,
  },
  title: "Private transmission",
};

export default function InviteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={cormorant.variable}>{children}</div>;
}
