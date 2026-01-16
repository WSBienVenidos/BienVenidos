import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fff6ec] px-6">
      <div className="w-full max-w-5xl">
        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
            Primer mes en Utah
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#12376c]">
            Apoyo inmediato y confiable para familias inmigrantes recién
            llegadas.
          </h1>
          <p className="mt-4 text-base text-[#1b3f7a]/70">
            Recursos esenciales en español — con dignidad, seguridad y pasos
            claros para comenzar.
          </p>
        </div>

        {/* 4 Big Action Containers */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 1 */}
          <Link
            href="/recursos"
            className="group rounded-[32px] border border-[#f4d3b2] bg-white p-10 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Necesito ayuda
            </h2>
            <p className="mt-3 text-sm text-[#1b3f7a]/70">
              Encuentra apoyo inmediato para alimentos, vivienda, salud,
              educación y más.
            </p>
            <span className="mt-6 inline-block font-semibold text-[#1aa1d5]">
              Ver recursos →
            </span>
          </Link>

          {/* 2 */}
          <Link
            href="/oferecer-ajuda"
            className="group rounded-[32px] border border-[#f4d3b2] bg-white p-10 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.35)] transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Quiero ayudar
            </h2>
            <p className="mt-3 text-sm text-[#1b3f7a]/70">
              Ofrece servicios, orientación o apoyo a familias recién llegadas.
            </p>
            <span className="mt-6 inline-block font-semibold text-[#1aa1d5]">
              Ofrecer ayuda →
            </span>
          </Link>

          {/* 3 */}
          <Link
            href="/assistente"
            className="group rounded-[32px] border border-[#f4d3b2] bg-[#fffaf4] p-10 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.25)] transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Asistente guiado
            </h2>
            <p className="mt-3 text-sm text-[#1b3f7a]/70">
              Dinos qué necesitas y recibe orientación paso a paso.
            </p>
            <span className="mt-6 inline-block font-semibold text-[#1aa1d5]">
              Comenzar →
            </span>
          </Link>

          {/* 4 */}
          <Link
            href="/comunidade"
            className="group rounded-[32px] border border-[#f4d3b2] bg-[#fffaf4] p-10 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.25)] transition hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-[#12376c]">
              Comunidad segura
            </h2>
            <p className="mt-3 text-sm text-[#1b3f7a]/70">
              Acceso solo por invitación para pedir u ofrecer ayuda con
              seguridad.
            </p>
            <span className="mt-6 inline-block font-semibold text-[#1aa1d5]">
              Entrar con invitación →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
