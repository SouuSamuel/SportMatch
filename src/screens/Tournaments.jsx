import { Plus, Target, Trophy } from "lucide-react";

import Card from "../components/Card";
import TournamentCard from "../components/TournamentCard";
import { tournaments } from "../data/mockData";

function Tournaments({ accessRole = "jogador", onNotify }) {
  const canCreateTournament = accessRole === "craque" || accessRole === "admin";

  return (
    <div className="screen-stack">
      <section className="screen-heading">
        <span className="badge gold">Torneios Gold</span>
        <h2>Chaves, tabela, artilharia e premiação.</h2>
        <p>Campeonatos com aparencia de painel profissional.</p>
      </section>

      <button
        className="primary-button full-button"
        disabled={!canCreateTournament}
        onClick={() => onNotify?.(canCreateTournament ? "Criador de torneio aberto" : "Criar torneios e recurso Craque")}
        type="button"
      >
        <Plus size={18} />
        {canCreateTournament ? "Criar torneio" : "Criar torneio (Craque)"}
      </button>

      <button
        className="ghost-button full-button"
        onClick={() => onNotify?.("🏆 Time inscrito no campeonato")}
        type="button"
      >
        Inscrever Time
      </button>

      <div className="compact-list">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>

      <Card className="table-card">
        <div className="section-title no-margin">
          <div>
            <Trophy size={18} />
            <h2>Tabela geral</h2>
          </div>
        </div>
        <div className="standings-list">
          {tournaments[0].standings.map((team, index) => (
            <div key={team.team}>
              <span>{index + 1}</span>
              <strong>{team.team}</strong>
              <small>{team.points} pts</small>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3>Destaques</h3>
        <div className="detail-grid">
          <div className="spotlight-line">
            <Target size={17} />
            Artilharia: {tournaments[0].topScorer}
          </div>
          <div className="spotlight-line">
            <Trophy size={17} />
            MVP atual: {tournaments[0].mvp}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Tournaments;
