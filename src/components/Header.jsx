import { Link } from "react-router-dom";
import { Bell, Search, ShieldCheck } from "lucide-react";

function Header({ accessRole = "jogador", activeAccess }) {
  const isCraque = accessRole === "craque";
  const isAdmin = accessRole === "admin";

  return (
    <header className="app-header">
      <div className="header-top">
        <div>
          <p className="eyebrow">{activeAccess?.badge ?? "SportMatch MVP"}</p>
          <h1>{isAdmin ? "Painel Admin" : isCraque ? "Ola, Craque" : "Ola, Samuel"}</h1>
        </div>

        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Buscar">
            <Search size={18} />
          </button>
          <Link className="notification-button" to="/atualizacoes" aria-label="Notificacoes">
            <Bell size={18} />
            <span>4</span>
          </Link>
        </div>
      </div>

      <div className="search-shell">
        <Search size={17} />
        <span>Buscar matches, torneios, atletas...</span>
      </div>

      <div className="header-status">
        <span>
          <ShieldCheck size={15} />
          {activeAccess?.label ?? "MVP sem backend"}
        </span>
        <span>{isCraque ? "Matches ilimitados" : isAdmin ? "Operacao fake ativa" : "2 matches/semana"}</span>
      </div>
    </header>
  );
}

export default Header;
