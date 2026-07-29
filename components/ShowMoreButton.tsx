type ShowMoreButtonProps = {
  expanded: boolean;
  count: number;
  onClick: () => void;
};

export function ShowMoreButton({
  expanded,
  count,
  onClick,
}: ShowMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className="mt-2 inline-flex min-h-11 items-center font-body text-sm font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {expanded ? "Show less" : "Show more"}
      <span className="sr-only">
        {expanded
          ? `, hide ${count} items`
          : `, reveal ${count} more items`}
      </span>
    </button>
  );
}
