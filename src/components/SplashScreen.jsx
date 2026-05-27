import { Activity } from "lucide-react";

function SplashScreen({ visible }) {
  return (
    <div className={visible ? "splash-screen" : "splash-screen hide"} aria-hidden={!visible}>
      <div className="splash-mark">
        <Activity size={38} />
      </div>
      <h2>SportMatch</h2>
      <p>Matches, torneios e impacto social em um só app.</p>
      <span className="splash-loader" />
    </div>
  );
}

export default SplashScreen;
