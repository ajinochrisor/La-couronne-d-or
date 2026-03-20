import { useState } from "react";
import { initReviews, MENU } from "../data";

function Stars({ value, onChange, size = 18 }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`star ${i <= (hover || value) ? "filled" : "empty"}`}
          style={{ fontSize: size }}
          onClick={() => onChange && onChange(i)}
          onMouseEnter={() => onChange && setHover(i)}
          onMouseLeave={() => onChange && setHover(0)}
        >★</span>
      ))}
    </div>
  );
}

function avgRating(reviews, key) {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r[key], 0) / reviews.length).toFixed(1);
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client:"", dish:"", food:0, service:0, ambiance:0, comment:"" });
  const [filterSort, setFilterSort] = useState("recent");

  const handleSubmit = () => {
    if (!form.client || !form.food || !form.service || !form.ambiance) return;
    setReviews(p => [{
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString("fr-FR"),
    }, ...p]);
    setForm({ client:"", dish:"", food:0, service:0, ambiance:0, comment:"" });
    setShowForm(false);
  };

  const sorted = [...reviews].sort((a, b) => {
    if (filterSort === "best") return (b.food+b.service+b.ambiance) - (a.food+a.service+a.ambiance);
    if (filterSort === "worst") return (a.food+a.service+a.ambiance) - (b.food+b.service+b.ambiance);
    return b.id - a.id;
  });

  const avgGlobal = reviews.length
    ? ((parseFloat(avgRating(reviews,"food")) + parseFloat(avgRating(reviews,"service")) + parseFloat(avgRating(reviews,"ambiance"))) / 3).toFixed(1)
    : 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:22 }}>

      {/* Stats globales */}
      <div className="grid-4">
        {[
          { label:"Note Globale",   value: avgGlobal,                          icon:"👑", color:"var(--royal-pale)" },
          { label:"Nourriture",     value: avgRating(reviews,"food"),           icon:"🍽️", color:"var(--gold)" },
          { label:"Service",        value: avgRating(reviews,"service"),        icon:"🎩", color:"var(--green)" },
          { label:"Ambiance",       value: avgRating(reviews,"ambiance"),       icon:"✨", color:"var(--royal-pale)" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div className="stat-label">{s.label}</div>
              <span style={{ fontSize:22 }}>{s.icon}</span>
            </div>
            <div className="stat-value" style={{ color:s.color }}>{s.value}</div>
            <Stars value={Math.round(parseFloat(s.value))} size={14} />
            <div className="stat-sub">{reviews.length} avis</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:8 }}>
          {[
            { id:"recent", label:"📅 Récents" },
            { id:"best",   label:"⬆️ Meilleurs" },
            { id:"worst",  label:"⬇️ À améliorer" },
          ].map(f => (
            <button key={f.id} className={`tab-btn ${filterSort===f.id?"active":""}`} onClick={() => setFilterSort(f.id)}>{f.label}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Nouvel Avis</button>
      </div>

      {/* Liste des avis */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {sorted.map(r => {
          const avg = ((r.food + r.service + r.ambiance) / 3).toFixed(1);
          return (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <div>
                  <div className="review-client">{r.client}</div>
                  <div className="review-date">{r.date}</div>
                  {r.dish && <div className="review-dish">🍽️ {r.dish}</div>}
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"var(--royal-pale)", fontWeight:700 }}>{avg}</div>
                  <div style={{ fontSize:10, color:"var(--muted)" }}>/ 5</div>
                </div>
              </div>

              <div className="review-scores">
                {[
                  { label:"Nourriture", key:"food",     icon:"🍽️" },
                  { label:"Service",    key:"service",  icon:"🎩" },
                  { label:"Ambiance",   key:"ambiance", icon:"✨" },
                ].map(s => (
                  <div key={s.key} className="review-score-item">
                    <div className="review-score-label">{s.icon} {s.label}</div>
                    <Stars value={r[s.key]} size={12} />
                    <div style={{ fontSize:11, color:"var(--royal-pale)", fontWeight:600 }}>{r[s.key]}/5</div>
                  </div>
                ))}
              </div>

              {r.comment && (
                <div className="review-comment">
                  <span style={{ color:"var(--royal-pale)", marginRight:4 }}>"</span>
                  {r.comment}
                  <span style={{ color:"var(--royal-pale)", marginLeft:4 }}>"</span>
                </div>
              )}

              <button
                className="btn btn-sm btn-danger"
                style={{ alignSelf:"flex-end" }}
                onClick={() => setReviews(p => p.filter(x => x.id!==r.id))}
              >✕ Supprimer</button>
            </div>
          );
        })}
      </div>

      {!reviews.length && (
        <div style={{ textAlign:"center", padding:60, color:"var(--muted)" }}>
          <div style={{ fontSize:48 }}>⭐</div>
          <div style={{ marginTop:12, fontSize:16 }}>Aucun avis pour le moment</div>
        </div>
      )}

      {/* Modal ajout avis */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">⭐ Nouvel Avis Client</div>

            <div className="form-row">
              <div className="form-group">
                <label>Nom du Client</label>
                <input placeholder="Ex: M. Dupont" value={form.client} onChange={e => setForm(p=>({...p,client:e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Plat commandé</label>
                <select value={form.dish} onChange={e => setForm(p=>({...p,dish:e.target.value}))}>
                  <option value="">Sélectionner...</option>
                  {MENU.filter(m=>["Entrée","Plat","Dessert"].includes(m.category)).map(m=>(
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ background:"var(--bg3)", borderRadius:10, padding:16, marginBottom:14 }}>
              <div style={{ fontSize:12, color:"var(--muted)", marginBottom:14, textTransform:"uppercase", letterSpacing:0.7 }}>Notes (cliquer pour évaluer)</div>
              {[
                { key:"food",     label:"🍽️ Nourriture" },
                { key:"service",  label:"🎩 Service" },
                { key:"ambiance", label:"✨ Ambiance" },
              ].map(s => (
                <div key={s.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ fontSize:13, fontWeight:500 }}>{s.label}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <Stars value={form[s.key]} onChange={v => setForm(p=>({...p,[s.key]:v}))} size={22} />
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--royal-pale)", minWidth:20 }}>{form[s.key] || "-"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Commentaire</label>
              <textarea placeholder="Partagez votre expérience..." value={form.comment} onChange={e => setForm(p=>({...p,comment:e.target.value}))} />
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Publier l'Avis</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
