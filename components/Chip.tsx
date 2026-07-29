type ChipVariant = "default" | "flagship";

type ChipProps = {
  label: string;
  variant?: ChipVariant;
};

export function Chip({ label, variant = "default" }: ChipProps) {
  const variantClass =
    variant === "flagship"
      ? "border-accent/30 bg-accent/5 text-accent"
      : "border-transparent bg-chip-bg text-chip-text";

  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-xs leading-none ${variantClass}`}
    >
      {label}
    </span>
  );
}
