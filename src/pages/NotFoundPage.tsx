import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="hero-panel">
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-btn">
        Back to Home
      </Link>
    </section>
  )
}
