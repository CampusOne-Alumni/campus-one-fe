import Link from 'next/link'

export function BillingPage() {
  return (
    <section className="billing-page">
      <header className="billing-header">
        <div>
          <h1>Billing & Payments</h1>
          <p>Manage your invoices and payment information</p>
        </div>
      </header>

      <div className="billing-section">
        <h2>Outstanding Invoices</h2>
        <article className="billing-card">
          <div className="billing-card-header">
            <div>
              <h3>Alumni Card Application Fee</h3>
              <p>Invoice #INV-2024-001</p>
            </div>
            <span className="billing-amount">$25.00</span>
          </div>
          <div className="billing-card-details">
            <div>
              <span className="billing-label">Due Date:</span>
              <span>May 15, 2024</span>
            </div>
            <div>
              <span className="billing-label">Status:</span>
              <span className="status-badge status-pending">Pending Payment</span>
            </div>
          </div>
          <Link href="/payments" className="billing-pay-button">
            Pay Now
          </Link>
        </article>
      </div>

      <div className="billing-section">
        <h2>Payment History</h2>
        <article className="billing-card">
          <div className="billing-card-header">
            <div>
              <h3>Diploma Copy Request</h3>
              <p>Invoice #INV-2024-002</p>
            </div>
            <span className="billing-amount">$15.00</span>
          </div>
          <div className="billing-card-details">
            <div>
              <span className="billing-label">Paid Date:</span>
              <span>April 10, 2024</span>
            </div>
            <div>
              <span className="billing-label">Status:</span>
              <span className="status-badge status-completed">Paid</span>
            </div>
          </div>
        </article>
      </div>

      <div className="billing-actions">
        <Link href="/dashboard" className="billing-back-link">
          ← Back to Dashboard
        </Link>
      </div>
    </section>
  )
}
