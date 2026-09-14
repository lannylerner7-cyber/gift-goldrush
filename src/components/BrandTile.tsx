import { cn } from "@/lib/utils";
import { playTap } from "@/lib/sounds";

export type BrandLike = {
  id: string;
  name: string;
  slug: string;
  accent_color: string | null;
  logo_path?: string | null;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function BrandTile({
  brand,
  selected,
  onSelect,
  className,
}: {
  brand: BrandLike;
  selected?: boolean;
  onSelect?: (brand: BrandLike) => void;
  className?: string;
}) {
  const accent = brand.accent_color ?? "#f0c453";
  return (
    <button
      type="button"
      onClick={() => {
        playTap();
        onSelect?.(brand);
      }}
      className={cn(
        "group bg-surface border-border/70 active:animate-tilt-tap relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border p-3 transition-all",
        "hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30",
        selected && "border-primary ring-primary/40 ring-2",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-14 opacity-25 blur-2xl transition-opacity group-hover:opacity-45"
        style={{ background: accent }}
      />
      <span
        className="relative flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-black/80"
        style={{ background: accent }}
      >
        {initials(brand.name)}
      </span>
      <span className="relative text-center text-xs leading-tight font-semibold">{brand.name}</span>
    </button>
  );
}

export function BrandTileSkeleton() {
  return <div className="bg-surface-2 shimmer aspect-[4/3] rounded-2xl" />;
}
