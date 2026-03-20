import { useState } from "react";
import { EMPLOYEES, initOrders, TABLES, MENU, initAssignments } from "../data";

export default function EmployeesSection() {
  const [tab, setTab] = useState("overview");
  const [selected, setSelected] = useState(null);
  const [assignments, setAssignments] = useState(initAssignments); // { tableId: employeeId }
  const [orders] = useState(initOrders);

  const getOrders  = id => orders.filter(o => o.employeeId === id);
  const getTotal   = id => getOrders(id).reduce((sum,o) => sum + o.items.reduce((s,id2) => s+(MENU.find(m=>m.id===id2)?.price||0),0),0);
  const getTables  = id => Object.entries(assignments).filter(([,eid]) => eid===id).map(([tid]) => parseInt(tid));
  const isFree     = id => getTables(id).length === 0;

  const assignTable = (tableId, empId) => {
    setAssignments(prev => ({ ...prev, [tableId]: empId }));
  };
  const unassignTable = (tableId) => {
    setAssignments(prev => {
      const next = { ...prev };
      delete next[tableId];
      return next;
    });
  };

  const freeEmployees = EMPLOYEES.filter(e => isFree(e.id));
  const busyEmployees = EMPLOYEES.filter(e => !isFree(e.id));

  return (
    <div>
      <div className="tabs">
        {[
          { id:"overview", label:"🎖️ Équipe"              },
          { id:"assign",   label:"🗺️ Assignation Tables"  },
          { id:"orders",   label:"📜 Commandes"           },
          { id:"free",     label:`✅ Libres (${freeEmployees.length})` },
        ].map(t => (
          <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ── OVERVIEW ───────────────────────────────── */}
      {tab === "overview" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {/* Summary bar */}
          <div className="grid-4">
            <div className="stat-card">
              <div className="stat-label">Total Équipe</div>
              <div className="stat-value">{EMPLOYEES.length}</div>
              <div className="stat-sub">servants royaux</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">En Service</div>
              <div className="stat-value" style={{ color:"var(--royal-light)" }}>{busyEmployees.length}</div>
              <div className="stat-sub">tables assignées</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Disponibles</div>
              <div className="stat-value" style={{ color:"var(--green)" }}>{freeEmployees.length}</div>
              <div className="stat-sub">sans table</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">CA Total</div>
              <div className="stat-value">{EMPLOYEES.reduce((s,e)=>s+getTotal(e.id),0)}€</div>
              <div className="stat-sub">ce soir</div>
            </div>
          </div>

          <div className="grid-2">
            {EMPLOYEES.map(emp => {
              const empTables = getTables(emp.id);
              const total     = getTotal(emp.id);
              const free      = isFree(emp.id);
              const isSelected = selected === emp.id;
              return (
                <div
                  key={emp.id}
                  className={`emp-card ${isSelected ? "selected" : ""}`}
                  style={{ borderColor: isSelected ? emp.color : "var(--border)" }}
                  onClick={() => setSelected(isSelected ? null : emp.id)}
                >
                  <div style={{ display:"flex", alignItems:"flex-start", gap:13 }}>
                    {/* Avatar */}
                    <div className="emp-avatar" style={{ background:emp.bg, color:emp.color, border:`1.5px solid ${emp.color}33` }}>
                      {emp.initials}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:"var(--text)" }}>{emp.name}</div>
                          <div style={{ fontSize:13, color:"var(--text2)", marginTop:1 }}>{emp.role}</div>
                        </div>
                        {free
                          ? <span className="free-badge">✅ Libre</span>
                          : <span className="busy-badge">⚡ En service</span>
                        }
                      </div>
                      {/* Stats */}
                      <div style={{ display:"flex", gap:20, marginTop:14 }}>
                        {[
                          { label:"Tables",  value: empTables.length },
                          { label:"Plats",   value: getOrders(emp.id).reduce((s,o)=>s+o.items.length,0) },
                          { label:"CA",      value: total+"€" },
                        ].map(s => (
                          <div key={s.label} className="emp-stat">
                            <span className="emp-stat-label">{s.label}</span>
                            <span className="emp-stat-value" style={{ color:emp.color }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tables assignées détail */}
                  {isSelected && (
                    <div style={{ marginTop:14, borderTop:"1px solid var(--border)", paddingTop:12 }}>
                      {empTables.length > 0 ? (
                        <>
                          <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:"var(--muted)", marginBottom:8, textTransform:"uppercase", letterSpacing:0.8 }}>Tables en charge</div>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                            {empTables.map(tid => {
                              const order = orders.find(o=>o.tableId===tid);
                              const tTotal = order ? order.items.reduce((s,id2)=>s+(MENU.find(m=>m.id===id2)?.price||0),0):0;
                              return (
                                <div key={tid} style={{ background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:8, padding:"8px 12px", display:"flex", alignItems:"center", gap:10 }}>
                                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700, color:emp.color }}>Table {tid}</span>
                                  {order && <span style={{ fontSize:12, color:"var(--text2)" }}>{order.clientName}</span>}
                                  {tTotal > 0 && <span style={{ fontSize:12, color:"var(--gold)" }}>{tTotal}€</span>}
                                  <button className="btn btn-sm btn-danger" onClick={e=>{e.stopPropagation();unassignTable(tid);}}>✕</button>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize:13, color:"var(--muted)", fontStyle:"italic" }}>Aucune table assignée — disponible pour service</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ASSIGNATION ────────────────────────────── */}
      {tab === "assign" && (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ display:"flex", gap:12, marginBottom:4 }}>
            {[
              { color:"var(--royal-pale)", label:"Table occupée" },
              { color:"var(--gold)",       label:"Table réservée" },
              { color:"var(--green)",      label:"Table libre" },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"var(--text2)" }}>
                <div style={{ width:10, height:10, borderRadius:2, background:l.color }} />{l.label}
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
            {TABLES.map(t => {
              const assignedEmpId = assignments[t.id];
              const assignedEmp   = EMPLOYEES.find(e=>e.id===assignedEmpId);
              const order = orders.find(o=>o.tableId===t.id);
              const isOcc = !!order;
              const status = isOcc ? "occupied" : assignedEmpId ? "reserved" : "free";
              const colors = { occupied:"var(--royal-mid)", reserved:"var(--gold-dim)", free:"var(--green)" };

              return (
                <div key={t.id} style={{ background:"var(--card)", border:`1.5px solid ${colors[status]}33`, borderRadius:"var(--radius)", padding:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ fontFamily:"'Cinzel',serif", fontSize:22, fontWeight:800, color:colors[status] }}>Table {t.id}</div>
                      <span style={{ fontSize:12, color:"var(--muted)" }}>{t.capacity} couverts</span>
                    </div>
                    {order && <span style={{ fontSize:12, color:"var(--text2)" }}>{order.clientName}</span>}
                  </div>

                  {/* Employé actuel */}
                  {assignedEmp ? (
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--bg3)", borderRadius:8, padding:"8px 12px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:30, height:30, borderRadius:"50%", background:assignedEmp.bg, color:assignedEmp.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontSize:11, fontWeight:700 }}>{assignedEmp.initials}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600 }}>{assignedEmp.name}</div>
                          <div style={{ fontSize:11, color:"var(--muted)" }}>{assignedEmp.role}</div>
                        </div>
                      </div>
                      <button className="btn btn-sm btn-danger" onClick={() => unassignTable(t.id)}>Retirer</button>
                    </div>
                  ) : (
                    <div style={{ color:"var(--muted)", fontSize:13, fontStyle:"italic", marginBottom:8 }}>Aucun serveur assigné</div>
                  )}

                  {/* Sélecteur */}
                  <div style={{ marginTop:10 }}>
                    <select
                      style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:6, padding:"7px 10px", color:"var(--text)", fontFamily:"'Crimson Pro',serif", fontSize:13, width:"100%", outline:"none" }}
                      value=""
                      onChange={e => { if(e.target.value) assignTable(t.id, parseInt(e.target.value)); }}
                    >
                      <option value="">Assigner un serveur...</option>
                      {EMPLOYEES.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} — {emp.role} {isFree(emp.id) ? "(libre)" : "(en service)"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── COMMANDES ──────────────────────────────── */}
      {tab === "orders" && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {EMPLOYEES.map(emp => {
            const empOrders = getOrders(emp.id);
            if (!empOrders.length) return null;
            return (
              <div key={emp.id} className="card">
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <div className="emp-avatar" style={{ background:emp.bg, color:emp.color }}>{emp.initials}</div>
                  <div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:700, color:emp.color }}>{emp.name}</div>
                    <div style={{ fontSize:13, color:"var(--muted)" }}>{emp.role} · {empOrders.length} table{empOrders.length>1?"s":""} · {getTotal(emp.id)}€</div>
                  </div>
                </div>
                {empOrders.map(order => {
                  const items = order.items.map(id=>MENU.find(m=>m.id===id)).filter(Boolean);
                  const total = items.reduce((s,i)=>s+i.price,0);
                  return (
                    <div key={order.id} style={{ background:"var(--bg3)", borderRadius:10, padding:14, marginBottom:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                        <div>
                          <span style={{ fontFamily:"'Cinzel',serif", fontWeight:700 }}>Table {order.tableId}</span>
                          <span style={{ color:"var(--text2)", fontSize:13, marginLeft:10 }}>{order.clientName} · {order.time}</span>
                        </div>
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          <span className={`tag ${order.status==="served"?"tag-green":"tag-blue"}`}>{order.status==="served"?"✓ Servi":"⏳ En cours"}</span>
                          <span style={{ fontFamily:"'Cinzel',serif", fontSize:17, color:"var(--royal-pale)" }}>{total}€</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {items.map((item,idx)=>(
                          <div key={idx} style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:6, padding:"4px 10px", display:"flex", gap:7, alignItems:"center" }}>
                            <span style={{ fontSize:13 }}>{item.name}</span>
                            <span style={{ fontSize:11, color:"var(--muted)" }}>{item.category}</span>
                            <span style={{ color:"var(--royal-pale)", fontSize:13 }}>{item.price}€</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* ── LIBRES ─────────────────────────────────── */}
      {tab === "free" && (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, color:"var(--muted)", letterSpacing:0.5 }}>
            {freeEmployees.length} serveur{freeEmployees.length!==1?"s":""} disponible{freeEmployees.length!==1?"s":""} pour être assigné{freeEmployees.length!==1?"s":""}
          </div>

          {freeEmployees.length === 0 ? (
            <div style={{ textAlign:"center", padding:50, color:"var(--muted)" }}>
              <div style={{ fontSize:40 }}>👑</div>
              <div style={{ marginTop:12, fontFamily:"'Cinzel',serif" }}>Tout le personnel est en service</div>
            </div>
          ) : (
            <div className="grid-2">
              {freeEmployees.map(emp => (
                <div key={emp.id} className="card" style={{ borderLeft:`3px solid ${emp.color}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                    <div className="emp-avatar" style={{ background:emp.bg, color:emp.color, width:50, height:50, fontSize:16 }}>{emp.initials}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, fontWeight:700 }}>{emp.name}</div>
                        <span className="free-badge">✅ Disponible</span>
                      </div>
                      <div style={{ fontSize:13, color:"var(--text2)", marginTop:2 }}>{emp.role}</div>
                      <div style={{ marginTop:10 }}>
                        <select
                          style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:6, padding:"7px 10px", color:"var(--text)", fontFamily:"'Crimson Pro',serif", fontSize:13, width:"100%", outline:"none" }}
                          value=""
                          onChange={e => { if(e.target.value) assignTable(parseInt(e.target.value), emp.id); setTab("assign"); }}
                        >
                          <option value="">Assigner à une table...</option>
                          {TABLES.map(t => (
                            <option key={t.id} value={t.id}>Table {t.id} ({t.capacity} couverts)</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {busyEmployees.length > 0 && (
            <>
              <div className="divider" />
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"var(--muted)", letterSpacing:0.5 }}>
                ⚡ EN SERVICE ({busyEmployees.length})
              </div>
              <div className="grid-2">
                {busyEmployees.map(emp => (
                  <div key={emp.id} className="card" style={{ opacity:0.6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div className="emp-avatar" style={{ background:emp.bg, color:emp.color }}>{emp.initials}</div>
                      <div>
                        <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, fontWeight:700 }}>{emp.name}</div>
                        <div style={{ fontSize:12, color:"var(--text2)" }}>{emp.role}</div>
                        <div style={{ fontSize:12, color:"var(--muted)", marginTop:3 }}>
                          Tables : {getTables(emp.id).join(", ")}
                        </div>
                      </div>
                      <span className="busy-badge" style={{ marginLeft:"auto" }}>⚡ Occupé</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
