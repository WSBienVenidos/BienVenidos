export type CategoryTone =
  | "orange"
  | "yellow"
  | "purple"
  | "blue"
  | "green"
  | "pink"
  | "neutral";

export type Category = {
  key: string;
  title: string;
  emoji: string;
  tone: CategoryTone;
  href: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  address: string;
  phone: string;
};

export const CATEGORIES: Category[] = [
  {
    key: "alimentos",
    title: "Alimentos",
    emoji: "🍱",
    tone: "orange",
    href: "/alimentos",
  },
  {
    key: "vivienda",
    title: "Vivienda",
    emoji: "🏠",
    tone: "yellow",
    href: "/vivienda",
  },
  {
    key: "asesoria_legal",
    title: "Asesoría legal",
    emoji: "⚖️",
    tone: "purple",
    href: "/asesoria_legal",
  },
  {
    key: "transporte",
    title: "Transporte",
    emoji: "🚌",
    tone: "blue",
    href: "/transporte",
  },
  {
    key: "escuela",
    title: "Escuela",
    emoji: "🏫",
    tone: "orange",
    href: "/escuela",
  },
  {
    key: "un_amigo",
    title: "Un amigo",
    emoji: "🙂",
    tone: "neutral",
    href: "/un_amigo",
  },
  {
    key: "doctor",
    title: "Doctor",
    emoji: "🧰",
    tone: "green",
    href: "/doctor",
  },
  {
    key: "telefono_movil",
    title: "Teléfono móvil",
    emoji: "📱",
    tone: "blue",
    href: "/telefono_movil",
  },
  {
    key: "trabajo",
    title: "Trabajo",
    emoji: "💼",
    tone: "orange",
    href: "/trabajo",
  },
  {
    key: "cuenta_bancaria",
    title: "Cuenta bancaria",
    emoji: "🏛️",
    tone: "green",
    href: "/cuenta_bancaria",
  },
  {
    key: "ropa_muebles",
    title: "Ropa y muebles",
    emoji: "👕",
    tone: "blue",
    href: "/ropa_muebles",
  },
  {
    key: "iglesia",
    title: "Iglesia",
    emoji: "⛪",
    tone: "pink",
    href: "/iglesia",
  },
];

