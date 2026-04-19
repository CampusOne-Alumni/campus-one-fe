import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { CardApplicationPage } from './pages/CardApplicationPage'
import { ClearanceTrackerPage } from './pages/ClearanceTrackerPage'
import { DashboardPage } from './pages/DashboardPage'
import { DocumentRequestPage } from './pages/DocumentRequestPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProfilePage } from './pages/ProfilePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/document-request" element={<DocumentRequestPage />} />
        <Route path="/card-application" element={<CardApplicationPage />} />
        <Route path="/clearance-tracker" element={<ClearanceTrackerPage />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
