import type { Metadata } from "next";
import dynamic from "next/dynamic";
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

// Load header client components dynamically (Next will treat client component correctly)
const HeaderAuth = dynamic(() => import("@/components/HeaderAuth"));
const HeaderLogoLink = dynamic(() => import("@/components/HeaderLogoLink"));

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
        <div className="flex min-h-screen flex-col bg-white text-[var(--foreground)]">
          <header className="border-b border-[#f4d3b2] bg-white/70 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <HeaderLogoLink />
              {/* HeaderAuth is a client component; render it (dynamically imported above) */}
              <div className="flex items-center gap-4">
                <HeaderAuth />
              </div>
            </div>
          </header>
          <div className="flex w-full flex-1 bg-[var(--background)]">
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-12 pb-12">
              {children}
            </main>
          </div>
          <footer className="relative mt-auto border-t border-[#f4d3b2] bg-white py-8 text-sm text-[#1b3f7a]/70">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:items-center">
              <div className="text-center text-xs font-medium text-[#1b3f7a]/60 sm:text-left">
                <p>© 2026 BienVenidos. Todos los derechos reservados.</p>
                <p className="mt-2">
                  Proudly developed by:{" "}
                  <a className="underline hover:text-[#12376c]" href="https://www.linkedin.com/in/angelacieslak" target="_blank" rel="noreferrer">Angela Cieslak</a>,{" "}
                  <a className="underline hover:text-[#12376c]" href="https://www.linkedin.com/in/ruan-meneguello-61a567b3/" target="_blank" rel="noreferrer">Ruan Meneguello</a>,{" "}
                  <a className="underline hover:text-[#12376c]" href="https://www.linkedin.com/in/thomasnixonneves/" target="_blank" rel="noreferrer">Thomas Nixon</a>,{" "}
                  <a className="underline hover:text-[#12376c]" href="https://www.linkedin.com/in/juliolemosacc/" target="_blank" rel="noreferrer">Julio Lemos</a>{" "}
                  and{" "}
                  <a className="underline hover:text-[#12376c]" href="https://www.linkedin.com/in/eliam-mputu/" target="_blank" rel="noreferrer">Eliam Mputu</a>.
                </p>
              </div>
              <div className="relative flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/50">
                  Confianza
                </p>
                <input id="privacy-toggle" type="checkbox" className="peer sr-only" />
                <label
                  htmlFor="privacy-toggle"
                  className="inline-flex items-center justify-center rounded-full border border-[#f4d3b2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
                >
                  Politica de privacidad
                </label>

                <div className="pointer-events-none fixed inset-0 z-40 bg-black/40 opacity-0 transition peer-checked:pointer-events-auto peer-checked:opacity-100">
                  <label
                    htmlFor="privacy-toggle"
                    className="absolute inset-0"
                    aria-hidden="true"
                  />
                </div>

                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 opacity-0 transition peer-checked:pointer-events-auto peer-checked:opacity-100">
                  <div className="w-full max-w-2xl translate-y-6 rounded-[28px] border border-[#f4d3b2] bg-white p-6 text-left shadow-[0_30px_80px_-50px_rgba(15,42,78,0.6)] transition peer-checked:translate-y-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#12376c]">
                        Privacidad y seguridad
                      </h3>
                      <label
                        htmlFor="privacy-toggle"
                        className="cursor-pointer rounded-full border border-[#f4d3b2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#12376c]"
                      >
                        Cerrar
                      </label>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-[#1b3f7a]/80">
                      <p>
                        Queremos que te sientas seguro. Esta plataforma fue creada
                        para apoyar a familias recien llegadas sin pedir informacion
                        sensible.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex gap-2">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#f28c28]" />
                          No solicitamos estatus migratorio ni documentos personales.
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#1aa1d5]" />
                          Puedes explorar recursos sin crear cuenta.
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#6e03b5]" />
                          Compartimos solo lo necesario para conectarte con ayuda.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
