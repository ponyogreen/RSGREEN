import Layout from '../components/Layout'
import { CreditCard, Signal, DollarSign, Calendar, AlertCircle, TrendingUp } from 'lucide-react'
import './Dashboard.css'

interface DashboardProps {
  onLogout: () => void
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your account overview</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2' }}>
              <DollarSign size={24} color="#cd040b" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Current Balance</p>
              <h3 className="stat-value">$127.99</h3>
              <p className="stat-detail">Due on Jan 15, 2025</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe' }}>
              <Signal size={24} color="#2563eb" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Data Usage</p>
              <h3 className="stat-value">18.5 GB</h3>
              <p className="stat-detail">of 25 GB used (74%)</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7' }}>
              <Calendar size={24} color="#16a34a" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Billing Cycle</p>
              <h3 className="stat-value">12 Days</h3>
              <p className="stat-detail">Until next cycle</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7' }}>
              <TrendingUp size={24} color="#ca8a04" />
            </div>
            <div className="stat-content">
              <p className="stat-label">Plan</p>
              <h3 className="stat-value">Unlimited</h3>
              <p className="stat-detail">Plus Plan</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon success">
                  <CreditCard size={18} />
                </div>
                <div className="activity-content">
                  <p className="activity-title">Payment Received</p>
                  <p className="activity-detail">$127.99 - Dec 15, 2024</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon info">
                  <Signal size={18} />
                </div>
                <div className="activity-content">
                  <p className="activity-title">Data Usage Alert</p>
                  <p className="activity-detail">75% of your data plan used</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon warning">
                  <AlertCircle size={18} />
                </div>
                <div className="activity-content">
                  <p className="activity-title">Plan Upgrade Available</p>
                  <p className="activity-detail">Save $10/month with Annual Plan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-actions">
              <button className="action-button">
                <CreditCard size={20} />
                <span>Pay Bill</span>
              </button>
              <button className="action-button">
                <Signal size={20} />
                <span>View Usage</span>
              </button>
              <button className="action-button">
                <TrendingUp size={20} />
                <span>Upgrade Plan</span>
              </button>
              <button className="action-button">
                <AlertCircle size={20} />
                <span>Get Support</span>
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Your Devices</h2>
          </div>
          <div className="devices-list">
            <div className="device-item">
              <div className="device-info">
                <h4>iPhone 15 Pro</h4>
                <p>(555) 123-4567</p>
              </div>
              <div className="device-status">
                <span className="status-badge active">Active</span>
              </div>
            </div>
            <div className="device-item">
              <div className="device-info">
                <h4>Apple Watch Series 9</h4>
                <p>(555) 123-4568</p>
              </div>
              <div className="device-status">
                <span className="status-badge active">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
