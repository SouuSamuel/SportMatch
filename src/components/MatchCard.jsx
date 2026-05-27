import { Link } from "react-router-dom";
import { Clock, MapPin, Sparkles, Users } from "lucide-react";

import Card from "./Card";

function MatchCard({ match, compact = false, onJoinMatch }) {
  return (
    <Card className="match-card" glow={!compact}>
      <div className="card-row">
        <div>
          <span className="badge">{match.sport}</span>
          <h3>{match.title}</h3>
        </div>
        <strong>{match.price}</strong>
      </div>

      <div className="meta-grid">
        <span>
          <Clock size={14} />
          {match.time}
        </span>
        <span>
          <MapPin size={14} />
          {match.place}
        </span>
        <span>
          <Users size={14} />
          {match.limit - match.spots}/{match.limit} confirmados
        </span>
        <span>
          <Sparkles size={14} />
          {match.level}
        </span>
      </div>

      <div className="progress-bar">
        <span style={{ width: `${match.fill}%` }} />
      </div>

      {match.social && (
        <div className="solidary-box">
          <span className="badge gold">{match.social.badge}</span>
          <p>Requisito para participação: {match.social.requirement}</p>
          <small>{match.social.ong} • {match.social.collected}</small>
        </div>
      )}

      <div className="card-footer">
        <span className="status">{match.status}</span>
        <button
          className="mini-button"
          onClick={() => onJoinMatch?.("🔥 Você entrou no match")}
          type="button"
        >
          Entrar no Match
        </button>
        <Link className="mini-button ghost-mini" to={`/match/${match.id}`}>
          Detalhes
        </Link>
      </div>
    </Card>
  );
}

export default MatchCard;
