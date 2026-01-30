import Link from "next/link";
import type { Category, Resource } from "../_data";

const placeholderImage = "Picture";

type CategoryTemplateProps = {
  category: Category;
  resources: Resource[];
};

export default function CategoryTemplate({ category, resources }: CategoryTemplateProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
          Categoría
        </div>
        <Link
          href="/"
          className="rounded-full border border-[#f4d3b2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
        >
          Volver
        </Link>
      </div>

      <h1 className="mt-4 text-4xl font-semibold text-[#12376c]">
        {category.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#1b3f7a]/70">
        Recursos sugeridos para empezar con paso seguro. Si conoces otro lugar útil,
        compártelo abajo.
      </p>

      <div className="mt-8 rounded-[32px] border border-[#f4d3b2] bg-[#fff6ec] p-6 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
        <div className="space-y-5">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="flex gap-4 rounded-[26px] border border-[#e6dccf] bg-white/80 p-5"
            >
              <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-2xl border border-[#e6dccf] bg-white/70 text-xs font-semibold text-[#1b3f7a]/50">
                {placeholderImage}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-[#12376c]">
                  {resource.title}
                </div>
                <p className="mt-1 text-sm text-[#1b3f7a]/70">
                  {resource.description}
                </p>
                <div className="mt-2 text-sm text-[#1b3f7a]/75">
                  <div>
                    <span className="font-semibold text-[#12376c]">Dirección:</span>{" "}
                    {resource.address}
                  </div>
                  <div>
                    <span className="font-semibold text-[#12376c]">Teléfono:</span>{" "}
                    {resource.phone}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-dashed border-[#e0cbb7] bg-white/70 p-5">
          <div className="text-sm text-[#1b3f7a]/75">
            ¿Conoces otro lugar? Cuéntanos.
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Comparte el nombre del lugar"
              className="h-12 w-full rounded-full border border-[#f1d0ae] bg-[#fff6ec] px-4 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
            />
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#f28c28] px-6 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_12px_30px_-18px_rgba(242,140,40,0.7)] transition hover:-translate-y-0.5 hover:bg-[#ff9b3b]"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
