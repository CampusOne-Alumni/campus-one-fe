import Link from 'next/link'

export function DashboardPage() {
  return (
    <section className="dashboard-screen">
      <div className="dashboard-grid">
        <section className="dashboard-panel panel-hero">
          <div className="hero-banner">
            <h2>Hello, John!</h2>
            <p>Welcome to your alumni dashboard. Access your services and track your activities.</p>
          </div>
        </section>

        <section className="dashboard-panel panel-overview">
          <h3 className="section-head">Overview</h3>
          <div className="overview-grid">
            <article className="mini-stat">
              <span>Member Since</span>
              <strong>2024</strong>
            </article>
            <article className="mini-stat">
              <span>Services Used</span>
              <strong>0</strong>
            </article>
            <article className="mini-stat">
              <span>Alumni Network</span>
              <strong>5,420</strong>
            </article>
            <article className="mini-stat">
              <span>Profile Status</span>
              <strong>Active</strong>
            </article>
          </div>
        </section>

        <section className="dashboard-panel panel-actions">
          <h3 className="section-head">Quick Actions</h3>
          <div className="quick-stack">
            <Link className="quick-yellow" href="/card-application">
              <strong>Apply for Alumni Card</strong>
              <span>Get your official alumni identification</span>
            </Link>
            <Link className="quick-dark" href="/document-request">
              <strong>Request Documents</strong>
              <span>Order official transcripts and certificates</span>
            </Link>
            <Link className="quick-dark" href="/clearance-tracker">
              <strong>Track Clearance Routing</strong>
              <span>Monitor Library, Finance, Dean, and Labs sign-offs</span>
            </Link>
          </div>
        </section>

        <section className="dashboard-panel panel-profile">
          <h3 className="section-head">Profile</h3>
          <article className="profile-box">
            <div className="avatar-web">JD</div>
            <div>
              <strong>John Doe</strong>
              <p>jertznaval57@gmail.com</p>
            </div>
            <Link className="ghost-btn" href="/profile">
              View Full Profile
            </Link>
          </article>
        </section>

        <section className="dashboard-panel panel-activity">
          <h3 className="section-head">Recent Activity</h3>
          <ul className="status-list activity-list">
            <li>Account created and verified.</li>
            <li>Profile information updated.</li>
            <li>No pending payment holds.</li>
            <li>Eligible for card application processing.</li>
          </ul>
        </section>
      </div>
    </section>
  )
}
