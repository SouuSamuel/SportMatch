import { Link } from "react-router-dom";
import { Award, CalendarDays, Flame, Medal, Settings, ShieldCheck, Star, Zap } from "lucide-react";

import Card from "../components/Card";
import { profile, progression } from "../data/mockData";

function Profile() {
  return (
    <div className="screen-stack">
      <section className="profile-card-main">
        <div className="profile-photo">{profile.photo}</div>
        <div>
          <span className="badge">Atleta verificado</span>
          <h2>{profile.name}</h2>
          <p>{profile.role} • {profile.city}</p>
          <Link className="mini-button profile-settings-link" to="/configuracoes">
            <Settings size={14} />
            Configurações
          </Link>
        </div>
      </section>

      <Card className="profile-view-card">
        <h3>Perfil visualizado por um olheiro</h3>
        <p>Seu perfil recebeu 3 visitas profissionais nesta semana.</p>
      </Card>

      <Card className="progression-card" glow>
        <div className="progression-head">
          <span className="level-badge">
            <Zap size={16} />
            Nivel {progression.level}
          </span>
          <strong>{progression.headline}</strong>
        </div>
        <div className="progress-bar xp-bar">
          <span style={{ width: `${(progression.xp / progression.nextLevelXp) * 100}%` }} />
        </div>
        <div className="progression-meta">
          <span>{progression.xp}/{progression.nextLevelXp} XP</span>
          <span>
            <Flame size={14} />
            {progression.streak}
          </span>
        </div>
        <p>{progression.unlocked}</p>
      </Card>

      <div className="stat-strip">
        <Card className="mini-stat">
          <strong>{profile.rating}</strong>
          <span>Nota geral</span>
        </Card>
        <Card className="mini-stat">
          <strong>{profile.fairPlay}%</strong>
          <span>Fair play</span>
        </Card>
        <Card className="mini-stat">
          <strong>{profile.achievements.length}</strong>
          <span>Conquistas</span>
        </Card>
      </div>

      <Card>
        <h3>
          <Star size={18} />
          Esportes favoritos
        </h3>
        <div className="player-cloud">
          {profile.sports.map((sport) => (
            <span key={sport}>{sport}</span>
          ))}
        </div>
      </Card>

      <Card>
        <h3>
          <ShieldCheck size={18} />
          Estatísticas
        </h3>
        <div className="profile-stats">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3>
          <CalendarDays size={18} />
          Histórico de partidas
        </h3>
        <div className="match-results">
          {profile.history.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </Card>

      <Card>
        <h3>
          <Award size={18} />
          Conquistas
        </h3>
        <div className="sponsor-grid achievements">
          {progression.badges.map((item) => (
            <span key={item.title}>
              <Medal size={14} />
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Profile;
