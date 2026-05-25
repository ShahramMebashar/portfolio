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

// Tile38 (geospatial DB) has no brand glyph; a map pin conveys location/geo.
export const Tile38Icon: IconType = (props) => {
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
      <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill={color} />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  );
};

// PostGIS has no brand glyph; a meridian globe conveys the spatial extension.
export const PostgisIcon: IconType = (props) => {
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
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <path d="M3 12h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3c3.2 2.4 3.2 15.6 0 18M12 3c-3.2 2.4-3.2 15.6 0 18" stroke={color} strokeWidth="1.5" />
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
