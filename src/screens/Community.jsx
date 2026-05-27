import { Lock, MessageSquareText, UsersRound } from "lucide-react";

import Card from "../components/Card";
import CommunityCard from "../components/CommunityCard";
import { posts } from "../data/mockData";

function Community() {
  return (
    <div className="screen-stack">
      <div className="screen-heading">
        <span className="badge">Rede social esportiva</span>
        <h2>Feed, resenhas, debates e grupos privados.</h2>
        <p>Conteudo esportivo para manter a comunidade viva e engajada.</p>
      </div>

      <Card className="composer-card">
        <div className="avatar">SM</div>
        <button type="button">Compartilhar lance, dúvida ou resenha...</button>
      </Card>

      {posts.map((post) => (
        <CommunityCard key={post.id} post={post} />
      ))}

      <div className="detail-grid">
        <Card>
          <h3>
            <UsersRound size={18} />
            Grupos privados
          </h3>
          <p>Times escolares, quadras da região, campeonatos Gold e fãs da NBA.</p>
        </Card>
        <Card>
          <h3>
            <Lock size={18} />
            Moderacao ativa
          </h3>
          <p>Badges, denuncias e ranking de fair play para manter o clima bom.</p>
        </Card>
      </div>

      <Card>
        <h3>
          <MessageSquareText size={18} />
          Comentarios da comunidade
        </h3>
        <div className="chat-list">
          <div className="chat-bubble">"Esse app parece pronto para lançar."</div>
          <div className="chat-bubble">"Faltava um lugar assim para organizar os matches."</div>
        </div>
      </Card>
    </div>
  );
}

export default Community;
