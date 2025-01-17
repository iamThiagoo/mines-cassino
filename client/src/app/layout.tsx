import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import Footer from "@/components/layout/footer/footer";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header/header";
import { UserProvider } from "@/context/user.context";
import { GameProvider } from "@/context/game.context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-background`}>
        <UserProvider>
          <GameProvider>
            <Header />
            <main className="container flex justify-center mx-auto max-w-7xl min-h-[calc(100vh-90px)]">
              <section className="sm:pt-6 pb-14 py-10 sm:py-20 w-full relative flex-col overflow-hidden flex justify-center">
                {children}
                <Footer />
              </section>
            </main>
            <Toaster />
          </GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}
