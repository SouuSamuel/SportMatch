import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Plus } from "lucide-react";

import BottomNavigation from "./components/BottomNavigation";
import DesktopExperience from "./components/DesktopExperience";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Toast from "./components/Toast";
import Community from "./screens/Community";
import CreateMatch from "./screens/CreateMatch";
import Creators from "./screens/Creators";
import Events from "./screens/Events";
import ForYou from "./screens/ForYou";
import Home from "./screens/Home";
import SocialImpact from "./screens/SocialImpact";
import MatchDetails from "./screens/MatchDetails";
import Matches from "./screens/Matches";
import More from "./screens/More";
import Plans from "./screens/Plans";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import Olheiros from "./screens/Olheiros";
import TournamentDetails from "./screens/TournamentDetails";
import Tournaments from "./screens/Tournaments";
import Updates from "./screens/Updates";
import { matches as initialMatches, themes } from "./data/mockData";

function App() {
  const [themeId, setThemeId] = useState("copa");
  const [matches, setMatches] = useState(initialMatches);
  const [toast, setToast] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const activeTheme = themes.find((theme) => theme.id === themeId) ?? themes[0];

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  function notify(message) {
    setToast(message);
    window.clearTimeout(window.sportMatchToastTimer);
    window.sportMatchToastTimer = window.setTimeout(() => setToast(""), 2400);
  }

  function createMatch(match) {
    setMatches((current) => [match, ...current]);
    notify("✅ Match criado com sucesso");
  }

  return (
    <BrowserRouter>
      <div className="page-stage" data-theme={activeTheme.id}>
        <DesktopExperience
          matches={matches}
          themeId={themeId}
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
          <Navbar />
          <Header />

          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home matches={matches} onJoinMatch={notify} />} />
              <Route path="/para-voce" element={<ForYou matches={matches} onJoinMatch={notify} />} />
              <Route path="/matches" element={<Matches matches={matches} onJoinMatch={notify} />} />
              <Route path="/match/:id" element={<MatchDetails matches={matches} onNotify={notify} />} />
              <Route path="/criar-match" element={<CreateMatch onCreateMatch={createMatch} />} />
              <Route path="/torneios" element={<Tournaments onNotify={notify} />} />
              <Route path="/torneio/:id" element={<TournamentDetails onNotify={notify} />} />
              <Route path="/eventos" element={<Events onNotify={notify} />} />
              <Route path="/comunidade" element={<Community />} />
              <Route path="/criadores" element={<Creators onNotify={notify} />} />
              <Route path="/olheiros" element={<Olheiros onNotify={notify} />} />
              <Route path="/impacto-social" element={<SocialImpact />} />
              <Route path="/atualizacoes" element={<Updates />} />
              <Route path="/mais" element={<More />} />
              <Route path="/perfil" element={<Profile />} />
              <Route
                path="/configuracoes"
                element={
                  <Settings
                    themeId={themeId}
                    onThemeChange={(nextTheme) => {
                      setThemeId(nextTheme);
                      notify("🎨 Tema atualizado");
                    }}
                  />
                }
              />
              <Route path="/planos" element={<Plans />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Link className="floating-action" to="/criar-match" aria-label="Criar match">
            <Plus size={24} />
          </Link>

          <Toast message={toast} />
          <SplashScreen visible={showSplash} />
          <BottomNavigation />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
