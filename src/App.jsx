import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Plus } from "lucide-react";

import BottomNavigation from "./components/BottomNavigation";
import DesktopExperience from "./components/DesktopExperience";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Toast from "./components/Toast";
import AdminPanel from "./screens/AdminPanel";
import Community from "./screens/Community";
import CreateMatch from "./screens/CreateMatch";
import Creators from "./screens/Creators";
import Events from "./screens/Events";
import ForYou from "./screens/ForYou";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SocialImpact from "./screens/SocialImpact";
import MatchDetails from "./screens/MatchDetails";
import Matches from "./screens/Matches";
import More from "./screens/More";
import Partners from "./screens/Partners";
import Plans from "./screens/Plans";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Olheiros from "./screens/Olheiros";
import TournamentDetails from "./screens/TournamentDetails";
import Tournaments from "./screens/Tournaments";
import Updates from "./screens/Updates";
import { accessProfiles, matches as initialMatches, themes } from "./data/mockData";

function App() {
  const [themeId, setThemeId] = useState("copa");
  const [matches, setMatches] = useState(initialMatches);
  const [toast, setToast] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [accessRole, setAccessRole] = useState(() => window.localStorage.getItem("sportmatch-access") || "");
  const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];
  const activeAccess = accessProfiles.find((profile) => profile.id === accessRole);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  function notify(message) {
    setToast(message);
    window.clearTimeout(window.sportMatchToastTimer);
    window.sportMatchToastTimer = window.setTimeout(() => setToast(""), 2400);
  }

  function selectAccess(nextRole) {
    window.localStorage.setItem("sportmatch-access", nextRole);
    setAccessRole(nextRole);
    notify(`Acesso ${accessProfiles.find((profile) => profile.id === nextRole)?.label ?? "SportMatch"} ativado`);
  }

  function resetAccess() {
    window.localStorage.removeItem("sportmatch-access");
    setAccessRole("");
  }

  function createMatch(match) {
    setMatches((current) => [match, ...current]);
    notify("Match criado com sucesso");
  }

  if (!accessRole) {
    return (
      <BrowserRouter>
        <div className="page-stage login-stage" data-theme={activeTheme.id}>
          <Routes>
            <Route path="/login" element={<Login onSelectAccess={selectAccess} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toast message={toast} />
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="page-stage" data-theme={activeTheme.id} data-access={accessRole}>
        <DesktopExperience
          accessRole={accessRole}
          activeAccess={activeAccess}
          matches={matches}
          themeId={themeId}
          onResetAccess={resetAccess}
          onThemeChange={(nextTheme) => {
            setThemeId(nextTheme);
            notify("Tema atualizado");
          }}
          onNotify={notify}
        />

        <div className="desktop-splash-wrap">
          <SplashScreen visible={showSplash} />
        </div>

        <div className="mobile-experience phone-frame">
          <Navbar activeAccess={activeAccess} onResetAccess={resetAccess} />
          <Header activeAccess={activeAccess} accessRole={accessRole} />

          <main className="app-content">
            <Routes>
              <Route path="/login" element={<Navigate to={accessRole === "admin" ? "/admin" : "/"} replace />} />
              <Route path="/" element={<Home accessRole={accessRole} matches={matches} onJoinMatch={notify} />} />
              <Route path="/para-voce" element={<ForYou matches={matches} onJoinMatch={notify} />} />
              <Route path="/matches" element={<Matches matches={matches} onJoinMatch={notify} />} />
              <Route path="/match/:id" element={<MatchDetails matches={matches} onNotify={notify} />} />
              <Route path="/criar-match" element={<CreateMatch accessRole={accessRole} onCreateMatch={createMatch} />} />
              <Route path="/torneios" element={<Tournaments accessRole={accessRole} onNotify={notify} />} />
              <Route path="/torneio/:id" element={<TournamentDetails onNotify={notify} />} />
              <Route path="/eventos" element={<Events onNotify={notify} />} />
              <Route path="/comunidade" element={<Community />} />
              <Route path="/criadores" element={<Creators onNotify={notify} />} />
              <Route path="/olheiros" element={<Olheiros onNotify={notify} />} />
              <Route path="/parceiros" element={<Partners onNotify={notify} />} />
              <Route path="/admin" element={<AdminPanel onNotify={notify} />} />
              <Route path="/impacto-social" element={<SocialImpact />} />
              <Route path="/atualizacoes" element={<Updates />} />
              <Route path="/mais" element={<More accessRole={accessRole} />} />
              <Route path="/perfil" element={<Profile accessRole={accessRole} />} />
              <Route
                path="/configuracoes"
                element={
                  <Settings
                    themeId={themeId}
                    onThemeChange={(nextTheme) => {
                      setThemeId(nextTheme);
                      notify("Tema atualizado");
                    }}
                  />
                }
              />
              <Route path="/planos" element={<Plans onNotify={notify} />} />
              <Route path="*" element={<Navigate to={accessRole === "admin" ? "/admin" : "/"} replace />} />
            </Routes>
          </main>

          {accessRole !== "admin" && (
            <Link className="floating-action" to="/criar-match" aria-label="Criar match">
              <Plus size={24} />
            </Link>
          )}

          <Toast message={toast} />
          <SplashScreen visible={showSplash} />
          <BottomNavigation accessRole={accessRole} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
