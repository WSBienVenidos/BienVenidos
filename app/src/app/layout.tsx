import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BienVenidos",
  description: "Landing, login, and sign in pages for BienVenidos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <header className="border-b border-[#f4d3b2] bg-white/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link className="flex items-center" href="/">
                <Image
                  src="/logo.png"
                  alt="Bienvenidos"
                  width={160}
                  height={64}
                  priority
                />
              </Link>
              <Link
                className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1b3f7a] transition hover:text-[#0f2d57]"
                href="/login"
              >
                Iniciar sesión
              </Link>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-6 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
