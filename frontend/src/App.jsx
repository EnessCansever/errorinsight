import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicOnlyRoute from './components/PublicOnlyRoute'

// Route-level lazy imports
const AnalyzePage = lazy(() => import('./pages/AnalyzePage'))
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const SharedAnalysisPage = lazy(() => import('./pages/SharedAnalysisPage'))
const ErrorGuidePage = lazy(() => import('./pages/ErrorGuidePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))

function RouteFallback() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      Sayfa yükleniyor...
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/share/:slug" element={<SharedAnalysisPage />} />
          <Route path="/errors/:slug" element={<ErrorGuidePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
