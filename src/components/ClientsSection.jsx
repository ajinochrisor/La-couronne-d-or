import { useState } from "react";
import { initReservations, initOrders, TABLES, MENU } from "../data";

const DRINK_CATEGORIES = ["Vin Rouge","Vin Blanc","Vin Rosé","Champagne","Cocktail","Jus","Eau","Café"];
const FOOD_CATEGORIES  = ["Entrée","Plat","Dessert"];

export default function ClientsSection() {
  const [tab, setTab] = useState("reservations");
  const [reservations, setReservations] = useState(initReservations);
  const [orders] = useState(initOrders);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ client:"", time:"", covers:2, table:"", phone:"" });
  const [menuFilter, setMenuFilter] = useState("Tous");

  const occupied = orders.map(o => o.tableId);
  const reserved = reservations.map(r => r.table);

  const handleAdd = () => {
    if (!form.client || !form.time || !form.table) return;
    setReservations(p => [...p, { ...form, id: Date.now(), table: parseInt(form.table), covers: parseInt(form.covers), status: "pending" }]);
    setForm({ client:"", time:"", covers:2, table:"", phone:"" });
    setShowModal(false);
  };

  const allCategories = ["Tous", ...FOOD_CATEGORIES, ...DRINK_CATEGORIES];
  const filteredMenu = menuFilter === "Tous" ? MENU : MENU.filter(m => m.category === menuFilter);
  const dailyItems = MENU.filter(m => m.daily && FOOD_CATEGORIES.includes(m.category));

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <div className="tabs" style={{ margin:0 }}>
          {[
            { id:"reservations", label:"📋 Réservations" },
            { id:"tables",       label:"🗺️ Tables"        },
            { id:"menu",         label:"🍽️ Menu"           },
            { id:"daily",        label:"⭐ Menu du Jour"   },
            { id:"drinks",       label:"🍷 Boissons"       },
            { id:"orders",       label:"📝 Commandes"      },
          ].map(t => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        {tab === "reservations" && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Réservation</button>
        )}
      </div>

      {/* ── RESERVATIONS ───────────────────────────── */}
      {tab === "reservations" && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Client</th><th>Heure</th><th>Couverts</th><th>Table</th><th>Téléphone</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {reservations.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontWeight:500 }}>{r.client}</td>
                    <td>{r.time}</td>
                    <td>{r.covers} pers.</td>
                    <td>Table {r.table}</td>
                    <td style={{ color:"var(--text2)" }}>{r.phone}</td>
                    <td><span className={`tag ${r.status === "confirmed" ? "tag-green":"tag-gold"}`}>{r.status === "confirmed" ? "✓ Confirmé":"⏳ En attente"}</span></td>
                    <td>
                      <div style={{ display:"flex", gap:5 }}>
                        {r.status === "pending" && <button className="btn btn-sm btn-primary" onClick={() => setReservations(p => p.map(x => x.id===r.id?{...x,status:"confirmed"}:x))}>✓</button>}
                        <button className="btn btn-sm btn-danger" onClick={() => setReservations(p => p.filter(x => x.id!==r.id))}>✕</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!reservations.length && <div style={{ textAlign:"center", padding:40, color:"var(--muted)" }}>Aucune réservation</div>}
          </div>
        </div>
      )}

      {/* ── PLAN TABLES ────────────────────────────── */}
      {tab === "tables" && (
        <div className="card">
          <div className="card-title">🗺️ Plan de Salle — État en Temps Réel</div>
          <div className="tables-grid">
            {TABLES.map(t => {
              const isOcc = occupied.includes(t.id);
              const isRes = reserved.includes(t.id) && !isOcc;
              const status = isOcc ? "occupied" : isRes ? "reserved" : "free";
              const order = orders.find(o => o.tableId === t.id);
              const resa  = reservations.find(r => r.table === t.id);
              const total = order ? order.items.reduce((s,id) => s+(MENU.find(m=>m.id===id)?.price||0),0) : 0;
              return (
                <div key={t.id} className={`table-card ${status}`}>
                  <div className="table-num">{t.id}</div>
                  <div className="table-info">{t.capacity} couverts</div>
                  {isOcc && <><div className="table-client">{order.clientName}</div><div style={{ fontSize:11, color:"var(--royal-pale)", marginTop:3 }}>{total}€</div></>}
                  {isRes && <div className="table-client">{resa.time}</div>}
                  {!isOcc && !isRes && <div style={{ fontSize:11, color:"var(--green)", marginTop:3 }}>Disponible</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:20, marginTop:16 }}>
            {[["var(--royal-pale)","Occupée"],["var(--gold)","Réservée"],["var(--green)","Libre"]].map(([c,l]) => (
              <div key={l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--muted)" }}>
                <div style={{ width:10, height:10, borderRadius:2, background:c }} />{l}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MENU ───────────────────────────────────── */}
      {tab === "menu" && (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {["Tous",...FOOD_CATEGORIES].map(cat => (
              <button key={cat} className={`tab-btn ${menuFilter===cat?"active":""}`} onClick={() => setMenuFilter(cat)}>{cat}</button>
            ))}
          </div>
          <div className="menu-grid">
            {MENU.filter(m => FOOD_CATEGORIES.includes(m.category) && (menuFilter==="Tous" || m.category===menuFilter)).map(item => (
              <div key={item.id} className={`menu-item${item.daily ? " daily" : ""}`}>
                <img src={item.image} alt={item.name} className="menu-img" onError={e => e.target.src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"} />
                <div className="menu-body">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                    <div className="menu-item-name">{item.name}</div>
                    {item.daily && <span className="tag tag-blue" style={{ fontSize:10, flexShrink:0 }}>★ Jour</span>}
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  <div className="menu-item-footer">
                    <div className="menu-item-price">{item.price}€</div>
                    <span className="tag tag-muted" style={{ fontSize:10 }}>{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MENU DU JOUR ───────────────────────────── */}
      {tab === "daily" && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div style={{ background:"linear-gradient(135deg, var(--royal) 0%, #0b3d91 100%)", borderRadius:14, padding:"24px 28px", border:"1px solid var(--royal)" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:900, color:"white" }}>⭐ Menu du Jour</div>
            <div style={{ color:"rgba(255,255,255,.7)", fontSize:13, marginTop:4 }}>
              {new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
            </div>
          </div>
          {FOOD_CATEGORIES.map(cat => {
            const items = dailyItems.filter(m => m.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="drink-section-title">{cat}s du Jour</div>
                <div className="menu-grid">
                  {items.map(item => (
                    <div key={item.id} className="menu-item daily">
                      <img src={item.image} alt={item.name} className="menu-img" onError={e => e.target.src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"} />
                      <div className="menu-body">
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <div className="menu-item-name">{item.name}</div>
                          <span className="tag tag-blue" style={{ fontSize:10 }}>★ Jour</span>
                        </div>
                        <div className="menu-item-desc">{item.desc}</div>
                        <div className="menu-item-price">{item.price}€</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── BOISSONS ───────────────────────────────── */}
      {tab === "drinks" && (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {DRINK_CATEGORIES.map(cat => {
            const items = MENU.filter(m => m.category === cat);
            if (!items.length) return null;
            const icons = { "Vin Rouge":"🍷","Vin Blanc":"🥂","Vin Rosé":"🌸","Champagne":"🍾","Cocktail":"🍹","Jus":"🥤","Eau":"💧","Café":"☕" };
            return (
              <div key={cat}>
                <div className="drink-section-title">{icons[cat]||"🥤"} {cat}</div>
                <div className="menu-grid">
                  {items.map(item => (
                    <div key={item.id} className="menu-item">
                      <img src={item.image} alt={item.name} className="menu-img" onError={e => e.target.src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"} />
                      <div className="menu-body">
                        <div className="menu-item-name">{item.name}</div>
                        <div className="menu-item-desc">{item.desc}</div>
                        <div className="menu-item-footer">
                          <div className="menu-item-price">{item.price}€</div>
                          {item.isBottle && <span className="tag tag-gold" style={{ fontSize:10 }}>🍾 Bouteille</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── COMMANDES ──────────────────────────────── */}
      {tab === "orders" && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {orders.map(order => {
            const items = order.items.map(id => MENU.find(m => m.id===id)).filter(Boolean);
            const total = items.reduce((s,i) => s+i.price, 0);
            return (
              <div key={order.id} className="card">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700 }}>Table {order.tableId}</span>
                    <span style={{ color:"var(--text2)", fontSize:13, marginLeft:12 }}>{order.clientName} · {order.time}</span>
                  </div>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span className={`tag ${order.status==="served"?"tag-green":"tag-blue"}`}>{order.status==="served"?"✓ Servi":"⏳ En cours"}</span>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--royal-pale)" }}>{total}€</span>
                  </div>
                </div>
                <div className="divider" style={{ margin:"8px 0" }} />
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                  {items.map((item, idx) => (
                    <div key={idx} style={{ background:"var(--bg3)", borderRadius:8, overflow:"hidden", border:"1px solid var(--border)" }}>
                      <img src={item.image} alt={item.name} style={{ width:"100%", height:70, objectFit:"cover" }} onError={e => e.target.style.display="none"} />
                      <div style={{ padding:"8px 10px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:500 }}>{item.name}</div>
                          <div style={{ fontSize:10, color:"var(--muted)" }}>{item.category}</div>
                        </div>
                        <div style={{ color:"var(--royal-pale)", fontFamily:"'Playfair Display',serif" }}>{item.price}€</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">📋 Nouvelle Réservation</div>
            <div className="form-row">
              <div className="form-group"><label>Nom du Client</label><input placeholder="Ex: M. Dupont" value={form.client} onChange={e => setForm(p=>({...p,client:e.target.value}))} /></div>
              <div className="form-group"><label>Téléphone</label><input placeholder="06 XX XX XX XX" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Heure</label><input placeholder="Ex: 20h00" value={form.time} onChange={e => setForm(p=>({...p,time:e.target.value}))} /></div>
              <div className="form-group"><label>Couverts</label>
                <select value={form.covers} onChange={e => setForm(p=>({...p,covers:e.target.value}))}>
                  {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} personne{n>1?"s":""}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Table</label>
                <select value={form.table} onChange={e => setForm(p=>({...p,table:e.target.value}))}>
                  <option value="">Choisir...</option>
                  {TABLES.map(t=><option key={t.id} value={t.id}>Table {t.id} ({t.capacity} couverts)</option>)}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleAdd}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
