import { useState } from "react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";
import {
  Heart, GraduationCap, Package, Tag, Gift, ArrowLeft,
  ShoppingBag, ChevronRight, Star, Facebook, Instagram, Twitter, Send,
} from "lucide-react";

const C = { cream: "#fff5d9", yellow: "#fab405", orange: "#e94300", purple: "#5957b0" };
const T = {
  piepie: "'PiepieW01-Regular', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  poppins: "'Poppins', sans-serif",
};

// ── Product data ───────────────────────────────────────────────────────────────
const GIFT_PRODUCTS: Record<string, { id: number; name: string; price: number; tag?: string; badge?: string; color: string }[]> = {
  amigas: [
    { id: 1, name: "Agenda floral 2025", price: 12900, tag: "Nuevo", badge: "♥ Para ella", color: "#f9c9d4" },
    { id: 2, name: "Set de stickers cute", price: 4900, badge: "♥ Para ella", color: "#fde4a8" },
    { id: 3, name: "Cuaderno cosido pastel", price: 8900, tag: "Popular", badge: "♥ Para ella", color: "#d4eaff" },
    { id: 4, name: "Planner semanal ilustrado", price: 11900, badge: "♥ Para ella", color: "#e8d4ff" },
    { id: 5, name: "Tarjetas de amistad x6", price: 3900, badge: "♥ Para ella", color: "#d4f5e4" },
    { id: 6, name: "Kit marcadores pastel", price: 7900, tag: "Nuevo", badge: "♥ Para ella", color: "#ffd4d4" },
  ],
  estudiantes: [
    { id: 7, name: "Agenda universitaria", price: 13900, tag: "Popular", badge: "🎓 Estudia mejor", color: "#d4eaff" },
    { id: 8, name: "Set de resaltadores", price: 5900, badge: "🎓 Estudia mejor", color: "#fde4a8" },
    { id: 9, name: "Cuaderno cuadriculado A5", price: 6900, badge: "🎓 Estudia mejor", color: "#e8d4ff" },
    { id: 10, name: "Planner de tareas", price: 9900, tag: "Nuevo", badge: "🎓 Estudia mejor", color: "#d4f5e4" },
    { id: 11, name: "Stickers de organización", price: 3900, badge: "🎓 Estudia mejor", color: "#ffd4d4" },
    { id: 12, name: "Kit lapiceros premium", price: 8900, badge: "🎓 Estudia mejor", color: "#f9c9d4" },
  ],
  kits: [
    { id: 13, name: "Kit Creativa Completo", price: 24900, tag: "Más vendido", badge: "🎁 Kit especial", color: "#fde4a8" },
    { id: 14, name: "Kit Mini Estudiantil", price: 14900, badge: "🎁 Kit especial", color: "#d4eaff" },
    { id: 15, name: "Kit Cuadernos x3", price: 19900, tag: "Nuevo", badge: "🎁 Kit especial", color: "#e8d4ff" },
    { id: 16, name: "Kit Stickers Colección", price: 9900, badge: "🎁 Kit especial", color: "#d4f5e4" },
  ],
};

const PRICE_RANGES = [
  {
    label: "Hasta $5.000",
    max: 5000,
    color: C.cream,
    accent: C.yellow,
    products: [
      { id: 101, name: "Stickers mini x20", price: 2900, color: "#fde4a8" },
      { id: 102, name: "Tarjeta de regalo", price: 1900, color: "#f9c9d4" },
      { id: 103, name: "Marcapáginas x4", price: 3900, color: "#d4f5e4" },
      { id: 104, name: "Set de washi tape", price: 4900, color: "#d4eaff" },
    ],
  },
  {
    label: "Hasta $10.000",
    max: 10000,
    color: "#f0eeff",
    accent: C.purple,
    products: [
      { id: 105, name: "Cuaderno cosido A5", price: 7900, color: "#e8d4ff" },
      { id: 106, name: "Set de stickers cute", price: 4900, color: "#fde4a8" },
      { id: 107, name: "Planner mini semanal", price: 8900, color: "#d4eaff" },
      { id: 108, name: "Kit resaltadores x5", price: 5900, color: "#d4f5e4" },
    ],
  },
  {
    label: "Hasta $15.000",
    max: 15000,
    color: "#fff2ec",
    accent: C.orange,
    products: [
      { id: 109, name: "Agenda 2025 ilustrada", price: 12900, color: "#f9c9d4" },
      { id: 110, name: "Kit papelería creativa", price: 14900, color: "#fde4a8" },
      { id: 111, name: "Cuaderno grande A4", price: 11900, color: "#d4eaff" },
      { id: 112, name: "Planner mensual + semanal", price: 13900, color: "#e8d4ff" },
    ],
  },
];

