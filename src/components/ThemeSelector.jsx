import { Palette } from "lucide-react";

import { themes } from "../data/mockData";

function ThemeSelector({ themeId, onThemeChange }) {
  return (
    <div className="theme-selector" aria-label="Selecionar tema visual">
      <div className="theme-label">
        <Palette size={15} />
        Tema
      </div>

      <div className="theme-options">
        {themes.map((theme) => (
          <button
            className={theme.id === themeId ? "theme-chip active" : "theme-chip"}
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            title={theme.label}
            type="button"
          >
            <span className="theme-dots" aria-hidden="true">
              {theme.colors.map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </span>
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
