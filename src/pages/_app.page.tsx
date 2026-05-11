import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { AppShell } from '../components/layout/AppShell'
import { store } from '../app/store'
import '../index.css'
import '../App.css'

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showShell = router.pathname !== '/register'

  if (!showShell) {
    return <Component {...pageProps} />
  }

  return (
    <AppShell>
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
