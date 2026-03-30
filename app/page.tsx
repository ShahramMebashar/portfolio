import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="dot-grid"></div>
      <section className="hero">
        <h1 className="hero-title">
          <span className="line animate-reveal delay-1">Full Stack</span>
          <span className="line indent animate-reveal delay-2">Engineering</span>
          <span className="line animate-reveal delay-3">& Design</span>
        </h1>
        <div className="hero-bottom animate-fade delay-4">
          <p className="hero-subtitle">
            I develop robust software architectures and craft elegant digital experiences. Specialized in PHP Laravel, Golang, React, and Vue.
          </p>
        </div>
      </section>

      <section id="expertise" className="section">
        <div className="section-label">{'//'} 01. EXPERTISE</div>
        <div className="expertise-grid">
          <div className="expertise-block">
            <h3>Frontend Architecture</h3>
            <p>Designing performant, accessible, and sophisticated user interfaces utilizing React, Next.js, and modern Vanilla JS with seamless micro-animations.</p>
          </div>
          <div className="expertise-block">
            <h3>Backend Systems</h3>
            <p>Engineering extremely scalable, high-concurrency microservices and APIs leveraging Golang and PHP Laravel for demanding environments.</p>
          </div>
          <div className="expertise-block">
            <h3>Data & DevOps</h3>
            <p>Structuring robust schemas and complex data pipelines with PostgreSQL, MySQL, and Redis, optimized for high throughput.</p>
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-label">{'//'} 02. SELECTED WORK</div>
        <div className="list-wrapper">
          <Link href="/work/aman-booking" className="list-item">
            <h3 className="list-item-title">Aman Booking Platform</h3>
            <div className="list-item-meta">
              <span>[ Next.js, Laravel ]</span>
              ( 2025 )
            </div>
          </Link>
          <Link href="/work/real-time-analytics" className="list-item">
            <h3 className="list-item-title">Real-time Analytics Engine</h3>
            <div className="list-item-meta">
              <span>[ Golang, Vue ]</span>
              ( 2025 )
            </div>
          </Link>
          <Link href="/work/fintech-architecture" className="list-item">
            <h3 className="list-item-title">Fintech Architecture</h3>
            <div className="list-item-meta">
              <span>[ React, Typescript ]</span>
              ( 2024 )
            </div>
          </Link>
          <Link href="/work/saas-ecommerce" className="list-item">
            <h3 className="list-item-title">SaaS E-commerce</h3>
            <div className="list-item-meta">
              <span>[ PHP, Vue, Redis ]</span>
              ( 2023 )
            </div>
          </Link>
        </div>
      </section>

      <section id="writing" className="section">
        <div className="section-label">{'//'} 03. WRITING</div>
        <div className="list-wrapper">
          <Link href="/blog/concurrency-in-golang" className="list-item">
            <h3 className="list-item-title" style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)" }}>Concurrency Models in Golang</h3>
            <div className="list-item-meta">
              <span>[ Engineering ]</span>
              ( Mar '26 )
            </div>
          </Link>
          <Link href="/blog/state-management-scale" className="list-item">
            <h3 className="list-item-title" style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)" }}>State Management at Scale</h3>
            <div className="list-item-meta">
              <span>[ Architecture ]</span>
              ( Feb '26 )
            </div>
          </Link>
          <Link href="/blog/laravel-ioc" className="list-item">
            <h3 className="list-item-title" style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)" }}>Deconstructing Laravel's IoC</h3>
            <div className="list-item-meta">
              <span>[ Deep Dive ]</span>
              ( Jan '26 )
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
