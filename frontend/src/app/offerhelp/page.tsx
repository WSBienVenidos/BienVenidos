"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * OFFER HELP PAGE (design-only) WITH CATEGORY FILTER GRID instead of one page per category
 * 
 * - Clicking a category filters the posts list
 * - "Todas" resets filter
 * - Still no API; mock data only
 */

type CategoryKey =
  | "alimentos"
  | "vivienda"
  | "asesoria_legal"
  | "transporte"
  | "escuela"
  | "un_amigo"
  | "doctor"
  | "telefono_movil"
  | "trabajo"
  | "cuenta_bancaria"
  | "ropa_muebles"
  | "iglesia";

type Category = {
  key: CategoryKey;
  title: string;
  emoji: string; // placeholder icon
  tone: "orange" | "yellow" | "purple" | "blue" | "green" | "pink" | "neutral";
};

const CATEGORIES: Category[] = [
  { key: "alimentos", title: "Alimentos", emoji: "🍱", tone: "orange" },
  { key: "vivienda", title: "Vivienda", emoji: "🏠", tone: "yellow" },
  { key: "asesoria_legal", title: "Asesoría legal", emoji: "⚖️", tone: "purple" },
  { key: "transporte", title: "Transporte", emoji: "🚌", tone: "blue" },
  { key: "escuela", title: "Escuela", emoji: "🏫", tone: "orange" },
  { key: "un_amigo", title: "Un amigo", emoji: "🙂", tone: "neutral" },
  { key: "doctor", title: "Doctor", emoji: "🧰", tone: "green" },
  { key: "telefono_movil", title: "Teléfono móvil", emoji: "📱", tone: "blue" },
  { key: "trabajo", title: "Trabajo", emoji: "💼", tone: "orange" },
  { key: "cuenta_bancaria", title: "Cuenta bancaria", emoji: "🏛️", tone: "green" },
  { key: "ropa_muebles", title: "Ropa y muebles", emoji: "👕", tone: "blue" },
  { key: "iglesia", title: "Iglesia", emoji: "⛪", tone: "pink" },
];

type Post = {
  id: string;
  category: CategoryKey;
  title: string;
  description: string;
  city: string;
  phone: string; // placeholder
  createdAt: string;
};

const mockPosts: Post[] = [
  {
    id: "p1",
    category: "alimentos",
    title: "Necesito apoyo con alimentos esta semana",
    description:
      "Llegamos hace poco. Busco un lugar seguro para conseguir alimentos básicos y orientación.",
    city: "South Jordan, UT",
    phone: "(801) 555-0133",
    createdAt: "Hoy",
  },
  {
    id: "p2",
    category: "alimentos",
    title: "Necesito apoyo con alimentos esta semana",
    description:
      "Llegamos hace poco. Busco un lugar seguro para conseguir alimentos básicos y orientación.",
    city: "South Jordan, UT",
    phone: "(801) 555-0133",
    createdAt: "Hoy",
  },
  {
    id: "p3",
    category: "vivienda",
    title: "Ayuda para encontrar alquiler accesible",
    description:
      "Somos una familia y necesitamos recomendaciones de apartamento o cuarto con buen precio.",
    city: "Draper, UT",
    phone: "(801) 555-0191",
    createdAt: "Ayer",
  },
  {
    id: "p4",
    category: "transporte",
    title: "Cómo ir al trabajo sin carro",
    description:
      "Necesito entender rutas de bus/Trax y opciones económicas para ir y volver del trabajo.",
    city: "Salt Lake City, UT",
    phone: "(385) 555-0108",
    createdAt: "Hace 2 días",
  },
  {
    id: "p5",
    category: "asesoria_legal",
    title: "Dudas sobre contrato y temas del día a día",
    description:
      "Busco orientación básica (no inmigración) sobre contrato de renta y derechos del consumidor.",
    city: "Lehi, UT",
    phone: "(801) 555-0177",
    createdAt: "Hace 3 días",
  },
  {
    id: "p6",
    category: "doctor",
    title: "Clínica de bajo costo para mi hijo",
    description:
      "Necesito información sobre clínicas accesibles y cómo agendar una cita.",
    city: "West Jordan, UT",
    phone: "(801) 555-0110",
    createdAt: "Hace 4 días",
  },
];

