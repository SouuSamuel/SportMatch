import { Crown, Radar, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SportMatchLogo from "../components/SportMatchLogo";
import { accessProfiles } from "../data/mockData";

const accessIcons = {
  jogador: UserRound,
  craque: Crown,
  admin: ShieldCheck,
  olheiro: Radar,
};

function Login({ onSelectAccess }) {
  const navigate = useNavigate();

  function chooseProfile(profile) {
    onSelectAccess(profile.id);
    navigate(profile.destination, { replace: true });
  }

  return (
    <main className="login-screen">
      <section className="login-hero">
        <SportMatchLogo className="login-logo" />
        <span className="badge">
          <Sparkles size={14} />
          Arena digital
        </span>
        <h1>Entre no SportMatch.</h1>
        <p>Conecte partidas, talentos, olheiros e operacao em uma experiencia esportiva premium.</p>
      </section>

      <section className="login-role-grid" aria-label="Tipos de acesso">
        {accessProfiles.map((profile) => {
          const Icon = accessIcons[profile.id] ?? UserRound;
          return (
            <button key={profile.id} type="button" onClick={() => chooseProfile(profile)}>
              <span className="login-role-icon">
                <Icon size={24} />
              </span>
              <em>{profile.badge}</em>
              <strong>Entrar como {profile.label}</strong>
              <small>{profile.description}</small>
              <b>{profile.price}</b>
              <span className="login-role-meta">
                {profile.stats.map((item) => (
                  <i key={item}>{item}</i>
                ))}
              </span>
            </button>
          );
        })}
      </section>
    </main>
  );
}

export default Login;
