// {/* MARKER-MAKE-KIT-INVOKED */}
import { useState, useRef } from "react";
import { HeroBanner } from "./components/HeroBanner";
import OlffyLogoYellow from "../imports/OlffyLogo/index";
import OlffyLogoNav from "../imports/Frame75/index";
import { WebTiendaPage } from "./components/WebTiendaPage";
import { NuestraHistoriaPage } from "./components/NuestraHistoriaPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { NuevosLanzamientosPage } from "./components/NuevosLanzamientosPage";
import { ContactoPage } from "./components/ContactoPage";
import { RegalosPage } from "./components/RegalosPage";
import { AccountPage } from "./components/AccountPage";
import { AdminPage } from "./components/AdminPage";
import MouseVector from "../imports/Vector/index";
// WebTienda Figma import kept for reference: ../imports/WebTienda/index
import {
  Search, User, ShoppingBag, X, ChevronLeft, ChevronRight,
  ChevronDown, Instagram, Twitter, Facebook, ShoppingCart, Check,
} from "lucide-react";
import svgPaths from "../imports/WebHome/svg-nc9oybvrkk";
import imgDSC4258 from "../imports/_DSC4258.JPG";

const C = { cream: "#fff5d9", yellow: "#fab405", orange: "#e94300", purple: "#5957b0" };

// Typography system
const T = {
  piepie: "'PiepieW01-Regular', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  poppins: "'Poppins', sans-serif",
};

