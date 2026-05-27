import { Mail, ShieldCheck, TrendingUp } from "lucide-react";

import Card from "./Card";

function PlayerCard({ player }) {
  return (
    <Card className="player-card" glow>
      <div className="score-bubble">{player.score}</div>
      <div className="player-info">
        <h3>{player.name}</h3>
        <p>{player.position}</p>
        <span>
          <TrendingUp size={14} />
          {player.highlight}
        </span>
      </div>
      <div className="player-stats">
        {player.stats.map((stat) => (
          <small key={stat}>{stat}</small>
        ))}
      </div>
      <button className="wide-button" type="button">
        <Mail size={15} />
        Entrar em contato
      </button>
      <span className="fair-play">
        <ShieldCheck size={14} />
        Fair play {player.fairPlay}%
      </span>
    </Card>
  );
}

export default PlayerCard;
