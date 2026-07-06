import { useState } from "react";
import { MapPin, Instagram, Facebook, Twitter, Check } from "lucide-react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";

const T = {
  poppins: "'Poppins', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  piepie: "'PiepieW01-Regular', sans-serif",
};
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

function ImgBlock({ className = "", tint = "#f2e0cc" }: { className?: string; tint?: string }) {
  return (
    <div className={`rounded-2xl overflow-hidden flex items-center justify-center ${className}`} style={{ background: tint }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
        <rect x="4" y="8" width="40" height="32" rx="3" stroke="black" strokeWidth="2" />
        <circle cx="17" cy="20" r="4" stroke="black" strokeWidth="2" />
        <path d="M4 34l10-10 8 8 6-6 16 10" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionDivider() {
  return <div className="w-full h-px bg-black/8 my-2" />;
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
    <div className="flex flex-col gap-4 w-full md:w-[340px] shrink-0">
      <p className="text-[20px] text-white" style={{ fontFamily: T.piepie }}>Suscríbete</p>
      <p className="text-[15px]" style={{ fontFamily: T.ivy, fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>
        Novedades, lanzamientos y ofertas exclusivas.
      </p>
      {sent ? (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm" style={{ fontFamily: T.poppins, background: C.orange }}>
          <Check size={16} />¡Gracias por suscribirte! 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
            className="w-full px-4 py-2.5 rounded-xl text-[13px] outline-none"
            style={{ fontFamily: T.poppins, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }} />
          <button type="submit" className="w-full py-2.5 rounded-xl text-white text-[14px] hover:opacity-90 transition-opacity"
            style={{ fontFamily: T.poppins, background: C.orange }}>
            Suscribirse
          </button>
        </form>
      )}
    </div>
  );
}

export function NuestraHistoriaPage() {
  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <div className="w-full relative overflow-hidden" style={{ background: "#f2e0cc", minHeight: 320 }}>
        <ImgBlock className="absolute inset-0 w-full h-full rounded-none" tint="#f2e0cc" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f2e0cc]/95 via-[#f2e0cc]/60 to-transparent" />
        <div className="relative px-6 md:px-16 py-14 md:py-20 flex flex-col justify-center" style={{ minHeight: 320 }}>
          <p className="text-[11px] tracking-[0.22em] uppercase mb-3 text-black/40" style={{ fontFamily: T.poppins }}>
            Sobre nosotros
          </p>
          <h1 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 4vw, 60px)", fontWeight: 300 }}>
            La historia detrás de
          </h1>
          <h1 className="leading-[0.88] mb-5" style={{ fontFamily: T.piepie, fontSize: "clamp(48px, 7vw, 110px)", color: C.orange, letterSpacing: "-0.02em" }}>
            Olffy
          </h1>
          <p className="text-[14px] md:text-[16px] text-black/50 max-w-[380px] leading-relaxed" style={{ fontFamily: T.poppins }}>
            Papelería ilustrada nacida en Viña del Mar con mucho amor, creatividad y un perrito llamado Olffy.
          </p>
        </div>
      </div>

      {/* ── Cómo nació OLFFY ── */}
      <section className="px-6 md:px-16 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:gap-20">
          <div className="flex-1 md:max-w-[520px] flex flex-col gap-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-black/35 mb-2" style={{ fontFamily: T.poppins }}>Nuestros orígenes</p>
              <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 300 }}>
                Cómo nació
              </h2>
              <h2 className="leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(34px, 4.5vw, 64px)", color: C.orange, letterSpacing: "-0.02em" }}>
                Olffy
              </h2>
            </div>
            <SectionDivider />
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              Todo comenzó en 2020, cuando Camila —diseñadora y amante de la papelería— decidió crear algo que no encontraba en ninguna tienda: productos de papelería con ilustraciones propias, hechos con amor y con la personalidad de su perrita Olffy.
            </p>
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              Lo que comenzó como un proyecto personal se convirtió rápidamente en una marca que conectó con miles de personas que también buscaban organizar su vida con un poco de magia y creatividad.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3 mt-8 md:mt-0">
            <ImgBlock className="w-full h-[260px] md:h-[340px]" tint="#e8e0f0" />
            <div className="flex gap-3">
              <ImgBlock className="flex-1 h-[140px] md:h-[180px]" tint="#fde8dc" />
              <ImgBlock className="flex-1 h-[140px] md:h-[180px]" tint="#f2e0cc" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso de creación ── */}
      <section className="px-6 md:px-16 py-12 md:py-16 bg-[#fafafa]">
        <div className="flex flex-col gap-2 mb-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black/35" style={{ fontFamily: T.poppins }}>Detrás de cada producto</p>
          <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 300 }}>Proceso de</h2>
          <h2 className="leading-[0.9] -mt-1" style={{ fontFamily: T.piepie, fontSize: "clamp(34px, 4.5vw, 64px)", color: C.purple, letterSpacing: "-0.02em" }}>Creación</h2>
        </div>

        {/* Mobile: image paired with its step text, stacked vertically */}
        <div className="flex flex-col gap-8 md:hidden">
          {[
            { num: "01", title: "Ilustración", desc: "Cada diseño nace a mano, con lápiz y papel, capturando la personalidad de Olffy y la naturaleza.", tint: "#f2e0cc" },
            { num: "02", title: "Digitalización", desc: "Las ilustraciones se digitalizan con cuidado para mantener la calidez del trazo original en cada producto.", tint: "#e8e0f0" },
            { num: "03", title: "Producción", desc: "Trabajamos con impresores locales de calidad para asegurar colores vibrantes y materiales duraderos.", tint: "#fde8dc" },
          ].map(step => (
            <div key={step.num} className="flex flex-col gap-3">
              <ImgBlock className="w-full h-[200px]" tint={step.tint} />
              <span style={{ fontFamily: T.piepie, fontSize: 34, color: C.orange, lineHeight: 1 }}>{step.num}</span>
              <SectionDivider />
              <p className="text-[15px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{step.title}</p>
              <p className="text-[13px] text-black/50 leading-relaxed" style={{ fontFamily: T.poppins }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Desktop: images row + steps row */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-3 mb-8">
            <ImgBlock className="w-full h-[280px]" tint="#f2e0cc" />
            <ImgBlock className="w-full h-[280px]" tint="#e8e0f0" />
            <ImgBlock className="w-full h-[280px]" tint="#fde8dc" />
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              { num: "01", title: "Ilustración", desc: "Cada diseño nace a mano, con lápiz y papel, capturando la personalidad de Olffy y la naturaleza." },
              { num: "02", title: "Digitalización", desc: "Las ilustraciones se digitalizan con cuidado para mantener la calidez del trazo original en cada producto." },
              { num: "03", title: "Producción", desc: "Trabajamos con impresores locales de calidad para asegurar colores vibrantes y materiales duraderos." },
            ].map(step => (
              <div key={step.num} className="flex flex-col gap-2">
                <span style={{ fontFamily: T.piepie, fontSize: 36, color: C.orange, lineHeight: 1 }}>{step.num}</span>
                <SectionDivider />
                <p className="text-[15px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{step.title}</p>
                <p className="text-[13px] text-black/50 leading-relaxed" style={{ fontFamily: T.poppins }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuestra tienda ── */}
      <section className="px-6 md:px-16 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:gap-20">
          {/* Image first on mobile */}
          <div className="flex-1 mb-8 md:mb-0">
            <ImgBlock className="w-full h-[260px] md:h-[420px]" tint="#e0e8f0" />
          </div>
          <div className="flex-1 md:max-w-[480px] flex flex-col gap-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-black/35 mb-2" style={{ fontFamily: T.poppins }}>Encuéntranos</p>
              <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 300 }}>Nuestra</h2>
              <h2 className="leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(34px, 4.5vw, 64px)", color: C.orange, letterSpacing: "-0.02em" }}>Tienda</h2>
            </div>
            <SectionDivider />
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              Nuestra tienda física está ubicada en el corazón de Viña del Mar. Un espacio pensado para que puedas ver, tocar y enamorarte de cada producto antes de llevártelo a casa.
            </p>
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              También puedes encontrar nuestros productos en ferias de diseño y pop-ups que anunciamos en nuestras redes sociales.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: `${C.orange}10` }}>
              <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: C.orange }} />
              <div>
                <p className="text-[14px] text-black/70" style={{ fontFamily: T.poppins, fontWeight: 500 }}>2 Ote. 1145, Local 3, Viña del Mar</p>
                <p className="text-[13px] text-black/40 mt-0.5" style={{ fontFamily: T.poppins }}>Lun–Vie 10:00–19:00 · Sáb 10:00–14:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mapa ── */}
      <section className="px-6 md:px-16 pb-12 md:pb-16">
        <div className="w-full rounded-2xl overflow-hidden relative" style={{ height: "clamp(280px, 50vw, 480px)" }}>
          <iframe
            title="Ubicación Olffy"
            src="https://maps.google.com/maps?q=2+Oriente+1145+Vi%C3%B1a+del+Mar+Chile&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "280px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg" style={{ background: "white" }}>
            <MapPin size={15} color={C.orange} />
            <div>
              <p className="text-[13px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Olffy</p>
              <p className="text-[11px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>2 Ote. 1145, Local 3 · Viña del Mar</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso creativo ── */}
      <section className="px-6 md:px-16 py-12 md:py-16 bg-[#fafafa]">
        <div className="flex flex-col md:flex-row md:items-start md:gap-20">
          <div className="flex-1 flex flex-col gap-5 mb-8 md:mb-0">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-black/35 mb-2" style={{ fontFamily: T.poppins }}>Inspiración</p>
              <h2 className="leading-tight text-black/80" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 300 }}>Proceso</h2>
              <h2 className="leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(34px, 4.5vw, 64px)", color: C.purple, letterSpacing: "-0.02em" }}>Creativo</h2>
            </div>
            <SectionDivider />
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              La inspiración de Olffy viene de la naturaleza, los colores de la costa chilena y la ternura de los animales. Cada colección cuenta una historia y tiene un estado de ánimo propio.
            </p>
            <p className="text-[14px] text-black/55 leading-relaxed" style={{ fontFamily: T.poppins }}>
              Nos tomamos el tiempo necesario para que cada detalle sea perfecto: desde la paleta de colores hasta el gramaje del papel.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3">
            <ImgBlock className="w-full h-[160px] md:h-[220px]" tint="#f2e0cc" />
            <ImgBlock className="w-full h-[160px] md:h-[220px] mt-6" tint="#e8e0f0" />
            <ImgBlock className="w-full h-[160px] md:h-[220px]" tint="#fde8dc" />
            <ImgBlock className="w-full h-[160px] md:h-[220px] mt-6" tint="#f0f2e0" />
          </div>
        </div>
      </section>

      {/* ── Únete a la comunidad ── */}
      <section className="px-6 md:px-16 py-16 md:py-20 relative overflow-hidden" style={{ background: C.purple }}>
        <div className="relative z-10 flex flex-col items-center text-center gap-5">
          <p className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.5)" }}>Comunidad</p>
          <h2 className="leading-tight text-white" style={{ fontFamily: T.ivy, fontStyle: "italic", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 300 }}>
            Únete a la
          </h2>
          <h2 className="-mt-3 leading-[0.9]" style={{ fontFamily: T.piepie, fontSize: "clamp(36px, 6vw, 90px)", color: C.yellow, letterSpacing: "-0.02em" }}>
            Comunidad Olffy
          </h2>
          <p className="text-[14px] max-w-[380px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.65)" }}>
            Síguenos en redes sociales para ver nuevos lanzamientos, procesos creativos, sorteos y mucho más.
          </p>
          <div className="flex gap-4 mt-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <button key={i} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-16 py-14" style={{ background: C.purple, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {/* Mobile */}
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
          <FooterNewsletter />
        </div>
        {/* Desktop */}
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
              { title: "Tienda", links: ["Cuadernos", "Planners", "Stickers", "Calendarios", "Regalos"] },
              { title: "Nosotros", links: ["Nuestra historia", "Sustentabilidad", "Blog", "Contacto"] },
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
