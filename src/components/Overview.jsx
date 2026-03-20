import { initOrders, initReservations, TABLES, EMPLOYEES, MENU } from "../data";

export default function Overview({ setActiveTab }) {
  const occupied = initOrders.map(o => o.tableId);
  const reserved = initReservations.map(r => r.table);
  const freeCount = TABLES.filter(t => !occupied.includes(t.id) && !reserved.includes(t.id)).length;

  const total = initOrders.reduce((sum, o) =>
    sum + o.items.reduce((s, id) => s + (MENU.find(m => m.id === id)?.price || 0), 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* KPI */}
      <div className="grid-4">
        {[
          { label: "Tables Occupées", value: occupied.length, sub: `sur ${TABLES.length} tables`, icon: "🍽️", color: "var(--royal-pale)" },
          { label: "Réservations", value: initReservations.length, sub: "ce soir", icon: "📋", color: "var(--gold)" },
          { label: "Tables Libres", value: freeCount, sub: "disponibles", icon: "✅", color: "var(--green)" },
          { label: "CA du Soir", value: total + "€", sub: "en cours", icon: "💰", color: "var(--royal-pale)" },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
            <div className="stat-icon">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Plan de salle */}
      <div className="card">
        <div className="card-title">🗺️ Plan de Salle</div>
        <div className="tables-grid">
          {TABLES.map(t => {
            const isOcc = occupied.includes(t.id);
            const isRes = reserved.includes(t.id) && !isOcc;
            const status = isOcc ? "occupied" : isRes ? "reserved" : "free";
            const order = initOrders.find(o => o.tableId === t.id);
            const resa  = initReservations.find(r => r.table === t.id);
            const orderTotal = order
              ? order.items.reduce((s, id) => s + (MENU.find(m => m.id === id)?.price || 0), 0)
              : 0;
            return (
              <div key={t.id} className={`table-card ${status}`}>
                <div className="table-num">{t.id}</div>
                <div className="table-info">{t.capacity} couverts</div>
                {isOcc  && <><div className="table-client">{order.clientName}</div><div style={{ fontSize: 11, color: "var(--royal-pale)", marginTop:3 }}>{orderTotal}€</div></>}
                {isRes  && <div className="table-client">{resa.time} · {resa.client}</div>}
                {!isOcc && !isRes && <div className="table-client" style={{ color: "var(--green)" }}>Libre</div>}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
          {[["var(--royal-pale)", "Occupée"], ["var(--gold)", "Réservée"], ["var(--green)", "Libre"]].map(([c,l]) => (
            <div key={l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--muted)" }}>
              <div style={{ width:10, height:10, borderRadius:2, background:c }} />{l}
            </div>
          ))}
        </div>
      </div>

      {/* Commandes + Réservations */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">⚡ Commandes en Cours</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {initOrders.map(order => {
              const emp = EMPLOYEES.find(e => e.id === order.employeeId);
              const orderTotal = order.items.reduce((s, id) => s + (MENU.find(m => m.id === id)?.price || 0), 0);
              return (
                <div key={order.id} style={{ background:"var(--bg3)", borderRadius:10, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:500 }}>Table {order.tableId} — {order.clientName}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{order.items.length} plats · {emp?.name} · {order.time}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
                    <span className={`tag ${order.status === "served" ? "tag-green" : "tag-blue"}`}>
                      {order.status === "served" ? "✓ Servi" : "⏳ En cours"}
                    </span>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--royal-pale)" }}>{orderTotal}€</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-title">📋 Réservations du Soir</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {initReservations.map(r => (
              <div key={r.id} style={{ background:"var(--bg3)", borderRadius:10, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:500 }}>{r.client}</div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{r.time} · Table {r.table} · {r.covers} pers.</div>
                </div>
                <span className={`tag ${r.status === "confirmed" ? "tag-green" : "tag-gold"}`}>
                  {r.status === "confirmed" ? "✓ Confirmé" : "⏳ En attente"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plats populaires */}
      <div className="card">
        <div className="card-title">🏆 Plats les Plus Commandés Ce Soir</div>
        <div style={{ display:"flex", gap:12 }}>
          {[
            { ...MENU.find(m => m.id === 7), count: 2 },
            { ...MENU.find(m => m.id === 1), count: 1 },
            { ...MENU.find(m => m.id === 12), count: 2 },
          ].map((item, i) => (
            <div key={i} style={{ flex:1, background:"var(--bg3)", borderRadius:12, overflow:"hidden", border:"1px solid var(--border)" }}>
              <img src={item.image} alt={item.name} style={{ width:"100%", height:100, objectFit:"cover" }} onError={e => e.target.style.display="none"} />
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontWeight:500, fontSize:13 }}>{item.name}</div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                  <span style={{ color:"var(--royal-pale)", fontFamily:"'Playfair Display',serif" }}>{item.price}€</span>
                  <span className="tag tag-blue">{item.count}x commandé</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
