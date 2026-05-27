import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  Clapperboard,
  Crown,
  Eye,
  Goal,
  HeartHandshake,
  LayoutDashboard,
  MapPin,
  Play,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Tv,
  Trophy,
  Users,
  Video,
} from "lucide-react";

import ThemeSelector from "./ThemeSelector";
import {
  creators,
  forYou,
  posts,
  progression,
  quickStats,
  socialImpact,
  smartNotifications,
  tournaments,
  updates,
} from "../data/mockData";

const sidebarItems = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/matches", label: "Matches", icon: Radio },
  { to: "/torneios", label: "Torneios", icon: Crown },
  { to: "/criadores", label: "Criadores", icon: Clapperboard },
  { to: "/comunidade", label: "Comunidade", icon: Users },
  { to: "/impacto-social", label: "Impacto Social", icon: HeartHandshake },
  { to: "/atualizacoes", label: "Atualizacoes", icon: Sparkles },
];

const sportTabs = [
  {
    id: "futebol",
    label: "Futebol",
    icon: Goal,
    tone: "green",
    filters: ["Arenas", "Society", "Futsal"],
    match: (sport) => sport.toLowerCase().includes("futebol") || sport.toLowerCase().includes("futsal"),
  },
  {
    id: "basquete",
    label: "Basquete",
    icon: Trophy,
    tone: "orange",
    filters: ["Quadras", "3x3", "Streetball"],
    match: (sport) => sport.toLowerCase().includes("basquete"),
  },
  {
    id: "volei",
    label: "Volei",
    icon: Radio,
    tone: "blue",
    filters: ["Areia", "Indoor", "Misto"],
    match: (sport) => sport.toLowerCase().includes("v") || sport.toLowerCase().includes("volei"),
  },
];

const routeMeta = {
  "/": ["Home", "Visao limpa dos sinais mais importantes do SportMatch."],
  "/matches": ["Matches", "Partidas organizadas por esporte, status e popularidade."],
  "/torneios": ["Torneios", "Competicoes em destaque com status, formato e MVP."],
  "/criadores": ["Criadores", "Canais, lives e rankings da comunidade esportiva."],
  "/comunidade": ["Comunidade", "Conversas, posts e grupos ativos."],
  "/impacto-social": ["Impacto Social", "Campanhas, doacoes e parceiros."],
  "/atualizacoes": ["Atualizacoes", "Alertas inteligentes e roadmap do produto."],
};

const liveFeed = [
  "Arena Norte fechou 11/14 atletas",
  "Olheiro favoritou Rafa Oliveira",
  "Festival Solidario atualizou meta",
  "Live da final entrou em destaque",
];

