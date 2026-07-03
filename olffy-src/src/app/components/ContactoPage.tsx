import { useState } from "react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";
import {
  MapPin, Clock, Phone, Mail, Instagram, Youtube, Facebook,
  ChevronDown, ChevronUp, ArrowLeft, Send, Play,
  Facebook as FacebookIcon, Twitter,
} from "lucide-react";

const C = { cream: "#fff5d9", yellow: "#fab405", orange: "#e94300", purple: "#5957b0" };
const T = {
  piepie: "'PiepieW01-Regular', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  poppins: "'Poppins', sans-serif",
};

// ── FAQ Data ───────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "¿Hacen entregas presenciales o retiro en tienda?",
    a: "¡Sí! Puedes retirar tu pedido directamente en nuestra tienda en Viña del Mar sin costo adicional. Solo debes seleccionar la opción 'Retiro en tienda' al finalizar tu compra. Te avisaremos por correo cuando tu pedido esté listo.",
  },
  {
    q: "¿Hacen envíos a todo Chile?",
    a: "Sí, enviamos a todas las regiones de Chile a través de Starken y Chilexpress. Los tiempos de entrega son entre 3 y 7 días hábiles dependiendo de tu región. El costo de envío se calcula automáticamente al ingresar tu dirección.",
  },
  {
    q: "¿Cuánto demoran en despachar mi pedido?",
    a: "Los pedidos se despachan dentro de 1 a 2 días hábiles tras la confirmación de pago. Si realizas tu compra antes de las 12:00 PM, es probable que se despache el mismo día.",
  },
  {
    q: "¿Puedo hacer un pedido personalizado o corporativo?",
    a: "¡Por supuesto! Ofrecemos pedidos corporativos y personalizados para empresas, eventos y regalos especiales. Escríbenos a hola@olffy.cl o a través de nuestro Instagram @olffy con los detalles de lo que necesitas y te cotizamos sin compromiso.",
  },
  {
    q: "¿Aceptan cambios o devoluciones?",
    a: "Aceptamos cambios dentro de los primeros 10 días hábiles desde la recepción del pedido, siempre que el producto esté sin uso y en su embalaje original. Para productos con defectos de fabricación, gestionamos el cambio sin costo. Escríbenos a hola@olffy.cl.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria, WebPay y pago en efectivo al retirar en tienda. Todas las transacciones online son seguras y están protegidas.",
  },
  {
    q: "¿Tienen catálogo físico o solo online?",
    a: "Contamos con catálogo online en nuestra tienda web y también puedes ver todos nuestros productos en nuestra tienda física en Viña del Mar. Además, actualizamos constantemente nuestras colecciones, así que ¡síguenos en redes para no perderte los lanzamientos!",
  },
  {
    q: "¿Olffy tiene presencia en ferias o eventos?",
    a: "¡Sí! Participamos en ferias de diseño y mercados creativos a lo largo del año, principalmente en la Región de Valparaíso. Anunciamos nuestras participaciones con anticipación en Instagram @olffy y en nuestra newsletter.",
  },
];

// ── Social Videos ──────────────────────────────────────────────────────────────
const VIDEOS = [
  { platform: "Instagram", handle: "@olffy", title: "Unboxing Agenda Primavera 🌸", views: "12.4K", thumb: null },
  { platform: "TikTok", handle: "@olffy.cl", title: "Proceso de ilustración de stickers", views: "34.7K", thumb: null },
  { platform: "Instagram", handle: "@olffy", title: "Nueva colección Cosmos ✨", views: "8.9K", thumb: null },
  { platform: "YouTube", handle: "Olffy Studio", title: "Tour por nuestra tienda en Viña del Mar", views: "5.2K", thumb: null },
];

