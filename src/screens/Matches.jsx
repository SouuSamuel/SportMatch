import { useMemo, useState } from "react";
import { Goal, SlidersHorizontal, Trophy, Radio } from "lucide-react";

import MatchCard from "../components/MatchCard";

const sportTabs = [
  {
    id: "futebol",
    label: "Futebol",
    icon: Goal,
    tone: "green",
    filters: ["Arenas", "Society", "Futsal"],
    match: (sport) => sport.includes("futebol") || sport.includes("futsal"),
  },
  {
    id: "basquete",
    label: "Basquete",
    icon: Trophy,
    tone: "orange",
    filters: ["Quadras", "3x3", "Streetball"],
    match: (sport) => sport.includes("basquete"),
  },
  {
    id: "volei",
    label: "Volei",
    icon: Radio,
    tone: "blue",
    filters: ["Areia", "Indoor", "Misto"],
    match: (sport) => sport.includes("volei") || sport.includes("v lei") || sport.includes("v"),
  },
];

function Matches({ matches, onJoinMatch }) {
  const [activeSport, setActiveSport] = useState("futebol");
  const currentTab = sportTabs.find((tab) => tab.id === activeSport) ?? sportTabs[0];

  const visibleMatches = useMemo(() => {
    const filtered = matches.filter((match) => currentTab.match(normalizeSport(match.sport)));
    return filtered.length ? filtered : matches;
  }, [currentTab, matches]);

  const popularMatches = [...visibleMatches].sort((a, b) => b.fill - a.fill);
  const newMatches = [...visibleMatches].reverse();

  return (
    <div className="screen-stack matches-screen" data-sport={currentTab.tone}>
      <div className="screen-heading matches-heading">
        <span className="badge">Matches abertos</span>
        <h2>Escolha por esporte e entre mais rapido.</h2>
        <p>Tabs e filtros deixam futebol, basquete e volei separados visualmente.</p>
      </div>

      <div className="sport-tabs" aria-label="Esportes">
        {sportTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              className={tab.id === activeSport ? "active" : ""}
              key={tab.id}
              type="button"
              onClick={() => setActiveSport(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <section className="sport-context-card">
        <div>
          <span className="badge">{currentTab.label}</span>
          <h3>{currentTab.label} com identidade propria.</h3>
          <p>{currentTab.filters.join(" - ")}</p>
        </div>
        <button type="button" aria-label="Filtros">
          <SlidersHorizontal size={16} />
        </button>
      </section>

      <div className="filter-row quick-filters">
        {currentTab.filters.map((filter) => (
          <button key={filter} type="button">{filter}</button>
        ))}
      </div>

      <MatchGroup title="Matches proximos" matches={visibleMatches} onJoinMatch={onJoinMatch} />
      <MatchGroup title="Mais populares" matches={popularMatches} onJoinMatch={onJoinMatch} compact />
      <MatchGroup title="Novos matches" matches={newMatches} onJoinMatch={onJoinMatch} compact />
    </div>
  );
}

function MatchGroup({ compact = false, matches, onJoinMatch, title }) {
  return (
    <section className={compact ? "match-group compact" : "match-group"}>
      <div className="section-title no-margin">
        <div>
          <Trophy size={18} />
          <h2>{title}</h2>
        </div>
      </div>
      <div className={compact ? "match-rail" : "compact-list"}>
        {matches.map((match) => (
          <MatchCard key={`${title}-${match.id}`} match={match} compact={compact} onJoinMatch={onJoinMatch} />
        ))}
      </div>
    </section>
  );
}

function normalizeSport(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default Matches;
