import { useState } from "react";
import { ShoppingCart, Check, SlidersHorizontal, ChevronDown, X, Facebook, Instagram, Twitter, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";

const T = {
  poppins: "'Poppins', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  piepie: "'PiepieW01-Regular', sans-serif",
};
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

const CATEGORIES = ["Todos", "Agendas y planners", "Cuadernos", "Stickers", "Tarjetas", "Marcapáginas", "Accesorios"];
const SORT_OPTIONS = ["Más recientes", "Precio: menor a mayor", "Precio: mayor a menor", "Más vendidos"];

const PRODUCTS = [
  { id: 1,  name: "Agenda Semanal 2025",     price: 12990, category: "Agendas y planners", tag: "Nuevo"    },
  { id: 2,  name: "Cuaderno Ilustrado A5",   price: 8990,  category: "Cuadernos",           tag: null      },
  { id: 3,  name: "Kit de Stickers Florales",price: 4990,  category: "Stickers",            tag: "Favorito"},
  { id: 4,  name: "Planner Mensual",         price: 9990,  category: "Agendas y planners",  tag: null      },
  { id: 5,  name: "Tarjeta de Regalo",       price: 1990,  category: "Tarjetas",            tag: null      },
  { id: 6,  name: "Marcapáginas Set x4",     price: 3490,  category: "Marcapáginas",        tag: "Nuevo"   },
  { id: 7,  name: "Agenda Diaria Compacta",  price: 11990, category: "Agendas y planners",  tag: null      },
  { id: 8,  name: "Stickers Animales",       price: 3990,  category: "Stickers",            tag: null      },
  { id: 9,  name: "Cuaderno Punteado",       price: 7990,  category: "Cuadernos",           tag: "Favorito"},
  { id: 10, name: "Kit Papelería Completo",  price: 24990, category: "Accesorios",          tag: "Nuevo"   },
  { id: 11, name: "Tarjetas Aquarelle x6",   price: 4490,  category: "Tarjetas",            tag: null      },
  { id: 12, name: "Marcapáginas Metálicos",  price: 2990,  category: "Marcapáginas",        tag: null      },
];

const PRODUCT_DETAILS: Record<number, {
  description: string;
  specs: { label: string; value: string }[];
  colors: string[];
  bundles: { name: string; price: number; includes: string[] }[];
  imageCount: number;
}> = {
  1:  { description: "Agenda semanal con diseño ilustrado exclusivo de Olffy. Tapa dura, papel de 90g, marcador de página y bolsillo interior. Perfecta para organizarte con estilo todo el año.", specs: [{ label: "Tamaño", value: "A5 (15 × 21 cm)" }, { label: "Páginas", value: "320 páginas" }, { label: "Papel", value: "90 g/m², libre de ácido" }, { label: "Tapa", value: "Dura con laminado soft-touch" }], colors: ["#f2e0cc", "#5957b0", "#e94300"], bundles: [{ name: "Kit Agenda + Marcapáginas", price: 15490, includes: ["Agenda Semanal 2025", "Marcapáginas Set x4"] }, { name: "Kit Completo Organización", price: 21990, includes: ["Agenda Semanal 2025", "Planner Mensual", "Kit de Stickers Florales"] }], imageCount: 4 },
  2:  { description: "Cuaderno de tapa ilustrada con diseño original, ideal para notas, bocetos y escritura creativa. Encuadernación cosida para máxima durabilidad.", specs: [{ label: "Tamaño", value: "A5 (15 × 21 cm)" }, { label: "Páginas", value: "192 páginas" }, { label: "Papel", value: "80 g/m², rayado" }, { label: "Tapa", value: "Flexible ilustrada" }], colors: ["#fff5d9", "#e94300"], bundles: [{ name: "Dúo Cuadernos", price: 15990, includes: ["Cuaderno Ilustrado A5", "Cuaderno Punteado"] }], imageCount: 3 },
  3:  { description: "Set de stickers florales con ilustraciones originales de Olffy. Diseñados para decorar agendas, cuadernos, sobres y cualquier superficie lisa.", specs: [{ label: "Cantidad", value: "60 stickers" }, { label: "Tamaño hoja", value: "10 × 15 cm (4 hojas)" }, { label: "Material", value: "Vinilo resistente al agua" }, { label: "Acabado", value: "Mate con troquel" }], colors: [], bundles: [{ name: "Pack Stickers x3", price: 12990, includes: ["Kit Stickers Florales", "Stickers Animales", "Hoja extra sorpresa"] }], imageCount: 4 },
  4:  { description: "Planner mensual con vista de mes completa, espacio para metas, hábitos y reflexiones. Diseño minimalista con detalles ilustrados.", specs: [{ label: "Tamaño", value: "A4 (21 × 29,7 cm)" }, { label: "Páginas", value: "148 páginas" }, { label: "Papel", value: "90 g/m², blanco" }, { label: "Tapa", value: "Dura mate" }], colors: ["#fab405", "#5957b0"], bundles: [{ name: "Kit Planificación Total", price: 21990, includes: ["Planner Mensual", "Agenda Semanal 2025", "Kit de Stickers Florales"] }], imageCount: 3 },
  5:  { description: "Tarjeta de regalo Olffy con sobre incluido. Perfecta para acompañar cualquier pedido especial con un mensaje personal.", specs: [{ label: "Tamaño", value: "10 × 15 cm" }, { label: "Material", value: "Cartulina 350 g/m²" }, { label: "Incluye", value: "Sobre kraft" }, { label: "Acabado", value: "Impresión digital HD" }], colors: [], bundles: [], imageCount: 2 },
  6:  { description: "Set de 4 marcapáginas con ilustraciones originales de Olffy. Hechos en cartulina de alta gramaje con laminado mate y cinta de tela.", specs: [{ label: "Cantidad", value: "4 unidades" }, { label: "Tamaño", value: "5 × 18 cm c/u" }, { label: "Material", value: "Cartulina 350 g/m²" }, { label: "Acabado", value: "Laminado mate + cinta" }], colors: [], bundles: [{ name: "Set Lectura Completo", price: 10990, includes: ["Marcapáginas Set x4", "Cuaderno Ilustrado A5"] }], imageCount: 3 },
  7:  { description: "Agenda diaria en formato compacto para llevar siempre contigo. Una página por día con espacio para to-do, notas y seguimiento de humor.", specs: [{ label: "Tamaño", value: "B6 (12,5 × 17,6 cm)" }, { label: "Páginas", value: "380 páginas" }, { label: "Papel", value: "80 g/m²" }, { label: "Extras", value: "Elástico cierre + bolsillo" }], colors: ["#e94300", "#fff5d9", "#5957b0"], bundles: [{ name: "Kit Agenda Completa", price: 14990, includes: ["Agenda Diaria Compacta", "Marcapáginas Set x4"] }], imageCount: 3 },
  8:  { description: "Colección de stickers con ilustraciones de animalitos adorables. Ideales para decorar cuadernos, laptops y todo lo que quieras personalizar.", specs: [{ label: "Cantidad", value: "48 stickers" }, { label: "Tamaño hoja", value: "10 × 15 cm (3 hojas)" }, { label: "Material", value: "Vinilo resistente" }, { label: "Acabado", value: "Mate troquelado" }], colors: [], bundles: [{ name: "Pack Stickers x3", price: 10990, includes: ["Stickers Animales", "Kit de Stickers Florales"] }], imageCount: 3 },
  9:  { description: "Cuaderno de puntos (dot grid) ideal para bullet journal, bocetos y caligrafía. Papel de alta gramaje que no deja trasluz.", specs: [{ label: "Tamaño", value: "A5 (15 × 21 cm)" }, { label: "Páginas", value: "192 páginas dot grid" }, { label: "Papel", value: "100 g/m²" }, { label: "Tapa", value: "Flexible ilustrada" }], colors: ["#fab405", "#e94300"], bundles: [{ name: "Dúo Cuadernos", price: 15990, includes: ["Cuaderno Punteado", "Cuaderno Ilustrado A5"] }], imageCount: 4 },
  10: { description: "Kit de papelería completo con los productos más queridos de Olffy. El regalo perfecto para quienes aman organizarse con creatividad y estilo.", specs: [{ label: "Contenido", value: "8 productos seleccionados" }, { label: "Empaque", value: "Caja de regalo Olffy" }, { label: "Ideal para", value: "Regalo, cumpleaños, celebraciones" }, { label: "Personalizable", value: "Tarjeta de mensaje incluida" }], colors: [], bundles: [], imageCount: 4 },
  11: { description: "Set de 6 tarjetas con técnica acuarela, ilustradas a mano y reproducidas digitalmente. Para regalar, coleccionar o decorar tu espacio.", specs: [{ label: "Cantidad", value: "6 tarjetas + sobres" }, { label: "Tamaño", value: "10 × 15 cm" }, { label: "Papel", value: "300 g/m² textura acuarela" }, { label: "Sobre", value: "Kraft incluido" }], colors: [], bundles: [{ name: "Pack Tarjetas", price: 7990, includes: ["Tarjetas Aquarelle x6", "Tarjeta de Regalo"] }], imageCount: 3 },
  12: { description: "Set de marcapáginas con acabado metálico dorado y diseños geométricos inspirados en la papelería clásica. Resistentes y elegantes.", specs: [{ label: "Cantidad", value: "4 unidades" }, { label: "Material", value: "Acero inoxidable" }, { label: "Acabado", value: "Dorado mate" }, { label: "Tamaño", value: "4 × 12 cm c/u" }], colors: [], bundles: [], imageCount: 2 },
};

// ── Placeholder image tile (same grey as product cards)
function ImgTile({ className = "", index = 0 }: { className?: string; index?: number }) {
  const hues = ["#f2e0cc", "#e8e0f0", "#fde8dc", "#e0e8f0", "#fdf0dc"];
  return (
    <div className={`rounded-xl overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: hues[index % hues.length] }}>
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="opacity-20">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="black" strokeWidth="2" />
        <circle cx="17" cy="20" r="4" stroke="black" strokeWidth="2" />
        <path d="M4 34l10-10 8 8 6-6 16 10" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProductDetail({ product, onClose, onAddToCart }: {
  product: typeof PRODUCTS[0];
  onClose: () => void;
  onAddToCart: (name: string) => void;
}) {
  const details = PRODUCT_DETAILS[product.id];
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);

  function handleAdd() {
    const name = selectedBundle !== null ? details.bundles[selectedBundle].name : product.name;
    for (let i = 0; i < qty; i++) onAddToCart(name);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1400);
  }

  const totalPrice = selectedBundle !== null
    ? details.bundles[selectedBundle].price * qty
    : product.price * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 my-10 overflow-hidden">
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors">
          <X size={18} className="text-black/60" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* ── Left: images ── */}
          <div className="lg:w-[52%] p-8 flex flex-col gap-4">
            {/* Main image */}
            <div className="relative">
              <ImgTile className="w-full aspect-[4/5]" index={activeImg} />
              {details.imageCount > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + details.imageCount) % details.imageCount)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-all">
                    <ChevronLeft size={18} className="text-black/60" />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % details.imageCount)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-all">
                    <ChevronRight size={18} className="text-black/60" />
                  </button>
                </>
              )}
              {product.tag && (
                <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] rounded text-white"
                  style={{ fontFamily: T.poppins, background: product.tag === "Favorito" ? C.purple : C.orange }}>
                  {product.tag}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {details.imageCount > 1 && (
              <div className="flex gap-3">
                {Array.from({ length: details.imageCount }).map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className="flex-1 rounded-lg overflow-hidden transition-all"
                    style={{ outline: i === activeImg ? `2px solid ${C.orange}` : "2px solid transparent", outlineOffset: 2 }}>
                    <ImgTile className="aspect-square w-full" index={i} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: info ── */}
          <div className="lg:w-[48%] p-8 flex flex-col gap-6 border-l border-black/5">
            {/* Header */}
            <div>
              <p className="text-[12px] tracking-[0.18em] uppercase text-black/35 mb-2" style={{ fontFamily: T.poppins }}>
                {product.category}
              </p>
              <h2 className="leading-tight text-black/85 mb-1" style={{ fontFamily: T.piepie, fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {product.name}
              </h2>
              <p className="text-[22px] text-black/80 mt-2" style={{ fontFamily: T.poppins, fontWeight: 600 }}>
                ${totalPrice.toLocaleString("es-CL")}
                {qty > 1 && <span className="text-[14px] text-black/35 ml-2" style={{ fontWeight: 400 }}>({qty} unidades)</span>}
              </p>
            </div>

            {/* Description */}
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              {details.description}
            </p>

            {/* Colors */}
            {details.colors.length > 0 && (
              <div>
                <p className="text-[12px] uppercase tracking-wider text-black/40 mb-2" style={{ fontFamily: T.poppins }}>Color</p>
                <div className="flex gap-2">
                  {details.colors.map((color, i) => (
                    <button key={i} onClick={() => setSelectedColor(i)}
                      className="w-8 h-8 rounded-full transition-all"
                      style={{ background: color, outline: i === selectedColor ? `2px solid ${C.orange}` : "2px solid transparent", outlineOffset: 2 }} />
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="rounded-xl bg-black/[0.03] p-4 grid grid-cols-2 gap-3">
              {details.specs.map(s => (
                <div key={s.label}>
                  <p className="text-[11px] uppercase tracking-wider text-black/35 mb-0.5" style={{ fontFamily: T.poppins }}>{s.label}</p>
                  <p className="text-[13px] text-black/70" style={{ fontFamily: T.poppins }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Bundles */}
            {details.bundles.length > 0 && (
              <div>
                <p className="text-[12px] uppercase tracking-wider text-black/40 mb-2" style={{ fontFamily: T.poppins }}>
                  ✨ Combínalo con
                </p>
                <div className="flex flex-col gap-2">
                  {details.bundles.map((b, i) => (
                    <button key={i} onClick={() => setSelectedBundle(selectedBundle === i ? null : i)}
                      className="flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all"
                      style={{ borderColor: selectedBundle === i ? C.orange : "rgba(0,0,0,0.08)", background: selectedBundle === i ? `${C.orange}08` : "white" }}>
                      <div className="w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all"
                        style={{ borderColor: selectedBundle === i ? C.orange : "rgba(0,0,0,0.2)", background: selectedBundle === i ? C.orange : "white" }}>
                        {selectedBundle === i && <Check size={11} color="white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{b.name}</p>
                        <p className="text-[12px] text-black/40 truncate" style={{ fontFamily: T.poppins }}>
                          {b.includes.join(" + ")}
                        </p>
                      </div>
                      <p className="text-[14px] shrink-0" style={{ fontFamily: T.poppins, fontWeight: 600, color: C.orange }}>
                        ${b.price.toLocaleString("es-CL")}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex items-center gap-4 mt-auto pt-2">
              {/* Qty: small circles */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors hover:bg-black/5"
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.5)" }}
                >
                  <span className="text-[15px] leading-none">−</span>
                </button>
                <span className="text-[13px] text-black/70 w-4 text-center" style={{ fontFamily: T.poppins }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center border transition-colors hover:bg-black/5"
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.5)" }}
                >
                  <Plus size={12} />
                </button>
              </div>
              {/* Add to cart */}
              <button onClick={handleAdd}
                className="flex-1 py-2.5 rounded-full text-white text-[13px] flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-95"
                style={{ fontFamily: T.poppins, background: added ? "#16a34a" : C.orange }}>
                {added
                  ? <><Check size={13} /> ¡Agregado!</>
                  : <><ShoppingCart size={13} /> Agregar al carro</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  }
  return (
    <div className="flex flex-col gap-4 w-[400px] shrink-0">
      <div className="flex flex-col gap-1">
        <p className="text-[20px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
        <p className="text-[16px]" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>
          Novedades, lanzamientos y ofertas exclusivas.
        </p>
      </div>
      {sent ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm" style={{ fontFamily: T.poppins, background: C.orange }}>
          <Check size={16} />¡Gracias por suscribirte! 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico"
            className="flex-1 rounded-full px-4 py-2 text-[14px] outline-none transition-colors"
            style={{ fontFamily: T.poppins, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)", color: "#fff" }} />
          <button type="submit" className="px-5 py-2 rounded-full text-white text-[14px] font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ fontFamily: T.poppins, background: C.orange }}>
            Suscribirse
          </button>
        </form>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: typeof PRODUCTS[0]; onAdd: () => void }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    onAdd();
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-[#eee] aspect-[3/4]">
        {product.tag && (
          <span
            className="absolute top-3 left-3 px-2 py-0.5 text-[11px] rounded text-white z-10"
            style={{ fontFamily: T.poppins, background: product.tag === "Favorito" ? C.purple : C.orange }}
          >
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <button
          onClick={handleAdd}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-[13px] whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-md"
          style={{ fontFamily: T.poppins, background: added ? "#16a34a" : C.orange }}
        >
          {added ? <span className="flex items-center gap-1"><Check size={13} /> Agregado</span> : "Agregar al carro"}
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[14px] text-black/80 truncate" style={{ fontFamily: T.poppins }}>{product.name}</p>
        <p className="text-[15px] text-black/90" style={{ fontFamily: T.poppins, fontWeight: 600 }}>
          ${product.price.toLocaleString("es-CL")}
        </p>
      </div>
    </div>
  );
}

export function WebTiendaPage({ onBack, onAddToCart }: { onBack: () => void; onAddToCart: (name: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("Más recientes");
  const [showSort, setShowSort] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const filtered = PRODUCTS
    .filter(p => activeCategory === "Todos" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "Precio: menor a mayor") return a.price - b.price;
      if (sortBy === "Precio: mayor a menor") return b.price - a.price;
      return 0;
    });

  return (
    <div className="w-full bg-white">
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {/* ── Hero ── */}
      <div className="w-full bg-[#eee] relative overflow-hidden" style={{ minHeight: 220 }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#f2e0cc]/90 to-transparent" />
        <div className="relative px-6 md:px-16 py-12 md:py-16 flex flex-col justify-center" style={{ minHeight: 220 }}>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2 text-black/40" style={{ fontFamily: T.poppins }}>Nuestra colección</p>
          <h1 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(26px, 3.5vw, 52px)", fontWeight: 300 }}>Toda la</h1>
          <h1 className="leading-[0.9] mb-4" style={{ fontFamily: T.piepie, fontSize: "clamp(40px, 5vw, 76px)", color: C.orange, letterSpacing: "-0.02em" }}>Tienda</h1>
          <p className="text-[14px] text-black/50 max-w-[340px]" style={{ fontFamily: T.poppins }}>Papelería ilustrada para organizar, crear y regalar con magia.</p>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-black/10">
        {/* Mobile: scrollable categories */}
        <div className="flex md:hidden items-center gap-2 px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <SlidersHorizontal size={14} className="text-black/35 shrink-0" />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full text-[12px] border shrink-0 transition-all"
              style={{ fontFamily: T.poppins, background: activeCategory === cat ? C.orange : "white", color: activeCategory === cat ? "#fff" : "rgba(0,0,0,0.7)", borderColor: activeCategory === cat ? C.orange : "rgba(0,0,0,0.15)" }}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex md:hidden items-center justify-between px-4 pb-3 border-t border-black/5">
          <p className="text-[12px] text-black/40" style={{ fontFamily: T.poppins }}>{filtered.length} producto{filtered.length !== 1 ? "s" : ""}</p>
          <div className="relative">
            <button onClick={() => setShowSort(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] text-black/60"
              style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.15)" }}>
              {sortBy} <ChevronDown size={13} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-black/10 py-1 min-w-[200px] z-20">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-black/70 hover:bg-black/5 transition-colors"
                    style={{ fontFamily: T.poppins, fontWeight: opt === sortBy ? 600 : 400 }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-4 px-16 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[13px] text-black/40 mr-2" style={{ fontFamily: T.poppins }}><SlidersHorizontal size={14} /> Filtrar:</span>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-full text-[13px] border transition-all"
                style={{ fontFamily: T.poppins, background: activeCategory === cat ? C.orange : "white", color: activeCategory === cat ? "#fff" : "rgba(0,0,0,0.7)", borderColor: activeCategory === cat ? C.orange : "rgba(0,0,0,0.15)" }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative shrink-0">
            <button onClick={() => setShowSort(v => !v)}
              className="flex items-center gap-2 px-4 py-1.5 rounded border text-[13px] text-black/70 hover:border-black/40 transition-colors"
              style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.2)" }}>
              {sortBy} <ChevronDown size={14} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-black/10 py-1 min-w-[180px] z-20">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className="w-full text-left px-4 py-2 text-[13px] text-black/70 hover:bg-black/5 transition-colors"
                    style={{ fontFamily: T.poppins, fontWeight: opt === sortBy ? 600 : 400 }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop counter */}
      <div className="hidden md:block px-16 pt-6 pb-2">
        <p className="text-[13px] text-black/40" style={{ fontFamily: T.poppins }}>
          {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "Todos" && <> en <span className="text-black/60">{activeCategory}</span></>}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="px-4 md:px-16 pt-4 md:pt-6 pb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filtered.map(product => (
          <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
            <ProductCard product={product} onAdd={() => onAddToCart(product.name)} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-[15px] text-black/40" style={{ fontFamily: T.poppins }}>No hay productos en esta categoría.</p>
          <button onClick={() => setActiveCategory("Todos")} className="mt-4 text-[14px] underline" style={{ fontFamily: T.poppins, color: C.orange }}>Ver todos</button>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="px-6 md:px-16 py-14" style={{ background: C.purple }}>
        {/* Mobile */}
        <div className="flex flex-col gap-10 md:hidden">
          <div className="flex flex-col gap-4">
            <div style={{ width: 139, height: 43, position: "relative" }}><OlffyLogoYellow /></div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>Papelería ilustrada para crear y regalar con magia.</p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors"><Icon size={18} /></button>
              ))}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Tienda</p>
              <div className="flex flex-col gap-2">
                {["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Nosotros</p>
              <div className="flex flex-col gap-2">
                {["Nuestra historia", "Sustentabilidad", "Blog", "Contacto"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
            <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>Novedades y las últimas ofertas</p>
            <input type="email" placeholder="Correo electrónico"
              className="w-full px-4 py-2.5 rounded-xl text-[13px] bg-white/10 text-white placeholder-white/30 outline-none border border-white/15"
              style={{ fontFamily: T.poppins }} />
            <button className="w-full py-2.5 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}>Suscribirse</button>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:flex gap-16 items-start">
          <div className="flex flex-col gap-5 shrink-0 w-52">
            <div style={{ width: 139, height: 43, position: "relative" }}><OlffyLogoYellow /></div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>Papelería ilustrada para crear y regalar con magia.</p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors"><Icon size={18} /></button>
              ))}
            </div>
          </div>
          <div className="flex gap-16 flex-1">
            {[
              { title: "Tienda", links: ["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"] },
              { title: "Nosotros", links: ["Nuestra historia", "Sustentabilidad", "Blog", "Contacto"] },
            ].map(col => (
              <div key={col.title} className="flex flex-col gap-4">
                <p className="text-[17px] text-white" style={{ fontFamily: T.piepie }}>{col.title}</p>
                <div className="flex flex-col gap-2">
                  {col.links.map(l => (
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
