import Link from 'next/link'
import { useRouter } from 'next/router'

type SidebarProps = {
  open: boolean
  onNavigate: () => void
  onClose: () => void
}

type SidebarIcon = 'dashboard' | 'profile' | 'document' | 'card' | 'tracker' | 'settings' | 'logout'

const navigationItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' as const },
  { to: '/profile', label: 'Profile', icon: 'profile' as const },
  { to: '/document-request', label: 'Document Request', icon: 'document' as const },
  { to: '/card-application', label: 'Card Application', icon: 'card' as const },
  { to: '/clearance-tracker', label: 'Clearance Tracker', icon: 'tracker' as const },
]

const quickTabs = [
  { to: '/profile', label: 'Settings', icon: 'settings' as const },
  { to: '#', label: 'Log Out', icon: 'logout' as const, tone: 'danger' as const },
]

function NavIcon({ type }: { type: SidebarIcon }) {
  if (type === 'dashboard') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" />
        <rect x="13" y="10" width="8" height="11" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
      </svg>
    )
  }

  if (type === 'profile') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    )
  }

  if (type === 'document') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 3h6l4 4v14H8z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h6" />
        <path d="M10 16h6" />
      </svg>
    )
  }

  if (type === 'card') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    )
  }

  if (type === 'tracker') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="5" cy="6" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 7.5 10.5 10" />
        <path d="M13.5 13.5 17 16" />
      </svg>
    )
  }

  if (type === 'settings') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1v-.1a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.4a1 1 0 0 1 1-1h.1a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1v.1a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-.1a1 1 0 0 0-.5 1z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 7 20 12 15 17" />
      <path d="M20 12H9" />
      <path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
    </svg>
  )
}

export function Sidebar({ open, onNavigate, onClose }: SidebarProps) {
  const router = useRouter()

  const isActivePath = (path: string) => {
    if (path === '/') {
      return router.pathname === '/'
    }

    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand-lockup">
          <p>
            <span className="sidebar-brand-campus">CAMPUS</span>
            <span className="sidebar-brand-portal"> Portal</span>
          </p>
          <small>Office of Alumni Relations</small>
        </div>

        <button className="sidebar-close" type="button" onClick={onClose} aria-label="Close menu">
          <span />
          <span />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            onClick={onNavigate}
            className={isActivePath(item.to) ? 'active' : ''}
          >
            <span className="sidebar-item-icon" aria-hidden="true">
              <NavIcon type={item.icon} />
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-divider" aria-hidden="true" />

      <div className="sidebar-quick-tabs" aria-label="Quick tabs">
        <h4>Quick Tabs</h4>
        {quickTabs.map((item) => (
          <Link
            key={item.label}
            href={item.to}
            onClick={onNavigate}
            className={item.tone === 'danger' ? 'danger' : ''}
          >
            <span className="sidebar-item-icon" aria-hidden="true">
              <NavIcon type={item.icon} />
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