export const RESOURCES_BY_CATEGORY: Record<string, Resource[]> = {
  alimentos: [
    {
      id: "alimentos-1",
      title: "Banco de Alimentos Comunitario",
      description: "Despensa semanal y orientación para nuevos residentes.",
      address: "South Jordan, UT",
      phone: "(801) 555-0123",
    },
    {
      id: "alimentos-2",
      title: "Despensa Móvil",
      description: "Entrega de alimentos en barrios cercanos.",
      address: "West Jordan, UT",
      phone: "(801) 555-0188",
    },
    {
      id: "alimentos-3",
      title: "Cocina Solidaria",
      description: "Comidas calientes en días específicos.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0144",
    },
  ],
  vivienda: [
    {
      id: "vivienda-1",
      title: "Centro de Vivienda Accesible",
      description: "Listas de renta y apoyo para encontrar cuarto.",
      address: "Draper, UT",
      phone: "(801) 555-0102",
    },
    {
      id: "vivienda-2",
      title: "Asesoría de Arrendamiento",
      description: "Derechos del inquilino y contratos.",
      address: "Lehi, UT",
      phone: "(801) 555-0199",
    },
    {
      id: "vivienda-3",
      title: "Red de Hospedaje Temporal",
      description: "Opciones de estadía de corto plazo.",
      address: "Sandy, UT",
      phone: "(801) 555-0160",
    },
  ],
  asesoria_legal: [
    {
      id: "asesoria-1",
      title: "Orientación Legal Básica",
      description: "Consultas generales (no inmigración).",
      address: "Provo, UT",
      phone: "(801) 555-0117",
    },
    {
      id: "asesoria-2",
      title: "Clínica Legal Comunitaria",
      description: "Revisión de contratos y consumo.",
      address: "Orem, UT",
      phone: "(801) 555-0171",
    },
    {
      id: "asesoria-3",
      title: "Línea de Derechos del Inquilino",
      description: "Preguntas frecuentes y referencias.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0128",
    },
  ],
  transporte: [
    {
      id: "transporte-1",
      title: "Guía de Rutas y Tarifas",
      description: "Ayuda para planear rutas de bus y TRAX.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0139",
    },
    {
      id: "transporte-2",
      title: "Programa de Pases",
      description: "Descuentos para familias.",
      address: "Midvale, UT",
      phone: "(801) 555-0106",
    },
    {
      id: "transporte-3",
      title: "Red de Compartir Viajes",
      description: "Conexión con voluntarios.",
      address: "West Valley, UT",
      phone: "(801) 555-0152",
    },
  ],
  escuela: [
    {
      id: "escuela-1",
      title: "Centro de Inscripción Escolar",
      description: "Registro y documentos requeridos.",
      address: "South Jordan, UT",
      phone: "(801) 555-0149",
    },
    {
      id: "escuela-2",
      title: "Tutorías Comunitarias",
      description: "Apoyo en tareas y lectura.",
      address: "Taylorsville, UT",
      phone: "(801) 555-0194",
    },
    {
      id: "escuela-3",
      title: "Orientación para Padres",
      description: "Guía del sistema escolar.",
      address: "West Jordan, UT",
      phone: "(801) 555-0115",
    },
  ],
  un_amigo: [
    {
      id: "amigo-1",
      title: "Red de Acompañamiento",
      description: "Voluntarios para orientación básica.",
      address: "Sandy, UT",
      phone: "(801) 555-0167",
    },
    {
      id: "amigo-2",
      title: "Cafés de Bienvenida",
      description: "Encuentros semanales.",
      address: "Draper, UT",
      phone: "(801) 555-0136",
    },
    {
      id: "amigo-3",
      title: "Línea de Apoyo",
      description: "Escucha y guía general.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0181",
    },
  ],
  doctor: [
    {
      id: "doctor-1",
      title: "Clínica de Bajo Costo",
      description: "Citas con tarifas reducidas.",
      address: "West Jordan, UT",
      phone: "(801) 555-0110",
    },
    {
      id: "doctor-2",
      title: "Salud Familiar",
      description: "Atención pediátrica y vacunas.",
      address: "South Jordan, UT",
      phone: "(801) 555-0170",
    },
    {
      id: "doctor-3",
      title: "Información de Seguros",
      description: "Orientación para opciones básicas.",
      address: "Murray, UT",
      phone: "(801) 555-0120",
    },
  ],
  telefono_movil: [
    {
      id: "movil-1",
      title: "Planes Económicos",
      description: "Comparación de planes prepago.",
      address: "Draper, UT",
      phone: "(801) 555-0192",
    },
    {
      id: "movil-2",
      title: "Ayuda con Configuración",
      description: "Activación y soporte básico.",
      address: "West Jordan, UT",
      phone: "(801) 555-0105",
    },
    {
      id: "movil-3",
      title: "Programa de Conectividad",
      description: "Apoyo para internet móvil.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0133",
    },
  ],
  trabajo: [
    {
      id: "trabajo-1",
      title: "Centro de Empleo",
      description: "Ofertas locales y talleres de CV.",
      address: "West Valley, UT",
      phone: "(801) 555-0155",
    },
    {
      id: "trabajo-2",
      title: "Taller de Entrevistas",
      description: "Preparación y prácticas.",
      address: "Sandy, UT",
      phone: "(801) 555-0143",
    },
    {
      id: "trabajo-3",
      title: "Bolsa de Trabajo Comunitaria",
      description: "Empleos de entrada.",
      address: "Provo, UT",
      phone: "(801) 555-0184",
    },
  ],
  cuenta_bancaria: [
    {
      id: "banco-1",
      title: "Orientación Bancaria",
      description: "Cómo abrir cuenta y evitar cargos.",
      address: "Lehi, UT",
      phone: "(801) 555-0127",
    },
    {
      id: "banco-2",
      title: "Taller de Finanzas",
      description: "Presupuesto básico y ahorro.",
      address: "Orem, UT",
      phone: "(801) 555-0178",
    },
    {
      id: "banco-3",
      title: "Comparador de Bancos",
      description: "Opciones sin comisiones.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0112",
    },
  ],
  ropa_muebles: [
    {
      id: "ropa-1",
      title: "Ropero Comunitario",
      description: "Ropa por temporada.",
      address: "West Jordan, UT",
      phone: "(801) 555-0164",
    },
    {
      id: "ropa-2",
      title: "Muebles Solidarios",
      description: "Donaciones y entrega local.",
      address: "Draper, UT",
      phone: "(801) 555-0107",
    },
    {
      id: "ropa-3",
      title: "Armario Infantil",
      description: "Ropa para niños.",
      address: "South Jordan, UT",
      phone: "(801) 555-0190",
    },
  ],
  iglesia: [
    {
      id: "iglesia-1",
      title: "Iglesias Cercanas",
      description: "Lista de congregaciones en español.",
      address: "Salt Lake City, UT",
      phone: "(801) 555-0148",
    },
    {
      id: "iglesia-2",
      title: "Eventos Comunitarios",
      description: "Reuniones y apoyo.",
      address: "Midvale, UT",
      phone: "(801) 555-0131",
    },
    {
      id: "iglesia-3",
      title: "Grupo de Bienvenida",
      description: "Conexión con familias.",
      address: "Sandy, UT",
      phone: "(801) 555-0125",
    },
  ],
};

export const CATEGORY_MAP = CATEGORIES.reduce<Record<string, Category>>(
  (acc, category) => {
    acc[category.key] = category;
    return acc;
  },
  {}
);
