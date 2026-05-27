import SportMatchLogo from "./SportMatchLogo";

function SplashScreen({ visible }) {
  return (
    <div className={visible ? "splash-screen" : "splash-screen hide"} aria-hidden={!visible}>
      <SportMatchLogo className="splash-logo" />
      <p>Matches, torneios e impacto social em um so app.</p>
      <span className="splash-loader" />
    </div>
  );
}

export default SplashScreen;
