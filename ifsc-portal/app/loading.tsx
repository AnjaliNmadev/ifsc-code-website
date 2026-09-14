export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-ink-200" />
      <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded-lg bg-ink-100" />
      <div className="mt-8 h-40 animate-pulse rounded-2xl bg-ink-100" />
    </div>
  );
}
