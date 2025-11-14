import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, CreditCard, BarChart3, Smartphone, Package, HelpCircle, LogOut } from 'lucide-react'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
  onLogout: () => void
}

const Layout = ({ children, onLogout }: LayoutProps) => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/account', icon: Home, label: 'Account' },
    { path: '/billing', icon: CreditCard, label: 'Billing' },
    { path: '/usage', icon: BarChart3, label: 'Usage' },
    { path: '/devices', icon: Smartphone, label: 'Devices' },
    { path: '/plans', icon: Package, label: 'Plans' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">VZ</div>
            <span className="logo-text">Omni 2.0</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="main-container">
        <nav className="sidebar">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
