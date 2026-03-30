import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main>
      <section className="hero">
        <Link href="/#writing" className="nav-link" style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.02em", opacity: 0.6, marginBottom: "4vw", display: "inline-block", transition: "opacity 0.3s" }}>← Back to Writing</Link>
        <h1 style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 400, marginBottom: "6vw", maxWidth: "15ch" }}>
          {postTitle}
        </h1>
        <div style={{ display: "flex", gap: "8vw", borderTop: "1px solid var(--line)", paddingTop: "3vw" }}>
          <div>
            <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5vw" }}>Published</strong>
            <span style={{ fontSize: "1.1rem" }}>March 2026</span>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5vw" }}>Category</strong>
            <span style={{ fontSize: "1.1rem" }}>Deep Dive</span>
          </div>
          <div>
            <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5vw" }}>Reading Time</strong>
            <span style={{ fontSize: "1.1rem" }}>8 Min Read</span>
          </div>
        </div>
      </section>

      <article style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "15vh" }}>
        <p style={{ fontSize: "1.6rem", color: "var(--text)", lineHeight: 1.6, marginBottom: "4vw", fontWeight: 300, letterSpacing: "-0.01em" }}>
          In modern software engineering, evaluating the right architecture often requires zooming out. Before selecting a framework, one must understand the implications of scaling stateless services over distributed caches and precisely why abstractions inevitably leak under stress tests.
        </p>

        <h2 style={{ fontSize: "2.5rem", color: "var(--text)", fontWeight: 400, margin: "6vw 0 3vw 0", letterSpacing: "-0.02em" }}>The State of Abstractions</h2>
        <div style={{ color: "var(--text-muted)", fontSize: "1.25rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "2vw" }}>
            We abstract complexity to increase developer velocity. But abstractions are inherently leaky. When a memory leak hits your Node instance, or when your Golang goroutines start deadlocking under high load, the underlying implementation details matter immensely.
          </p>

          <p style={{ marginBottom: "2vw" }}>
            Consider exactly how database connection pools behave when container instances automatically scale up from 2 to 50 in a matter of seconds. If the pool sizes aren't dynamically configurable, you rapidly exhaust your max database connection limit, resulting in a cascading failure across the architecture.
          </p>
        </div>

        <h2 style={{ fontSize: "2.5rem", color: "var(--text)", fontWeight: 400, margin: "6vw 0 3vw 0", letterSpacing: "-0.02em" }}>A Structural Reality Check</h2>
        <div style={{ color: "var(--text-muted)", fontSize: "1.25rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "4vw" }}>
            The elegant solution isn't adding more hardware. It's engineering the connection layer (like a PgBouncer sidecar or connection-aware handlers) to gracefully queue requests. At the UI level, this means optimistic updates with robust rollback states, preserving the illusion of instantaneity for the user.
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "4vw", marginTop: "6vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 400, fontSize: "1.2rem", color: "var(--text)" }}>Engineering complex solutions simply.</span>
          <a href="#" style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.02em", opacity: 0.6 }}>Discuss Article</a>
        </div>
      </article>
    </main>
  );
}
