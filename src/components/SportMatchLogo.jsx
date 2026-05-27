function SportMatchLogo({ compact = false, className = "" }) {
  const label = compact ? "SportMatch compacto" : "SportMatch";

  return (
    <span className={`sportmatch-logo ${compact ? "compact" : ""} ${className}`.trim()} aria-label={label}>
      <span className="sportmatch-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 72" role="img">
          <path className="logo-shield" d="M32 4 56 14v19c0 16.5-9.8 28.6-24 34C17.8 61.6 8 49.5 8 33V14L32 4Z" />
          <path className="logo-ball" d="M39 18c7 2.3 11.2 8.7 10 15.7-1.2 7.6-8.2 12.8-15.8 11.7-7.6-1.2-12.8-8.2-11.7-15.8" />
          <path className="logo-bolt" d="M35 13 19 38h11l-3 20 18-28H33l2-17Z" />
          <path className="logo-lace" d="M24 26c5 1 11 4 16 9M22 34c6-.2 12 1.7 17 5" />
        </svg>
      </span>
      {!compact && (
        <span className="sportmatch-logo-copy">
          <strong>SportMatch</strong>
          <small>arena de matches</small>
        </span>
      )}
    </span>
  );
}

export default SportMatchLogo;
