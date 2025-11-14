import Layout from '../components/Layout'
import { User, Phone, Mail, MapPin, Shield, Edit } from 'lucide-react'
import './AccountOverview.css'

interface AccountOverviewProps {
  onLogout: () => void
}

const AccountOverview = ({ onLogout }: AccountOverviewProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="account-overview">
        <div className="page-header">
          <h1>Account Overview</h1>
          <p>Manage your account information and settings</p>
        </div>

        <div className="account-grid">
          <div className="account-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <button className="edit-btn">
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </div>
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-content">
                  <p className="info-label">Full Name</p>
                  <p className="info-value">John Anderson</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div className="info-content">
                  <p className="info-label">Primary Phone</p>
                  <p className="info-value">(555) 123-4567</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-content">
                  <p className="info-label">Email Address</p>
                  <p className="info-value">john.anderson@email.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-content">
                  <p className="info-label">Billing Address</p>
                  <p className="info-value">123 Main Street, Apt 4B<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="account-card">
            <div className="card-header">
              <h2>Account Details</h2>
            </div>
            <div className="info-list">
              <div className="info-item">
                <div className="info-content">
                  <p className="info-label">Account Number</p>
                  <p className="info-value">987654321</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <p className="info-label">Account Type</p>
                  <p className="info-value">Individual</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <p className="info-label">Member Since</p>
                  <p className="info-value">January 2020</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <p className="info-label">Account Status</p>
                  <span className="status-badge active">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="account-card">
          <div className="card-header">
            <h2>Security Settings</h2>
          </div>
          <div className="security-list">
            <div className="security-item">
              <div className="security-info">
                <div className="info-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="toggle-btn enabled">Enabled</button>
            </div>
            <div className="security-item">
              <div className="security-info">
                <div className="info-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <h4>Password</h4>
                  <p>Last changed 45 days ago</p>
                </div>
              </div>
              <button className="secondary-btn">Change</button>
            </div>
            <div className="security-item">
              <div className="security-info">
                <div className="info-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <h4>Security Questions</h4>
                  <p>Help us verify your identity</p>
                </div>
              </div>
              <button className="secondary-btn">Update</button>
            </div>
          </div>
        </div>

        <div className="account-card">
          <div className="card-header">
            <h2>Authorized Users</h2>
            <button className="add-btn">+ Add User</button>
          </div>
          <div className="users-list">
            <div className="user-item">
              <div className="user-info">
                <div className="user-avatar">JA</div>
                <div>
                  <h4>John Anderson</h4>
                  <p>Account Owner</p>
                </div>
              </div>
              <span className="role-badge owner">Owner</span>
            </div>
            <div className="user-item">
              <div className="user-info">
                <div className="user-avatar">SA</div>
                <div>
                  <h4>Sarah Anderson</h4>
                  <p>sarah.anderson@email.com</p>
                </div>
              </div>
              <span className="role-badge">Authorized</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AccountOverview
