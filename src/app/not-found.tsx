import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-card">
      <div className="empty-state">
        <h1>Page not found</h1>
        <p>The admin route you are looking for does not exist.</p>
        <Link href="/" className="primary-btn">
          Back to dashboard
        </Link>
      </div>
    </section>
  )
}
