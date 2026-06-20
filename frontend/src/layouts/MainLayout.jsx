import { Outlet, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="container py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
