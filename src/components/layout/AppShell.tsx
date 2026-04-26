import type { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setSidebarOpen, toggleSidebar } from '../../features/ui/uiSlice'
import { Sidebar } from './Sidebar'

type AppShellProps = {
  title: string
  children: ReactNode
}

export function AppShell({ title, children }: AppShellProps) {
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
            <h1>{title}</h1>
            <p>Alumni Portal</p>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
