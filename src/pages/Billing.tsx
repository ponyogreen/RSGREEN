import Layout from '../components/Layout'
import { CreditCard, Download, Calendar, DollarSign, AlertCircle } from 'lucide-react'
import './Billing.css'

interface BillingProps {
  onLogout: () => void
}

const Billing = ({ onLogout }: BillingProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="billing">
        <div className="page-header">
          <h1>Billing & Payments</h1>
          <p>Manage your bills and payment methods</p>
        </div>

        <div className="billing-alert">
          <AlertCircle size={20} />
          <div>
            <h4>Payment Due Soon</h4>
            <p>Your next payment of $127.99 is due on January 15, 2025</p>
          </div>
          <button className="pay-now-btn">Pay Now</button>
        </div>

        <div className="billing-grid">
          <div className="billing-card featured">
            <div className="card-header">
              <h2>Current Balance</h2>
            </div>
            <div className="balance-content">
              <div className="balance-amount">
                <DollarSign size={32} />
                <h1>$127.99</h1>
              </div>
              <p className="due-date">Due on January 15, 2025</p>
              <button className="primary-btn">Make Payment</button>
            </div>
          </div>

          <div className="billing-card">
            <div className="card-header">
              <h2>Payment Methods</h2>
              <button className="add-btn">+ Add</button>
            </div>
            <div className="payment-methods">
              <div className="payment-method">
                <div className="payment-icon">
                  <CreditCard size={24} />
                </div>
                <div className="payment-info">
                  <h4>Visa ending in 4242</h4>
                  <p>Expires 12/2026</p>
                  <span className="default-badge">Default</span>
                </div>
              </div>
              <div className="payment-method">
                <div className="payment-icon">
                  <CreditCard size={24} />
                </div>
                <div className="payment-info">
                  <h4>Mastercard ending in 8888</h4>
                  <p>Expires 09/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="billing-card">
          <div className="card-header">
            <h2>Recent Statements</h2>
          </div>
          <div className="statements-table">
            <table>
              <thead>
                <tr>
                  <th>Billing Period</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="period-cell">
                      <Calendar size={16} />
                      <span>Dec 15 - Jan 14, 2025</span>
                    </div>
                  </td>
                  <td className="amount">$127.99</td>
                  <td>
                    <span className="status-badge pending">Pending</span>
                  </td>
                  <td>Jan 15, 2025</td>
                  <td>
                    <button className="action-btn">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="period-cell">
                      <Calendar size={16} />
                      <span>Nov 15 - Dec 14, 2024</span>
                    </div>
                  </td>
                  <td className="amount">$127.99</td>
                  <td>
                    <span className="status-badge paid">Paid</span>
                  </td>
                  <td>Dec 15, 2024</td>
                  <td>
                    <button className="action-btn">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="period-cell">
                      <Calendar size={16} />
                      <span>Oct 15 - Nov 14, 2024</span>
                    </div>
                  </td>
                  <td className="amount">$127.99</td>
                  <td>
                    <span className="status-badge paid">Paid</span>
                  </td>
                  <td>Nov 15, 2024</td>
                  <td>
                    <button className="action-btn">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="period-cell">
                      <Calendar size={16} />
                      <span>Sep 15 - Oct 14, 2024</span>
                    </div>
                  </td>
                  <td className="amount">$127.99</td>
                  <td>
                    <span className="status-badge paid">Paid</span>
                  </td>
                  <td>Oct 15, 2024</td>
                  <td>
                    <button className="action-btn">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="billing-card">
          <div className="card-header">
            <h2>Auto Pay Settings</h2>
          </div>
          <div className="autopay-content">
            <div className="autopay-info">
              <h4>Automatic Payments</h4>
              <p>Never miss a payment with Auto Pay. Your bill will be automatically paid on the due date.</p>
            </div>
            <button className="toggle-btn enabled">Enabled</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Billing
