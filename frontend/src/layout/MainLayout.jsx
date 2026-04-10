import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 2400,
          className: 'fixora-toast',
          success: {
            className: 'fixora-toast fixora-toast-success',
            iconTheme: {
              primary: '#6366F1',
              secondary: '#FFFFFF',
            },
          },
          error: {
            className: 'fixora-toast fixora-toast-error',
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <Footer />
    </div>
  )
}

export default MainLayout
