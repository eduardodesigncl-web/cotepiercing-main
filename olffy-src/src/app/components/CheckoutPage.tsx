import { useState, useRef } from "react";
import { X, Plus, Minus, Trash2, Tag, ChevronLeft, ChevronRight, ShoppingCart, Check, Facebook, Instagram, Twitter } from "lucide-react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";

const T = {
  poppins: "'Poppins', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  piepie: "'PiepieW01-Regular', sans-serif",
};
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

const SHIPPING = 3990;

const EXTRAS = [
  { id: "e1", name: "Papel de regalo",      price: 990,  emoji: "🎁" },
  { id: "e2", name: "Tarjeta de regalo",    price: 1990, emoji: "💌" },
  { id: "e3", name: "Taquito de notas",     price: 1490, emoji: "📝" },
  { id: "e4", name: "Sobre kraft",          price: 590,  emoji: "✉️" },
  { id: "e5", name: "Sticker sorpresa",     price: 490,  emoji: "✨" },
  { id: "e6", name: "Bolsa organza",        price: 790,  emoji: "🛍️" },
  { id: "e7", name: "Marcapáginas extra",   price: 890,  emoji: "🔖" },
  { id: "e8", name: "Nota adhesiva x20",    price: 1290, emoji: "🗒️" },
];

const PROMO_CODES: Record<string, number> = {
  OLFFY10: 0.1,
  BIENVENIDA: 0.15,
};

