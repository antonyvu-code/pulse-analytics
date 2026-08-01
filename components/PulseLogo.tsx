/** Logo glyph: a heartbeat inside a rounded square. */
export function PulseLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="1" y="1" width="26" height="26" rx="8" stroke="url(#logo-g)" strokeWidth="1.5" />
      <path
        d="M6 14h4l2-5 4 10 2-5h4"
        stroke="url(#logo-g)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
