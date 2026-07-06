import { useState } from "react";
import {
  X, Star, ShoppingBag, Gift, LogOut, ArrowRight,
  Check, ChevronRight, Ticket, User, Mail, Phone,
} from "lucide-react";
import OlffyLogoYellow from "../../imports/OlffyLogo/index";
import { Facebook, Instagram, Twitter } from "lucide-react";

const T = {
  poppins: "'Poppins', sans-serif",
  ivy: "'IvyPresto Text', 'IvyPresto_Text', Georgia, serif",
  piepie: "'PiepieW01-Regular', sans-serif",
};
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9" };

type Screen = "login" | "register" | "dashboard" | "history" | "rewards" | "redemptions";

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ active, setScreen, onLogout }: { active: Screen; setScreen: (s: Screen) => void; onLogout: () => void }) {
  const items = [
    { key: "dashboard" as Screen, label: "Resumen", icon: Star },
    { key: "history" as Screen, label: "Historial", icon: ShoppingBag },
    { key: "rewards" as Screen, label: "Recompensas", icon: Gift },
    { key: "redemptions" as Screen, label: "Mis canjes", icon: Ticket },
  ];
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl border h-fit" style={{ borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", minWidth: 220 }}>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Mi cuenta</p>
        <p className="text-[16px] text-black/85" style={{ fontFamily: T.piepie }}>Milenka Burgos</p>
        <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>miel@ejemplo.cl</p>
      </div>
      <div className="flex flex-col gap-1">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] transition-all text-left"
            style={{
              fontFamily: T.poppins,
              background: active === key ? `rgba(89,87,176,0.09)` : "transparent",
              color: active === key ? C.purple : "rgba(0,0,0,0.6)",
              fontWeight: active === key ? 500 : 400,
            }}
          >
            <Icon size={16} color={active === key ? C.purple : "rgba(0,0,0,0.35)"} />
            {label}
          </button>
        ))}
      </div>
      <div className="h-px" style={{ background: "rgba(0,0,0,0.07)" }} />
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 text-[13px] rounded-xl transition-colors"
        style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}
      >
        <LogOut size={15} /> Cerrar sesión
      </button>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1.5 p-5 bg-white rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
      <p className="text-[11px] uppercase tracking-wider" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>{label}</p>
      <p className="text-[26px] text-black/85 leading-none" style={{ fontFamily: T.piepie }}>{value}</p>
      {sub && <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{sub}</p>}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="flex flex-col gap-6 flex-1">
      {/* Hero morado */}
      <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: C.purple }}>
        <p className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.5)" }}>HOLA, MILENKA</p>
        <h2 className="leading-none text-white" style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 4vw, 52px)" }}>Tienes 0 puntos</h2>
        <p className="text-[14px] max-w-[440px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.65)" }}>
          Cada compra asociada a tu cuenta queda registrada aquí. Tus puntos disponibles siempre coinciden con el historial.
        </p>
        <button
          onClick={() => setScreen("rewards")}
          className="self-start flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] text-white transition-opacity hover:opacity-90"
          style={{ background: C.orange, fontFamily: T.poppins }}
        >
          Ver recompensas <ArrowRight size={14} />
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Saldo disponible" value="0 pts" />
        <StatCard label="Puntos acumulados" value="0" />
        <StatCard label="Próxima recompensa" value="300 pts" sub="Faltan 300" />
        <StatCard label="Canjes en curso" value="0" />
      </div>

      {/* Movimientos */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>TUS PUNTOS</p>
          <h3 className="text-black/80" style={{ fontFamily: T.piepie, fontSize: 26 }}>Últimos movimientos</h3>
        </div>
        <div className="flex flex-col items-center gap-4 py-12 px-6 rounded-2xl border border-dashed" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `rgba(89,87,176,0.1)` }}>
            <Star size={22} color={C.purple} />
          </div>
          <p className="text-[15px] text-black/60 text-center" style={{ fontFamily: T.poppins }}>
            Aún no tienes movimientos de puntos.<br />
            <span className="text-black/40 text-[13px]">Cuando compres online o en tienda asociando tu cuenta, tus puntos aparecerán aquí.</span>
          </p>
          <button className="text-[13px] underline" style={{ fontFamily: T.poppins, color: C.orange }}>
            Explorar tienda
          </button>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border bg-white flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `rgba(250,180,5,0.15)` }}>
            <Star size={16} color={C.yellow} />
          </div>
          <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Cómo ganas puntos</p>
          <p className="text-[13px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
            Recibes 10 puntos por cada $1.000 pagados en compras asociadas a tu cuenta.
          </p>
        </div>
        <div className="p-6 rounded-2xl border bg-white flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `rgba(89,87,176,0.1)` }}>
            <User size={16} color={C.purple} />
          </div>
          <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Tu perfil</p>
          <div className="flex flex-col gap-1.5">
            {[
              { icon: Mail, label: "miel@ejemplo.cl" },
              { icon: Phone, label: "+56 9 9999 9999" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={13} color="rgba(0,0,0,0.35)" />
                <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)" }}>{label}</p>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: "#16a34a" }} />
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "#16a34a" }}>Cuenta activa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── History ────────────────────────────────────────────────────────────────────
function History() {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>TUS PUNTOS</p>
        <h2 className="text-black/85 leading-none mb-2" style={{ fontFamily: T.piepie, fontSize: "clamp(28px, 3vw, 42px)" }}>Historial completo</h2>
        <p className="text-[14px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
          Aquí aparecen compras, canjes, ajustes, vencimientos y reversas. Los movimientos no se borran, para que siempre puedas entender tu saldo.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center gap-4 py-14 px-6 rounded-2xl border border-dashed" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `rgba(89,87,176,0.1)` }}>
          <ShoppingBag size={20} color={C.purple} />
        </div>
        <div className="text-center flex flex-col gap-1">
          <p className="text-[15px] text-black/65" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Aún no tienes movimientos de puntos.</p>
          <p className="text-[13px] text-black/40" style={{ fontFamily: T.poppins }}>Cuando compres online o en tienda asociando tu cuenta, tus puntos aparecerán aquí.</p>
        </div>
        <button className="text-[13px] underline" style={{ fontFamily: T.poppins, color: C.orange }}>Ver tienda</button>
      </div>

      {/* Example row (visual preview) */}
      <div>
        <p className="text-[12px] mb-3" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Ejemplo de cómo se verá un movimiento:</p>
        <div className="flex items-center justify-between px-5 py-4 rounded-xl border opacity-40" style={{ borderColor: "rgba(0,0,0,0.09)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `rgba(89,87,176,0.1)` }}>
              <Star size={16} color={C.purple} />
            </div>
            <div>
              <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Puntos acumulados</p>
              <p className="text-[12px] text-black/40" style={{ fontFamily: T.poppins }}>Compra en tienda · 12 jun 2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[15px]" style={{ fontFamily: T.poppins, fontWeight: 600, color: "#16a34a" }}>+100 pts</p>
            <p className="text-[12px] text-black/35" style={{ fontFamily: T.poppins }}>Saldo: 420 pts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Rewards ────────────────────────────────────────────────────────────────────
function Rewards() {
  const REWARDS = [
    { title: "$3.000 de descuento", pts: 300, benefit: "$3.000 de descuento", min: "Sin compra mínima", validity: "30 días" },
    { title: "$5.000 de descuento", pts: 500, benefit: "$5.000 de descuento", min: "Sin compra mínima", validity: "30 días" },
    { title: "$10.000 de descuento", pts: 1000, benefit: "$10.000 de descuento", min: "Sin compra mínima", validity: "30 días" },
  ];
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>USA TUS PUNTOS</p>
        <h2 className="text-black/85 leading-none mb-2" style={{ fontFamily: T.piepie, fontSize: "clamp(28px, 3vw, 42px)" }}>Recompensas</h2>
        <p className="text-[14px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
          Tienes 0 puntos. Al solicitar un beneficio, el equipo OLFFY revisará el canje y te mostrará el código cuando sea aprobado.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {REWARDS.map((r) => (
          <div key={r.pts} className="flex flex-col gap-4 p-6 bg-white rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `rgba(250,180,5,0.15)` }}>
                <Gift size={18} color={C.yellow} />
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ fontFamily: T.poppins, background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.4)" }}>
                Aún no disponible
              </span>
            </div>
            <div>
              <p className="text-[13px] text-black/50 mb-1" style={{ fontFamily: T.poppins }}>Costo</p>
              <p className="leading-none" style={{ fontFamily: T.piepie, fontSize: 32, color: C.purple }}>{r.pts} pts</p>
            </div>
            <div className="flex flex-col gap-1.5 text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)" }}>
              <div className="flex justify-between"><span>Beneficio</span><span className="text-black/75">{r.benefit}</span></div>
              <div className="flex justify-between"><span>Compra mínima</span><span className="text-black/75">{r.min}</span></div>
              <div className="flex justify-between"><span>Vigencia</span><span className="text-black/75">{r.validity}</span></div>
            </div>
            <button
              disabled
              className="w-full py-2.5 rounded-full text-[13px] transition-opacity"
              style={{ fontFamily: T.poppins, background: "rgba(0,0,0,0.07)", color: "rgba(0,0,0,0.3)", cursor: "not-allowed" }}
            >
              Solicitar canje
            </button>
            <p className="text-center text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Te faltan {r.pts} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Redemptions ───────────────────────────────────────────────────────────────
function Redemptions({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>SEGUIMIENTO</p>
        <h2 className="text-black/85 leading-none mb-2" style={{ fontFamily: T.piepie, fontSize: "clamp(28px, 3vw, 42px)" }}>Mis canjes</h2>
        <p className="text-[14px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
          Revisa si tu solicitud está pendiente, aprobada, entregada o cancelada. Los códigos aparecen cuando el equipo aprueba el beneficio.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 py-14 px-6 rounded-2xl border border-dashed" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `rgba(89,87,176,0.1)` }}>
          <Ticket size={20} color={C.purple} />
        </div>
        <div className="text-center flex flex-col gap-1">
          <p className="text-[15px] text-black/65" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Aún no has solicitado canjes.</p>
          <p className="text-[13px] text-black/40" style={{ fontFamily: T.poppins }}>Cuando elijas una recompensa, podrás seguir aquí su estado y ver tu código cuando sea aprobado.</p>
        </div>
        <button
          onClick={() => setScreen("rewards")}
          className="px-5 py-2.5 rounded-full text-[13px] text-white transition-opacity hover:opacity-90"
          style={{ background: C.orange, fontFamily: T.poppins }}
        >
          Ver recompensas
        </button>
      </div>
      {/* Example approved card */}
      <div>
        <p className="text-[12px] mb-3" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Ejemplo de canje aprobado:</p>
        <div className="flex items-center justify-between px-5 py-4 rounded-xl border opacity-40" style={{ borderColor: "rgba(0,0,0,0.09)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `rgba(250,180,5,0.15)` }}>
              <Gift size={16} color={C.yellow} />
            </div>
            <div>
              <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>$3.000 de descuento</p>
              <p className="text-[12px] font-mono text-black/50">OLFFY-300-ABCD</p>
              <p className="text-[11px] text-black/35" style={{ fontFamily: T.poppins }}>Vigente hasta: 30 días</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] text-white" style={{ background: "#16a34a", fontFamily: T.poppins }}>Aprobado</span>
        </div>
      </div>
    </div>
  );
}

// ── Logout Modal ───────────────────────────────────────────────────────────────
function LogoutModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(0,0,0,0.35)" }} onClick={onCancel}>
      <div className="bg-white rounded-2xl p-8 max-w-[380px] w-full flex flex-col items-center gap-5 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `rgba(250,180,5,0.15)` }}>
          <LogOut size={20} color={C.yellow} />
        </div>
        <div className="text-center flex flex-col gap-2">
          <h3 className="text-black/85" style={{ fontFamily: T.piepie, fontSize: 26 }}>¿Cerrar sesión?</h3>
          <p className="text-[14px] text-black/50 leading-relaxed" style={{ fontFamily: T.poppins }}>
            ¿Seguro que quieres salir de tu cuenta OLFFY? Podrás volver a entrar cuando quieras.
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={onCancel} className="flex-1 py-3 rounded-full text-[14px] border transition-colors hover:bg-black/5" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.6)" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-full text-[14px] text-white transition-opacity hover:opacity-90" style={{ fontFamily: T.poppins, background: C.orange }}>
            Sí, cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Login / Register ───────────────────────────────────────────────────────────
function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", password2: "", newsletter: false });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-stretch">
      {/* Left editorial */}
      <div className="hidden lg:flex flex-col justify-center gap-8 px-16 py-20 flex-1" style={{ background: C.purple }}>
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.5)" }}>OLFFY Puntos</p>
          <h2 className="leading-tight text-white mb-4" style={{ fontFamily: T.piepie, fontSize: "clamp(32px, 3.5vw, 52px)" }}>
            Tus puntos, claritos y a mano.
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.65)" }}>
            Revisa tu saldo, entiende cada movimiento y descubre las recompensas que ya puedes pedir.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            "Acceso privado con correo y contraseña.",
            "Tus compras y canjes quedan registrados.",
          ].map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `rgba(255,255,255,0.2)` }}>
                <Check size={11} color="white" />
              </div>
              <p className="text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.7)" }}>{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 lg:max-w-[480px] flex flex-col justify-center px-8 md:px-16 py-16 bg-white">
        <p className="text-[11px] tracking-[0.22em] uppercase mb-2" style={{ fontFamily: T.poppins, color: C.orange }}>
          {tab === "login" ? "MI CUENTA" : "NUEVA CUENTA"}
        </p>
        <h2 className="text-black/85 mb-1" style={{ fontFamily: T.piepie, fontSize: "clamp(28px, 3vw, 40px)" }}>
          {tab === "login" ? "Entra a tu cuenta" : "Únete a OLFFY Puntos"}
        </h2>
        <p className="text-[14px] mb-6" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>
          {tab === "login"
            ? "Ingresa con el correo y la contraseña de tu cuenta OLFFY."
            : "Crea tu cuenta gratis. Te enviaremos un correo para verificarla antes de entrar a tu dashboard."}
        </p>

        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-full mb-6" style={{ background: "rgba(0,0,0,0.05)" }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-full text-[13px] transition-all"
              style={{
                fontFamily: T.poppins,
                background: tab === t ? "white" : "transparent",
                color: tab === t ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)",
                fontWeight: tab === t ? 500 : 400,
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {t === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3 mb-4">
          {tab === "register" && (
            <>
              <input placeholder="Nombre completo" value={form.name} onChange={e => set("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none focus:border-purple-400 transition-colors"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
              <input placeholder="Teléfono" value={form.phone} onChange={e => set("phone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none focus:border-purple-400 transition-colors"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
            </>
          )}
          <input placeholder="Correo electrónico" type="email" value={form.email} onChange={e => set("email", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none focus:border-purple-400 transition-colors"
            style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
          <input placeholder="Contraseña" type="password" value={form.password} onChange={e => set("password", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none focus:border-purple-400 transition-colors"
            style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
          {tab === "register" && (
            <input placeholder="Repetir contraseña" type="password" value={form.password2} onChange={e => set("password2", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none focus:border-purple-400 transition-colors"
              style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
          )}
        </div>

        {tab === "login" && (
          <button className="self-start text-[12px] mb-5 underline" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
            Olvidé mi contraseña
          </button>
        )}

        {tab === "register" && (
          <label className="flex items-start gap-3 mb-5 cursor-pointer">
            <input type="checkbox" checked={form.newsletter as boolean} onChange={e => set("newsletter", e.target.checked)}
              className="mt-0.5 accent-orange-500" />
            <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>
              Quiero recibir novedades, lanzamientos y beneficios por correo.
            </p>
          </label>
        )}

        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-full text-white text-[14px] transition-opacity hover:opacity-90 mb-3"
          style={{ fontFamily: T.poppins, fontWeight: 500, background: C.orange }}
        >
          {tab === "login" ? "Entrar a mi cuenta" : "Crear cuenta y verificar correo"}
        </button>
        <p className="text-[11px] text-center" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>
          {tab === "login"
            ? "Usa el correo con el que compraste o te registraste."
            : "Al crear tu cuenta aceptas que OLFFY use estos datos para administrar tus puntos y beneficios."}
        </p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function AccountPage({ onClose }: { onClose: () => void }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen">
      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={() => { setLoggedIn(false); setShowLogout(false); setScreen("dashboard"); }}
        />
      )}

      {!loggedIn ? (
        <AuthScreen onLogin={() => setLoggedIn(true)} />
      ) : (
        <div className="px-6 md:px-16 py-10 flex flex-col md:flex-row gap-8 items-start">
          <Sidebar active={screen} setScreen={setScreen} onLogout={() => setShowLogout(true)} />
          <div className="flex-1 flex flex-col gap-6">
            {screen === "dashboard" && <Dashboard setScreen={setScreen} />}
            {screen === "history" && <History />}
            {screen === "rewards" && <Rewards />}
            {screen === "redemptions" && <Redemptions setScreen={setScreen} />}
          </div>
        </div>
      )}
    </div>
  );
}
