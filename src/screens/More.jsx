import { Link } from "react-router-dom";
import {
  BellPlus,
  CalendarDays,
  CreditCard,
  Eye,
  HandHeart,
  Settings,
  Ticket,
} from "lucide-react";

import Card from "../components/Card";

const moreItems = [
  { to: "/eventos", label: "Eventos", desc: "Reservas e transmissões", icon: Ticket },
  { to: "/olheiros", label: "Olheiros", desc: "Talentos e notas", icon: Eye },
  { to: "/impacto-social", label: "Impacto Social", desc: "ONGs e campanhas", icon: HandHeart },
  { to: "/atualizacoes", label: "Atualizações", desc: "Novidades do app", icon: BellPlus },
  { to: "/configuracoes", label: "Configurações", desc: "Temas e preferências", icon: Settings },
  { to: "/planos", label: "Planos", desc: "Jogador, Craque e Olheiro", icon: CreditCard },
];

function More() {
  return (
    <div className="screen-stack">
      <section className="screen-heading">
        <span className="badge">Mais</span>
        <h2>Acesso rápido.</h2>
        <p>Eventos, olheiros, impacto social, atualizações, configurações e planos.</p>
      </section>

      <div className="more-grid">
        {moreItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to}>
              <Card className="more-card">
                <Icon size={22} />
                <strong>{item.label}</strong>
                <span>{item.desc}</span>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="event-mini">
        <CalendarDays size={18} />
        <strong>Hoje no SportMatch</strong>
        <span>2 matches, 1 live e 1 campanha solidária esperando por você.</span>
      </Card>
    </div>
  );
}

export default More;
