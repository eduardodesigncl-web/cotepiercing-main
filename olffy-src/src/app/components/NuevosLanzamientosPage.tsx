import { useState } from "react";
import { Check, ShoppingCart, ChevronLeft, Facebook, Instagram, Twitter, Send } from "lucide-react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";

const T = {
  poppins: "'Poppins', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  piepie: "'PiepieW01-Regular', sans-serif",
};
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

const TINTS = ["#f2e0cc", "#e8e0f0", "#fde8dc", "#e0e8f0", "#fdf0dc", "#f0f2e0"];

const COLLECTIONS = [
  {
    id: "col1",
    name: "Colección Primavera",
    season: "Primavera 2025",
    description: "Colores frescos inspirados en la flora chilena. Agendas, cuadernos y stickers con ilustraciones de flores nativas.",
    color: C.orange,
    products: [
      { id: 101, name: "Agenda Semanal Primavera", price: 13990, tag: "Nuevo" },
      { id: 102, name: "Cuaderno Flores Nativas", price: 9490, tag: "Nuevo" },
      { id: 103, name: "Kit Stickers Primavera", price: 5490, tag: "Nuevo" },
    ],
  },
  {
    id: "col2",
    name: "Serie Cosmos",
    season: "Edición limitada",
    description: "Una colección nocturna con estrellas, lunas y constelaciones. Diseñada para quienes planifican con cabeza en las estrellas.",
    color: C.purple,
    products: [
      { id: 201, name: "Planner Cosmos 2025", price: 14990, tag: "Edición limitada" },
      { id: 202, name: "Cuaderno Punteado Cosmos", price: 8990, tag: "Nuevo" },
      { id: 203, name: "Marcapáginas Constelaciones x4", price: 3990, tag: "Nuevo" },
    ],
  },
];

const ALL_PRODUCTS = [
  { id: 1,  name: "Agenda Semanal Primavera", price: 13990, tag: "Nuevo",            tint: "#f2e0cc" },
  { id: 2,  name: "Planner Cosmos 2025",      price: 14990, tag: "Edición limitada", tint: "#e8e0f0" },
  { id: 3,  name: "Cuaderno Flores Nativas",  price: 9490,  tag: "Nuevo",            tint: "#fde8dc" },
  { id: 4,  name: "Kit Stickers Primavera",   price: 5490,  tag: "Nuevo",            tint: "#f2e0cc" },
  { id: 5,  name: "Marcapáginas Cosmos x4",   price: 3990,  tag: "Nuevo",            tint: "#e8e0f0" },
  { id: 6,  name: "Cuaderno Punteado Cosmos", price: 8990,  tag: "Nuevo",            tint: "#fdf0dc" },
];