function ImgTile({ tint = "#f2e0cc", className = "" }: { tint?: string; className?: string }) {
  return (
    <div className={`rounded-lg flex items-center justify-center ${className}`} style={{ background: tint }}>
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="opacity-25">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="black" strokeWidth="2.5" />
        <circle cx="17" cy="20" r="4" stroke="black" strokeWidth="2.5" />
        <path d="M4 34l10-10 8 8 6-6 16 10" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const TINTS = ["#f2e0cc", "#e8e0f0", "#fde8dc", "#e0e8f0", "#fdf0dc"];

export function CheckoutPage({
  cartItems,
  onClose,
  onRemove,
}: {
  cartItems: string[];
  onClose: () => void;
  onRemove: (idx: number) => void;
}) {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(cartItems.map((_, i) => [i, 1]))
  );
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState(false);
  const [addedExtras, setAddedExtras] = useState<Set<string>>(new Set());
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const ITEM_PRICE = 8990;

  const subtotal = cartItems.reduce((sum, _, i) => sum + ITEM_PRICE * (quantities[i] ?? 1), 0);
  const extrasTotal = Array.from(addedExtras).reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id);
    return sum + (e?.price ?? 0);
  }, 0);
  const discount = appliedPromo ? Math.round((subtotal + extrasTotal) * (PROMO_CODES[appliedPromo] ?? 0)) : 0;
  const total = subtotal + extrasTotal + SHIPPING - discount;

  function setQty(idx: number, delta: number) {
    setQuantities(prev => ({ ...prev, [idx]: Math.max(1, (prev[idx] ?? 1) + delta) }));
  }

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  }

  function toggleExtra(id: string) {
    setAddedExtras(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); return next; }
      next.add(id);
      setJustAdded(id);
      setTimeout(() => setJustAdded(null), 1200);
      return next;
    });
  }

  function scrollCarousel(dir: "left" | "right") {
    carouselRef.current?.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${C.orange}18` }}>
          <Check size={32} style={{ color: C.orange }} />
        </div>
        <h2 className="text-center" style={{ fontFamily: T.piepie, fontSize: 42, color: C.orange }}>¡Pedido realizado!</h2>
        <p className="text-center text-black/50 max-w-sm" style={{ fontFamily: T.poppins }}>
          Gracias por tu compra. Te enviaremos un correo con los detalles de tu pedido.
        </p>
        <button onClick={onClose}
          className="px-8 py-3 rounded-full text-white transition-opacity hover:opacity-90"
          style={{ fontFamily: T.poppins, fontWeight: 500, background: C.orange }}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top bar ── */}
      <div className="px-16 py-5 border-b border-black/8 flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 text-[14px] text-black/50 hover:text-black/80 transition-colors"
          style={{ fontFamily: T.poppins }}>
          <ChevronLeft size={16} /> Seguir comprando
        </button>
        <h1 style={{ fontFamily: T.piepie, fontSize: 28, color: "rgba(0,0,0,0.85)" }}>Carrito de compra</h1>
        <p className="text-[13px] text-black/35" style={{ fontFamily: T.poppins }}>
          {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* ── Main two-column layout ── */}
      <div className="px-4 md:px-16 py-8 md:py-10 flex flex-col md:flex-row gap-8 md:gap-10 items-start">

        {/* ── Left: item list ── */}
        <div className="flex-1 flex flex-col gap-0">
          {/* Column headers — desktop only */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-black/10 mb-1">
            <p className="text-[12px] uppercase tracking-wider text-black/35" style={{ fontFamily: T.poppins }}>Producto</p>
            <p className="text-[12px] uppercase tracking-wider text-black/35 w-28 text-center" style={{ fontFamily: T.poppins }}>Cantidad</p>
            <p className="text-[12px] uppercase tracking-wider text-black/35 w-20 text-right" style={{ fontFamily: T.poppins }}>Total</p>
          </div>
          <div className="md:hidden pb-3 border-b border-black/10 mb-1">
            <p className="text-[12px] uppercase tracking-wider text-black/35" style={{ fontFamily: T.poppins }}>Tu pedido</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-20 flex flex-col items-center gap-4 text-black/30">
              <ShoppingCart size={44} />
              <p style={{ fontFamily: T.poppins }}>Tu carrito está vacío</p>
              <button onClick={onClose} className="text-[14px] underline" style={{ color: C.orange, fontFamily: T.poppins }}>
                Explorar tienda
              </button>
            </div>
          ) : (
            cartItems.map((name, i) => (
              <div key={i} className="py-4 border-b border-black/6">
                {/* Mobile layout */}
                <div className="flex gap-3 md:hidden">
                  <ImgTile tint={TINTS[i % TINTS.length]} className="w-[72px] h-[72px] shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <p className="text-[14px] text-black/80 leading-snug" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{name}</p>
                    <p className="text-[12px] text-black/40" style={{ fontFamily: T.poppins }}>${ITEM_PRICE.toLocaleString("es-CL")} c/u</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1 border border-black/12 rounded-full px-1">
                        <button onClick={() => setQty(i, -1)} className="w-7 h-7 flex items-center justify-center text-black/40"><Minus size={11} /></button>
                        <span className="text-[13px] text-black/70 w-5 text-center" style={{ fontFamily: T.poppins }}>{quantities[i] ?? 1}</span>
                        <button onClick={() => setQty(i, 1)} className="w-7 h-7 flex items-center justify-center text-black/40"><Plus size={11} /></button>
                      </div>
                      <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 600 }}>${(ITEM_PRICE * (quantities[i] ?? 1)).toLocaleString("es-CL")}</p>
                    </div>
                    <button onClick={() => onRemove(i)} className="flex items-center gap-1 text-[11px] text-black/30 hover:text-red-400 transition-colors w-fit" style={{ fontFamily: T.poppins }}>
                      <Trash2 size={11} /> Eliminar
                    </button>
                  </div>
                </div>
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <ImgTile tint={TINTS[i % TINTS.length]} className="w-[88px] h-[88px] shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{name}</p>
                      <p className="text-[13px] text-black/40" style={{ fontFamily: T.poppins }}>${ITEM_PRICE.toLocaleString("es-CL")} c/u</p>
                      <button onClick={() => onRemove(i)} className="flex items-center gap-1 text-[12px] text-black/30 hover:text-red-400 transition-colors mt-1 w-fit" style={{ fontFamily: T.poppins }}>
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 border border-black/12 rounded-full px-1 w-28 justify-between">
                    <button onClick={() => setQty(i, -1)} className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black/70 transition-colors"><Minus size={13} /></button>
                    <span className="text-[14px] text-black/70 w-6 text-center" style={{ fontFamily: T.poppins }}>{quantities[i] ?? 1}</span>
                    <button onClick={() => setQty(i, 1)} className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black/70 transition-colors"><Plus size={13} /></button>
                  </div>
                  <p className="w-20 text-right text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 600 }}>${(ITEM_PRICE * (quantities[i] ?? 1)).toLocaleString("es-CL")}</p>
                </div>
              </div>
            ))
          )}

          {/* Extras added */}
          {Array.from(addedExtras).map(id => {
            const extra = EXTRAS.find(e => e.id === id)!;
            return (
              <div key={id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-4 border-b border-black/6">
                <div className="flex items-center gap-4">
                  <div className="w-[88px] h-[88px] shrink-0 rounded-lg flex items-center justify-center text-3xl"
                    style={{ background: "#fff5d9" }}>{extra.emoji}</div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{extra.name}</p>
                    <p className="text-[12px] text-black/35" style={{ fontFamily: T.poppins }}>Extra</p>
                    <button onClick={() => toggleExtra(id)} className="flex items-center gap-1 text-[12px] text-black/30 hover:text-red-400 transition-colors mt-1 w-fit"
                      style={{ fontFamily: T.poppins }}>
                      <Trash2 size={12} /> Eliminar
                    </button>
                  </div>
                </div>
                <div className="w-28" />
                <p className="w-20 text-right text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 600 }}>
                  ${extra.price.toLocaleString("es-CL")}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Right: order summary ── */}
        <div className="w-full md:w-[380px] shrink-0 md:sticky md:top-6 flex flex-col gap-5">
          <div className="border border-black/10 rounded-2xl p-6 flex flex-col gap-5">
            <h3 style={{ fontFamily: T.piepie, fontSize: 22, color: "rgba(0,0,0,0.85)" }}>Resumen del pedido</h3>

            <div className="flex flex-col gap-3">
              {[
                { label: "Subtotal", value: `$${subtotal.toLocaleString("es-CL")}` },
                { label: "Envío", value: `$${SHIPPING.toLocaleString("es-CL")}` },
                { label: "Impuestos", value: "Incluido" },
                ...(extrasTotal > 0 ? [{ label: "Extras", value: `$${extrasTotal.toLocaleString("es-CL")}` }] : []),
                ...(discount > 0 ? [{ label: `Descuento (${appliedPromo})`, value: `-$${discount.toLocaleString("es-CL")}`, highlight: true }] : []),
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center">
                  <p className="text-[14px] text-black/50" style={{ fontFamily: T.poppins }}>{row.label}</p>
                  <p className="text-[14px]" style={{ fontFamily: T.poppins, fontWeight: 500, color: (row as any).highlight ? "#16a34a" : "rgba(0,0,0,0.75)" }}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-black/8" />
            <div className="flex justify-between items-center">
              <p className="text-[16px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 600 }}>Total</p>
              <p className="text-[20px]" style={{ fontFamily: T.poppins, fontWeight: 700, color: "rgba(0,0,0,0.85)" }}>
                ${total.toLocaleString("es-CL")}
              </p>
            </div>
          </div>

          {/* Promo code */}
          <div className="border border-black/10 rounded-2xl p-5 flex flex-col gap-3">
            <p className="flex items-center gap-2 text-[13px] text-black/50" style={{ fontFamily: T.poppins }}>
              <Tag size={14} /> Código de descuento
            </p>
            <div className="flex gap-2">
              <input
                value={promoCode}
                onChange={e => { setPromoCode(e.target.value); setPromoError(false); }}
                onKeyDown={e => e.key === "Enter" && applyPromo()}
                placeholder="Ingresa tu código"
                disabled={!!appliedPromo}
                className="flex-1 border rounded-full px-4 py-2 text-[13px] outline-none transition-colors"
                style={{ fontFamily: T.poppins, borderColor: promoError ? "#ef4444" : "rgba(0,0,0,0.15)", background: appliedPromo ? "#f0fdf4" : "white" }}
              />
              {appliedPromo ? (
                <button onClick={() => { setAppliedPromo(null); setPromoCode(""); }}
                  className="px-4 py-2 rounded-full text-[13px] border border-black/15 text-black/50 hover:border-black/30 transition-colors"
                  style={{ fontFamily: T.poppins }}>
                  <X size={14} />
                </button>
              ) : (
                <button onClick={applyPromo}
                  className="px-4 py-2 rounded-full text-[13px] text-white transition-opacity hover:opacity-90"
                  style={{ fontFamily: T.poppins, background: C.purple }}>
                  Aplicar
                </button>
              )}
            </div>
            {promoError && <p className="text-[12px] text-red-400" style={{ fontFamily: T.poppins }}>Código no válido. Intenta con OLFFY10</p>}
            {appliedPromo && <p className="text-[12px] text-green-600 flex items-center gap-1" style={{ fontFamily: T.poppins }}><Check size={12} /> Descuento aplicado</p>}
          </div>

          {/* Checkout button */}
          <button
            onClick={() => setOrderPlaced(true)}
            disabled={cartItems.length === 0}
            className="w-full py-4 rounded-full text-white text-[16px] transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ fontFamily: T.poppins, fontWeight: 600, background: C.orange }}>
            Finalizar compra →
          </button>
          <p className="text-center text-[12px] text-black/30" style={{ fontFamily: T.poppins }}>
            🔒 Pago seguro · Envíos a todo Chile
          </p>
        </div>
      </div>

      {/* ── Extras mini carousel ── */}
      <div className="px-4 md:px-16 py-10 md:py-12 border-t border-black/8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[12px] uppercase tracking-wider text-black/35 mb-1" style={{ fontFamily: T.poppins }}>
              Antes de finalizar
            </p>
            <h3 style={{ fontFamily: T.piepie, fontSize: 26, color: "rgba(0,0,0,0.8)" }}>Agrega algo más 🧡</h3>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollCarousel("left")} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors">
              <ChevronLeft size={16} className="text-black/50" />
            </button>
            <button onClick={() => scrollCarousel("right")} className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors">
              <ChevronRight size={16} className="text-black/50" />
            </button>
          </div>
        </div>

        <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {EXTRAS.map(extra => {
            const isAdded = addedExtras.has(extra.id);
            const isJustAdded = justAdded === extra.id;
            return (
              <div key={extra.id} className="shrink-0 w-[160px] flex flex-col gap-3">
                {/* Mini image */}
                <div className="w-full h-[130px] rounded-xl flex items-center justify-center text-4xl"
                  style={{ background: C.cream }}>
                  {extra.emoji}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[13px] text-black/75 leading-tight" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                    {extra.name}
                  </p>
                  <p className="text-[13px] text-black/45" style={{ fontFamily: T.poppins }}>
                    ${extra.price.toLocaleString("es-CL")}
                  </p>
                </div>
                <button
                  onClick={() => toggleExtra(extra.id)}
                  className="w-full py-2 rounded-full text-[12px] transition-all"
                  style={{
                    fontFamily: T.poppins,
                    fontWeight: 500,
                    background: isAdded ? (isJustAdded ? "#16a34a" : `${C.orange}15`) : C.orange,
                    color: isAdded ? (isJustAdded ? "#fff" : C.orange) : "#fff",
                  }}>
                  {isJustAdded ? "✓ Agregado" : isAdded ? "Quitar" : "+ Agregar"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

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
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Soporte</p>
              <div className="flex flex-col gap-2">
                {["Políticas de envío", "Cambios y devoluciones", "Medios de pago", "Preguntas frecuentes"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[16px] text-white" style={{ fontFamily: T.piepie }}>Tienda</p>
              <div className="flex flex-col gap-2">
                {["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"].map(l => (
                  <a key={l} href="#" className="text-[13px] hover:text-white transition-colors" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.55)" }}>{l}</a>
                ))}
              </div>
            </div>
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
              { title: "Soporte", links: ["Políticas de envío", "Cambios y devoluciones", "Medios de pago", "Preguntas frecuentes"] },
              { title: "Tienda", links: ["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"] },
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
