import Link from "next/link";

export default async function WorkProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <main>
      <section className="hero">
        <Link href="/#work" className="nav-link" style={{ textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.02em", opacity: 0.6, marginBottom: "2vw", display: "inline-block", transition: "opacity 0.3s" }}>← Back to Selected Work</Link>
        <h1 className="hero-title" style={{ fontSize: "clamp(3rem, 8vw, 10rem)", marginBottom: "4vw", lineHeight: 0.9 }}>
          {projectName}
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4vw", borderTop: "1px solid var(--line)", paddingTop: "4vw" }}>
          <div>
            <div style={{ marginBottom: "2vw" }}>
              <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5vw" }}>Role</strong>
              <span style={{ fontSize: "1.2rem" }}>Lead Full Stack Developer</span>
            </div>
            <div>
              <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5vw" }}>Tech Stack</strong>
              <span style={{ fontSize: "1.2rem", lineHeight: 1.4 }}>Next.js, Laravel, PostgreSQL, Redis</span>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "clamp(1.2rem, 1.5vw, 2rem)", fontWeight: 300, lineHeight: 1.6 }}>
              This project focused on delivering a high-performance experience with complete data sovereignty and horizontal scaling. We utilized a microservices architecture to process intensive transaction loads under sub-second latency while keeping the front-end delightfully simple.
            </p>
          </div>
        </div>
      </section>

      <section style={{ height: "60vh", background: "var(--line)", marginBottom: "10vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.85rem" }}>[ High-Resolution Project Presentation ]</span>
      </section>

      <section style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "15vh" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2vw", fontWeight: 400, letterSpacing: "-0.02em" }}>Architecture & Implementation</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2vw" }}>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            The backend services were orchestrated using highly-available containers, allowing precise scaling of the most demanding APIs. The critical path was engineered in Golang for raw throughput, while Laravel handled complex business logic and admin interfaces efficiently.
          </p>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            For the frontend, React paradigms were blended with optimized asset delivery directly from the edge network. Fluid layout structures and the complete removal of layout shifts made it feel as instantaneous as a native OS application.
          </p>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            The resulting architecture achieved massive improvements over their legacy systems, transforming not just their load metrics but the overall feel and premium quality of the brand itself.
          </p>
        </div>
      </section>
    </main>
  );
}
