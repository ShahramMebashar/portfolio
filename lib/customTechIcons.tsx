import type { IconType } from "react-icons";

// TanStack has no Simple Icons glyph; this is a clean "layers/stack" mark.
export const TanStackIcon: IconType = (props) => {
  const { size = 24, color = "currentColor", className, style, title } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 2 2 7l10 5 10-5-10-5Z" fill={color} />
      <path d="M2 12l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Amazon removed its S3 brand glyph from Simple Icons (trademark); this is a clean storage "bucket" mark.
export const S3Icon: IconType = (props) => {
  const { size = 24, color = "currentColor", className, style, title } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M5 6.5c0-1.66 3.13-3 7-3s7 1.34 7 3l-1.55 12.4c-.18 1.42-2.62 2.1-5.45 2.1s-5.27-.68-5.45-2.1L5 6.5Z"
        fill={color}
      />
      <ellipse cx="12" cy="6.5" rx="7" ry="2.2" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" />
    </svg>
  );
};

// WebSocket has no brand glyph; bidirectional arrows convey the full-duplex connection.
export const WebSocketIcon: IconType = (props) => {
  const { size = 24, color = "currentColor", className, style, title } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M3 12h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 8l-4 4 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
