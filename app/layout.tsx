import Navbar from "@/components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' } }}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <DotPattern
            className="absolute inset-0 opacity-40"
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
          />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
