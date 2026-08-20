import Image from "next/image";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  src: string;
  alt: string;
  compact?: boolean;
};

export function Logo({ src, alt, compact = false }: LogoProps) {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={src}
        alt={alt}
        width={1016}
        height={338}
        priority={!compact}
        className={
          compact ? "h-12 w-auto" : "h-[52px] w-auto md:h-[58px]"
        }
      />
    </Link>
  );
}
