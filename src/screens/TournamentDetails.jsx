import { Link, useParams } from "react-router-dom";
import { Handshake, Medal, Shield, Trophy } from "lucide-react";

import Card from "../components/Card";
import { tournaments } from "../data/mockData";

function TournamentDetails({ onNotify }) {
  const { id } = useParams();
  const tournament = tournaments.find((item) => item.id === id) ?? tournaments[0];

  return (
    <div className="screen-stack">
      <section className="detail-hero tournament-detail">
        <span className="badge gold">{tournament.status}</span>
        <h2>{tournament.title}</h2>
        <p>{tournament.sport} • {tournament.format}</p>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => onNotify?.("🏆 Time inscrito no campeonato")}
            type="button"
          >
            Inscrever Time
          </button>
          <Link className="ghost-button" to="/torneios">Voltar</Link>
        </div>
      </section>

      {tournament.social && (
        <Card className="solidary-detail" glow>
          <h3>{tournament.social.badge}</h3>
          <p>Requisito para participação: {tournament.social.requirement}</p>
          <div className="sponsor-grid">
            <span>{tournament.social.ong}</span>
            <span>{tournament.social.collected}</span>
            <span>{tournament.social.clothes}</span>
          </div>
        </Card>
      )}

      <Card>
        <h3>Jogos</h3>
        <div className="match-results">
          {tournament.games.map((game) => (
            <span key={game}>{game}</span>
          ))}
        </div>
      </Card>

      <Card className="table-card">
        <h3>Classificação</h3>
        <div className="standings-list">
          {tournament.standings.map((team, index) => (
            <div key={team.team}>
              <span>{index + 1}</span>
              <strong>{team.team}</strong>
              <small>{team.points} pts • {team.goals} saldo/pontos</small>
            </div>
          ))}
        </div>
      </Card>

      <div className="detail-grid">
        <Card>
          <h3>Destaque do campeonato</h3>
          <div className="rating-line">
            <Medal size={18} />
            <strong>{tournament.mvp}</strong>
            <span>MVP atual</span>
          </div>
          <div className="rating-line">
            <Trophy size={18} />
            <strong>{tournament.topScorer}</strong>
            <span>Artilharia</span>
          </div>
        </Card>

        <Card>
          <h3>Patrocinadores fake</h3>
          <div className="sponsor-grid">
            {tournament.sponsors.map((sponsor) => (
              <span key={sponsor}>
                <Handshake size={14} />
                {sponsor}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3>Premiação</h3>
        <p className="big-copy">
          <Shield size={17} />
          {tournament.prize}
        </p>
      </Card>
    </div>
  );
}

export default TournamentDetails;
