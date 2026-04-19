import { NavLink } from 'react-router-dom'

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
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <p>CAMPUS ONE</p>
        <small>Office of Alumni Relations</small>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) => (isActive ? 'active' : '')}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
