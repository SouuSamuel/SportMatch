import { HeartHandshake, LineChart, Sparkles } from "lucide-react";

import Card from "../components/Card";
import { socialImpact } from "../data/mockData";

function SocialImpact() {
  return (
    <div className="screen-stack">
      <section className="detail-hero impact-hero">
        <span className="badge gold">
          <HeartHandshake size={14} />
          Impacto Social
        </span>
        <h2>{socialImpact.slogan}</h2>
        <p>Matches e torneios solidários conectando esporte, doação e comunidade.</p>
      </section>

      <div className="impact-stat-grid">
        {socialImpact.stats.map((stat) => (
          <Card className="impact-stat" key={stat.label}>
            <span>{stat.icon}</span>
            <strong>{stat.value}</strong>
            <small>{stat.label}</small>
          </Card>
        ))}
      </div>

      <Card className="impact-chart" glow>
        <h3>
          <LineChart size={18} />
          Graficos modernos
        </h3>
        <div className="chart-bars">
          {socialImpact.bars.map((bar) => (
            <div key={bar.label}>
              <span style={{ height: `${bar.value}%` }} />
              <small>{bar.label}</small>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3>
          <Sparkles size={18} />
          ONGs parceiras
        </h3>
        <div className="sponsor-grid">
          {socialImpact.partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SocialImpact;
