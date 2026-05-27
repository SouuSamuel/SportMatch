import { NavLink } from "react-router-dom";
import { BellPlus, Clapperboard, Home, Menu, Sparkles, UserRound, Users } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/para-voce", label: "Para Voce", icon: Sparkles },
  { to: "/criadores", label: "Criadores", icon: Clapperboard },
  { to: "/comunidade", label: "Comun.", icon: Users },
  { to: "/perfil", label: "Perfil", icon: UserRound },
  { to: "/atualizacoes", label: "Updates", icon: BellPlus },
  { to: "/mais", label: "Mais", icon: Menu },
];

function BottomNavigation() {
  return (
    <nav className="bottom-navigation" aria-label="Menu inferior">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.to} to={item.to}>
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
