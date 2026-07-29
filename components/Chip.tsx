type ChipVariant = "default" | "flagship" | "active";
type ChipSize = "sm" | "md";

type ChipProps = {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
};

export function Chip({ label, variant = "default", size = "sm" }: ChipProps) {
  const variantClass =
    variant === "flagship"
      ? "border-accent/30 bg-accent/5 text-accent"
      : variant === "active"
        ? "border-accent bg-accent/10 text-accent"
        : "border-transparent bg-chip-bg text-chip-text";

  const sizeClass =
    size === "md"
      ? "px-3 py-1.5 text-sm leading-none"
      : "px-1.5 py-0.5 text-xs leading-none";

  return (
    <span
      className={`inline-flex items-center rounded-sm border font-mono ${sizeClass} ${variantClass}`}
    >
      {label}
    </span>
  );
}