const PACKAGING = [
  { id: 201, name: "Caja regalo Olffy S", price: 1990, desc: "Para 1–2 productos pequeños", color: "#f9c9d4" },
  { id: 202, name: "Caja regalo Olffy M", price: 2990, desc: "Para 3–5 productos", color: "#fde4a8" },
  { id: 203, name: "Bolsa kraft ilustrada", price: 990, desc: "Bolsa con diseño exclusivo Olffy", color: "#d4eaff" },
  { id: 204, name: "Papel de regalo x2 pliegos", price: 1490, desc: "Diseño ilustrado edición limitada", color: "#d4f5e4" },
  { id: 205, name: "Tarjeta de mensaje personalizada", price: 790, desc: "Escribe tu dedicatoria", color: "#e8d4ff" },
  { id: 206, name: "Cinta washi decorativa", price: 1290, desc: "Para decorar tu regalo", color: "#ffd4d4" },
];

// ── Mini product card ──────────────────────────────────────────────────────────
function ProductCard({
  name, price, tag, color, onAddToCart,
}: {
  name: string; price: number; tag?: string; color: string; onAddToCart: (name: string) => void;
}) {
  const [added, setAdded] = useState(false);
  function handleAdd() {
    onAddToCart(name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border group transition-shadow hover:shadow-md" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
      <div
        className="w-full aspect-square flex items-center justify-center relative"
        style={{ background: color }}
      >
        {tag && (
          <span
            className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[11px] text-white"
            style={{ background: C.orange, fontFamily: T.poppins }}
          >
            {tag}
          </span>
        )}
        <ShoppingBag size={36} color="rgba(0,0,0,0.18)" />
      </div>
      <div className="flex flex-col gap-2 p-4 bg-white flex-1">
        <p className="text-[14px] text-black/75 leading-snug" style={{ fontFamily: T.poppins }}>{name}</p>
        <p className="text-[15px] text-black/85" style={{ fontFamily: T.poppins, fontWeight: 600 }}>
          ${price.toLocaleString("es-CL")}
        </p>
        <button
          onClick={handleAdd}
          className="mt-auto w-full py-2 rounded-xl text-[13px] transition-all"
          style={{
            background: added ? C.purple : "rgba(89,87,176,0.08)",
            color: added ? "white" : C.purple,
            fontFamily: T.poppins,
          }}
        >
          {added ? "¡Agregado! ✓" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub, icon }: { eyebrow: string; title: string; sub?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>{eyebrow}</span>
      </div>
      <h2 className="leading-none text-black/85" style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 3.5vw, 52px)" }}>{title}</h2>
      {sub && <p className="text-[16px] leading-relaxed" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.45)" }}>{sub}</p>}
    </div>
  );
}

// ── Newsletter ─────────────────────────────────────────────────────────────────
function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="flex flex-col gap-3 max-w-[300px]">
      <p className="text-[14px] text-white/70 leading-snug" style={{ fontFamily: T.poppins }}>
        Suscríbete y recibe novedades antes que nadie
      </p>
      {sent ? (
        <p className="text-[13px]" style={{ fontFamily: T.poppins, color: C.yellow }}>¡Gracias por suscribirte! 🎉</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-[13px] bg-white/10 text-white placeholder-white/30 outline-none focus:bg-white/15 transition-colors border border-white/10"
            style={{ fontFamily: T.poppins }}
          />
          <button
            onClick={() => { if (email) setSent(true); }}
            className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: C.orange }}
          >
            <Send size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function RegalosPage({ onBack, onAddToCart }: { onBack: () => void; onAddToCart: (name: string) => void }) {
  const [activeSection, setActiveSection] = useState<"amigas" | "estudiantes" | "kits" | "precio" | "empaque">("amigas");
  const [activePriceRange, setActivePriceRange] = useState(0);

  const NAV_TABS = [
    { key: "amigas", label: "Regalos para amigas", icon: <Heart size={15} /> },
    { key: "estudiantes", label: "Regalos para estudiantes", icon: <GraduationCap size={15} /> },
    { key: "kits", label: "Kits de papelería", icon: <Package size={15} /> },
    { key: "precio", label: "Por precio", icon: <Tag size={15} /> },
    { key: "empaque", label: "Empaque de regalo", icon: <Gift size={15} /> },
  ] as const;

  return (
    <div className="w-full bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative w-full py-24 px-8 md:px-16 flex flex-col gap-6"
        style={{ background: `linear-gradient(135deg, #f9c9d4 0%, #fde4a8 50%, #d4eaff 100%)` }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity w-fit"
          style={{ fontFamily: T.poppins, fontSize: "14px", color: "rgba(0,0,0,0.5)" }}
        >
          <ArrowLeft size={16} /> Volver al inicio
        </button>
        <div className="flex flex-col gap-2 mt-2">
          <span
            className="text-[12px] tracking-[0.22em] uppercase"
            style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}
          >
            Regala con amor
          </span>
          <h1 className="leading-none text-black/85" style={{ fontFamily: T.piepie, fontSize: "clamp(52px, 7vw, 96px)" }}>
            Regalos
          </h1>
          <p
            className="text-[18px] max-w-[480px] leading-relaxed"
            style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.55)" }}
          >
            Encuentra el regalo perfecto: papelería ilustrada que sorprende y emociona.
          </p>
        </div>
      </section>

      {/* ── Sticky section tabs ───────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="flex overflow-x-auto px-8 md:px-16" style={{ scrollbarWidth: "none" }}>
          {NAV_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className="flex items-center gap-1.5 px-4 py-4 text-[14px] whitespace-nowrap transition-colors border-b-2 shrink-0"
              style={{
                fontFamily: T.poppins,
                color: activeSection === tab.key ? C.purple : "rgba(0,0,0,0.5)",
                borderColor: activeSection === tab.key ? C.purple : "transparent",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Regalos para amigas ──────────────────────────────────── */}
      {activeSection === "amigas" && (
        <section className="px-8 md:px-16 py-16 flex flex-col gap-10">
          <SectionHeader
            eyebrow="Regalos para amigas"
            title="Para ella ♥"
            sub="Cuadernos, stickers y planners pensados para sorprender a esa amiga especial."
            icon={<Heart size={18} color="#e94300" />}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {GIFT_PRODUCTS.amigas.map((p) => (
              <ProductCard key={p.id} name={p.name} price={p.price} tag={p.tag} color={p.color} onAddToCart={onAddToCart} />
            ))}
          </div>
          {/* Feature banner */}
          <div
            className="flex items-center gap-6 p-8 rounded-2xl"
            style={{ background: "#fde4a8" }}
          >
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Tip Olffy</p>
              <p className="text-[18px] text-black/75 leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>
                ¿No sabes qué regalar? Agrega empaque de regalo y nosotras lo envolvemos con amor.
              </p>
            </div>
            <button
              onClick={() => setActiveSection("empaque")}
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-[13px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}
            >
              Ver empaques <ChevronRight size={14} />
            </button>
          </div>
        </section>
      )}

      {/* ── Regalos para estudiantes ─────────────────────────────── */}
      {activeSection === "estudiantes" && (
        <section className="px-8 md:px-16 py-16 flex flex-col gap-10">
          <SectionHeader
            eyebrow="Regalos para estudiantes"
            title="Regala organización 🎓"
            sub="Agendas, planners y sets de papelería para los que estudian con pasión."
            icon={<GraduationCap size={18} color={C.purple} />}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {GIFT_PRODUCTS.estudiantes.map((p) => (
              <ProductCard key={p.id} name={p.name} price={p.price} tag={p.tag} color={p.color} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div
            className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl"
            style={{ background: "#f0eeff", border: `1px solid rgba(89,87,176,0.15)` }}
          >
            <Star size={22} color={C.purple} className="shrink-0" />
            <p className="text-[15px] text-black/65 leading-snug flex-1" style={{ fontFamily: T.poppins }}>
              ¿Sabes qué estudia? Personaliza tu kit agregando una tarjeta con tu mensaje.
            </p>
            <button
              onClick={() => setActiveSection("empaque")}
              className="shrink-0 px-4 py-2 rounded-xl text-[13px] text-white"
              style={{ background: C.purple, fontFamily: T.poppins }}
            >
              Agregar tarjeta
            </button>
          </div>
        </section>
      )}

      {/* ── Kits de papelería ────────────────────────────────────── */}
      {activeSection === "kits" && (
        <section className="px-8 md:px-16 py-16 flex flex-col gap-10">
          <SectionHeader
            eyebrow="Kits de papelería"
            title="Kits que enamoran 🎁"
            sub="Sets curados con los mejores productos Olffy, listos para regalar."
            icon={<Package size={18} color={C.orange} />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_PRODUCTS.kits.map((p) => (
              <div key={p.id} className="flex flex-col rounded-2xl overflow-hidden border group hover:shadow-md transition-shadow" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <div
                  className="w-full h-[200px] flex items-center justify-center relative"
                  style={{ background: p.color }}
                >
                  {p.tag && (
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[11px] text-white"
                      style={{ background: C.purple, fontFamily: T.poppins }}
                    >
                      {p.tag}
                    </span>
                  )}
                  <Package size={48} color="rgba(0,0,0,0.15)" />
                </div>
                <div className="p-5 bg-white flex flex-col gap-3 flex-1">
                  <p className="text-[15px] text-black/80 leading-snug" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{p.name}</p>
                  <p className="text-[17px] text-black/85" style={{ fontFamily: T.poppins, fontWeight: 700 }}>
                    ${p.price.toLocaleString("es-CL")}
                  </p>
                  <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>
                    Incluye productos seleccionados + empaque
                  </p>
                  <button
                    onClick={() => onAddToCart(p.name)}
                    className="w-full py-2.5 rounded-xl text-[13px] text-white mt-auto transition-opacity hover:opacity-90"
                    style={{ background: C.purple, fontFamily: T.poppins }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="p-8 rounded-2xl flex flex-col gap-3"
            style={{ background: C.cream }}
          >
            <p className="text-[14px] uppercase tracking-widest" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Kits personalizados</p>
            <p className="text-[20px] text-black/75 leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>
              ¿Necesitas un kit corporativo o para un evento especial? Cuéntanos y lo armamos a tu medida.
            </p>
            <a
              href="mailto:hola@olffy.cl"
              className="self-start mt-1 px-5 py-2.5 rounded-xl text-[13px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}
            >
              Solicitar cotización →
            </a>
          </div>
        </section>
      )}

      {/* ── Por precio ───────────────────────────────────────────── */}
      {activeSection === "precio" && (
        <section className="px-8 md:px-16 py-16 flex flex-col gap-10">
          <SectionHeader
            eyebrow="Por precio"
            title="Encuentra tu presupuesto"
            sub="Regalos para todos los bolsillos. Filtra por el monto que tienes disponible."
            icon={<Tag size={18} color={C.yellow} />}
          />
          {/* Price range tabs */}
          <div className="flex gap-3 flex-wrap">
            {PRICE_RANGES.map((range, i) => (
              <button
                key={i}
                onClick={() => setActivePriceRange(i)}
                className="flex-1 min-w-[140px] py-4 px-5 rounded-2xl text-center transition-all border-2"
                style={{
                  background: activePriceRange === i ? range.accent : "white",
                  borderColor: activePriceRange === i ? range.accent : "rgba(0,0,0,0.08)",
                  fontFamily: T.poppins,
                  color: activePriceRange === i ? "white" : "rgba(0,0,0,0.65)",
                }}
              >
                <p className="text-[16px]" style={{ fontWeight: 600 }}>{range.label}</p>
                <p className="text-[12px] mt-0.5" style={{ opacity: 0.7 }}>{range.products.length} productos</p>
              </button>
            ))}
          </div>
          {/* Products for selected range */}
          <div>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl mb-6"
              style={{ background: PRICE_RANGES[activePriceRange].color }}
            >
              <Tag size={16} color={PRICE_RANGES[activePriceRange].accent} />
              <p className="text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.6)" }}>
                Mostrando regalos <strong>{PRICE_RANGES[activePriceRange].label}</strong>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {PRICE_RANGES[activePriceRange].products.map((p) => (
                <ProductCard key={p.id} name={p.name} price={p.price} color={p.color} onAddToCart={onAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empaque de regalo ────────────────────────────────────── */}
      {activeSection === "empaque" && (
        <section className="px-8 md:px-16 py-16 flex flex-col gap-10">
          <SectionHeader
            eyebrow="Empaque de regalo"
            title="Envuelto con amor 🎀"
            sub="Completa tu regalo con nuestros empaques y accesorios exclusivos Olffy."
            icon={<Gift size={18} color={C.orange} />}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {PACKAGING.map((p) => (
              <div
                key={p.id}
                className="flex flex-col rounded-2xl overflow-hidden border hover:shadow-md transition-shadow"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-full h-[140px] flex items-center justify-center"
                  style={{ background: p.color }}
                >
                  <Gift size={40} color="rgba(0,0,0,0.15)" />
                </div>
                <div className="p-4 bg-white flex flex-col gap-2 flex-1">
                  <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{p.name}</p>
                  <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{p.desc}</p>
                  <p className="text-[15px] text-black/85 mt-1" style={{ fontFamily: T.poppins, fontWeight: 600 }}>
                    +${p.price.toLocaleString("es-CL")}
                  </p>
                  <button
                    onClick={() => onAddToCart(p.name)}
                    className="w-full py-2 rounded-xl text-[13px] mt-auto transition-colors"
                    style={{
                      background: "rgba(233,67,0,0.08)",
                      color: C.orange,
                      fontFamily: T.poppins,
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="p-6 rounded-2xl flex flex-col gap-2"
            style={{ background: "#fff2ec", border: `1px solid rgba(233,67,0,0.15)` }}
          >
            <Gift size={20} color={C.orange} />
            <p className="text-[16px] text-black/70" style={{ fontFamily: T.poppins }}>
              ¿Quieres que lo enviemos directamente al destinatario? Puedes indicar la dirección de entrega en el checkout.
            </p>
          </div>
        </section>
      )}

      {/* ── Recomendados personalizados ───────────────────────────── */}
      <section className="px-8 md:px-16 py-16" style={{ background: C.cream }}>
        <div className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="No sé qué regalar"
            title="Te ayudamos a elegir"
            sub="Responde estas preguntas y te recomendamos el regalo ideal."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { q: "¿Para quién es?", options: ["Para una amiga", "Para una estudiante", "Para mí misma"], key: "quien" },
              { q: "¿Cuánto quieres gastar?", options: ["Hasta $5.000", "Hasta $10.000", "Hasta $15.000"], key: "precio" },
              { q: "¿Qué tipo de producto?", options: ["Cuaderno / Agenda", "Stickers", "Kit completo"], key: "tipo" },
            ].map((item) => (
              <div key={item.key} className="flex flex-col gap-3 p-5 bg-white rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <p className="text-[14px] text-black/70" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{item.q}</p>
                <div className="flex flex-col gap-2">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      className="text-left px-3 py-2 rounded-lg text-[13px] transition-colors border hover:border-purple-300"
                      style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)", borderColor: "rgba(0,0,0,0.08)" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            className="self-center px-8 py-3 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
            style={{ background: C.purple, fontFamily: T.poppins }}
          >
            Ver mi recomendación →
          </button>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-16" style={{ background: C.purple }}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex flex-col gap-5 max-w-[260px]">
            <div style={{ width: 139, height: 27 }}>
              <OlffyLogoYellow />
            </div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
              Papelería ilustrada para crear y regalar con magia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-16 flex-1">
            {[
              { title: "Tienda", links: ["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"] },
              { title: "Nosotros", links: ["Nuestra historia", "Sustentabilidad", "Blog", "Contacto"] },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <p className="text-[17px] text-white" style={{ fontFamily: T.piepie }}>{col.title}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <a key={l} href="#" className="text-[14px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <FooterNewsletter />
        </div>
        <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.35)" }}>
            © 2026 <span style={{ color: C.yellow }}>Olffy</span>. Creado inteligentemente por Mouse Labs 🐭
          </p>
        </div>
      </footer>
    </div>
  );
}
