import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { AppShell } from '../components/layout/AppShell'
import { store } from '../app/store'
import '../index.css'
import '../App.css'

const pageTitles: Record<string, string> = {
  '/': 'DASHBOARD',
  '/dashboard': 'DASHBOARD',
  '/profile': 'PROFILE',
  '/document-request': 'DOCUMENT REQUEST',
  '/card-application': 'CARD APPLICATION',
  '/clearance-tracker': 'CLEARANCE TRACKER',
  '/404': 'NOT FOUND',
}

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showShell = router.pathname !== '/register'
  const title = pageTitles[router.pathname] ?? 'ALUMNI PORTAL'

  if (!showShell) {
    return <Component {...pageProps} />
  }

  return (
    <AppShell title={title}>
      <Component {...pageProps} />
    </AppShell>
  )
}

export default function AlumniPortalApp(props: AppProps) {
  return (
    <Provider store={store}>
      <AppContent {...props} />
    </Provider>
  )
}