// ── Logo ───────────────────────────────────────────────────────────────────────
function OlffyLogo() {
  return (
    <svg className="h-[27px] w-[139px]" fill="none" viewBox="0 0 138.637 26.8875">
      <g>
        <g>
          <path d={svgPaths.p314d3180} fill={C.orange} />
          <path d={svgPaths.p228d2880} fill="white" />
        </g>
        <path d={svgPaths.pef7b0f0} fill={C.orange} />
        <path d={svgPaths.p1195e600} fill={C.orange} />
        <path d={svgPaths.p1809a400} fill={C.orange} />
        <path d={svgPaths.p78a6300} fill={C.orange} />
      </g>
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Agenda creativa", price: 20, tag: "Nuevo" },
  { id: 2, name: "Set de lápices", price: 10, tag: null },
  { id: 3, name: "Calendario 2024", price: 12, tag: "Popular" },
  { id: 4, name: "Tarjetas de felicitación", price: 8, tag: null },
  { id: 5, name: "Planner semanal", price: 15, tag: "Nuevo" },
];

const FAVORITES = [
  { id: 1, name: "Agenda creativa", price: 20, category: "Planners" },
  { id: 2, name: "Set de lápices de colores", price: 10, category: "Escritura" },
  { id: 3, name: "Stickers ilustrados", price: 6, category: "Stickers" },
  { id: 4, name: "Calendario de pared", price: 14, category: "Calendarios" },
];

// ── Promo Banner ───────────────────────────────────────────────────────────────
const PROMO_TEXT = "Envíos a todo Chile 🧡  ·  Retiro gratis en tienda en Viña del Mar ✨  ·  Cuadernos, planners, stickers y papelería ilustrada ✨  ·  Nuevas colecciones disponibles 🌸  ·  ";

function PromoBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center py-2 w-full z-10 overflow-hidden" style={{ background: C.purple }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { display: flex; animation: marquee 28s linear infinite; white-space: nowrap; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="flex-1 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span key={i} style={{ fontFamily: T.poppins }} className="text-[13px] text-white/80 leading-5 pr-0">
              {PROMO_TEXT}
            </span>
          ))}
        </div>
      </div>
      <button onClick={onClose} className="ml-3 mr-3 text-white/70 hover:text-white transition-colors shrink-0" aria-label="Cerrar">
        <X size={16} />
      </button>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ cartCount, onCartClick, onAccountClick, activeNav, setActiveNav, onSubNavClick }: { cartCount: number; onCartClick: () => void; onAccountClick: () => void; activeNav: string; setActiveNav: (v: string) => void; onSubNavClick: (item: string) => void }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredNav(label);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setHoveredNav(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const NAV_ITEMS: { label: string; items?: string[] }[] = [
    { label: "Inicio" },
    { label: "Tienda", items: ["Agendas y planners", "Cuadernos y libretas", "Stickers", "Tarjetas y notas", "Marcapáginas", "Accesorios y empaques"] },
    { label: "Novedades", items: ["Nuevos lanzamientos", "Colecciones recientes", "Más vendidos", "Próximamente"] },
    { label: "Regalos", items: ["Regalos para amigas", "Regalos para estudiantes", "Kits de papelería", "Por precio: hasta $5.000", "Por precio: hasta $10.000", "Por precio: hasta $15.000", "Empaque para regalo"] },
    { label: "Nuestra historia", items: ["Sobre OLFFY", "Nuestra tienda en Viña del Mar", "Proceso creativo", "Comunidad OLFFY"] },
    { label: "Contacto", items: ["Redes sociales", "Dirección / Mapa", "Horarios", "Preguntas frecuentes"] },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedNav, setMobileExpandedNav] = useState<string | null>(null);

  // Search overlay shared
  const searchOverlay = searchOpen && (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-24 px-6"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setSearchValue(""); } }}
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3">
        <Search size={18} className="text-black/40 shrink-0" />
        <input
          autoFocus
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && (setSearchOpen(false), setSearchValue(""))}
          placeholder="Buscar productos..."
          className="flex-1 text-[15px] outline-none bg-transparent"
          style={{ fontFamily: T.poppins }}
        />
        <button onClick={() => { setSearchOpen(false); setSearchValue(""); }}>
          <X size={18} className="text-black/40 hover:text-black/80 transition-colors" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full relative z-20 bg-white border-b border-black/10">
      {searchOverlay}

      {/* ── Desktop navbar ─────────────────────────────────────────── */}
      <div className="hidden md:flex px-12 py-4 items-center justify-between relative">
        <a href="#" className="shrink-0"><div style={{ width: 160, height: 50, position: "relative" }}><OlffyLogoNav /></div></a>

        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          {NAV_ITEMS.map(({ label, items }) => (
            <div key={label} className="relative" onMouseEnter={() => openMenu(label)} onMouseLeave={scheduleClose}>
              <button
                onClick={() => setActiveNav(label)}
                className={`flex items-center gap-1 text-[15px] leading-5 transition-colors whitespace-nowrap py-1 ${activeNav === label ? "text-black/90 border-b-2 border-black/80" : "text-black/70 hover:text-black/90"}`}
                style={{ fontFamily: T.poppins }}
              >
                {label}
                {items && <ChevronDown size={14} className={`opacity-50 transition-transform duration-200 ${hoveredNav === label ? "rotate-180" : ""}`} />}
              </button>

              {items && hoveredNav === label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-black/10 rounded-xl shadow-lg py-2 min-w-[220px] z-50"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-black/10 rotate-45" />
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <button
                          className="w-full text-left px-4 py-2.5 text-[14px] text-black/70 hover:text-black hover:bg-black/[0.04] transition-colors"
                          style={{ fontFamily: T.poppins }}
                          onClick={() => { setActiveNav(label); setHoveredNav(null); onSubNavClick(item); }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button onClick={() => setSearchOpen(v => !v)} className="text-black/80 hover:text-black transition-colors shrink-0" aria-label="Buscar">
            <Search size={22} />
          </button>
          <button onClick={onAccountClick} className="text-black/80 hover:text-black transition-colors" aria-label="Mi cuenta"><User size={22} /></button>
          <button onClick={onCartClick} className="relative text-black/80 hover:text-black transition-colors" aria-label="Carrito">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: C.orange }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile navbar ──────────────────────────────────────────── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        {/* Left: logo */}
        <a href="#">
          <div style={{ width: 108, height: 30, position: "relative" }}><OlffyLogoNav /></div>
        </a>

        {/* Right: icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(v => !v)} className="text-black/80" aria-label="Buscar">
            <Search size={22} />
          </button>
          <button onClick={onAccountClick} className="text-black/80" aria-label="Mi cuenta"><User size={22} /></button>
          <button onClick={onCartClick} className="relative text-black/80" aria-label="Carrito">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: C.orange }}>
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileMenuOpen(v => !v)} className="text-black/80" aria-label="Menú">
            {mobileMenuOpen ? <X size={22} /> : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2.75 5.5H19.25" stroke="black" strokeOpacity="0.8" strokeWidth="1.83" strokeLinecap="round" />
                <path d="M2.75 11H19.25" stroke="black" strokeOpacity="0.8" strokeWidth="1.83" strokeLinecap="round" />
                <path d="M2.75 16.5H19.25" stroke="black" strokeOpacity="0.8" strokeWidth="1.83" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer menu ─────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/08 flex flex-col">
          {NAV_ITEMS.map(({ label, items }) => (
            <div key={label} className="border-b border-black/06">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-[15px] text-black/75"
                style={{ fontFamily: T.poppins }}
                onClick={() => {
                  if (items) {
                    setMobileExpandedNav(mobileExpandedNav === label ? null : label);
                  } else {
                    setActiveNav(label);
                    setMobileMenuOpen(false);
                  }
                }}
              >
                {label}
                {items && <ChevronDown size={16} className={`opacity-40 transition-transform duration-200 ${mobileExpandedNav === label ? "rotate-180" : ""}`} />}
              </button>
              {items && mobileExpandedNav === label && (
                <div className="flex flex-col pb-2">
                  {(() => {
                    const shortcutMap: Record<string, string> = {
                      "Tienda": "Todos los productos",
                      "Novedades": "Todas las novedades",
                      "Regalos": "Todos los regalos",
                      "Nuestra historia": "Conoce nuestra historia",
                      "Contacto": "Información de contacto",
                    };
                    const shortcut = shortcutMap[label];
                    if (!shortcut) return null;
                    return (
                      <button
                        className="text-left px-8 py-2.5 text-[14px] text-black/75 hover:text-black/90 transition-colors"
                        style={{ fontFamily: T.poppins, fontWeight: 500 }}
                        onClick={() => { setActiveNav(label); setMobileMenuOpen(false); }}
                      >
                        {shortcut}
                      </button>
                    );
                  })()}
                  {items.map((item) => (
                    <button
                      key={item}
                      className="text-left px-8 py-2.5 text-[14px] text-black/50 hover:text-black/80 transition-colors"
                      style={{ fontFamily: T.poppins }}
                      onClick={() => { setActiveNav(label); onSubNavClick(item); setMobileMenuOpen(false); }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Image placeholder ──────────────────────────────────────────────────────────
function ImgBox({ className = "", rounded = "rounded-xl" }: { className?: string; rounded?: string }) {
  return (
    <div className={`bg-[#eee] border-2 border-black/10 relative overflow-hidden flex items-center justify-center ${rounded} ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="black" strokeWidth="2" />
        <circle cx="17" cy="20" r="4" stroke="black" strokeWidth="2" />
        <path d="M4 34l10-10 8 8 6-6 16 10" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart }: { product: (typeof PRODUCTS)[0]; onAddToCart: (name: string) => void }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    onAddToCart(product.name);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col shrink-0 w-[266px] group cursor-pointer rounded-2xl overflow-hidden border transition-shadow hover:shadow-lg snap-center" style={{ borderColor: "rgba(0,0,0,0.07)", background: "white" }}>
      <div className="relative">
        <ImgBox className="h-[420px] w-full" rounded="rounded-none" />
        {product.tag && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] rounded-full text-white" style={{ fontFamily: T.poppins, background: C.orange }}>
            {product.tag}
          </span>
        )}
        <button
          onClick={handleAdd}
          className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-[13px] flex items-center gap-1.5 transition-all duration-200 shadow-sm ${added ? "text-white" : "bg-white text-black/75 opacity-0 group-hover:opacity-100"}`}
          style={{ fontFamily: T.poppins, ...(added ? { background: C.orange } : {}) }}
        >
          {added ? <><Check size={13} />Añadido</> : <><ShoppingCart size={13} />Añadir</>}
        </button>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-[16px] text-black/80 truncate" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>
          {product.name}
        </p>
        <p className="text-[14px] text-black/40" style={{ fontFamily: T.poppins }}>
          ${product.price}.000
        </p>
      </div>
    </div>
  );
}

// ── Cart Drawer ────────────────────────────────────────────────────────────────
function CartDrawer({ items, onClose, onRemove, onCheckout }: { items: string[]; onClose: () => void; onRemove: (idx: number) => void; onCheckout: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-80 h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          {/* Cart title: PiepieW01 */}
          <p className="text-[20px]" style={{ fontFamily: T.piepie }}>Carrito</p>
          <button onClick={onClose} className="text-black/60 hover:text-black transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-black/40">
              <ShoppingBag size={40} />
              <p className="text-sm" style={{ fontFamily: T.poppins }}>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-3 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#eee] rounded flex-shrink-0" />
                    <p className="text-sm text-black/80" style={{ fontFamily: T.poppins }}>{item}</p>
                  </div>
                  <button onClick={() => onRemove(i)} className="text-black/30 hover:text-black/70 transition-colors shrink-0"><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/10">
            <button onClick={onCheckout} className="w-full py-3 rounded-full text-white transition-opacity hover:opacity-90" style={{ fontFamily: T.poppins, fontWeight: 500, background: C.orange }}>
              Ir al checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Newsletter ─────────────────────────────────────────────────────────────────
function Newsletter() {
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
        {/* Newsletter title: PiepieW01 */}
        <p className="text-[20px] text-white" style={{ fontFamily: T.piepie }}>
          Suscríbete
        </p>
        {/* Subtitle: Ivy Presto */}
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

// ── Section heading helper: Ivy italic + PiepieW01 bold on two lines ───────────
function SectionHeading({ eyebrow, title, align = "left" }: { eyebrow?: string; title: string; align?: "left" | "center" }) {
  const alignClass = align === "center" ? "text-center" : "";
  return (
    <div className={`flex flex-col gap-0 ${alignClass}`}>
      {eyebrow && (
        <span className="text-[13px] tracking-[0.18em] uppercase text-black/40 mb-1" style={{ fontFamily: T.poppins }}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-black/85 leading-tight" style={{ fontFamily: T.piepie, fontSize: "clamp(36px, 4vw, 56px)" }}>
        {title}
      </h2>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Inicio");
  const [activePage, setActivePage] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  function addToCart(name: string) { setCartItems((prev) => [...prev, name]); }
  function removeFromCart(idx: number) { setCartItems((prev) => prev.filter((_, i) => i !== idx)); }
  function scrollCarousel(dir: "left" | "right") {
    carouselRef.current?.scrollBy({ left: dir === "left" ? -282 : 282, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {adminOpen && <AdminPage onClose={() => setAdminOpen(false)} />}
      {accountOpen && <AccountPage onClose={() => setAccountOpen(false)} />}
      {checkoutOpen && <CheckoutPage cartItems={cartItems} onClose={() => { setCheckoutOpen(false); setCartOpen(false); }} onRemove={removeFromCart} />}
      {!checkoutOpen && cartOpen && <CartDrawer items={cartItems} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />}
      {showBanner && <PromoBanner onClose={() => setShowBanner(false)} />}
      <Navbar cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} onAccountClick={() => setAccountOpen(v => !v)} activeNav={activeNav} setActiveNav={(v) => { setActiveNav(v); setActivePage(null); }} onSubNavClick={(item) => setActivePage(item)} />

      {activeNav === "Tienda" && !activePage && <WebTiendaPage onBack={() => setActiveNav("Inicio")} onAddToCart={addToCart} />}
      {activeNav === "Nuestra historia" && !activePage && <NuestraHistoriaPage />}
      {activeNav === "Contacto" && !activePage && <ContactoPage onBack={() => setActiveNav("Inicio")} />}
      {activeNav === "Regalos" && !activePage && <RegalosPage onBack={() => setActiveNav("Inicio")} onAddToCart={addToCart} />}
      {activePage === "Nuevos lanzamientos" && <NuevosLanzamientosPage onBack={() => setActivePage(null)} onAddToCart={addToCart} />}

      {activeNav !== "Tienda" && activeNav !== "Nuestra historia" && activeNav !== "Contacto" && activeNav !== "Regalos" && !activePage && <>
      {/* ── Hero banner ─────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <HeroBanner />
      </section>

      {/* ── Lanzamientos nuevos ──────────────────────────────────── */}
      <section className="bg-white">
        {/* ── Mobile layout ── */}
        <div className="flex flex-col gap-5 md:hidden px-6 pt-16 pb-14">
          {/* 1. Títulos */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
              Colección actual
            </span>
            <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(28px, 7vw, 40px)" }}>
              Nuevos
            </h2>
            <h2 className="leading-none text-black/85 -mt-1" style={{ fontFamily: T.piepie, fontSize: "clamp(36px, 9vw, 52px)" }}>
              Lanzamientos
            </h2>
          </div>
          {/* 2. Imagen con 8px de margen lateral */}
          <div className="rounded-2xl overflow-hidden" style={{ marginLeft: 8, marginRight: 8, height: 280 }}>
            <img src={imgDSC4258} alt="" className="w-full h-full object-cover" />
          </div>
          {/* 3. Subtítulo y botón */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] text-black/50 leading-relaxed" style={{ fontFamily: T.poppins }}>
              Explora nuestros productos más recientes, diseñados para inspirarte cada día.
            </p>
            <button
              className="self-start px-7 py-3.5 rounded-full text-white text-[15px] transition-transform hover:scale-105 active:scale-95"
              style={{ fontFamily: T.poppins, background: C.orange }}
            >
              Explorar tienda →
            </button>
          </div>
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="hidden md:flex items-center gap-24 px-16 py-20">
          <div className="flex flex-col gap-8 flex-1 max-w-[480px]">
            <div className="flex flex-col gap-3">
              <span className="text-[12px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
                Colección actual
              </span>
              <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(32px, 3.5vw, 52px)" }}>
                Nuevos
              </h2>
              <h2 className="leading-none text-black/85 -mt-2" style={{ fontFamily: T.piepie, fontSize: "clamp(40px, 4.5vw, 64px)" }}>
                Lanzamientos
              </h2>
              <p className="text-[16px] text-black/50 leading-relaxed mt-2" style={{ fontFamily: T.poppins }}>
                Explora nuestros productos más recientes, diseñados para inspirarte cada día.
              </p>
            </div>
            <button
              className="self-start px-7 py-3.5 rounded-full text-white text-[15px] font-medium transition-transform hover:scale-105 active:scale-95"
              style={{ fontFamily: T.poppins, background: C.orange }}
            >
              Explorar tienda →
            </button>
          </div>
          <div className="flex-1 h-[500px] rounded-2xl overflow-hidden">
            <img src={imgDSC4258} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── Nuevos productos carousel ────────────────────────────── */}
      <section className="py-16 flex flex-col gap-10 bg-white">
        {/* Header */}
        <div className="flex flex-col gap-3 px-6 md:px-16 relative">
          <style>{`
            @keyframes mouseFloat { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-4px) rotate(-8deg)} }
            .mouse-float { animation: mouseFloat 3s ease-in-out infinite; }
            .mouse-float:hover { animation: none; transform: translateY(-10px) rotate(15deg) scale(1.15); transition: transform 0.35s cubic-bezier(.34,1.56,.64,1); }
          `}</style>
          <div className="mouse-float absolute -top-8 right-6 md:right-16 cursor-pointer" style={{ width: 48, height: 47 }}>
            <MouseVector />
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
            Recién llegados
          </span>
          <h2 className="text-black/85 leading-none" style={{ fontFamily: T.piepie, fontSize: "clamp(28px, 3vw, 42px)" }}>
            Nuevos productos
          </h2>
          <button className="self-start text-[13px] text-black/45 hover:text-black transition-colors underline underline-offset-2" style={{ fontFamily: T.poppins }}>
            Ver todos →
          </button>
        </div>

        {/* Carousel */}
        <div className="relative px-6 md:px-16">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", scrollPaddingLeft: "24px" }}
          >
            {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10 ml-1"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10 mr-1"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* ── Conoce OLFFY ─────────────────────────────────────────── */}
      <section className="bg-white">
        {/* ── Mobile layout ── */}
        <div className="flex flex-col gap-8 md:hidden px-6 pt-14 pb-12">
          {/* Títulos */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
              Nuestra historia
            </span>
            <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(30px, 7vw, 42px)" }}>
              Conoce
            </h2>
            <h2 className="leading-none text-black/85 -mt-2" style={{ fontFamily: T.piepie, fontSize: "clamp(44px, 10vw, 62px)" }}>
              OLFFY
            </h2>
          </div>
          {/* Texto y botón */}
          <div className="flex flex-col gap-5">
            <p className="text-[17px] text-black/60 leading-relaxed" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>
              Descubre la historia detrás de OLFFY y cómo creamos productos únicos para organizar tu mundo con magia.
            </p>
            <button
              className="self-start px-6 py-3 border-2 border-black/80 rounded-full text-[14px] text-black/80 hover:bg-black/5 transition-colors"
              style={{ fontFamily: T.poppins }}
            >
              Ver nuestra historia →
            </button>
          </div>
          {/* Imagen horizontal recortada */}
          <ImgBox className="w-full h-[200px]" rounded="rounded-2xl" />
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="hidden md:flex flex-col gap-20 px-16 py-20">
          <div className="flex gap-24 items-start">
            <div className="flex-1 flex flex-col gap-4">
              <span className="text-[12px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
                Nuestra historia
              </span>
              <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(32px, 3vw, 48px)" }}>
                Conoce
              </h2>
              <h2 className="leading-none text-black/85 -mt-3" style={{ fontFamily: T.piepie, fontSize: "clamp(48px, 5vw, 72px)" }}>
                OLFFY
              </h2>
            </div>
            <div className="flex-1 pt-6 flex flex-col gap-6">
              <p className="text-[20px] text-black/70 leading-relaxed" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>
                Descubre la historia detrás de OLFFY y cómo creamos productos únicos para organizar tu mundo con magia.
              </p>
              <button
                className="self-start px-6 py-3 border-2 border-black/80 rounded-full text-[15px] text-black/80 hover:bg-black/5 transition-colors"
                style={{ fontFamily: T.poppins }}
              >
                Ver nuestra historia →
              </button>
            </div>
          </div>
          <ImgBox className="w-full h-[600px]" rounded="rounded-2xl" />
        </div>
      </section>

      {/* ── Producto en uso ──────────────────────────────────────── */}
      

      {/* ── Film strip ───────────────────────────────────────────── */}
      <section className="px-6 md:px-16 py-12 bg-white">
        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {[0, 1, 2].map((i) => (
            <ImgBox key={i} className="w-full h-[220px]" rounded="rounded-2xl" />
          ))}
        </div>
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex gap-8 justify-center">
          {[0, 1, 2].map((i) => (
            <ImgBox key={i} className="flex-1 h-[380px]" rounded="rounded-2xl" />
          ))}
        </div>
      </section>

      {/* ── Productos favoritos ──────────────────────────────────── */}
      <section className="py-16 flex flex-col gap-8 bg-white">
        {/* Header */}
        <div className="flex flex-col gap-2 px-6 md:px-16">
          <span className="text-[11px] tracking-[0.2em] uppercase text-black/40" style={{ fontFamily: T.poppins }}>
            Los más queridos
          </span>
          <h2 className="text-black/85 leading-none" style={{ fontFamily: T.piepie, fontSize: "clamp(26px, 3vw, 40px)" }}>
            Favoritos &amp; más esperados
          </h2>
          <button className="self-start text-[13px] text-black/45 hover:text-black transition-colors underline underline-offset-2 mt-1" style={{ fontFamily: T.poppins }}>
            Ver todos →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-16">
          {FAVORITES.map((p) => (
            <div
              key={p.id}
              className="flex flex-col rounded-2xl overflow-hidden border group cursor-pointer transition-shadow hover:shadow-lg"
              style={{ borderColor: "rgba(0,0,0,0.07)", background: "white" }}
            >
              <div className="relative">
                <ImgBox className="w-full h-[200px] md:h-[240px]" rounded="rounded-none" />
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ fontFamily: T.poppins, background: "rgba(255,255,255,0.85)", color: "rgba(0,0,0,0.45)" }}>
                  {p.category}
                </span>
                <button
                  onClick={() => addToCart(p.name)}
                  className="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl text-[12px] text-white flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  style={{ fontFamily: T.poppins, background: C.orange }}
                >
                  <ShoppingCart size={12} /> Añadir
                </button>
              </div>
              <div className="flex flex-col gap-0.5 p-3">
                <p className="text-[14px] text-black/75 leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic" }}>{p.name}</p>
                <p className="text-[13px] text-black/40" style={{ fontFamily: T.poppins }}>${p.price}.000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="px-6 md:px-16 py-14" style={{ background: C.purple }}>
        {/* ── Mobile: stacked vertically ── */}
        <div className="flex flex-col gap-10 md:hidden">
          {/* 1. Logo + tagline + social */}
          <div className="flex flex-col gap-4">
            <div style={{ width: 139, height: 43, position: "relative" }}>
              <OlffyLogoYellow />
            </div>
            <p className="text-[14px] leading-snug" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
              Papelería ilustrada para crear y regalar con magia.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{ color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors"><Icon size={18} /></button>
              ))}
            </div>
          </div>
          {/* 2. Tienda + Nosotros side by side */}
          <div className="flex gap-10">
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Tienda</p>
              <div className="flex flex-col gap-2">
                {["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"].map((l) => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Nosotros</p>
              <div className="flex flex-col gap-2">
                {["Nuestra historia", "Sustentabilidad", "Blog", "Contacto"].map((l) => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
          {/* 3. Newsletter — button below input */}
          <div className="flex flex-col gap-3">
            <p className="text-[15px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
            <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>Novedades y las últimas ofertas</p>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2.5 rounded-xl text-[13px] bg-white/10 text-white placeholder-white/30 outline-none border border-white/15 focus:bg-white/15 transition-colors"
              style={{ fontFamily: T.poppins }}
            />
            <button
              className="w-full py-2.5 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
              style={{ background: C.orange, fontFamily: T.poppins }}
            >
              Suscribirse
            </button>
          </div>
        </div>

        {/* ── Desktop: horizontal ── */}
        <div className="hidden md:flex gap-16 items-start">
          <div className="flex flex-col gap-5 shrink-0 w-52">
            <div style={{ width: 139, height: 43, position: "relative" }}>
              <OlffyLogoYellow />
            </div>
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
          <Newsletter />
        </div>

        {/* ── Copyright row ── */}
        <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.35)" }}>
            © 2026 <span style={{ color: C.yellow }}>Olffy</span>. Creado inteligentemente por <span onDoubleClick={() => setAdminOpen(true)} style={{ cursor: "default" }}>Mouse Labs 🐭</span>
          </p>
        </div>
      </footer>
      </>}
    </div>
  );
}
