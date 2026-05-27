import { useState } from "react";
import { BarChart3, Clapperboard, Eye, Heart, MessageCircle, Play, Radio, Trophy, UserPlus } from "lucide-react";

import Card from "../components/Card";
import { creators } from "../data/mockData";

function Creators({ onNotify }) {
  const liveCreators = creators.filter((creator) => creator.live);

  return (
    <div className="screen-stack creators-hub">
      <section className="screen-heading creators-heading">
        <span className="badge">Criadores</span>
        <h2>Canais, lives, reacts e analises esportivas.</h2>
        <p>Conteudo curto e ao vivo para dar ritmo de comunidade ao SportMatch.</p>
      </section>

      <div className="creator-stats-strip">
        <span>
          <Radio size={16} />
          {liveCreators.length} lives
        </span>
        <span>
          <Eye size={16} />
          46.6k views
        </span>
        <span>
          <Trophy size={16} />
          ranking semanal
        </span>
      </div>

      <section className="live-now-panel">
        <div className="section-title no-margin">
          <div>
            <Radio size={18} />
            <h2>Ao vivo agora</h2>
          </div>
        </div>
        <div className="live-rail">
          {liveCreators.map((creator) => (
            <button key={creator.id} type="button" onClick={() => onNotify?.("Entrando na live")}>
              <span>
                <Play size={18} />
              </span>
              <strong>{creator.creator}</strong>
              <small>{creator.views}</small>
            </button>
          ))}
        </div>
      </section>

      <Card className="creator-ranking-card" glow>
        <h3>
          <BarChart3 size={18} />
          Ranking de criadores
        </h3>
        <div className="creator-ranking-list">
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
      </Card>

      <div className="compact-list">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} onNotify={onNotify} />
        ))}
      </div>
    </div>
  );
}

function CreatorCard({ creator, onNotify }) {
  const [likes, setLikes] = useState(42 + creator.rank * 11);
  const [comments, setComments] = useState(8 + creator.rank);

  return (
    <Card className="creator-card" glow={creator.live}>
      <div className={creator.live ? "creator-media live" : "creator-media"}>
        <Clapperboard size={26} />
        <span>{creator.type}</span>
        {creator.live && <em>LIVE</em>}
      </div>
      <div className="card-row">
        <div>
          <span className="badge">{creator.creator}</span>
          <h3>{creator.title}</h3>
        </div>
        <small>{creator.views}</small>
      </div>
      <p>{creator.description}</p>
      <div className="creator-metrics">
        <span>{creator.followers} seguidores</span>
        <span>Top video: {creator.topVideo}</span>
      </div>
      <div className="creator-actions">
        <button onClick={() => onNotify?.("Voce comecou a seguir este criador")} type="button">
          <UserPlus size={15} />
          Seguir
        </button>
        <button
          onClick={() => {
            setLikes((current) => current + 1);
            onNotify?.("Video curtido");
          }}
          type="button"
        >
          <Heart size={15} />
          {likes}
        </button>
        <button onClick={() => onNotify?.("Live aberta")} type="button">
          <Radio size={15} />
          Live
        </button>
        <button onClick={() => setComments((current) => current + 1)} type="button">
          <MessageCircle size={15} />
          {comments}
        </button>
      </div>
    </Card>
  );
}

export default Creators;
