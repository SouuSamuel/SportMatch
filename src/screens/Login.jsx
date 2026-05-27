import { Crown, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { accessProfiles } from "../data/mockData";

const accessIcons = {
  jogador: UserRound,
  craque: Crown,
  admin: ShieldCheck,
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
        <span className="badge">
          <Sparkles size={14} />
          Login fake
        </span>
        <h1>Escolha como entrar no SportMatch.</h1>
        <p>Sem autenticacao real: a experiencia muda por perfil usando apenas estado local e localStorage.</p>
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
              <strong>{profile.label}</strong>
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
