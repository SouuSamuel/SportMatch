import { Building2, HandHeart, School, ShieldCheck, Trophy } from "lucide-react";

import Card from "../components/Card";
import { partners } from "../data/mockData";

const partnerIcons = {
  Arena: Trophy,
  ONG: HandHeart,
  "Escola social": School,
  Escola: School,
  Quadra: Building2,
  Patrocinador: ShieldCheck,
};

function Partners({ onNotify }) {
  return (
    <div className="screen-stack partners-screen">
      <section className="screen-heading">
        <span className="badge gold">Parceiros</span>
        <h2>Rede de quadras, escolas, ONGs e patrocinadores.</h2>
        <p>Uma camada visual para mostrar que o SportMatch opera como plataforma completa.</p>
      </section>

      <div className="partner-summary-strip">
        <span>5 categorias</span>
        <span>38 parceiros ativos</span>
        <span>+2.3t impacto social</span>
      </div>

      <div className="partner-grid">
        {partners.map((partner) => {
          const Icon = partnerIcons[partner.type] ?? Building2;
          return (
            <Card className="partner-card" key={partner.id}>
              <span className="partner-thumb">
                <Icon size={22} />
              </span>
              <div>
                <span className="badge">{partner.type}</span>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
                <strong>{partner.impact}</strong>
              </div>
              <button className="mini-button" type="button" onClick={() => onNotify?.("Parceria aberta")}>
                Ver parceria
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Partners;