function ImgTile({ tint = "#f2e0cc", className = "" }: { tint?: string; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden flex items-center justify-center ${className}`} style={{ background: tint }}>
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="opacity-20">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="black" strokeWidth="2" />
        <circle cx="17" cy="20" r="4" stroke="black" strokeWidth="2" />
        <path d="M4 34l10-10 8 8 6-6 16 10" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProductCard({ product, tint, onAdd }: { product: { id: number; name: string; price: number; tag: string }; tint: string; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  function handleAdd() {
    setAdded(true);
    onAdd();
    setTimeout(() => setAdded(false), 1500);
  }
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border group cursor-pointer transition-shadow hover:shadow-md" style={{ borderColor: "rgba(0,0,0,0.07)", background: "white" }}>
      <div className="relative aspect-[3/4]">
        <ImgTile tint={tint} className="w-full h-full rounded-none" />
        <span className="absolute top-2 left-2 px-2 py-0.5 text-[11px] rounded-full text-white"
          style={{ fontFamily: T.poppins, background: product.tag === "Edición limitada" ? C.purple : C.orange }}>
          {product.tag}
        </span>
        <button onClick={handleAdd}
          className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl text-white text-[12px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          style={{ fontFamily: T.poppins, background: added ? "#16a34a" : C.orange }}>
          {added ? <><Check size={12} /> Listo</> : <><ShoppingCart size={12} /> Agregar</>}
        </button>
      </div>
      <div className="p-3">
        <p className="text-[13px] text-black/75 leading-snug" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{product.name}</p>
        <p className="text-[13px] text-black/40 mt-0.5" style={{ fontFamily: T.poppins }}>${product.price.toLocaleString("es-CL")}</p>
      </div>
    </div>
  );
}

export function NuevosLanzamientosPage({ onBack, onAddToCart }: { onBack: () => void; onAddToCart: (name: string) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden px-6 md:px-16 py-14 md:py-20" style={{ background: "#f2e0cc", minHeight: 280 }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#f2e0cc]/95 to-[#f2e0cc]/30" />
        <div className="relative flex flex-col justify-center">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] text-black/40 hover:text-black/70 transition-colors mb-6 w-fit"
            style={{ fontFamily: T.poppins }}>
            <ChevronLeft size={14} /> Novedades
          </button>
          <p className="text-[11px] tracking-[0.22em] uppercase text-black/40 mb-2" style={{ fontFamily: T.poppins }}>
            Novedades · 2025
          </p>
          <h1 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(26px, 4vw, 56px)", fontWeight: 300 }}>
            Recién llegados a
          </h1>
          <h1 className="leading-[0.88] mb-4" style={{ fontFamily: T.piepie, fontSize: "clamp(44px, 7vw, 104px)", color: C.orange, letterSpacing: "-0.02em" }}>
            Olffy
          </h1>
          <p className="text-[14px] text-black/50 max-w-[360px] leading-relaxed" style={{ fontFamily: T.poppins }}>
            Nuevas colecciones, ediciones limitadas y los productos más esperados de la temporada.
          </p>
        </div>
      </div>

      {/* ── Colecciones destacadas ── */}
      <section className="px-6 md:px-16 py-12 md:py-16">
        <div className="flex flex-col gap-1 mb-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black/35" style={{ fontFamily: T.poppins }}>Colecciones</p>
          <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 300 }}>
            Nuevas
          </h2>
          <h2 className="-mt-1 leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 4.5vw, 62px)", color: C.orange, letterSpacing: "-0.02em" }}>
            Colecciones
          </h2>
        </div>

        <div className="flex flex-col gap-10 md:gap-16">
          {COLLECTIONS.map((col, ci) => (
            <div key={col.id} className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center">
              {/* Images — always image first on mobile */}
              <div className={`flex gap-3 md:gap-4 flex-1 ${ci % 2 === 1 ? "md:order-2" : ""}`}>
                <ImgTile tint={TINTS[ci * 2 % TINTS.length]} className="flex-[2] h-[220px] md:h-[340px]" />
                <div className="flex-1 flex flex-col gap-3 md:gap-4">
                  <ImgTile tint={TINTS[(ci * 2 + 1) % TINTS.length]} className="flex-1" />
                  <ImgTile tint={TINTS[(ci * 2 + 2) % TINTS.length]} className="flex-1" />
                </div>
              </div>
              {/* Info */}
              <div className={`flex flex-col gap-4 md:max-w-[420px] ${ci % 2 === 1 ? "md:order-1" : ""}`}>
                <div>
                  <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ fontFamily: T.poppins, background: col.color }}>{col.season}</span>
                  <h3 className="mt-3 leading-tight text-black/85" style={{ fontFamily: T.piepie, fontSize: "clamp(22px, 3vw, 40px)" }}>
                    {col.name}
                  </h3>
                </div>
                <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
                  {col.description}
                </p>
                <div className="flex flex-col gap-0.5">
                  {col.products.map(p => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <p className="text-[13px] text-black/70" style={{ fontFamily: T.poppins }}>{p.name}</p>
                      <p className="text-[13px] text-black/45 shrink-0 ml-4" style={{ fontFamily: T.poppins }}>${p.price.toLocaleString("es-CL")}</p>
                    </div>
                  ))}
                </div>
                <button className="self-start px-5 py-2.5 rounded-full text-white text-[13px] hover:opacity-90 transition-opacity"
                  style={{ fontFamily: T.poppins, background: col.color }}>
                  Ver colección →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Todos los lanzamientos ── */}
      <section className="px-6 md:px-16 py-12 md:py-16 bg-[#fafafa]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-black/35 mb-1" style={{ fontFamily: T.poppins }}>Productos</p>
            <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(22px, 3vw, 42px)", fontWeight: 300 }}>
              Todos los
            </h2>
            <h2 className="-mt-1 leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(30px, 4.5vw, 62px)", color: C.purple, letterSpacing: "-0.02em" }}>
              Lanzamientos
            </h2>
          </div>
          <p className="text-[12px] text-black/35 mb-1 shrink-0" style={{ fontFamily: T.poppins }}>{ALL_PRODUCTS.length} productos</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {ALL_PRODUCTS.map(p => (
            <ProductCard key={p.id} product={p} tint={p.tint} onAdd={() => onAddToCart(p.name)} />
          ))}
        </div>
      </section>

      {/* ── Próximos lanzamientos ── */}
      <section className="px-6 md:px-16 py-12 md:py-16">
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black/35" style={{ fontFamily: T.poppins }}>Coming soon</p>
          <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(22px, 3vw, 42px)", fontWeight: 300 }}>
            Próximamente en
          </h2>
          <h2 className="-mt-1 leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(30px, 4.5vw, 62px)", color: C.orange, letterSpacing: "-0.02em" }}>
            Olffy
          </h2>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
          {["Colección Invierno 2025", "Serie Bosque Nativo", "Kit Organización Total"].map((name, i) => (
            <div key={name} className="relative overflow-hidden rounded-2xl h-[140px] md:aspect-[4/3] md:h-auto flex items-end p-5"
              style={{ background: TINTS[i % TINTS.length] }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="relative flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-white/70" style={{ fontFamily: T.poppins }}>Próximamente</span>
                <p className="text-white" style={{ fontFamily: T.piepie, fontSize: 20 }}>{name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-16 py-14" style={{ background: C.purple }}>
        {/* Mobile: stacked */}
        <div className="flex flex-col gap-10 md:hidden">
          <div className="flex flex-col gap-4">
            <div style={{ width: 139, height: 43, position: "relative" }}><OlffyLogoYellow /></div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
              Papelería ilustrada para crear y regalar con magia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors"><Icon size={18} /></button>
              ))}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Novedades</p>
              <div className="flex flex-col gap-2">
                {["Nuevos lanzamientos", "Colecciones recientes", "Más vendidos", "Próximamente"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Tienda</p>
              <div className="flex flex-col gap-2">
                {["Cuadernos", "Planners", "Stickers", "Calendarios"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
            <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>Novedades y las últimas ofertas</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
              className="w-full px-4 py-2.5 rounded-xl text-[13px] bg-white/10 text-white placeholder-white/30 outline-none border border-white/15"
              style={{ fontFamily: T.poppins }} />
            <button onClick={() => { if (email) setSent(true); }}
              className="w-full py-2.5 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}>
              {sent ? "¡Suscrito! 🎉" : "Suscribirse"}
            </button>
          </div>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex gap-16 items-start">
          <div className="flex flex-col gap-5 shrink-0 w-52">
            <div style={{ width: 139, height: 43, position: "relative" }}><OlffyLogoYellow /></div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
              Papelería ilustrada para crear y regalar con magia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors"><Icon size={18} /></button>
              ))}
            </div>
          </div>
          <div className="flex gap-16 flex-1">
            {[
              { title: "Novedades", links: ["Nuevos lanzamientos", "Colecciones recientes", "Más vendidos", "Próximamente"] },
              { title: "Tienda", links: ["Cuadernos", "Planners", "Stickers", "Calendarios"] },
            ].map(col => (
              <div key={col.title} className="flex flex-col gap-4">
                <p className="text-[17px] text-white" style={{ fontFamily: T.piepie }}>{col.title}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map(l => (
                    <a key={l} href="#" className="text-[14px] hover:text-white transition-colors"
                      style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-[340px] shrink-0">
            <p className="text-[20px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
            <p className="text-[15px]" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>
              Sé el primero en conocer los nuevos lanzamientos.
            </p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
              className="w-full px-4 py-2.5 rounded-xl text-[14px] bg-white/10 text-white placeholder-white/30 outline-none border border-white/15"
              style={{ fontFamily: T.poppins }} />
            <button onClick={() => { if (email) setSent(true); }}
              className="w-full py-2.5 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}>
              {sent ? "¡Suscrito! 🎉" : "Notificarme"}
            </button>
          </div>
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