// ── FAQ Item ───────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer select-none"
      style={{ borderColor: "rgba(0,0,0,0.1)" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex items-start justify-between gap-4 py-5">
        <p
          className="text-[17px] text-black/80 leading-snug"
          style={{ fontFamily: T.poppins }}
        >
          {q}
        </p>
        <div
          className="shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ background: open ? C.purple : "rgba(0,0,0,0.07)" }}
        >
          {open
            ? <ChevronUp size={15} color="white" />
            : <ChevronDown size={15} color="rgba(0,0,0,0.5)" />}
        </div>
      </div>
      {open && (
        <p
          className="text-[15px] leading-relaxed pb-5 pr-10"
          style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)" }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// ── Video Card ─────────────────────────────────────────────────────────────────
function VideoCard({ v }: { v: typeof VIDEOS[0] }) {
  const [playing, setPlaying] = useState(false);
  const platformColor =
    v.platform === "Instagram" ? "#E1306C" :
    v.platform === "TikTok" ? "#000" :
    v.platform === "YouTube" ? "#FF0000" : C.purple;

  return (
    <div className="flex flex-col gap-3 group">
      <div
        className="relative w-full aspect-[9/16] max-h-[380px] rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: "rgba(89,87,176,0.08)" }}
        onClick={() => setPlaying(true)}
      >
        {/* Gradient bg placeholder */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(89,87,176,0.15) 0%, rgba(250,180,5,0.12) 100%)`,
          }}
        />
        {/* Center play button */}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
              style={{ background: C.purple }}
            >
              <Play size={20} color="white" fill="white" className="ml-1" />
            </div>
            <span className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
              {v.views} vistas
            </span>
          </div>
        )}
        {playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[13px] text-center px-6" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
              Abre Instagram o TikTok para ver el video completo
            </p>
          </div>
        )}
        {/* Platform badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-white text-[11px]"
          style={{ background: platformColor, fontFamily: T.poppins }}
        >
          {v.platform}
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <p className="text-[14px] text-black/75 leading-snug" style={{ fontFamily: T.poppins }}>
          {v.title}
        </p>
        <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>
          {v.handle}
        </p>
      </div>
    </div>
  );
}

// ── Footer Newsletter (shared pattern) ────────────────────────────────────────
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
            className="px-4 py-2 rounded-lg text-[13px] text-white font-medium transition-opacity hover:opacity-90"
            style={{ background: C.orange, fontFamily: T.poppins }}
          >
            <Send size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function ContactoPage({ onBack }: { onBack: () => void }) {
  const [contactForm, setContactForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);

  function handleSend() {
    if (contactForm.nombre && contactForm.email && contactForm.mensaje) {
      setFormSent(true);
    }
  }

  return (
    <div className="w-full bg-white">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative w-full py-24 px-16 flex flex-col gap-6"
        style={{ background: `linear-gradient(135deg, ${C.purple} 0%, #3e3c8a 100%)` }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors w-fit"
          style={{ fontFamily: T.poppins, fontSize: "14px" }}
        >
          <ArrowLeft size={16} /> Volver al inicio
        </button>
        <div className="flex flex-col gap-2 mt-4">
          <span
            className="text-[12px] tracking-[0.22em] uppercase"
            style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.5)" }}
          >
            Estamos aquí para ti
          </span>
          <h1
            className="leading-none text-white"
            style={{ fontFamily: T.piepie, fontSize: "clamp(52px, 7vw, 96px)" }}
          >
            Contacto
          </h1>
          <p
            className="text-[18px] max-w-[480px] leading-relaxed"
            style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}
          >
            Nos encanta saber de ti. Escríbenos, visítanos o síguenos en redes.
          </p>
        </div>
      </section>

      {/* ── Info + Mapa ───────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 flex flex-col lg:flex-row gap-12">

        {/* Info cards */}
        <div className="flex flex-col gap-6 lg:w-[420px] shrink-0">

          {/* Dirección */}
          <div className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `rgba(89,87,176,0.1)` }}
            >
              <MapPin size={20} color={C.purple} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                Tienda física
              </p>
              <p className="text-[14px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
                2 Ote. 1145, Local 3<br />
                Viña del Mar, Valparaíso
              </p>
            </div>
          </div>

          {/* Horarios */}
          <div className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `rgba(250,180,5,0.12)` }}
            >
              <Clock size={20} color={C.yellow} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                Horarios de atención
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { days: "Lunes a Viernes", hours: "10:00 – 19:00" },
                  { days: "Sábado", hours: "10:00 – 14:00" },
                  { days: "Domingo", hours: "Cerrado" },
                ].map((row) => (
                  <div key={row.days} className="flex justify-between gap-8">
                    <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>{row.days}</p>
                    <p
                      className="text-[13px]"
                      style={{
                        fontFamily: T.poppins,
                        color: row.hours === "Cerrado" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.75)",
                      }}
                    >
                      {row.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `rgba(233,67,0,0.1)` }}
            >
              <Phone size={20} color={C.orange} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                Teléfono
              </p>
              <p className="text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
                +56 9 1234 5678
              </p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>
                WhatsApp disponible en horario de tienda
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `rgba(89,87,176,0.1)` }}
            >
              <Mail size={20} color={C.purple} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                Correo electrónico
              </p>
              <p className="text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
                hola@olffy.cl
              </p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>
                Respondemos en máximo 24 horas hábiles
              </p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col gap-3 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
              Redes sociales
            </p>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Instagram, label: "@olffy", sub: "Instagram", color: "#E1306C", href: "#" },
                { Icon: Youtube, label: "Olffy Studio", sub: "YouTube", color: "#FF0000", href: "#" },
                { Icon: Facebook, label: "Olffy Papelería", sub: "Facebook", color: "#1877F2", href: "#" },
              ].map(({ Icon, label, sub, color, href }) => (
                <a
                  key={sub}
                  href={href}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: color + "18" }}
                  >
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <p className="text-[14px] text-black/75" style={{ fontFamily: T.poppins }}>{label}</p>
                    <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>{sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}
            >
              Encuéntranos
            </span>
            <h2
              className="leading-none text-black/85"
              style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 3.5vw, 48px)" }}
            >
              Nuestra tienda
            </h2>
            <p
              className="text-[15px] leading-relaxed"
              style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}
            >
              Visítanos en el corazón de Viña del Mar
            </p>
          </div>

          {/* Map embed placeholder */}
          <div
            className="w-full flex-1 min-h-[400px] rounded-2xl overflow-hidden relative"
            style={{ background: "rgba(89,87,176,0.06)", border: "1px solid rgba(89,87,176,0.12)" }}
          >
            <iframe
              title="Ubicación Olffy"
              src="https://maps.google.com/maps?q=2+Oriente+1145+Vi%C3%B1a+del+Mar+Chile&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay badge */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg"
              style={{ background: "white" }}
            >
              <MapPin size={15} color={C.purple} />
              <div>
                <p className="text-[13px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Olffy</p>
                <p className="text-[11px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Viña del Mar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Formulario de contacto ─────────────────────────────────── */}
      <section
        className="px-8 md:px-16 py-20"
        style={{ background: C.cream }}
      >
        <div className="max-w-[680px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}
            >
              Escríbenos
            </span>
            <h2
              className="leading-none text-black/85"
              style={{ fontFamily: T.piepie, fontSize: "clamp(36px, 4vw, 54px)" }}
            >
              Envíanos un mensaje
            </h2>
            <p
              className="text-[16px] leading-relaxed"
              style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}
            >
              Cuéntanos en qué podemos ayudarte y te respondemos a la brevedad.
            </p>
          </div>

          {formSent ? (
            <div
              className="flex flex-col items-center gap-4 py-16 rounded-2xl"
              style={{ background: "white" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `rgba(89,87,176,0.1)` }}
              >
                <Send size={28} color={C.purple} />
              </div>
              <h3
                className="text-[24px] text-black/80"
                style={{ fontFamily: T.piepie }}
              >
                ¡Mensaje enviado!
              </h3>
              <p
                className="text-[15px] text-center max-w-[340px]"
                style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}
              >
                Gracias por escribirnos. Te responderemos en máximo 24 horas hábiles.
              </p>
              <button
                onClick={() => setFormSent(false)}
                className="mt-2 text-[14px] underline"
                style={{ fontFamily: T.poppins, color: C.purple }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white shadow-sm">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-black/50" style={{ fontFamily: T.poppins }}>Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={contactForm.nombre}
                    onChange={(e) => setContactForm((f) => ({ ...f, nombre: e.target.value }))}
                    className="px-4 py-3 rounded-xl border text-[14px] text-black/80 outline-none focus:border-purple-400 transition-colors"
                    style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-black/50" style={{ fontFamily: T.poppins }}>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                    className="px-4 py-3 rounded-xl border text-[14px] text-black/80 outline-none focus:border-purple-400 transition-colors"
                    style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-black/50" style={{ fontFamily: T.poppins }}>Asunto</label>
                <select
                  value={contactForm.asunto}
                  onChange={(e) => setContactForm((f) => ({ ...f, asunto: e.target.value }))}
                  className="px-4 py-3 rounded-xl border text-[14px] text-black/80 outline-none focus:border-purple-400 transition-colors bg-white"
                  style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="pedido">Consulta sobre mi pedido</option>
                  <option value="producto">Información de producto</option>
                  <option value="corporativo">Pedido corporativo</option>
                  <option value="devolucion">Cambio o devolución</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-black/50" style={{ fontFamily: T.poppins }}>Mensaje</label>
                <textarea
                  rows={5}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  value={contactForm.mensaje}
                  onChange={(e) => setContactForm((f) => ({ ...f, mensaje: e.target.value }))}
                  className="px-4 py-3 rounded-xl border text-[14px] text-black/80 outline-none focus:border-purple-400 transition-colors resize-none"
                  style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
                />
              </div>
              <button
                onClick={handleSend}
                className="self-end flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
                style={{ background: C.purple, fontFamily: T.poppins }}
              >
                <Send size={15} /> Enviar mensaje
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Videos en redes ───────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-20 bg-white">
        <div className="flex flex-col gap-10">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}
              >
                Síguenos
              </span>
              <h2
                className="leading-none text-black/85"
                style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 3.5vw, 52px)" }}
              >
                En las redes
              </h2>
              <p
                className="text-[16px]"
                style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.45)" }}
              >
                Mira lo que compartimos en Instagram, TikTok y YouTube
              </p>
            </div>
            <a
              href="#"
              className="text-[14px] pb-1 hover:opacity-70 transition-opacity"
              style={{ fontFamily: T.poppins, color: C.purple }}
            >
              @olffy ↗
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {VIDEOS.map((v, i) => <VideoCard key={i} v={v} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 py-20"
        style={{ background: C.cream }}
      >
        <div className="max-w-[780px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}
            >
              Ayuda
            </span>
            <h2
              className="leading-none text-black/85"
              style={{ fontFamily: T.piepie, fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              Preguntas frecuentes
            </h2>
            <p
              className="text-[16px] leading-relaxed"
              style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}
            >
              Resolvemos las dudas más comunes sobre nuestra tienda y productos.
            </p>
          </div>
          <div className="flex flex-col">
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
          </div>
          <div
            className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl"
            style={{ background: `rgba(89,87,176,0.07)`, border: `1px solid rgba(89,87,176,0.12)` }}
          >
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-[15px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>
                ¿No encontraste lo que buscabas?
              </p>
              <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>
                Escríbenos directamente y te respondemos pronto.
              </p>
            </div>
            <a
              href="mailto:hola@olffy.cl"
              className="px-5 py-2.5 rounded-xl text-[14px] text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ background: C.purple, fontFamily: T.poppins }}
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="px-8 md:px-16 py-16" style={{ background: C.purple }}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex flex-col gap-5 lg:max-w-[260px]">
            <div style={{ width: 139, height: 43, position: "relative" }}>
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
