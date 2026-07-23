type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

function webpSrc(src: string) {
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
}

function supportsWebp(src: string) {
  return /\.(jpe?g|png)$/i.test(src);
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
}: OptimizedImageProps) {
  const imgProps = {
    alt,
    width,
    height,
    className,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
  };

  if (supportsWebp(src)) {
    return (
      <picture>
        <source srcSet={webpSrc(src)} type="image/webp" />
        <img src={src} {...imgProps} />
      </picture>
    );
  }

  return <img src={src} {...imgProps} />;
}
