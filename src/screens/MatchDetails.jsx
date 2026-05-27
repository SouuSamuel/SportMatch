import { Link, useParams } from "react-router-dom";
import { MessageCircle, ShieldCheck, Star, Users } from "lucide-react";

import Card from "../components/Card";
function MatchDetails({ matches, onNotify }) {
  const { id } = useParams();
  const match = matches.find((item) => item.id === id) ?? matches[0];

  return (
    <div className="screen-stack">
      <section className="detail-hero">
        <span className="badge">{match.sport}</span>
        <h2>{match.title}</h2>
        <p>{match.time} • {match.place} • Nível {match.level}</p>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => onNotify?.("🔥 Você entrou no match")}
            type="button"
          >
            Entrar no Match
          </button>
          <Link className="ghost-button" to="/matches">Voltar</Link>
        </div>
      </section>

      {match.social && (
        <Card className="solidary-detail" glow>
          <h3>{match.social.badge}</h3>
          <p>Requisito para participação: {match.social.requirement}</p>
          <div className="sponsor-grid">
            <span>{match.social.ong}</span>
            <span>{match.social.collected}</span>
            <span>{match.social.clothes}</span>
          </div>
        </Card>
      )}

      <div className="detail-grid">
        <Card>
          <h3>Jogadores confirmados</h3>
          <div className="player-cloud">
            {match.players.map((player) => (
              <span key={player}>{player}</span>
            ))}
          </div>
        </Card>

        <Card>
          <h3>Fair play</h3>
          <div className="rating-line">
            <ShieldCheck size={18} />
            <strong>4.8</strong>
            <span>média dos jogadores</span>
          </div>
          <div className="rating-line">
            <Star size={18} />
            <strong>92%</strong>
            <span>presença confirmada</span>
          </div>
        </Card>
      </div>

      <Card>
        <h3>Chat da partida</h3>
        <div className="chat-list">
          {match.chat.map((item) => (
            <div className="chat-bubble" key={`${item.name}-${item.message}`}>
              <MessageCircle size={14} />
              <span><strong>{item.name}:</strong> {item.message}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3>Regras da partida</h3>
        <ul className="check-list">
          {match.rules.map((rule) => (
            <li key={rule}>
              <Users size={15} />
              {rule}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default MatchDetails;
