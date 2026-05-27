function Card({ children, className = "", glow = false }) {
  return <article className={`card ${glow ? "card-glow" : ""} ${className}`}>{children}</article>;
}

export default Card;
