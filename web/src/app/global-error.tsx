"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          fontFamily: "Georgia, serif",
          background: "#E9E2D4",
          color: "#0C1A2B",
          padding: "2rem",
        }}
      >
        <main data-testid="global-error">
          <h1>SŁOWARIUM</h1>
          <p>Сервис временно недоступен. Попробуйте позже.</p>
          <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            {error.digest ? `ref ${error.digest}` : "generic failure"}
          </p>
          <button type="button" onClick={() => reset()}>
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}