function DesktopExperience({ matches, themeId, onThemeChange, onNotify }) {
  const location = useLocation();
  const [pulse, setPulse] = useState(0);
  const [activeSport, setActiveSport] = useState("futebol");
  const [title, description] = getRouteMeta(location.pathname);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulse((current) => (current + 1) % liveFeed.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const desktopStats = useMemo(
    () => [
      ...quickStats,
      { label: "Retencao semanal", value: "71%" },
      { label: `Nivel ${progression.level}`, value: `${progression.xp} XP` },
    ],
    [],
  );

  return (
    <section className="desktop-experience" aria-label="Desktop SportMatch">
      <aside className="desktop-sidebar">
        <Link className="desktop-brand" to="/">
          <span>
            <Activity size={28} />
          </span>
          <div>
            <strong>SportMatch</strong>
            <small>Sports app</small>
          </div>
        </Link>

        <nav className="desktop-menu" aria-label="Menu desktop">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="desktop-scout-card">
          <span className="badge">Progresso</span>
          <h3>Nivel {progression.level}</h3>
          <p>{progression.streak}</p>
          <div className="desktop-progress">
            <span style={{ width: `${(progression.xp / progression.nextLevelXp) * 100}%` }} />
          </div>
        </div>
      </aside>

      <div className="desktop-main">
        <header className="desktop-topbar">
          <div>
            <span className="desktop-live-pill">
              <Radio size={15} />
              {liveFeed[pulse]}
            </span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className="desktop-search">
            <Search size={18} />
            <span>Buscar matches, atletas, torneios e criadores</span>
          </div>

          <ThemeSelector themeId={themeId} onThemeChange={onThemeChange} />

          <button className="desktop-bell" type="button" onClick={() => onNotify(smartNotifications[pulse]?.title)}>
            <Bell size={18} />
            <span>4</span>
          </button>
        </header>

        <main className="desktop-dashboard">
          <DesktopView
            activeSport={activeSport}
            desktopStats={desktopStats}
            matches={matches}
            onNotify={onNotify}
            onSportChange={setActiveSport}
            pathname={location.pathname}
          />
        </main>
      </div>
    </section>
  );
}

function DesktopView({ activeSport, desktopStats, matches, onNotify, onSportChange, pathname }) {
  if (pathname.startsWith("/matches") || pathname.startsWith("/match/")) {
    return <DesktopMatches matches={matches} activeSport={activeSport} onSportChange={onSportChange} />;
  }

  if (pathname.startsWith("/torneios") || pathname.startsWith("/torneio/")) {
    return <DesktopTournaments />;
  }

  if (pathname === "/criadores") {
    return <DesktopCreators onNotify={onNotify} />;
  }

  if (pathname === "/comunidade") {
    return <DesktopCommunity />;
  }

  if (pathname === "/impacto-social") {
    return <DesktopImpact />;
  }

  if (pathname === "/atualizacoes") {
    return <DesktopUpdates />;
  }

  return <DesktopHome desktopStats={desktopStats} matches={matches} />;
}

function DesktopHome({ desktopStats, matches }) {
  return (
    <div className="desktop-view desktop-home-view">
      <section className="desktop-focus-card">
        <div>
          <span className="desktop-live-pill">
            <Sparkles size={15} />
            Para Voce
          </span>
          <h2>Proximo match, conteudo quente e impacto em um so lugar.</h2>
          <p>{forYou.summary}</p>
        </div>
        <Link className="primary-button" to="/matches">
          Abrir Matches
          <ChevronRight size={18} />
        </Link>
      </section>

      <section className="desktop-stat-grid compact">
        {desktopStats.map((stat, index) => (
          <article className="desktop-stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>+{12 + index * 4}% vs semana anterior</small>
          </article>
        ))}
      </section>

      <section className="desktop-two-column">
        <article className="desktop-panel">
          <PanelTitle icon={Radio} title="Matches proximos" action="Foco" />
          <div className="desktop-list">
            {matches.slice(0, 3).map((match) => (
              <Link key={match.id} to={`/match/${match.id}`}>
                <span className="status">{match.sport}</span>
                <strong>{match.title}</strong>
                <small>{match.place} - {match.time}</small>
              </Link>
            ))}
          </div>
        </article>

        <article className="desktop-panel">
          <PanelTitle icon={Clapperboard} title="Highlights e criadores" action="Media" />
          <div className="desktop-list">
            {creators.slice(0, 3).map((creator) => (
              <Link key={creator.id} to="/criadores">
                <span className="status">{creator.live ? "Live" : "Canal"}</span>
                <strong>{creator.title}</strong>
                <small>{creator.views} - {creator.followers} seguidores</small>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function DesktopMatches({ matches, activeSport, onSportChange }) {
  const currentTab = sportTabs.find((tab) => tab.id === activeSport) ?? sportTabs[0];
  const filteredMatches = matches.filter((match) => currentTab.match(match.sport));
  const visibleMatches = filteredMatches.length ? filteredMatches : matches;

  return (
    <div className="desktop-view desktop-matches-view" data-sport={currentTab.tone}>
      <section className="desktop-match-tabs" aria-label="Esportes">
        {sportTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              className={tab.id === currentTab.id ? "active" : ""}
              key={tab.id}
              type="button"
              onClick={() => onSportChange(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </section>

      <section className="desktop-sport-hero">
        <div>
          <span className="badge">{currentTab.label}</span>
          <h2>{currentTab.label} organizado por contexto de jogo.</h2>
          <p>{currentTab.filters.join(" - ")} - filtros rapidos para reduzir ruido.</p>
        </div>
        <div className="sport-filter-pills">
          {currentTab.filters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
      </section>

      <section className="desktop-match-columns">
        <MatchColumn title="Matches proximos" matches={visibleMatches.slice(0, 3)} />
        <MatchColumn title="Mais populares" matches={[...visibleMatches].sort((a, b) => b.fill - a.fill).slice(0, 3)} />
        <MatchColumn title="Novos matches" matches={[...visibleMatches].reverse().slice(0, 3)} />
      </section>
    </div>
  );
}

function MatchColumn({ title, matches }) {
  return (
    <article className="desktop-panel match-column">
      <PanelTitle icon={CalendarDays} title={title} action={`${matches.length} cards`} />
      <div className="desktop-match-stack">
        {matches.map((match) => (
          <Link className="desktop-match-card" key={`${title}-${match.id}`} to={`/match/${match.id}`}>
            <div>
              <span className="status">{match.status}</span>
              <strong>{match.title}</strong>
            </div>
            <small>
              <MapPin size={14} />
              {match.place} - {match.time}
            </small>
            <div className="desktop-progress">
              <span style={{ width: `${match.fill}%` }} />
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}

function DesktopTournaments() {
  return (
    <div className="desktop-view">
      <section className="desktop-table-panel">
        <PanelTitle icon={Trophy} title="Torneios em destaque" action="3 competicoes" />
        <div className="desktop-table">
          <div className="desktop-table-head">
            <span>Torneio</span>
            <span>Status</span>
            <span>Formato</span>
            <span>MVP</span>
          </div>
          {tournaments.map((tournament) => (
            <Link className="desktop-table-row" key={tournament.id} to={`/torneio/${tournament.id}`}>
              <span>
                <strong>{tournament.title}</strong>
                <small>{tournament.sport}</small>
              </span>
              <span>{tournament.status}</span>
              <span>{tournament.format}</span>
              <span>{tournament.mvp}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function DesktopCreators({ onNotify }) {
  const liveCreators = creators.filter((creator) => creator.live);

  return (
    <div className="desktop-view desktop-creators-view">
      <section className="desktop-match-columns">
        <article className="desktop-panel desktop-live-panel">
          <PanelTitle icon={Radio} title="Lives agora" action="Ao vivo" />
          <div className="desktop-creator-live-list">
            {liveCreators.map((creator, index) => (
              <button key={creator.id} type="button" onClick={() => onNotify("Live fake aberta")}>
                <span className="desktop-live-thumb" data-tone={index % 2 === 0 ? "green" : "blue"}>
                  <Play size={16} />
                </span>
                <span>
                  <em className="status">Live</em>
                  <strong>{creator.creator}</strong>
                  <small>{creator.views} assistindo</small>
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className="desktop-panel desktop-panel-wide desktop-media-panel">
          <PanelTitle icon={Clapperboard} title="Canais, lives e reacts" action="Media" />
          <div className="desktop-creator-card-grid">
            {creators.map((creator, index) => (
              <button
                className={creator.live ? "desktop-creator-card is-live" : "desktop-creator-card"}
                key={creator.id}
                type="button"
                onClick={() => onNotify(creator.live ? "Live fake aberta" : "Preview do canal aberto")}
              >
                <span className="desktop-creator-thumb" data-tone={["green", "red", "blue", "gold"][index % 4]}>
                  {creator.live ? <Radio size={18} /> : creator.type.toLowerCase().includes("react") ? <Video size={18} /> : <Tv size={18} />}
                  {creator.live && <em>LIVE</em>}
                </span>
                <span className="desktop-creator-copy">
                  <em className="status">{creator.live ? "Live" : creator.type.toLowerCase().includes("react") ? "React" : "Canal"}</em>
                  <strong>{creator.title}</strong>
                  <small>
                    <Eye size={13} />
                    {creator.views} - {creator.creator}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className="desktop-panel desktop-panel-wide desktop-ranking-panel">
          <PanelTitle icon={Trophy} title="Ranking de criadores" action="Top canais" />
          <div className="creator-ranking-list desktop-ranking">
            {creators.map((creator) => (
              <div key={creator.id}>
                <b>#{creator.rank}</b>
                <span>
                  <strong>{creator.creator}</strong>
                  <small>{creator.followers} seguidores - {creator.topVideo}</small>
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function DesktopCommunity() {
  return (
    <div className="desktop-view">
      <section className="desktop-match-columns">
        {posts.map((post) => (
          <article className="desktop-panel community-desktop-card" key={post.id}>
            <span className="badge">{post.group}</span>
            <h2>{post.author}</h2>
            <p>{post.text}</p>
            <small>{post.likes} curtidas - {post.comments} comentarios</small>
          </article>
        ))}
      </section>
    </div>
  );
}

function DesktopImpact() {
  return (
    <div className="desktop-view">
      <section className="desktop-focus-card impact">
        <div>
          <span className="badge gold">Impacto Social</span>
          <h2>{socialImpact.slogan}</h2>
          <p>Resumo de campanhas para mostrar valor social sem sobrecarregar a Home.</p>
        </div>
      </section>
      <section className="impact-desktop-grid spacious">
        {socialImpact.stats.map((stat) => (
          <div key={stat.label}>
            <span>{stat.icon}</span>
            <strong>{stat.value}</strong>
            <small>{stat.label}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

function DesktopUpdates() {
  return (
    <div className="desktop-view">
      <section className="desktop-two-column">
        <article className="desktop-panel">
          <PanelTitle icon={Bell} title="Notificacoes inteligentes" action="4 novas" />
          <div className="notification-stack">
            {smartNotifications.map((item) => (
              <button className="desktop-notification active" key={item.id} type="button">
                <span />
                {item.title}
              </button>
            ))}
          </div>
        </article>
        <article className="desktop-panel desktop-panel-wide">
          <PanelTitle icon={ShieldCheck} title="Roadmap do produto" action="Atualizacoes" />
          <div className="updates-strip">
            {updates.slice(0, 4).map((update) => (
              <div key={update.id}>
                <span>{update.tag}</span>
                <strong>{update.title}</strong>
                <small>{update.description}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function PanelTitle({ icon: Icon, title, action }) {
  return (
    <div className="desktop-panel-title">
      <div>
        <Icon size={18} />
        <h2>{title}</h2>
      </div>
      <span>
        {action}
        <ChevronRight size={15} />
      </span>
    </div>
  );
}

function getRouteMeta(pathname) {
  if (pathname.startsWith("/match/")) {
    return routeMeta["/matches"];
  }

  if (pathname.startsWith("/torneio/")) {
    return routeMeta["/torneios"];
  }

  return routeMeta[pathname] ?? routeMeta["/"];
}

export default DesktopExperience;
