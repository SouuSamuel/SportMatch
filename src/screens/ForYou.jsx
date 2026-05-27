import { Link } from "react-router-dom";
import { CalendarDays, Clapperboard, Flame, Radio, Sparkles, Star, Trophy, Users, Zap } from "lucide-react";

import Card from "../components/Card";
import MatchCard from "../components/MatchCard";
import { forYou } from "../data/mockData";

function ForYou({ matches, onJoinMatch }) {
  const nextMatch = matches[0];

  return (
    <div className="screen-stack for-you-screen">
      <section className="for-you-hero">
        <span className="badge">
          <Sparkles size={14} />
          Para Voce
        </span>
        <h2>{forYou.headline}</h2>
        <p>{forYou.summary}</p>
        <div className="for-you-pills">
          <span>Futebol 7</span>
          <span>Sao Paulo</span>
          <span>nivel intermediario</span>
        </div>
      </section>

      {nextMatch && (
        <>
          <SectionHeader icon={Zap} title="Match recomendado" link="/matches" />
          <MatchCard match={nextMatch} compact onJoinMatch={onJoinMatch} />
        </>
      )}

      <SectionHeader icon={Flame} title="Matches para voce" link="/matches" />
      <div className="recommendation-rail">
        {forYou.matches.map((item) => (
          <Link className="recommendation-card" key={item.id} to="/matches">
            <span className="status">{item.tag}</span>
            <strong>{item.title}</strong>
            <small>{item.meta}</small>
            <em>{item.reason}</em>
          </Link>
        ))}
      </div>

      <SectionHeader icon={Clapperboard} title="Criadores recomendados" link="/criadores" />
      <div className="creator-mini-grid">
        {forYou.creators.map((creator) => (
          <Link className="creator-mini-card" key={creator.id} to="/criadores">
            <span>{creator.name.slice(0, 2).toUpperCase()}</span>
            <strong>{creator.name}</strong>
            <small>{creator.angle}</small>
            <em>{creator.followers} seguidores</em>
          </Link>
        ))}
      </div>

      <SectionHeader icon={Trophy} title="Torneios proximos" link="/torneios" />
      <div className="stacked-feed">
        {forYou.tournaments.map((item) => (
          <Link className="feed-row" key={item.id} to="/torneios">
            <Trophy size={18} />
            <div>
              <strong>{item.title}</strong>
              <small>{item.starts} - {item.heat}</small>
            </div>
          </Link>
        ))}
      </div>

      <SectionHeader icon={Radio} title="Eventos populares" link="/eventos" />
      <div className="stacked-feed">
        {forYou.events.map((item) => (
          <Link className="feed-row" key={item.id} to="/eventos">
            <CalendarDays size={18} />
            <div>
              <strong>{item.title}</strong>
              <small>{item.place} - {item.crowd}</small>
            </div>
          </Link>
        ))}
      </div>

      <Card className="players-spotlight" glow>
        <h3>
          <Users size={18} />
          Jogadores em destaque
        </h3>
        <div className="player-rank-stack">
          {forYou.players.map((player) => (
            <div key={player.id}>
              <span>
                <Star size={14} />
                {player.score}
              </span>
              <div>
                <strong>{player.name}</strong>
                <small>{player.signal}</small>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, link }) {
  return (
    <div className="section-title">
      <div>
        <Icon size={18} />
        <h2>{title}</h2>
      </div>
      {link && <Link to={link}>Ver tudo</Link>}
    </div>
  );
}

export default ForYou;
