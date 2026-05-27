import { Crown, Sparkles } from "lucide-react";

import Card from "../components/Card";
import PlanCard from "../components/PlanCard";
import { plans } from "../data/mockData";

function Plans() {
  return (
    <div className="screen-stack">
      <section className="detail-hero plans-hero">
        <span className="badge gold">
          <Crown size={14} />
          Monetização MVP
        </span>
        <h2>Planos com valor claro para cada tipo de usuario.</h2>
        <p>Mais destaque, ferramentas profissionais e sensacao premium sem pesar a tela.</p>
      </section>

      <div className="plan-trigger-strip">
        <span>Mais popular: Craque</span>
        <span>Recomendado para atletas ativos</span>
        <span>Profissional: Olheiro</span>
      </div>

      <div className="compact-list">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Card className="revenue-card" glow>
        <h3>
          <Sparkles size={18} />
          Ideia de pitch
        </h3>
        <p>
          O SportMatch pode crescer com assinaturas, destaque de torneios, badges
          premium, vídeos e ferramentas para olheiros.
        </p>
      </Card>
    </div>
  );
}

export default Plans;
