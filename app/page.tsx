export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-display text-4xl text-text">Pratyush Agarwal</h1>
      <p className="mt-4 font-body text-base text-text-muted">
        Building software in public. This temporary page proves display,
        body, and mono type samples plus the locked accent.
      </p>
      <p className="mt-6">
        <span className="inline-block rounded-sm bg-chip-bg px-2 py-1 font-mono text-sm text-chip-text">
          shipped
        </span>
      </p>
      <p className="mt-8">
        <a
          href="#sample"
          className="font-body text-accent underline-offset-4 hover:text-accent-hover hover:underline"
        >
          Accent sample link
        </a>
      </p>
      <p className="mt-4">
        <button
          type="button"
          id="sample"
          className="rounded-sm bg-accent px-4 py-2 font-body text-sm text-white hover:bg-accent-hover"
        >
          Accent sample button
        </button>
      </p>
    </main>
  );
}
