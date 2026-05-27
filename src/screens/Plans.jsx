import { Crown, Sparkles } from "lucide-react";

import Card from "../components/Card";
import PlanCard from "../components/PlanCard";
import { plans } from "../data/mockData";

function Plans({ onNotify }) {
  return (
    <div className="screen-stack plans-screen">
      <section className="detail-hero plans-hero">
        <span className="badge gold">
          <Crown size={14} />
          Planos SportMatch
        </span>
        <h2>Compare acessos e escolha a experiencia ideal.</h2>
        <p>Jogador gratuito, Craque premium e Olheiro profissional em uma vitrine de SaaS esportivo.</p>
      </section>

      <div className="plan-trigger-strip">
        <span>Jogador gratuito: 2 matches/semana</span>
        <span>Mais popular: Craque</span>
        <span>Profissional: Olheiro</span>
      </div>

      <div className="plan-comparison-grid">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelectPlan={() => onNotify?.(plan.id === "craque" ? "Plano Craque selecionado" : "Plano selecionado")}
          />
        ))}
      </div>

      <Card className="revenue-card" glow>
        <h3>
          <Sparkles size={18} />
          Ideia de pitch
        </h3>
        <p>
          O SportMatch pode crescer com assinaturas, destaque de torneios, badges premium, videos e ferramentas para
          olheiros.
        </p>
      </Card>
    </div>
  );
}

export default Plans;
