import { useState } from "react";
import ClientsSection from "./components/ClientsSection";
import EmployeesSection from "./components/EmployeesSection";
import Overview from "./components/Overview";
import ReviewsSection from "./components/ReviewsSection";
import { RESTAURANT_NAME, RESTAURANT_TAGLINE } from "./data";
import "./styles.css";

const NAV = [
  { id:"overview",  icon:"⚜️", label:"Vue Générale"  },
  { id:"clients",   icon:"🍽️", label:"Clients"       },
  { id:"employees", icon:"🎖️", label:"Employés"      },
  { id:"reviews",   icon:"⭐", label:"Avis & Notes"  },
];

const TITLES = {
  overview:  "Vue Générale",
  clients:   "Gestion Clients",
  employees: "Gestion Employés",
  reviews:   "Avis & Notations",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-emblem">👑</div>
          <div>
            <div className="logo-name">{RESTAURANT_NAME}</div>
            <div className="logo-sub">{RESTAURANT_TAGLINE}</div>
          </div>
        </div>

        <div className="nav-section">Navigation</div>
        <nav style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {NAV.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <span>Service du soir en cours</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="page-title">{TITLES[activeTab]}</h1>
            <div className="topbar-date">
              {new Date().toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
            </div>
          </div>
          <div className="topbar-right">
            <div className="badge">🌙 Soir — 19h30</div>
            <div className="avatar">GR</div>
          </div>
        </header>

        <div className="content">
          {activeTab === "overview"  && <Overview setActiveTab={setActiveTab} />}
          {activeTab === "clients"   && <ClientsSection />}
          {activeTab === "employees" && <EmployeesSection />}
          {activeTab === "reviews"   && <ReviewsSection />}
        </div>
      </main>
    </div>
  );
}
