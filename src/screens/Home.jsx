import { Link } from "react-router-dom";
import { CalendarDays, Clapperboard, HandHeart, Medal, Sparkles, Trophy, UserPlus, Zap } from "lucide-react";

import Card from "../components/Card";
import TournamentCard from "../components/TournamentCard";
import { forYou, highlights, lobbyPlayers, socialImpact, tournaments } from "../data/mockData";

function Home({ accessRole = "jogador", matches, onJoinMatch }) {
  const nextMatch = matches[0];
  const isCraque = accessRole === "craque";

  return (
    <div className="screen-stack home-clean">
      <section className="home-smart-hero">
        <div>
          <span className={isCraque ? "badge gold" : "badge"}>{isCraque ? "Craque premium" : "Resumo inteligente"}</span>
          <h2>{isCraque ? "Matches ilimitados, torneios e stats no seu radar." : "Hoje tem jogo, comunidade e plano no seu radar."}</h2>
        </div>
        <Link className="mini-button" to="/para-voce">
          Para Voce
        </Link>
      </section>

      <section className="sport-lobby-section">
        <div className="sport-lobby-head">
          <div>
            <span className="badge gold">
              <Medal size={14} />
              Lobby SportMatch
            </span>
            <h2>Arena acesa com atletas em destaque.</h2>
            <p>Ranking semanal, MVP e convites para novos matches em um visual de arena.</p>
          </div>
          <span className="mvp-badge">MVP: Lucas "Raio"</span>
        </div>

        <div className="lobby-player-grid">
          {lobbyPlayers.map((player) => (
            <article className="lobby-player-card" data-tone={player.tone} key={player.id}>
              <div className="lobby-rank">#{player.rank}</div>
              <div className="lobby-avatar" data-pose={player.pose}>
                <span />
                <i />
              </div>
              <div className="lobby-player-copy">
                <strong>{player.name}</strong>
                <small>{player.sport} - Nota {player.rating}</small>
                <em>{player.tag}</em>
              </div>
              <div className="lobby-actions">
                <Link className="ghost-button" to="/perfil">
                  Ver perfil
                </Link>
                <button type="button" onClick={() => onJoinMatch?.(`Convite enviado para ${player.name}`)}>
                  <UserPlus size={14} />
                  Convidar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Card className={isCraque ? "access-status-card premium" : "access-status-card"}>
        <div>
          <span className={isCraque ? "badge gold" : "badge"}>{isCraque ? "Ilimitado" : "Plano Jogador"}</span>
          <h3>{isCraque ? "Criacao liberada para matches e torneios." : "Limite visual: 2 matches por semana."}</h3>
          <p>{isCraque ? "Seu perfil ganha destaque em rankings e recomendacoes." : "Assine Craque para criar sem limite e ativar estatisticas avancadas."}</p>
        </div>
        <Link className="mini-button" to={isCraque ? "/criar-match" : "/planos"}>
          {isCraque ? "Criar" : "Ver planos"}
        </Link>
      </Card>

      {nextMatch && (
        <Link className="next-match-card" to={`/match/${nextMatch.id}`}>
          <div>
            <span className="badge">
              <CalendarDays size={14} />
              Proximo match
            </span>
            <h3>{nextMatch.title}</h3>
            <p>{nextMatch.time} - {nextMatch.place}</p>
          </div>
          <strong>{nextMatch.limit - nextMatch.spots}/{nextMatch.limit}</strong>
        </Link>
      )}

      <div className="week-highlight-strip">
        <Link to="/criadores">
          <Clapperboard size={18} />
          <strong>{highlights[1].views}</strong>
          <span>highlight top</span>
        </Link>
        <Link to="/torneios">
          <Trophy size={18} />
          <strong>Gold</strong>
          <span>torneio ativo</span>
        </Link>
        <Link to="/impacto-social">
          <HandHeart size={18} />
          <strong>+2300kg</strong>
          <span>impacto</span>
        </Link>
      </div>

      <SectionHeader icon={Sparkles} title="Recomendacao personalizada" link="/para-voce" />
      <Card className="personal-pick-card" glow>
        <div>
          <span className="status">{forYou.matches[0].tag}</span>
          <h3>{forYou.matches[0].title}</h3>
          <p>{forYou.matches[0].reason}</p>
        </div>
        <Link className="mini-button" to="/para-voce">
          Abrir
        </Link>
      </Card>

      <SectionHeader icon={Clapperboard} title="Highlights da semana" link="/criadores" />
      <div className="highlight-row">
        {highlights.map((highlight) => (
          <Card className="mini-highlight-card" key={highlight.title}>
            <span className="media-thumbnail small">
              <Zap size={18} />
            </span>
            <strong>{highlight.title}</strong>
            <small>{highlight.player} - {highlight.views}</small>
          </Card>
        ))}
      </div>

      <SectionHeader icon={Trophy} title="Torneio em destaque" link="/torneios" />
      <TournamentCard tournament={tournaments[0]} />

      <Card className="impact-summary-card" glow>
        <div>
          <span className="badge gold">Impacto Social</span>
          <h3>{socialImpact.slogan}</h3>
          <p>+500 roupas doadas - +32 ONGs parceiras</p>
        </div>
        <Link className="mini-button" to="/impacto-social">
          Ver
        </Link>
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

export default Home;
