import { Link } from "react-router-dom";
import { CalendarDays, Clapperboard, HandHeart, Sparkles, Trophy, Zap } from "lucide-react";

import Card from "../components/Card";
import TournamentCard from "../components/TournamentCard";
import { forYou, highlights, socialImpact, tournaments } from "../data/mockData";

function Home({ matches }) {
  const nextMatch = matches[0];

  return (
    <div className="screen-stack home-clean">
      <section className="home-smart-hero">
        <div>
          <span className="badge">Resumo inteligente</span>
          <h2>Hoje tem jogo, highlight e torneio no seu radar.</h2>
        </div>
        <Link className="mini-button" to="/para-voce">
          Para Voce
        </Link>
      </section>

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
            <span className="fake-thumbnail small">
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
