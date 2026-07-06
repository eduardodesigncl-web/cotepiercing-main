import { useState } from "react";
import {
  LayoutDashboard, Users, Star, Package, FolderOpen, LogOut,
  Plus, ExternalLink, Search, ChevronRight, Check, X,
  ShoppingCart, ArrowUpDown, Gift, Ticket, AlertCircle,
} from "lucide-react";

const T = { poppins: "'Poppins', sans-serif", piepie: "'PiepieW01-Regular', sans-serif" };
const C = { orange: "#e94300", purple: "#5957b0", yellow: "#fab405", cream: "#fff5d9", green: "#16a34a", amber: "#d97706" };

type AdminScreen = "dashboard" | "cuenta" | "puntos" | "productos" | "colecciones" | "clientes";

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ screen, setScreen, onLogout }: { screen: AdminScreen; setScreen: (s: AdminScreen) => void; onLogout: () => void }) {
  const items: { key: AdminScreen; label: string; icon: React.ElementType }[] = [
    { key: "dashboard",   label: "Dashboard",       icon: LayoutDashboard },
    { key: "cuenta",      label: "Cuenta cliente",  icon: Users },
    { key: "puntos",      label: "Puntos",           icon: Star },
    { key: "productos",   label: "Productos",        icon: Package },
    { key: "colecciones", label: "Colecciones",      icon: FolderOpen },
  ];

  return (
    <div className="flex flex-col justify-between w-[210px] shrink-0 bg-white border-r h-screen sticky top-0" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div className="flex flex-col">
        <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-[17px] text-black/85" style={{ fontFamily: T.piepie }}>Admin Panel</p>
        </div>
        <nav className="flex flex-col gap-0.5 p-3 mt-1">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setScreen(key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-left transition-all"
              style={{
                fontFamily: T.poppins,
                background: screen === key ? C.cream : "transparent",
                color: screen === key ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
                fontWeight: screen === key ? 500 : 400,
              }}
            >
              <Icon size={16} color={screen === key ? C.purple : "rgba(0,0,0,0.4)"} />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] w-full border transition-colors hover:bg-black/5"
          style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          <LogOut size={14} /> Cerrar sesion
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, valueColor }: { label: string; value: string | number; sub?: string; valueColor?: string }) {
  return (
    <div className="flex flex-col gap-2 p-5 bg-white rounded-xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>{label}</p>
      <p className="text-[32px] leading-none" style={{ fontFamily: T.piepie, color: valueColor ?? "rgba(0,0,0,0.85)" }}>{value}</p>
      {sub && <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{sub}</p>}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ setScreen }: { setScreen: (s: AdminScreen) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[32px] text-black/85" style={{ fontFamily: T.piepie }}>Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Productos" value={2} />
        <StatCard label="Productos Activos" value={2} valueColor={C.green} />
        <StatCard label="Borradores" value={0} valueColor={C.amber} />
        <StatCard label="Colecciones" value={1} valueColor={C.purple} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-[18px] text-black/85" style={{ fontFamily: T.piepie }}>Gestión de Productos</p>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Crea, edita o elimina productos de tu inventario.</p>
          <button
            onClick={() => setScreen("productos")}
            className="mt-1 py-2.5 rounded-lg text-[14px] text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: T.poppins, background: C.purple }}
          >
            Ver productos
          </button>
        </div>
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-[18px] text-black/85" style={{ fontFamily: T.piepie }}>Gestión de Colecciones</p>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Organiza tus productos en categorías.</p>
          <button
            onClick={() => setScreen("colecciones")}
            className="mt-1 py-2.5 rounded-lg text-[14px] border transition-colors hover:bg-black/5"
            style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.7)" }}
          >
            Ver colecciones
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Cliente Detail (ficha individual desde CuentaCliente) ─────────────────────
const CLIENTE_DATA = [
  { name: "Milenka Burgos", email: "miel.designer1@gmail.com", phone: "+56986416035", pts: 2200, acumulados: 0, usados: 300, estado: "Acceso activado", estadoColor: C.purple },
  { name: "edu", email: "eduardo.design.cl@gmail.com", phone: "+56 9 0000 0000", pts: 0, acumulados: 0, usados: 0, estado: "Sin primer acceso", estadoColor: "rgba(0,0,0,0.35)" },
  { name: "edu", email: "ediv.gutierrez@gmail.com", phone: "+56 9 5555 1234", pts: 420, acumulados: 720, usados: 300, estado: "Acceso activado", estadoColor: C.purple },
];

function ClienteDetail({ cliente, onBack }: { cliente: typeof CLIENTE_DATA[0]; onBack: () => void }) {
  const [ajuste, setAjuste] = useState({ puntos: "", motivo: "", responsable: "", comprobante: "" });
  const [ajusteSuccess, setAjusteSuccess] = useState(false);
  const [canje, setCanje] = useState({ recompensa: "", responsable: "" });
  const [canjeAprobando, setCanjeAprobando] = useState<number | null>(null);
  const [canjeInfo, setCanjeInfo] = useState<{ responsable: string; motivoCancelacion: string; responsableCancelacion: string }>({ responsable: "", motivoCancelacion: "", responsableCancelacion: "" });

  const canjesPendientes = [
    { id: 1, reward: "$3.000 de descuento", pts: "300 pts", vigencia: "sin vencimiento", estado: "requested" },
  ];

  function handleAjuste() {
    if (ajuste.puntos && ajuste.motivo && ajuste.responsable) {
      setAjusteSuccess(true);
      setAjuste({ puntos: "", motivo: "", responsable: "", comprobante: "" });
      setTimeout(() => setAjusteSuccess(false), 3000);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] w-fit" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
        ← Volver
      </button>

      {/* Header */}
      <div>
        <p className="text-[11px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>CLIENTE DE PUNTOS</p>
        <h1 className="text-[34px] text-black/85 leading-none" style={{ fontFamily: T.piepie }}>{cliente.name}</h1>
        <p className="text-[13px] mt-1" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>{cliente.email} · {cliente.phone}</p>
      </div>

      {/* Success banner */}
      {ajusteSuccess && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border" style={{ background: "#f0fdf4", borderColor: "#86efac" }}>
          <Check size={15} color={C.green} />
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: C.green }}>Operación registrada correctamente.</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Saldo disponible" value={cliente.pts.toLocaleString("es-CL")} valueColor={C.purple} />
        <StatCard label="Puntos acumulados" value={cliente.acumulados} />
        <StatCard label="Puntos usados" value={cliente.usados} />
      </div>

      {/* Ajuste + Canje */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ajuste manual */}
        <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div>
            <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Ajuste manual</p>
            <p className="text-[12px] mt-0.5" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Usa valores positivos para sumar y negativos para descontar.</p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { key: "puntos", ph: "Puntos" },
              { key: "motivo", ph: "Motivo obligatorio" },
              { key: "responsable", ph: "Responsable" },
              { key: "comprobante", ph: "Comprobante o referencia (opcional)" },
            ].map(({ key, ph }) => (
              <input
                key={key}
                placeholder={ph}
                value={(ajuste as any)[key]}
                onChange={e => setAjuste(a => ({ ...a, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg border text-[13px] outline-none"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
              />
            ))}
          </div>
          <button
            onClick={handleAjuste}
            className="self-start px-4 py-2 rounded-lg text-[13px] text-white transition-opacity hover:opacity-90"
            style={{ background: C.purple, fontFamily: T.poppins }}
          >
            Registrar ajuste
          </button>
        </div>

        {/* Crear canje */}
        <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div>
            <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Crear canje</p>
            <p className="text-[12px] mt-0.5" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
              Genera un código interno. La creación del descuento en Shopify corresponde a la fase de canjes conectados.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <select
              value={canje.recompensa}
              onChange={e => setCanje(c => ({ ...c, recompensa: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border text-[13px] outline-none bg-white"
              style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)", color: canje.recompensa ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)" }}
            >
              <option value="">Seleccionar recompensa</option>
              <option value="3000">$3.000 de descuento — 300 pts</option>
              <option value="5000">$5.000 de descuento — 500 pts</option>
              <option value="10000">$10.000 de descuento — 1.000 pts</option>
            </select>
            <input
              placeholder="Responsable"
              value={canje.responsable}
              onChange={e => setCanje(c => ({ ...c, responsable: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border text-[13px] outline-none"
              style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
            />
          </div>
          <button
            className="self-start px-4 py-2 rounded-lg text-[13px] text-white transition-opacity hover:opacity-90"
            style={{ background: C.purple, fontFamily: T.poppins }}
          >
            Registrar canje
          </button>
        </div>
      </div>

      {/* Canjes */}
      <div className="bg-white rounded-xl border p-5 flex flex-col gap-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <p className="text-[16px] text-black/80" style={{ fontFamily: T.piepie }}>Canjes</p>
        {canjesPendientes.map((c) => (
          <div key={c.id} className="flex flex-col gap-3 p-4 rounded-xl border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{c.reward}</p>
                <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{c.pts} · {c.vigencia}</p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full" style={{ fontFamily: T.poppins, background: `${C.amber}15`, color: C.amber }}>
                {c.estado}
              </span>
            </div>
            {/* Aprobar / Cancelar row */}
            <div className="flex gap-2">
              <input
                placeholder="Responsable"
                value={canjeAprobando === c.id ? canjeInfo.responsable : ""}
                onChange={e => { setCanjeAprobando(c.id); setCanjeInfo(i => ({ ...i, responsable: e.target.value })); }}
                className="flex-1 px-3 py-2 rounded-lg border text-[13px] outline-none"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
              />
              <button
                className="px-4 py-2 rounded-lg text-[13px] text-white"
                style={{ background: C.purple, fontFamily: T.poppins }}
              >
                Aprobar
              </button>
              <input
                placeholder="Motivo de cancelacion"
                value={canjeAprobando === c.id ? canjeInfo.motivoCancelacion : ""}
                onChange={e => { setCanjeAprobando(c.id); setCanjeInfo(i => ({ ...i, motivoCancelacion: e.target.value })); }}
                className="flex-1 px-3 py-2 rounded-lg border text-[13px] outline-none"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
              />
              <input
                placeholder="Responsable"
                value={canjeAprobando === c.id ? canjeInfo.responsableCancelacion : ""}
                onChange={e => { setCanjeAprobando(c.id); setCanjeInfo(i => ({ ...i, responsableCancelacion: e.target.value })); }}
                className="flex-1 px-3 py-2 rounded-lg border text-[13px] outline-none"
                style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }}
              />
              <button className="px-3 py-2 rounded-lg text-[13px] border transition-colors hover:bg-black/5" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.5)" }}>
                Cancelar
              </button>
            </div>
          </div>
        ))}
        {canjesPendientes.length === 0 && (
          <p className="text-[13px] text-center py-6" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Sin canjes registrados.</p>
        )}
      </div>
    </div>
  );
}

// ── Cuenta Cliente ─────────────────────────────────────────────────────────────
function CuentaCliente({ setScreen }: { setScreen: (s: AdminScreen) => void }) {
  const [selectedCliente, setSelectedCliente] = useState<typeof CLIENTE_DATA[0] | null>(null);

  const clientes = CLIENTE_DATA.map(c => ({
    name: c.name,
    email: c.email,
    pts: `${c.pts.toLocaleString("es-CL")} pts`,
    estado: c.estado,
    estadoColor: c.estadoColor,
    _raw: c,
  }));
  const canjesPendientes = [
    { reward: "$3.000 de descuento", client: "Milenka Burgos", date: "27-06-2026, 1:24 p.m.", estado: "Solicitado" },
  ];

  if (selectedCliente) {
    return <ClienteDetail cliente={selectedCliente} onBack={() => setSelectedCliente(null)} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>PORTAL DE FIDELIZACION</p>
          <h1 className="text-[36px] text-black/85 leading-none" style={{ fontFamily: T.piepie }}>Cuenta cliente</h1>
          <p className="text-[13px] mt-2 max-w-[480px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
            Centro de control del dashboard que las clientas usan en /cuenta. Aquí puedes supervisar accesos, saldos, recompensas y solicitudes de canje.
          </p>
        </div>
        <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] text-white shrink-0" style={{ background: C.purple, fontFamily: T.poppins }}>
          Abrir portal cliente <ExternalLink size={13} />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Clientes inscritos" value={3} sub="3 activos · 0 bloqueados" />
        <StatCard label="Acceso activado" value={2} sub="1 aún no ha usado magic link" />
        <StatCard label="Puntos disponibles" value="2.120" sub="Saldo total vigente entre clientes" valueColor={C.purple} />
        <StatCard label="Canjes por gestionar" value={1} sub="1 solicitado · 0 aprobados" />
      </div>

      {/* Funcionalidades */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Funcionalidades disponibles</p>
            <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ fontFamily: T.poppins, background: `${C.green}15`, color: C.green }}>Primera version activa</span>
          </div>
          <p className="text-[12px] mb-4" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Estado actual del dashboard de clientes.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Acceso por correo", desc: "Magic link y sesion separada del administrador." },
              { title: "Resumen de puntos", desc: "Compras, acumulados, usados y próxima recompensa." },
              { title: "Historial de puntos", desc: "Compras, canjes, ajuste, vendimiento y reversas." },
              { title: "Recompensas", desc: "Beneficios activos y disponibilidad según saldo." },
              { title: "Solicitudes de canje", desc: "Seguimiento de solicitado, aprobado, entregado o cancelado." },
              { title: "Perfil y estado", desc: "Nombre, correo, teléfono y bloqueo de canjes." },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-2">
                <Check size={14} color={C.green} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{f.title}</p>
                  <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-[11px] tracking-widest uppercase mb-2" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>PROXIMAS INTEGRACIONES</p>
          <p className="text-[15px] text-black/80 mb-2" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Historial de compras y pedidos</p>
          <p className="text-[13px] mb-4" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
            Este espacio queda preparado para incorporar pedidos Shopify, detalle de compras, seguimiento y futuras preferencias de cliente sin alterar la base actual.
          </p>
          <ul className="flex flex-col gap-2">
            {["Pedidos online asociados", "Compras físicas TUU detalladas", "Direcciones y preferencias", "Notificaciones y beneficios personalizados"].map(item => (
              <li key={item} className="flex items-center gap-2 text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.55)" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.purple }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clientes recientes + Canjes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Clientes recientes</p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Estado de acceso y saldo actual.</p>
            </div>
            <button className="text-[13px]" style={{ fontFamily: T.poppins, color: C.purple }}>Ver todos</button>
          </div>
          <div className="flex flex-col gap-0">
            {clientes.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer rounded-lg px-2 -mx-2 hover:bg-black/[0.02] transition-colors"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
                onClick={() => setSelectedCliente(c._raw)}
              >
                <div>
                  <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{c.name}</p>
                  <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{c.email}</p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-[14px]" style={{ fontFamily: T.poppins, fontWeight: 600, color: C.purple }}>{c.pts}</p>
                    <p className="text-[11px]" style={{ fontFamily: T.poppins, color: c.estadoColor }}>{c.estado}</p>
                  </div>
                  <ChevronRight size={15} color="rgba(0,0,0,0.25)" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Canjes pendientes</p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>Solicitudes que requieren seguimiento.</p>
            </div>
            <button className="text-[13px]" style={{ fontFamily: T.poppins, color: C.purple }}>Gestionar</button>
          </div>
          {canjesPendientes.map((c, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div>
                <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{c.reward}</p>
                <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{c.client}</p>
                <p className="text-[11px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>{c.date}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ fontFamily: T.poppins, background: `${C.amber}15`, color: C.amber }}>
                {c.estado}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gestión rápida */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <p className="text-[15px] text-black/80 mb-4" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Gestion rapida</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Clientes", desc: "Crear, buscar y revisar saldos.", action: () => setScreen("clientes") },
            { title: "Recompensas", desc: "4 beneficios activos.", action: () => {} },
            { title: "Ventas TUU", desc: "Registrar compras y acumulación.", action: () => {} },
            { title: "Resumen de puntos", desc: "Ver indicadores globales.", action: () => setScreen("puntos") },
          ].map(item => (
            <div key={item.title} className="flex flex-col gap-2 p-4 rounded-lg border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <p className="text-[14px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{item.title}</p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>{item.desc}</p>
              <button onClick={item.action} className="text-[13px] text-left" style={{ fontFamily: T.poppins, color: C.purple }}>Abrir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Puntos ─────────────────────────────────────────────────────────────────────
function Puntos({ setScreen }: { setScreen: (s: AdminScreen) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[11px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: T.poppins, color: C.purple }}>OLFFY PUNTOS</p>
        <h1 className="text-[36px] text-black/85 leading-none" style={{ fontFamily: T.piepie }}>Resumen de fidelizacion</h1>
        <p className="text-[13px] mt-2 max-w-[560px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>
          Supabase mantiene clientes, saldos y movimientos. Shopify continúa como fuente de inventario y TUU registra las ventas físicas.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Clientes" value={3} sub="3 activos" />
        <StatCard label="Puntos vigentes" value="2.120" sub="420 puntos históricos entregados" valueColor={C.purple} />
        <StatCard label="Ventas físicas TUU" value={3} sub="Ventas registradas fuera de Shopify" valueColor={C.orange} />
        <StatCard label="Total ventas físicas" value="$67.342" sub="Montos registrados en CLP" valueColor={C.green} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Puntos canjeados" value={300} sub="Acumulado histórico" />
        <StatCard label="Recompensas activas" value={4} sub="Disponibles para futuros canjes" />
        <StatCard label="Canjes" value={1} sub="Solicitados, aprobados o entregados" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Clientes e historial", desc: "Crear clientes, revisar saldo, ajustar puntos y registrar canjes.", action: () => setScreen("clientes") },
          { title: "Registrar venta TUU", desc: "Cargar una compra presencial y calcular puntos automáticamente.", action: () => {} },
          { title: "Recompensas", desc: "Administrar los beneficios disponibles para canje.", action: () => {} },
        ].map(item => (
          <div key={item.title} className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <p className="text-[15px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{item.title}</p>
            <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>{item.desc}</p>
            <button onClick={item.action} className="text-[13px] text-left" style={{ fontFamily: T.poppins, color: C.purple }}>Abrir</button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <p className="text-[15px] text-black/80 mb-4" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Base operativa</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Inventario", desc: "Se consulta y administra exclusivamente en Shopify." },
            { label: "Puntos", desc: "El saldo y su libro de movimientos viven en Supabase." },
            { label: "Email marketing", desc: "Solo se registran eventos futuros; esta etapa no envía correos." },
          ].map(item => (
            <div key={item.label}>
              <p className="text-[13px] text-black/70 mb-1" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{item.label}</p>
              <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Productos ─────────────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { id: 1, name: "Agenda Semanal 2025", slug: "agenda-semanal-2025", status: "ACTIVE", stock: 8, price: "$12.990" },
  { id: 2, name: "Cuaderno Ilustrado A5", slug: "cuaderno-ilustrado-a5", status: "ACTIVE", stock: 5, price: "$8.990" },
  { id: 3, name: "Kit de Stickers Florales", slug: "kit-stickers-florales", status: "ACTIVE", stock: 14, price: "$4.990" },
  { id: 4, name: "Planner Mensual", slug: "planner-mensual", status: "DRAFT", stock: 0, price: "$9.990" },
];

function Productos() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] text-black/85" style={{ fontFamily: T.piepie }}>Productos</h1>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Lista de todos los productos en tu inventario.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] text-white" style={{ background: C.purple, fontFamily: T.poppins }}>
          <Plus size={15} /> Nuevo Producto
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
        <Search size={15} color="rgba(0,0,0,0.35)" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="flex-1 text-[14px] outline-none bg-transparent"
          style={{ fontFamily: T.poppins }}
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              {["Producto", "Estado", "Inventario", "Precio", ""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-black/[0.02] transition-colors" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#f2e0cc" }}>
                      <Package size={16} color="rgba(0,0,0,0.25)" />
                    </div>
                    <div>
                      <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{p.name}</p>
                      <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="px-2.5 py-0.5 rounded text-[11px]"
                    style={{
                      fontFamily: T.poppins, fontWeight: 500,
                      background: p.status === "ACTIVE" ? `${C.green}15` : `${C.amber}15`,
                      color: p.status === "ACTIVE" ? C.green : C.amber,
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.65)" }}>
                  {p.stock} en stock
                </td>
                <td className="px-5 py-4 text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.8)", fontWeight: 500 }}>
                  {p.price}
                </td>
                <td className="px-5 py-4">
                  <button className="text-[13px]" style={{ fontFamily: T.poppins, color: C.purple }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
            No se encontraron productos.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Colecciones ───────────────────────────────────────────────────────────────
const MOCK_COLLECTIONS = [
  { id: 1, title: "Página de inicio", handle: "frontpage", count: 1 },
  { id: 2, title: "Agendas y planners", handle: "agendas-planners", count: 3 },
  { id: 3, title: "Stickers", handle: "stickers", count: 2 },
];

function Colecciones() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] text-black/85" style={{ fontFamily: T.piepie }}>Colecciones</h1>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Lista de todas las colecciones (categorías) de tu tienda.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] text-white" style={{ background: C.purple, fontFamily: T.poppins }}>
          <Plus size={15} /> Nueva Colección
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              {["Título", "Handle", "Productos", ""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_COLLECTIONS.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-black/[0.02] transition-colors" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <td className="px-5 py-4 text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{c.title}</td>
                <td className="px-5 py-4 text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>{c.handle}</td>
                <td className="px-5 py-4 text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.65)" }}>{c.count}</td>
                <td className="px-5 py-4">
                  <button className="text-[13px]" style={{ fontFamily: T.poppins, color: C.purple }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Clientes ───────────────────────────────────────────────────────────────────
const MOCK_CLIENTES = [
  { id: 1, name: "Milenka Burgos", email: "miel.designer1@gmail.com", phone: "+56 9 1234 5678", pts: 1700, acumulados: 2000, usados: 300, estado: "Activa" },
  { id: 2, name: "Eduardo Díaz", email: "eduardo.design.cl@gmail.com", phone: "+56 9 8765 4321", pts: 0, acumulados: 0, usados: 0, estado: "Sin acceso" },
  { id: 3, name: "Edu Gutiérrez", email: "ediv.gutierrez@gmail.com", phone: "+56 9 5555 1234", pts: 420, acumulados: 720, usados: 300, estado: "Activa" },
];

function Clientes() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof MOCK_CLIENTES[0] | null>(null);
  const [ajusteOpen, setAjusteOpen] = useState(false);
  const [ajuste, setAjuste] = useState({ puntos: "", motivo: "", responsable: "" });

  const filtered = MOCK_CLIENTES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="flex flex-col gap-5">
        <button
          onClick={() => { setSelected(null); setAjusteOpen(false); }}
          className="flex items-center gap-1 text-[13px] w-fit"
          style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}
        >
          ← Volver a clientes
        </button>

        {/* Client header */}
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[26px] text-black/85" style={{ fontFamily: T.piepie }}>{selected.name}</h2>
              <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>{selected.email} · {selected.phone}</p>
              <span className="self-start text-[11px] px-2.5 py-0.5 rounded-full mt-1" style={{ fontFamily: T.poppins, background: selected.estado === "Activa" ? `${C.green}15` : `${C.amber}15`, color: selected.estado === "Activa" ? C.green : C.amber }}>
                {selected.estado}
              </span>
            </div>
            <button
              onClick={() => setAjusteOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] text-white"
              style={{ background: C.purple, fontFamily: T.poppins }}
            >
              Ajuste manual
            </button>
          </div>
        </div>

        {/* Ajuste form */}
        {ajusteOpen && (
          <div className="bg-white rounded-xl border p-5 flex flex-col gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Ajuste manual de puntos</p>
            <div className="grid grid-cols-3 gap-3">
              <input placeholder="Puntos (ej: +100 o -50)" value={ajuste.puntos} onChange={e => setAjuste(a => ({ ...a, puntos: e.target.value }))}
                className="px-3 py-2.5 rounded-lg border text-[13px] outline-none" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
              <input placeholder="Motivo" value={ajuste.motivo} onChange={e => setAjuste(a => ({ ...a, motivo: e.target.value }))}
                className="px-3 py-2.5 rounded-lg border text-[13px] outline-none" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
              <input placeholder="Responsable" value={ajuste.responsable} onChange={e => setAjuste(a => ({ ...a, responsable: e.target.value }))}
                className="px-3 py-2.5 rounded-lg border text-[13px] outline-none" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)" }} />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg text-[13px] text-white" style={{ background: C.purple, fontFamily: T.poppins }}>Registrar ajuste</button>
              <button onClick={() => setAjusteOpen(false)} className="px-4 py-2 rounded-lg text-[13px] border" style={{ fontFamily: T.poppins, borderColor: "rgba(0,0,0,0.12)", color: "rgba(0,0,0,0.55)" }}>Cancelar</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Saldo disponible" value={`${selected.pts} pts`} valueColor={C.purple} />
          <StatCard label="Puntos acumulados" value={selected.acumulados} />
          <StatCard label="Puntos usados" value={selected.usados} />
          <StatCard label="Canjes" value={0} />
        </div>

        {/* Historial */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-[14px] text-black/80 mb-4" style={{ fontFamily: T.poppins, fontWeight: 500 }}>Historial de movimientos</p>
          {selected.acumulados === 0 ? (
            <div className="py-10 text-center text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>
              Esta clienta no tiene movimientos aún.
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {[
                { type: "Puntos acumulados", detail: "Compra online Shopify", pts: "+420", saldo: "420 pts", date: "12 jun 2026" },
                { type: "Canje aprobado", detail: "$3.000 de descuento", pts: "-300", saldo: "120 pts", date: "15 jun 2026" },
                { type: "Puntos acumulados", detail: "Compra física TUU", pts: "+1.580", saldo: "1.700 pts", date: "20 jun 2026" },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div>
                    <p className="text-[14px] text-black/75" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{m.type}</p>
                    <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{m.detail} · {m.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px]" style={{ fontFamily: T.poppins, fontWeight: 600, color: m.pts.startsWith("+") ? C.green : C.orange }}>
                      {m.pts} pts
                    </p>
                    <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.35)" }}>Saldo: {m.saldo}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] text-black/85" style={{ fontFamily: T.piepie }}>Clientes</h1>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Busca, crea y revisa el historial de cada clienta.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] text-white" style={{ background: C.purple, fontFamily: T.poppins }}>
          <Plus size={15} /> Nueva clienta
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
        <Search size={15} color="rgba(0,0,0,0.35)" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, correo o teléfono..."
          className="flex-1 text-[14px] outline-none bg-transparent"
          style={{ fontFamily: T.poppins }}
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              {["Cliente", "Saldo", "Acumulados", "Estado", ""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-black/[0.02] transition-colors cursor-pointer" style={{ borderColor: "rgba(0,0,0,0.06)" }} onClick={() => setSelected(c)}>
                <td className="px-5 py-4">
                  <p className="text-[14px] text-black/80" style={{ fontFamily: T.poppins, fontWeight: 500 }}>{c.name}</p>
                  <p className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.4)" }}>{c.email}</p>
                </td>
                <td className="px-5 py-4 text-[14px]" style={{ fontFamily: T.poppins, fontWeight: 600, color: C.purple }}>{c.pts} pts</td>
                <td className="px-5 py-4 text-[14px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.6)" }}>{c.acumulados} pts</td>
                <td className="px-5 py-4">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full" style={{ fontFamily: T.poppins, background: c.estado === "Activa" ? `${C.green}15` : `${C.amber}15`, color: c.estado === "Activa" ? C.green : C.amber }}>
                    {c.estado}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <ChevronRight size={16} color="rgba(0,0,0,0.3)" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    if (password === "olffy2026" || password.length > 3) {
      onLogin();
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f5" }}>
      <div className="bg-white rounded-2xl border p-10 w-full max-w-[400px] flex flex-col gap-6" style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
        <div className="flex flex-col gap-1">
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: T.poppins, color: C.orange }}>ACCESO RESTRINGIDO</p>
          <h2 className="text-[28px] text-black/85" style={{ fontFamily: T.piepie }}>Admin Panel</h2>
          <p className="text-[13px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.45)" }}>Solo personal autorizado de Olffy.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.5)" }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
              style={{ fontFamily: T.poppins, borderColor: error ? "#ef4444" : "rgba(0,0,0,0.12)" }}
            />
            {error && <p className="text-[12px] text-red-400" style={{ fontFamily: T.poppins }}>Contraseña incorrecta.</p>}
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl text-[14px] text-white transition-opacity hover:opacity-90"
            style={{ background: C.purple, fontFamily: T.poppins, fontWeight: 500 }}
          >
            Entrar al panel
          </button>
        </div>
        <p className="text-center text-[11px]" style={{ fontFamily: T.poppins, color: "rgba(0,0,0,0.3)" }}>🔒 Acceso privado · Olffy Admin</p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function AdminPage({ onClose }: { onClose: () => void }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<AdminScreen>("dashboard");

  if (!loggedIn) {
    return (
      <div className="fixed inset-0 z-[100]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white flex items-center justify-center border shadow" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
          <X size={16} color="rgba(0,0,0,0.5)" />
        </button>
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden" style={{ background: "#f5f5f5" }}>
      <Sidebar screen={screen} setScreen={setScreen} onLogout={() => { setLoggedIn(false); onClose(); }} />
      <main className="flex-1 overflow-y-auto p-8">
        {screen === "dashboard"   && <Dashboard setScreen={setScreen} />}
        {screen === "cuenta"      && <CuentaCliente setScreen={setScreen} />}
        {screen === "puntos"      && <Puntos setScreen={setScreen} />}
        {screen === "productos"   && <Productos />}
        {screen === "colecciones" && <Colecciones />}
        {screen === "clientes"    && <Clientes />}
      </main>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center border shadow"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      >
        <X size={16} color="rgba(0,0,0,0.5)" />
      </button>
    </div>
  );
}
