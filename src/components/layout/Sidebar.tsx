import Link from 'next/link'
import { useRouter } from 'next/router'

type SidebarProps = {
  open: boolean
  onNavigate: () => void
}

const navigationItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/document-request', label: 'Document Request' },
  { to: '/card-application', label: 'Card Application' },
  { to: '/clearance-tracker', label: 'Clearance Tracker' },
]

export function Sidebar({ open, onNavigate }: SidebarProps) {
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
        <p>CAMPUS ONE</p>
        <small>Office of Alumni Relations</small>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            onClick={onNavigate}
            className={isActivePath(item.to) ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
