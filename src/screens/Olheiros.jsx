import { useEffect, useRef } from "react";
import { Filter, Radar, Star } from "lucide-react";

import Card from "../components/Card";
import PlayerCard from "../components/PlayerCard";
import { players } from "../data/mockData";

function Olheiros({ onNotify }) {
  const notified = useRef(false);

  useEffect(() => {
    if (!notified.current) {
      onNotify?.("👀 Seu perfil foi visualizado por um olheiro");
      notified.current = true;
    }
  }, [onNotify]);

  return (
    <div className="screen-stack">
      <section className="detail-hero olheiro-hero">
        <span className="badge">Área dos Olheiros</span>
        <h2>Talentos ranqueados por nota, estatísticas e fair play.</h2>
        <p>Um painel visual para descobrir atletas em matches e torneios Gold.</p>
      </section>

      <div className="filter-row">
        <button type="button">
          <Filter size={15} />
          Posição
        </button>
        <button type="button">Nota 85+</button>
        <button type="button">Fair play alto</button>
      </div>

      <div className="compact-list">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <Card>
        <h3>
          <Radar size={18} />
          Radar de talentos
        </h3>
        <div className="olheiro-radar">
          <span style={{ left: "18%", top: "28%" }}>Rafa</span>
          <span style={{ left: "58%", top: "18%" }}>Bianca</span>
          <span style={{ left: "42%", top: "62%" }}>Theo</span>
          <Star size={34} />
        </div>
      </Card>
    </div>
  );
}

export default Olheiros;
