import { Link } from "react-router-dom";
import {
  BellPlus,
  CalendarDays,
  CreditCard,
  Eye,
  HandHeart,
  Handshake,
  Plus,
  Settings,
  ShieldCheck,
  Ticket,
  Trophy,
} from "lucide-react";

import Card from "../components/Card";

const moreItems = [
  { to: "/eventos", label: "Eventos", desc: "Reservas e transmissoes", icon: Ticket },
  { to: "/olheiros", label: "Olheiros", desc: "Talentos e notas", icon: Eye },
  { to: "/impacto-social", label: "Impacto Social", desc: "ONGs e campanhas", icon: HandHeart },
  { to: "/parceiros", label: "Parceiros", desc: "Quadras, escolas e ONGs", icon: Handshake },
  { to: "/atualizacoes", label: "Atualizacoes", desc: "Novidades do app", icon: BellPlus },
  { to: "/configuracoes", label: "Configuracoes", desc: "Temas e preferencias", icon: Settings },
  { to: "/planos", label: "Planos", desc: "Jogador, Craque e Olheiro", icon: CreditCard },
];

function More({ accessRole = "jogador" }) {
  const roleItems = [
    ...moreItems,
    ...(accessRole === "craque"
      ? [
          { to: "/criar-match", label: "Criar Match", desc: "Criacao ilimitada", icon: Plus },
          { to: "/torneios", label: "Criar Torneios", desc: "Ferramentas Craque", icon: Trophy },
        ]
      : []),
    ...(accessRole === "admin" ? [{ to: "/admin", label: "Painel Admin", desc: "Controle da plataforma", icon: ShieldCheck }] : []),
  ];

  return (
    <div className="screen-stack">
      <section className="screen-heading">
        <span className="badge">Mais</span>
        <h2>Acesso rapido.</h2>
        <p>Eventos, parceiros, impacto social, atualizacoes, configuracoes e planos.</p>
      </section>

      <div className="more-grid">
        {roleItems.map((item) => {
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
        <span>2 matches, 1 live e 1 campanha solidaria esperando por voce.</span>
      </Card>
    </div>
  );
}

export default More;
