import { Link } from "@tanstack/react-router";
import { ASSETS } from "@/lib/site-data";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  link?: boolean;
};

export function BrandLogo({
  className = "",
  imageClassName = "h-10 w-10 rounded-xl object-cover shadow-[var(--shadow-card)]",
  link = true,
}: BrandLogoProps) {
  const img = (
    <img
      src={ASSETS.logo}
      alt="Good Deeds Network"
      className={imageClassName}
      width={40}
      height={40}
    />
  );

  if (!link) return <span className={className}>{img}</span>;

  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Good Deeds Network home">
      {img}
    </Link>
  );
}
