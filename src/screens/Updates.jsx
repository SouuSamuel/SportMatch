import { BellPlus, ChevronRight, Sparkles } from "lucide-react";

import Card from "../components/Card";
import { smartNotifications, updates } from "../data/mockData";

function Updates() {
  return (
    <div className="screen-stack">
      <section className="screen-heading">
        <span className="badge">Atualizacoes</span>
        <h2>Novidades e sinais inteligentes.</h2>
        <p>Alertas, roadmap e mensagens fake que deixam o app vivo sem poluir a Home.</p>
      </section>

      <Card className="update-featured" glow>
        <BellPlus size={24} />
        <div>
          <h3>Central inteligente</h3>
          <p>Notificacoes personalizadas para discovery, progresso e social proof.</p>
        </div>
      </Card>

      <div className="smart-notification-list">
        {smartNotifications.map((notification) => (
          <Card className="smart-notification-card" key={notification.id}>
            <span>{notification.time}</span>
            <div>
              <strong>{notification.title}</strong>
              <p>{notification.detail}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="compact-list">
        {updates.map((update) => (
          <Card className="update-card" key={update.id}>
            <span className="badge">{update.tag}</span>
            <h3>{update.title}</h3>
            <p>{update.description}</p>
            <ChevronRight size={18} />
          </Card>
        ))}
      </div>

      <Card className="revenue-card">
        <h3>
          <Sparkles size={18} />
          Em construcao
        </h3>
        <p>Ranking por cidade, lives de criadores, torneios solidarios e novas areas para olheiros.</p>
      </Card>
    </div>
  );
}

export default Updates;
