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

import type { StaticImageData } from "next/image";
import foodbankImage from "../alimentos/foodbank.jpg";
import tabithaswayImage from "../alimentos/tabithasway.jpeg";
import emmanuelImage from "../alimentos/emanuel.jpeg";
import bishopImage from "../vivienda/bishop.png";
import homelessImage from "../vivienda/homeless.jpeg";
import lowcostImage from "../vivienda/lowcost.png";
import immigrationImage from "../asesoria_legal/immigration.png";
import legalImage from "../asesoria_legal/legal.jpg";
import lowcostLegalImage from "../asesoria_legal/lowcost.jpeg";

export type Resource = {
  id: string;
  title: string;
  description: string;
  address: string;
  phone: string;
  website?: string;
  image?: StaticImageData;
  imageAlt?: string;
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
      title: "Utah Food Bank",
      description:
        "El banco de alimentos más grande de Utah. Provee comida gratuita a familias e individuos a través de despensas comunitarias, iglesias y organizaciones locales. No se requiere estatus migratorio y muchos centros atienden en español.",
      address: "3150 S 900 W, South Salt Lake, UT 84119",
      phone: "(801) 978-2452",
      website: "https://www.utahfoodbank.org",
      image: foodbankImage,
      imageAlt: "Edificio de Utah Food Bank en Salt Lake City",
    },
    {
      id: "alimentos-2",
      title:
        "Catholic Community Services of Utah – Programa St. Vincent de Paul (Tabitha’s Way)",
      description:
        "Ofrece asistencia alimentaria de emergencia, incluyendo despensas de comida, para familias de bajos recursos. Atienden a personas sin importar su estatus migratorio y trabajan estrechamente con comunidades latinas. Tabitha’s Way opera varias despensas en Utah County y trabaja en coordinación con Catholic Community Services.",
      address: "675 W. Garden Drive, #100, Pleasant Grove, UT 84062",
      phone: "(801) 692-1881",
      website: "https://www.tabithasway.org",
      image: tabithaswayImage,
      imageAlt: "Entrada de Tabitha’s Way Food Pantry",
    },
    {
      id: "alimentos-3",
      title: "Emmanuel Worship Center – Banco de Alimentos Comunitario",
      description:
        "Iglesia comunitaria que ofrece distribución de alimentos gratuitos en días específicos. Es un espacio seguro y confiable para familias inmigrantes, con personal y voluntarios que hablan español.",
      address: "1078 S 250 E, Provo, UT, United States, Utah",
      phone: "(801) 722-8345",
      website: "https://www.facebook.com/iglesiaemanuelfoodpantry/",
      image: emmanuelImage,
      imageAlt: "Fachada de Emmanuel Worship Center",
    },
  ],
  vivienda: [
    {
      id: "vivienda-1",
      title: "Bishop Weigand Resource Center (Catholic Community Services)",
      description:
        "Refugio diurno y recursos: administración de casos, almacenamiento, higiene, duchas, ayuda para vivienda, salud, empleo y formularios.",
      address: "437 West 200 South, Salt Lake City, UT 84101",
      phone: "(801) 363-7710",
      website: "https://www.ccsutah.org/programs/weigand-resource-center",
      image: bishopImage,
      imageAlt: "Bishop Weigand Resource Center",
    },
    {
      id: "vivienda-2",
      title: "Homeless Recovery Program (Family Promise - Salt Lake)",
      description:
        "Refugio y red de apoyo para familias con niños; ayuda con vivienda, transporte, comidas y educación financiera.",
      address: "814 West 800 South, Salt Lake City, UT 84104",
      phone: "(801) 961-8622",
      website: "https://familypromisesaltlake.org",
      image: homelessImage,
      imageAlt: "Family Promise - Salt Lake",
    },
    {
      id: "vivienda-3",
      title:
        "Low Cost for Sale Homes/Housing Units (Community Development Corporation of Utah)",
      description:
        "Listas y venta de viviendas de bajo costo para individuos o familias en necesidad. Varía por listado y nivel de ingresos.",
      address: "501 East 1700 South, Salt Lake City, UT 84105",
      phone: "(801) 994-7222",
      website: "https://cdcutah.org",
      image: lowcostImage,
      imageAlt: "Community Development Corporation of Utah",
    },
  ],
  asesoria_legal: [
    {
      id: "asesoria-1",
      title: "Immigration Program (Catholic Community Services - CCS)",
      description:
        "Representación legal para inmigrantes y refugiados; ayuda con solicitudes de estatus migratorio, formularios y asesoría.",
      address: "745 East 300 South, Salt Lake City, UT 84102",
      phone: "(801) 977-9119",
      website: "https://ccsutah.org/programs/immigration",
      image: immigrationImage,
      imageAlt: "Catholic Community Services Immigration Program",
    },
    {
      id: "asesoria-2",
      title: "Legal Immigration Program (Holy Cross Ministries - HCM)",
      description:
        "Servicios legales de inmigración a bajo costo; ayuda con formularios, ciudadanía y representación.",
      address: "860 East 4500 South, Salt Lake City, UT 84107",
      phone: "(801) 261-3440",
      website: "https://www.hcmutah.org/legal-immigration-program/",
      image: legalImage,
      imageAlt: "Holy Cross Ministries Legal Immigration Program",
    },
    {
      id: "asesoria-3",
      title: "Low Cost Immigration Services (Comunidades Unidas)",
      description:
        "Servicios de inmigración a bajo costo con representantes certificados por el DOJ; ayuda con formularios y trámites.",
      address: "Salt Lake City, UT",
      phone: "(801) 487-4143",
      website: "https://www.cuutah.org/es",
      image: lowcostLegalImage,
      imageAlt: "Comunidades Unidas Low Cost Immigration Services",
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
