import Link from 'next/link'

type MetricIcon = 'calendar' | 'services' | 'network' | 'status'

function OverviewIcon({ type }: { type: MetricIcon }) {
  if (type === 'calendar') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2.5" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 9.5h16" />
        <path d="M8 13h3" />
        <path d="M8 16h5" />
      </svg>
    )
  }

  if (type === 'services') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="6.5" width="17" height="11" rx="2.25" />
        <path d="M3.5 10.2h17" />
        <path d="M7.5 13.5h4" />
        <path d="M13 13.5h3.5" />
      </svg>
    )
  }

  if (type === 'network') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="8" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="12" cy="16.5" r="2" />
        <path d="M8 8h8" />
        <path d="M7.2 9.6 11 14.7" />
        <path d="M16.8 9.6 13 14.7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.5 1.5" />
      <path d="M12 12h4" />
    </svg>
  )
}

export function DashboardPage() {
  return (
    <section className="dashboard-screen">
      <div className="dashboard-format">
        <section className="dashboard-heading">
          <h2>Dashboard</h2>
          <p>Welcome back, Alumni Member</p>
        </section>

        <section className="dashboard-metrics-grid" aria-label="Dashboard overview">
          <article className="dashboard-metric-card">
            <span className="dashboard-metric-icon" aria-hidden="true">
              <OverviewIcon type="services" />
            </span>
            <strong>0</strong>
            <span>Services Used</span>
          </article>

          <article className="dashboard-metric-card">
            <span className="dashboard-metric-icon" aria-hidden="true">
              <OverviewIcon type="calendar" />
            </span>
            <strong>2024</strong>
            <span>Member Since</span>
          </article>

          <article className="dashboard-metric-card">
            <span className="dashboard-metric-icon" aria-hidden="true">
              <OverviewIcon type="network" />
            </span>
            <strong>5,420</strong>
            <span>Alumni Network</span>
          </article>

          <article className="dashboard-metric-card">
            <span className="dashboard-metric-icon" aria-hidden="true">
              <OverviewIcon type="status" />
            </span>
            <strong className="status-inline">
              <span className="status-dot is-active" aria-hidden="true" />
              Active
            </strong>
            <span>Profile Status</span>
          </article>
        </section>

        <section className="dashboard-status-panel">
          <header>
            <h3>Enrollment Status</h3>
          </header>

          <div className="dashboard-status-grid">
            <div className="dashboard-status-row">
              <span>Current Semester</span>
              <strong>Spring 2026</strong>
            </div>
            <div className="dashboard-status-row">
              <span>Enrollment Period</span>
              <strong className="status-open">Open</strong>
            </div>
            <div className="dashboard-status-row">
              <span>Cart Units</span>
              <strong>0 / 24</strong>
            </div>
            <div className="dashboard-status-row">
              <span>Enrolled Units</span>
              <strong>6</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-actions-panel">
          <header>
            <h3>Quick Actions</h3>
          </header>

          <div className="dashboard-actions-list">
            <Link className="dashboard-action-row" href="/card-application">
              Apply for Alumni Card
            </Link>
            <Link className="dashboard-action-row" href="/document-request">
              Request Documents
            </Link>
            <Link className="dashboard-action-row" href="/clearance-tracker">
              Track Clearance Routing
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
