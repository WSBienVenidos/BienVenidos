import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[32px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-50px_rgba(26,161,213,0.35)]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/70">
            BienVenidos
          </p>
          <h1 className="text-3xl font-semibold text-[#12376c]">
            Iniciar sesión
          </h1>
          <p className="text-sm text-[#1b3f7a]/70">
            Acceso con invitación para mantener seguridad y confianza.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <label className="block text-sm text-[#1b3f7a]">
            Correo electrónico
            <input
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
              placeholder="tucorreo@bienvenidos.com"
              type="email"
            />
          </label>
          <label className="block text-sm text-[#1b3f7a]">
            Contraseña
            <input
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
              placeholder="••••••••"
              type="password"
            />
          </label>
          <label className="block text-sm text-[#1b3f7a]">
            Código de invitación
            <input
              className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
              placeholder="INV-2026"
              type="text"
            />
          </label>
          <button
            className="w-full rounded-full bg-[#1aa1d5] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(26,161,213,0.7)] transition hover:-translate-y-0.5 hover:bg-[#21b4e4]"
            type="button"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-[#1b3f7a]/70">
          ¿No tienes cuenta?{" "}
          <Link
            className="font-semibold text-[#e4528c] hover:text-[#c93f75]"
            href="/sign-in"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
