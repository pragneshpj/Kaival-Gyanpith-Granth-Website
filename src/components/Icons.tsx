import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function ScrollIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M12 10c0-3 3-6 8-6h16c3 0 5 2 5 5v26c0 4-3 7-8 7H16" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10v24c0 4-3 6-6 6h18" stroke="currentColor" strokeWidth="2" />
      <path d="M20 16h12M20 22h10M20 28h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M8 10c6-4 12-4 16 0 4-4 10-4 16 0v26c-6-3-12-3-16 1-4-4-10-4-16-1V10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 12v24" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LampIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 8c2 4 3 7 3 10 0 3-1.2 5-3 5s-3-2-3-5c0-3 1-6 3-10Z" fill="currentColor" opacity="0.85" />
      <path d="M14 28c2-5 6-8 10-8s8 3 10 8H14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 32h16M20 36h8M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MusicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M18 36a5 5 0 1 1-2-4V16l16-4v20a5 5 0 1 1-2-4V16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LotusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 36c6-4 10-10 12-16-4 2-8 3-12 3s-8-1-12-3c2 6 6 12 12 16Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 23c2-6 2-12 0-16-2 4-2 10 0 16Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 23c6 1 12-1 16-5-5 1-11 2-16 5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 23c-6 1-12-1-16-5 5 1 11 2 16 5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function VaaniIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="18" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M12 38c2-8 7-12 12-12s10 4 12 12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function BooksIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M10 12h10v26H10zM22 8h10v30H22zM34 14h8v24h-8z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function TempleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 6l16 12H8L24 6Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 18v18h24V18M18 36V24h4v12M26 36V24h4v12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 18" className={className} fill="none" aria-hidden="true">
      <path d="M2 9h38" stroke="#c9a441" strokeWidth="1.2" />
      <path d="M80 9h38" stroke="#c9a441" strokeWidth="1.2" />
      <path d="M50 9h20" stroke="#c9a441" strokeWidth="1.2" />
      <circle cx="60" cy="9" r="3.2" stroke="#c9a441" strokeWidth="1.2" />
      <path d="M60 3.5c2 2 3 4 3 5.5S62 12 60 14.5C58 12 57 10.5 57 9s1-3.5 3-5.5Z" fill="#c9a441" />
    </svg>
  );
}

export const iconMap = {
  scroll: ScrollIcon,
  book: BookIcon,
  lamp: LampIcon,
  music: MusicIcon,
  lotus: LotusIcon,
  vaani: VaaniIcon,
  books: BooksIcon,
  temple: TempleIcon,
};

export type IconName = keyof typeof iconMap;
