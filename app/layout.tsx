import Navbar from "@/components/Navbar";
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
    <html lang="en">
      <body className={`${bricolage.variable} antialiased relative min-h-screen w-screen h-screen overflow-y-auto`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' } }}>
          <Navbar />
          {children}
         
        </ClerkProvider>
      </body>
    </html>
  );
}
