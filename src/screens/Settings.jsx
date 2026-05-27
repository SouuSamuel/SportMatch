import { Bell, Globe2, Lock, Shield, SlidersHorizontal, Trophy } from "lucide-react";

import Card from "../components/Card";
import SportMatchLogo from "../components/SportMatchLogo";
import ThemeSelector from "../components/ThemeSelector";
import { themes } from "../data/mockData";

function Settings({ themeId, onThemeChange }) {
  return (
    <div className="screen-stack">
      <section className="screen-heading">
        <span className="badge">Perfil • Configurações</span>
        <h2>Temas e preferências</h2>
        <p>Personalize o visual do SportMatch e seus recursos de produto.</p>
      </section>

      <Card className="settings-brand-card" glow>
        <SportMatchLogo />
        <p>Identidade premium para arena, matches e descoberta de talentos.</p>
      </Card>

      <Card className="settings-card" glow>
        <h3>
          <SlidersHorizontal size={18} />
          Temas do app
        </h3>
        <ThemeSelector themeId={themeId} onThemeChange={onThemeChange} />
        <div className="theme-preview-grid">
          {themes.map((theme) => (
            <button
              className={theme.id === themeId ? "theme-preview active" : "theme-preview"}
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              type="button"
            >
              <span className="preview-surface" style={{ "--c1": theme.colors[0], "--c2": theme.colors[1], "--c3": theme.colors[2] }}>
                <i />
                <b />
              </span>
              <strong>{theme.name}</strong>
              <small>{theme.label}</small>
            </button>
          ))}
        </div>
      </Card>

      <Card className="settings-list">
        <SettingRow icon={Bell} label="Notificacoes" value="Matches, torneios e olheiros" enabled />
        <SettingRow icon={Lock} label="Privacidade" value="Perfil visivel para olheiros" enabled />
        <SettingRow icon={Globe2} label="Idioma" value="Portugues Brasil" />
        <SettingRow icon={Trophy} label="Modo competitivo" value="Ranking e MVP ativados" enabled />
        <SettingRow icon={Shield} label="Preferências do usuário" value="Fair play em destaque" enabled />
      </Card>
    </div>
  );
}

function SettingRow({ icon: Icon, label, value, enabled = false }) {
  return (
    <div className="setting-row">
      <span>
        <Icon size={18} />
      </span>
      <div>
        <strong>{label}</strong>
        <small>{value}</small>
      </div>
      <button className={enabled ? "setting-toggle on" : "setting-toggle"} type="button" aria-label={label}>
        <i />
      </button>
    </div>
  );
}

export default Settings;