function toneClasses(tone: Category["tone"]) {
  switch (tone) {
    case "orange":
      return {
        bg: "bg-[#fff1e6]",
        ring: "ring-[#f28c28]/25",
        chipBg: "bg-[#f28c28]/12",
        border: "border-[#f4d3b2]",
        icon: "text-[#f28c28]",
      };
    case "yellow":
      return {
        bg: "bg-[#fff6da]",
        ring: "ring-[#f6c343]/25",
        chipBg: "bg-[#f6c343]/15",
        border: "border-[#f4d3b2]",
        icon: "text-[#f6c343]",
      };
    case "purple":
      return {
        bg: "bg-[#f5eaff]",
        ring: "ring-[#6e03b5]/18",
        chipBg: "bg-[#6e03b5]/10",
        border: "border-[#e6cff8]",
        icon: "text-[#6e03b5]",
      };
    case "blue":
      return {
        bg: "bg-[#e9f7ff]",
        ring: "ring-[#1aa1d5]/20",
        chipBg: "bg-[#1aa1d5]/10",
        border: "border-[#cfe8f3]",
        icon: "text-[#1aa1d5]",
      };
    case "green":
      return {
        bg: "bg-[#eaf8ea]",
        ring: "ring-[#2e7d32]/18",
        chipBg: "bg-[#2e7d32]/10",
        border: "border-[#d3edd5]",
        icon: "text-[#2e7d32]",
      };
    case "pink":
      return {
        bg: "bg-[#fbe8f2]",
        ring: "ring-[#e4528c]/18",
        chipBg: "bg-[#e4528c]/10",
        border: "border-[#f6cfe0]",
        icon: "text-[#e4528c]",
      };
    default:
      return {
        bg: "bg-white/70",
        ring: "ring-[#12376c]/10",
        chipBg: "bg-[#12376c]/6",
        border: "border-[#f4d3b2]",
        icon: "text-[#12376c]",
      };
  }
}

