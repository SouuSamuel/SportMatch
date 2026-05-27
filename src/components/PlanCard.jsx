import { CheckCircle2, Crown, Sparkles } from "lucide-react";

import Card from "./Card";

function PlanCard({ onSelectPlan, plan }) {
  const buttonLabel = plan.id === "craque" ? "Assinar Craque" : plan.id === "olheiro" ? "Conhecer Olheiro" : "Comecar gratis";

  return (
    <Card className={plan.featured ? "plan-card featured" : "plan-card"} glow={plan.featured}>
      {plan.featured && (
        <span className="plan-ribbon">
          <Crown size={14} />
          {plan.label}
        </span>
      )}
      {!plan.featured && (
        <span className="plan-ribbon subtle">
          <Sparkles size={14} />
          {plan.label}
        </span>
      )}
      <h3>{plan.name}</h3>
      <p>{plan.positioning}</p>
      <strong className="plan-price">{plan.price}</strong>
      <ul>
        {plan.benefits.map((benefit) => (
          <li key={benefit}>
            <CheckCircle2 size={15} />
            {benefit}
          </li>
        ))}
      </ul>
      <button className="wide-button" type="button" onClick={() => onSelectPlan?.(plan)}>
        {buttonLabel}
      </button>
    </Card>
  );
}

export default PlanCard;
