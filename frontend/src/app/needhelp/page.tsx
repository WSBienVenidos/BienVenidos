"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * NEED HELP PAGE (design-only, no API, no redirects)
 * 
 * - Simple form: age, family members, arrival date, category, description
 * - On submit: shows a local success message (no backend)
 *
 * TODO later (team):
 * - Replace categories with our real list if needed
 * - Wire submit to API
 * - Translation
 */

type CategoryKey =
  | "comida"
  | "habitacao"
  | "assessoria_juridica"
  | "transporte"
  | "escola"
  | "um_amigo"
  | "doutor"
  | "celular"
  | "trabalho"
  | "conta_bancaria"
  | "roupas_moveis"
  | "igreja";

type Category = {
  key: CategoryKey;
  title: string;
  subtitle?: string;
  emoji: string; // placeholder icon
  tone: "orange" | "yellow" | "purple" | "blue" | "green" | "pink" | "neutral";
};

const CATEGORIES: Category[] = [
  { key: "comida", title: "Comida", emoji: "🍱", tone: "orange" },
  { key: "habitacao", title: "Habitação", emoji: "🏠", tone: "yellow" },
  { key: "assessoria_juridica", title: "Assessoria jurídica", emoji: "⚖️", tone: "purple" },
  { key: "transporte", title: "Transporte", emoji: "🚌", tone: "blue" },
  { key: "escola", title: "Escola", emoji: "🏫", tone: "orange" },
  { key: "um_amigo", title: "Um amigo", emoji: "🙂", tone: "neutral" },
  { key: "doutor", title: "Doutor", emoji: "🧰", tone: "green" },
  { key: "celular", title: "Celular", emoji: "📱", tone: "blue" },
  { key: "trabalho", title: "Trabalho", emoji: "💼", tone: "orange" },
  { key: "conta_bancaria", title: "Conta bancária", emoji: "🏛️", tone: "green" },
  { key: "roupas_moveis", title: "Roupas e móveis", emoji: "👕", tone: "blue" },
  { key: "igreja", title: "Igreja", emoji: "⛪", tone: "pink" },
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

export default function AyudaPage() {
  const [selected, setSelected] = useState<CategoryKey | null>(null);

  // Form state (design-only)
  const [age, setAge] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedCategory = useMemo(
    () => CATEGORIES.find(c => c.key === selected) ?? null,
    [selected]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // TODO (team): send to API
  }

  return (
    <div className="w-full">
      {/* Top crumbs / back */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
          Primeiro mês em Utah
        </div>

        <Link
          href="/users"
          className="rounded-full border border-[#f4d3b2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#12376c] transition hover:-translate-y-0.5 hover:border-[#f28c28]"
        >
          Voltar
        </Link>
      </div>

      {/* Title */}
      <h1 className="mt-4 text-5xl font-semibold leading-[1.05] text-[#12376c]">
        Escolha o apoio de que
        <br />
        precisa hoje.
      </h1>

      <p className="mt-4 max-w-3xl text-base text-[#1b3f7a]/70">
        Oito cartões essenciais em uma tábua de bento para começar com o pé direito.
        Não solicitamos informações sobre imigração ou documentos; sua privacidade e
        segurança são nossa prioridade.
      </p>

      {/* Bento grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {CATEGORIES.map(cat => {
          const t = toneClasses(cat.tone);
          const isSelected = selected === cat.key;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setSelected(cat.key);
                setSubmitted(false);
              }}
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
                <div
                  className={[
                    "grid h-12 w-12 place-items-center rounded-2xl",
                    t.chipBg,
                  ].join(" ")}
                >
                  <span className={["text-2xl", t.icon].join(" ")}>{cat.emoji}</span>
                </div>

                <div className="flex-1">
                  <div className="text-xl font-semibold text-[#12376c]">
                    {cat.title}
                  </div>
                  {cat.subtitle ? (
                    <div className="mt-1 text-sm text-[#1b3f7a]/70">
                      {cat.subtitle}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* subtle highlight */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/35 blur-2xl transition group-hover:opacity-100 opacity-70" />
            </button>
          );
        })}
      </div>

      {/* Form */}
      <div className="mt-10 rounded-[28px] border border-[#f4d3b2] bg-white p-8 shadow-[0_25px_80px_-60px_rgba(15,42,78,0.12)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1b3f7a]/60">
              Pedido de apoio
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[#12376c]">
              Conte um pouco sobre você
            </h2>
            <p className="mt-2 text-sm text-[#1b3f7a]/70">
              Preencha apenas o que você se sentir confortável em compartilhar.
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1b3f7a]/60">
              Categoria selecionada
            </div>
            <div className="mt-1 rounded-full border border-[#f4d3b2] bg-[#fff6ec] px-4 py-2 text-sm font-semibold text-[#12376c]">
              {selectedCategory ? selectedCategory.title : "Nenhuma (escolha acima)"}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 grid gap-6">
          <div className="grid gap-6 md:grid-cols-3">
            <label className="block text-sm text-[#1b3f7a]">
              Idade
              <input
                value={age}
                onChange={e => setAge(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                placeholder="Ex: 32"
                inputMode="numeric"
              />
            </label>

            <label className="block text-sm text-[#1b3f7a]">
              Membros da família (total)
              <input
                value={familyMembers}
                onChange={e => setFamilyMembers(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                placeholder="Ex: 4"
                inputMode="numeric"
              />
            </label>

            <label className="block text-sm text-[#1b3f7a]">
              Data de chegada
              <input
                value={arrivalDate}
                onChange={e => setArrivalDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
                type="date"
              />
            </label>
          </div>

          <label className="block text-sm text-[#1b3f7a]">
            Como podemos ajudar?
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="mt-2 min-h-[120px] w-full resize-y rounded-2xl border border-[#f1d0ae] bg-[#fff6ec] px-4 py-3 text-sm text-[#12376c] outline-none ring-2 ring-transparent transition focus:ring-[#1aa1d5]/40"
              placeholder="Descreva sua situação e o tipo de apoio que você procura..."
            />
          </label>

          {submitted ? (
            <div className="rounded-2xl border border-[#d3edd5] bg-[#eaf8ea] p-4 text-sm text-[#2e7d32]">
              Pedido salvo (design-only). Quando o backend estiver pronto, aqui vamos enviar para o servidor.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#1b3f7a]/70">
              Não pedimos documentos. Evite compartilhar dados sensíveis.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#1aa1d5] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_12px_30px_-18px_rgba(26,161,213,0.7)] transition hover:-translate-y-0.5 hover:bg-[#21b4e4]"
            >
              Enviar pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