export default function OfrecerAyudaPage() {
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Reply form (design-only)
  const [helperName, setHelperName] = useState("");
  const [helperContact, setHelperContact] = useState("");
  const [message, setMessage] = useState("");
  const [submittedFor, setSubmittedFor] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    const list = filter === "all" ? mockPosts : mockPosts.filter(p => p.category === filter);
    return list;
  }, [filter]);

  const selectedPost = useMemo(() => {
    return mockPosts.find(p => p.id === selectedPostId) ?? null;
  }, [selectedPostId]);

  function openReply(postId: string) {
    setSelectedPostId(postId);
    setSubmittedFor(null);
    setMessage("");
  }

  function submitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPostId) return;
    setSubmittedFor(selectedPostId);
    // TODO later (team): send to API
  }

  function categoryLabel(key: CategoryKey | "all") {
    if (key === "all") return "Todas";
    return CATEGORIES.find(c => c.key === key)?.title ?? "Categoría";
  }

  return (
    <div className="w-full">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
            Comunidad segura
          </div>
          <h1 className="mt-3 text-4xl font-semibold text-[#12376c]">
            Ofrecer ayuda
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#1b3f7a]/70">
            Filtra por categoría y elige a quién quieres ayudar. Evita pedir documentos
            o información sensible.
          </p>
        </div>

        <Link
          href="/users"
          className="rounded-full border border-[#f4d3b2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
        >
          Regresar
        </Link>
      </div>

      {/* Category filter grid */}
      <div className="mt-8 rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">
              Filtrar por categoría
            </div>
            <div className="mt-1 text-sm text-[#1b3f7a]/70">
              Seleccionada:{" "}
              <span className="font-semibold text-[#12376c]">{categoryLabel(filter)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFilter("all")}
            className={[
              "rounded-full border bg-[#fff6ec] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition",
              filter === "all"
                ? "border-[#f28c28] text-[#12376c] ring-4 ring-[#f28c28]/15"
                : "border-[#f4d3b2] text-[#12376c] hover:-translate-y-0.5 hover:border-[#f28c28]",
            ].join(" ")}
          >
            Todas
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {CATEGORIES.map(cat => {
            const t = toneClasses(cat.tone);
            const isSelected = filter === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilter(cat.key)}
                className={[
                  "group relative overflow-hidden rounded-[28px] border p-6 text-left transition",
                  "hover:-translate-y-0.5",
                  t.bg,
                  t.border,
                  isSelected ? "ring-4" : "ring-0",
                  isSelected ? t.ring : "ring-transparent",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div className={["grid h-12 w-12 place-items-center rounded-2xl", t.chipBg].join(" ")}>
                    <span className={["text-2xl", t.icon].join(" ")}>{cat.emoji}</span>
                  </div>
                  <div className="text-xl font-semibold text-[#12376c]">{cat.title}</div>
                </div>

                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/35 blur-2xl opacity-70 transition group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </div>

      {/* List + reply */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Posts */}
        <section className="space-y-6">
          <div className="rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">
                  Publicaciones
                </div>
                <div className="mt-1 text-sm text-[#1b3f7a]/70">
                  Mostrando {filteredPosts.length} resultado(s)
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {filteredPosts.map(post => {
                const cat = CATEGORIES.find(c => c.key === post.category);
                const tone = cat ? toneClasses(cat.tone) : toneClasses("neutral");
                const isActive = post.id === selectedPostId;

                return (
                  <div
                    key={post.id}
                    className={[
                      "rounded-[28px] border bg-[#fffaf4] p-5 transition",
                      "hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-40px_rgba(15,42,78,0.25)]",
                      isActive ? "ring-4 ring-[#1aa1d5]/25" : "ring-0 ring-transparent",
                      "border-[#f4d3b2]",
                    ].join(" ")}
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 rounded-2xl border border-[#e6dccf] bg-white/70 grid place-items-center text-xs font-semibold text-[#1b3f7a]/50">
                        Picture
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-xl font-semibold text-[#12376c]">
                              {post.title}
                            </div>
                            <div className="mt-1 text-sm text-[#1b3f7a]/70">
                              {post.description}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div
                              className={[
                                "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
                                tone.chipBg,
                              ].join(" ")}
                              style={{ borderColor: "#f4d3b2" }}
                            >
                              {cat?.title ?? "Categoría"}
                            </div>
                            <div className="text-xs text-[#1b3f7a]/55">{post.createdAt}</div>
                          </div>
                        </div>

                        <div className="mt-3 space-y-1 text-sm text-[#1b3f7a]/75">
                          <div>
                            <span className="font-semibold text-[#12376c]">Dirección:</span>{" "}
                            {post.city}
                          </div>
                          <div>
                            <span className="font-semibold text-[#12376c]">Teléfono:</span>{" "}
                            {post.phone}
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs text-[#1b3f7a]/65">
                            Envía una respuesta clara y respetuosa.
                          </p>

                          <button
                            type="button"
                            onClick={() => openReply(post.id)}
                            className="rounded-full bg-[#f28c28] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_12px_30px_-18px_rgba(242,140,40,0.7)] transition hover:-translate-y-0.5 hover:bg-[#ff9b3b]"
                          >
                            Ofrecer ayuda
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4 text-sm text-[#1b3f7a]/70">
                  No hay publicaciones en esta categoría todavía.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Reply panel */}
        <aside className="lg:sticky lg:top-6">
          <div className="rounded-[28px] border border-[#f4d3b2] bg-white p-6 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
              Responder
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[#12376c]">
              Enviar mensaje
            </h2>
            <p className="mt-2 text-sm text-[#1b3f7a]/70">
              {selectedPost
                ? "Tu mensaje se enviará a la persona que pidió ayuda."
                : "Selecciona una publicación para responder."}
            </p>

            <div className="mt-6 rounded-2xl border border-[#f4d3b2] bg-[#fff6ec] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">
                Publicación seleccionada
              </div>
              <div className="mt-2 text-sm font-semibold text-[#12376c]">
                {selectedPost ? selectedPost.title : "Ninguna"}
              </div>
              <div className="mt-1 text-xs text-[#1b3f7a]/70">
                {selectedPost ? selectedPost.city : "—"}
              </div>
            </div>

            <form onSubmit={submitReply} className="mt-6 space-y-4">
              <label className="block text-sm text-[#1b3f7a]">
                Tu nombre
                <input
                  value={helperName}
                  onChange={e => setHelperName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                  placeholder="Ej: Maria"
                />
              </label>

              <label className="block text-sm text-[#1b3f7a]">
                ¿Cómo pueden contactarte?
                <input
                  value={helperContact}
                  onChange={e => setHelperContact(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                  placeholder="Ej: WhatsApp, teléfono o email"
                />
              </label>

              <label className="block text-sm text-[#1b3f7a]">
                Mensaje
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="mt-2 min-h-[120px] w-full resize-y rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                  placeholder="Escribe cómo puedes ayudar y cuáles son los próximos pasos..."
                />
              </label>

              {submittedFor && submittedFor === selectedPostId ? (
                <div className="rounded-2xl border border-[#d3edd5] bg-[#eaf8ea] p-4 text-sm text-[#2e7d32]">
                  Mensaje enviado (design-only). Más adelante conectaremos con el backend.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!selectedPostId}
                className={[
                  "mt-2 w-full rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition",
                  !selectedPostId
                    ? "cursor-not-allowed bg-[#1aa1d5]/40"
                    : "bg-[#1aa1d5] shadow-[0_12px_30px_-18px_rgba(26,161,213,0.7)] hover:-translate-y-0.5 hover:bg-[#21b4e4]",
                ].join(" ")}
              >
                Enviar
              </button>

              <p className="text-xs text-[#1b3f7a]/65">
                Evita pedir documentos. Mantén el apoyo práctico y seguro.
              </p>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
