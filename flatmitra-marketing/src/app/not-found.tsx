import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="text-center max-w-md animate-in">
        <h1
          className="text-8xl font-extrabold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-border)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-off-black)",
            letterSpacing: "-0.03em",
          }}
        >
          Page not found
        </h2>
        <p
          className="text-base mb-8"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-muted)" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn btn-brand">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
