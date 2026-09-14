import jumoLogo from "./JUMO NEW LOGO.png";

type JUMOLogoSize = "sm" | "md" | "lg" | "hero" | number;
type JUMOLogoBackground = "blue" | "green" | "none";

interface JUMOLogoProps {
  size?: JUMOLogoSize;
  background?: JUMOLogoBackground;
  showName?: boolean;
  alt?: string;
  className?: string;
}

const SIZE_MAP: Record<Exclude<JUMOLogoSize, number>, number> = {
  sm: 40,
  md: 56,
  lg: 72,
  hero: 100,
};

const BACKGROUND_MAP: Record<JUMOLogoBackground, string> = {
  blue: "bg-[#0057B8]",
  green: "bg-[#00843D]",
  none: "bg-transparent",
};

export default function JUMOLogo({
  size = "md",
  background = "none",
  showName = false,
  alt = "JUMO",
  className = "",
}: JUMOLogoProps) {
  const resolvedSize =
    typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className={[
          "shrink-0 flex items-center justify-center",
          BACKGROUND_MAP[background],
          background === "none"
            ? ""
            : "rounded-2xl overflow-hidden p-1.5",
        ].join(" ")}
        style={{
          width: resolvedSize,
          height: resolvedSize,
        }}
      >
        <img
          src={jumoLogo}
          alt={alt}
          width={resolvedSize}
          height={resolvedSize}
          className="w-full h-full object-contain"
        />
      </div>

      {showName && (
        <div className="mt-2 text-center">
          <div className="font-black text-slate-900 tracking-tight leading-none">
            Universal Enterprise Platform
          </div>
        </div>
      )}
    </div>
  );
}
