import { Link } from "react-router-dom";
import { Medal, Trophy } from "lucide-react";

import Card from "./Card";

function TournamentCard({ tournament }) {
  return (
    <Card className="tournament-card" glow>
      <div className="card-row">
        <span className="badge gold">{tournament.status}</span>
        <Trophy size={22} />
      </div>
      <h3>{tournament.title}</h3>
      <p>{tournament.format}</p>
      <div className="prize-line">
        <Medal size={16} />
        {tournament.prize}
      </div>
      {tournament.social && (
        <div className="solidary-box">
          <span className="badge gold">{tournament.social.badge}</span>
          <p>Requisito para participação: {tournament.social.requirement}</p>
          <small>{tournament.social.ong} • {tournament.social.collected}</small>
        </div>
      )}
      <Link className="wide-button" to={`/torneio/${tournament.id}`}>
        Ver campeonato
      </Link>
    </Card>
  );
}

export default TournamentCard;
