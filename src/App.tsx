import './App.css'

const features = [
  {
    title: 'AI Project Partner',
    description:
      'Plan, build, and ship products with an AI teammate that understands your startup context.',
  },
  {
    title: 'Instant Team Rooms',
    description:
      'Create focused spaces for product, growth, and ops with shared goals, docs, and decisions.',
  },
  {
    title: 'Launch Workflows',
    description:
      'Automate repetitive execution from roadmap updates to investor reports in one click.',
  },
]

function App() {
  return (
    <main className="page">
      <header className="hero">
        <nav className="topbar">
          <span className="brand">TriConnect</span>
          <button type="button" className="ghost-button">
            Join Waitlist
          </button>
        </nav>

        <p className="eyebrow">Built for modern founders</p>
        <h1>Launch faster with your all-in-one startup operating system.</h1>
        <p className="subtitle">
          TriConnect combines AI planning, execution, and collaboration so your team can move from
          idea to impact without the chaos.
        </p>

        <div className="hero-actions">
          <button type="button" className="primary-button">
            Get Early Access
          </button>
          <button type="button" className="ghost-button">
            See Product Tour
          </button>
        </div>
      </header>

      <section className="metrics" aria-label="Triconnect metrics">
        <article>
          <h2>3x</h2>
          <p>Faster weekly execution cycles</p>
        </article>
        <article>
          <h2>82%</h2>
          <p>Less status-update overhead</p>
        </article>
        <article>
          <h2>24/7</h2>
          <p>AI support for your key workflows</p>
        </article>
      </section>

      <section className="features" aria-label="Core features">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
