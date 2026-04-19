import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSidebarOpen, toggleSidebar } from '../../features/ui/uiSlice'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  return (
    <div className="app-shell">
      <Sidebar
        open={isSidebarOpen}
        onNavigate={() => dispatch(setSidebarOpen(false))}
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
          <div className="top-bar-center">
            <h1>DASHBOARD</h1>
            <p>Alumni Portal</p>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
