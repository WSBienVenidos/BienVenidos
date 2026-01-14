import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-[-140px] -z-10 h-[360px] bg-[radial-gradient(circle_at_left,rgba(242,140,40,0.35),transparent_62%)]" />
      <div className="absolute right-[-140px] top-[140px] -z-10 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(26,161,213,0.35),transparent_65%)]" />

      <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">
            Primer mes en Utah
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[#12376c] sm:text-5xl">
            Apoyo inmediato y confiable para familias inmigrantes recién
            llegadas.
          </h1>
          <p className="text-lg leading-relaxed text-[#1b3f7a]/80">
            Bienvenidos es una plataforma en español con recursos esenciales
            para alimentos, vivienda, salud, ayuda legal y trámites básicos,
            todo sin necesidad de cuenta.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-[#f28c28] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(242,140,40,0.8)] transition hover:-translate-y-0.5 hover:bg-[#f6a146]"
              href="#recursos"
            >
              Ver recursos
            </Link>
            <Link
              className="rounded-full border border-[#1b3f7a]/30 px-6 py-3 text-sm font-semibold text-[#1b3f7a] transition hover:-translate-y-0.5 hover:border-[#1b3f7a] hover:text-[#0f2d57]"
              href="/login"
            >
              Comunidad con invitación
            </Link>
          </div>
          <div className="grid gap-6 text-sm text-[#1b3f7a]/70 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-semibold text-[#12376c]">0</p>
              <p>Datos migratorios requeridos</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#12376c]">2</p>
              <p>Espacios comunitarios seguros</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#12376c]">30</p>
              <p>Días de apoyo prioritario</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_30px_120px_-50px_rgba(26,161,213,0.45)]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#f7e2cc] bg-[#fff6ec] p-5">
              <p className="text-sm text-[#1b3f7a]/70">Asistente guiado</p>
              <p className="mt-2 text-xl font-semibold text-[#12376c]">
                “Cuéntanos qué necesitas y te guiamos paso a paso.”
              </p>
              <p className="mt-1 text-sm text-[#1b3f7a]/70">
                Conversación tipo chat, sin formularios largos.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e9d6f0] bg-[#fff6ec] p-5">
              <p className="text-sm text-[#1b3f7a]/70">Comunidad privada</p>
              <p className="mt-2 text-xl font-semibold text-[#12376c]">
                Necesito Ayuda · Quiero Ayudar
              </p>
              <p className="mt-1 text-sm text-[#1b3f7a]/70">
                Acceso solo por invitación para mantener confianza y seguridad.
              </p>
            </div>
            <div className="rounded-2xl border border-[#f8dfd2] bg-[#fff6ec] p-5">
              <p className="text-sm text-[#1b3f7a]/70">Protección</p>
              <p className="mt-2 text-xl font-semibold text-[#12376c]">
                Datos mínimos, máxima dignidad
              </p>
              <p className="mt-1 text-sm text-[#1b3f7a]/70">
                Enfoque en el primer mes, con reglas claras contra abuso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="mt-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl font-semibold text-[#12376c]">
            Recursos inmediatos (sin cuenta)
          </h2>
          <p className="max-w-xl text-sm text-[#1b3f7a]/70">
            Encuentra ayuda confiable para lo urgente, en español y con pasos
            claros.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Alimentos y despensas",
              body: "Direcciones, horarios y requisitos mínimos.",
            },
            {
              title: "Vivienda segura",
              body: "Refugios, renta temporal y orientación básica.",
            },
            {
              title: "Ayuda legal",
              body: "Organizaciones confiables y líneas de apoyo.",
            },
            {
              title: "Salud y primeros auxilios",
              body: "Clínicas, vacunas y guías esenciales.",
            },
            {
              title: "Teléfono y bancos",
              body: "Cómo activar servicios y abrir cuentas básicas.",
            },
            {
              title: "Escuela para niños",
              body: "Inscripción rápida y documentos necesarios.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#f4d3b2] bg-white p-6 text-[#12376c] shadow-[0_18px_40px_-32px_rgba(244,211,178,0.8)]"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[#1b3f7a]/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[32px] border border-[#f4d3b2] bg-gradient-to-r from-[#fff1e4] via-white to-[#f3f6ff] p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-3">
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Comunidad con invitación para apoyo seguro
            </h2>
            <p className="text-sm text-[#1b3f7a]/70">
              Comparte necesidades o ofrece ayuda con publicaciones guiadas y
              reglas claras para prevenir explotación.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-[#1aa1d5] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(26,161,213,0.7)] transition hover:-translate-y-0.5 hover:bg-[#21b4e4]"
              href="/login"
            >
              Entrar con invitación
            </Link>
            <Link
              className="rounded-full border border-[#1b3f7a]/30 px-6 py-3 text-sm font-semibold text-[#1b3f7a] transition hover:-translate-y-0.5 hover:border-[#1b3f7a] hover:text-[#0f2d57]"
              href="/sign-in"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
