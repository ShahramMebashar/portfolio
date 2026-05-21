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
