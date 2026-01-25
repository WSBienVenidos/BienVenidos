export default function LandingPage() {
  return (
    <section className="relative overflow-hidden rounded-[44px] border border-[#f4d3b2] bg-[#fff6ec] px-6 py-12 sm:px-10">
      <div className="absolute -left-24 top-[-120px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(250,172,66,0.45),transparent_65%)]" />
      <div className="absolute -right-20 bottom-[-120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(26,161,213,0.35),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-5xl space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">
            Primer mes en Utah
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[#12376c] sm:text-5xl">
            Elige el apoyo que necesitas hoy.
          </h1>
          <p className="text-base text-[#1b3f7a]/70">
            Seis tarjetas esenciales en un tablero bento para empezar con paso
            seguro.
          </p>
        </div>

        <div className="grid auto-rows-[150px] gap-6 md:grid-cols-6 md:auto-rows-[170px]">
          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_25px_60px_-45px_rgba(26,161,213,0.45)] transition hover:-translate-y-1 md:col-span-3 md:row-span-2">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe2c5]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#f28c28]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12h16M7 7h10M7 17h10" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 01
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">food</h2>
          </div>

          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_22px_45px_-40px_rgba(242,140,40,0.4)] transition hover:-translate-y-1 md:col-span-3">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fdeac9]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#f28c28]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 11l8-6 8 6v8H4z" />
                  <path d="M9 19v-6h6v6" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 02
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              housing
            </h2>
          </div>

          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#e9d6f0] bg-[#fff9f4] p-6 shadow-[0_20px_45px_-40px_rgba(153,82,170,0.35)] transition hover:-translate-y-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6dff4]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#8c4ab4]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 8h10M9 12h6M5 18h14" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 03
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              legal advisement
            </h2>
          </div>

          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#cfe5ec] bg-white p-6 shadow-[0_20px_45px_-40px_rgba(26,161,213,0.35)] transition hover:-translate-y-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dff1f7]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#1aa1d5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 16h14M7 12h10M9 8h6" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 04
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              transport
            </h2>
          </div>

          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_20px_45px_-40px_rgba(242,140,40,0.35)] transition hover:-translate-y-1 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe2c5]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#f28c28]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 19V7h12v12" />
                  <path d="M9 7V5h6v2" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 05
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">school</h2>
          </div>

          <div className="group flex h-full flex-col justify-between rounded-[28px] border border-[#f4d3b2] bg-gradient-to-br from-[#fff] via-[#fff5ea] to-[#f3fbff] p-6 shadow-[0_20px_50px_-42px_rgba(26,161,213,0.35)] transition hover:-translate-y-1 md:col-span-4">
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f3ff]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-[#1a74b8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 13c1.5 1.5 4.5 1.5 6 0" />
                  <path d="M5 9h14M9 9V6h6v3" />
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1b3f7a]/40">
                Bento 06
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#12376c]">
              a friend
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
