import { NavLink } from "react-router-dom";
import { BellPlus, ClipboardList, Handshake, Home, Menu, Radio, ShieldAlert, Sparkles, UserRound, Users } from "lucide-react";

const playerItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/matches", label: "Matches", icon: Radio },
  { to: "/comunidade", label: "Comun.", icon: Users },
  { to: "/perfil", label: "Perfil", icon: UserRound },
  { to: "/planos", label: "Planos", icon: Sparkles },
  { to: "/mais", label: "Mais", icon: Menu },
];

const craqueItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/para-voce", label: "Para Voce", icon: Sparkles },
  { to: "/matches", label: "Matches", icon: Radio },
  { to: "/comunidade", label: "Comun.", icon: Users },
  { to: "/perfil", label: "Perfil", icon: UserRound },
  { to: "/mais", label: "Mais", icon: Menu },
];

const adminItems = [
  { to: "/admin", label: "Admin", icon: ClipboardList },
  { to: "/parceiros", label: "Parceiros", icon: Handshake },
  { to: "/atualizacoes", label: "Alertas", icon: BellPlus },
  { to: "/comunidade", label: "Reports", icon: ShieldAlert },
  { to: "/mais", label: "Mais", icon: Menu },
];

const scoutItems = [
  { to: "/olheiros", label: "Radar", icon: ShieldAlert },
  { to: "/", label: "Home", icon: Home },
  { to: "/matches", label: "Matches", icon: Radio },
  { to: "/perfil", label: "Perfil", icon: UserRound },
  { to: "/mais", label: "Mais", icon: Menu },
];

function BottomNavigation({ accessRole = "jogador" }) {
  const items = accessRole === "admin" ? adminItems : accessRole === "olheiro" ? scoutItems : accessRole === "craque" ? craqueItems : playerItems;

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
