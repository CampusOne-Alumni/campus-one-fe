import type { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSidebarOpen, toggleSidebar } from '../../features/ui/uiSlice'
import { Sidebar } from './Sidebar'

type AppShellProps = {
  children: ReactNode
}

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 10a4 4 0 1 1 8 0v3.2c0 .8.3 1.6.9 2.2l1 1.1H6.1l1-1.1c.6-.6.9-1.4.9-2.2V10" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  )
}

function PortalLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6 19 6.7v8.2L12 19 5 14.9V6.7L12 2.6Z" />
      <path d="M8 9.2 12 7l4 2.2" />
      <path d="M12 7v4.8" />
      <path d="M8.2 11.2 12 13.4l3.8-2.2" />
    </svg>
  )
}

export function AppShell({ children }: AppShellProps) {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  return (
    <div className="app-shell">
      <Sidebar
        open={isSidebarOpen}
        onNavigate={() => dispatch(setSidebarOpen(false))}
        onClose={() => dispatch(setSidebarOpen(false))}
      />

      {isSidebarOpen ? (
        <button
          className="scrim"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-label="Close menu"
        />
      ) : null}

      <div className="app-content">
        <header className="top-bar">
          <button
            className="menu-button"
            type="button"
            onClick={() => dispatch(toggleSidebar())}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="top-bar-brand" aria-label="Campus Portal">
            <span className="top-bar-logo" aria-hidden="true">
              <PortalLogo />
            </span>
            <h1>
              <span className="brand-campus">CAMPUS</span>
              <span className="brand-portal">Portal</span>
            </h1>
          </div>
          <button className="notification-button" type="button" aria-label="Notifications">
            <NotificationIcon />
          </button>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
