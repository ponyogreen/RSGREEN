import Layout from '../components/Layout'
import { Signal, Phone, MessageSquare, Wifi, Calendar } from 'lucide-react'
import './Usage.css'

interface UsageProps {
  onLogout: () => void
}

const Usage = ({ onLogout }: UsageProps) => {
  const dataUsed = 18.5
  const dataTotal = 25
  const dataPercent = (dataUsed / dataTotal) * 100

  const minutesUsed = 840
  const minutesTotal = 'Unlimited'

  const textsUsed = 1247
  const textsTotal = 'Unlimited'

  return (
    <Layout onLogout={onLogout}>
      <div className="usage">
        <div className="page-header">
          <h1>Usage Overview</h1>
          <p>Track your data, calls, and messages</p>
        </div>

        <div className="billing-cycle-info">
          <Calendar size={20} />
          <div>
            <h4>Current Billing Cycle</h4>
            <p>Dec 15, 2024 - Jan 14, 2025 (12 days remaining)</p>
          </div>
        </div>

        <div className="usage-grid">
          <div className="usage-card primary">
            <div className="usage-header">
              <div className="usage-icon data">
                <Signal size={24} />
              </div>
              <h2>Data Usage</h2>
            </div>
            <div className="usage-content">
              <div className="usage-amount">
                <h1>{dataUsed} GB</h1>
                <p>of {dataTotal} GB</p>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill data"
                  style={{ width: `${Math.min(dataPercent, 100)}%` }}
                />
              </div>
              <div className="usage-details">
                <span className="usage-percent">{dataPercent.toFixed(1)}% used</span>
                <span className="usage-remaining">{(dataTotal - dataUsed).toFixed(1)} GB remaining</span>
              </div>
              <div className="usage-breakdown">
                <h4>Usage Breakdown</h4>
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <Wifi size={16} />
                    <span>Mobile Data</span>
                  </div>
                  <span className="breakdown-value">16.2 GB</span>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <Wifi size={16} />
                    <span>Hotspot Data</span>
                  </div>
                  <span className="breakdown-value">2.3 GB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="usage-card">
            <div className="usage-header">
              <div className="usage-icon calls">
                <Phone size={24} />
              </div>
              <h2>Voice Minutes</h2>
            </div>
            <div className="usage-content">
              <div className="usage-amount">
                <h1>{minutesUsed}</h1>
                <p>minutes used</p>
              </div>
              <div className="unlimited-badge">
                <span>{minutesTotal}</span>
              </div>
              <div className="usage-stats">
                <div className="stat-item">
                  <p className="stat-label">Avg per day</p>
                  <p className="stat-value">42 min</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Peak usage</p>
                  <p className="stat-value">78 min</p>
                </div>
              </div>
            </div>
          </div>

          <div className="usage-card">
            <div className="usage-header">
              <div className="usage-icon texts">
                <MessageSquare size={24} />
              </div>
              <h2>Text Messages</h2>
            </div>
            <div className="usage-content">
              <div className="usage-amount">
                <h1>{textsUsed}</h1>
                <p>messages sent</p>
              </div>
              <div className="unlimited-badge">
                <span>{textsTotal}</span>
              </div>
              <div className="usage-stats">
                <div className="stat-item">
                  <p className="stat-label">Avg per day</p>
                  <p className="stat-value">62 msgs</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Peak usage</p>
                  <p className="stat-value">124 msgs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="usage-card">
          <div className="card-header">
            <h2>Usage by Device</h2>
          </div>
          <div className="device-usage-list">
            <div className="device-usage-item">
              <div className="device-usage-info">
                <h4>iPhone 15 Pro</h4>
                <p>(555) 123-4567</p>
              </div>
              <div className="device-usage-stats">
                <div className="device-stat">
                  <Signal size={16} />
                  <span>14.2 GB</span>
                </div>
                <div className="device-stat">
                  <Phone size={16} />
                  <span>680 min</span>
                </div>
                <div className="device-stat">
                  <MessageSquare size={16} />
                  <span>1,180 msgs</span>
                </div>
              </div>
            </div>
            <div className="device-usage-item">
              <div className="device-usage-info">
                <h4>Apple Watch Series 9</h4>
                <p>(555) 123-4568</p>
              </div>
              <div className="device-usage-stats">
                <div className="device-stat">
                  <Signal size={16} />
                  <span>4.3 GB</span>
                </div>
                <div className="device-stat">
                  <Phone size={16} />
                  <span>160 min</span>
                </div>
                <div className="device-stat">
                  <MessageSquare size={16} />
                  <span>67 msgs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="usage-card">
          <div className="card-header">
            <h2>Usage History</h2>
          </div>
          <div className="usage-history">
            <div className="history-item">
              <div className="history-date">
                <Calendar size={16} />
                <span>Nov 15 - Dec 14, 2024</span>
              </div>
              <div className="history-stats">
                <span>22.1 GB</span>
                <span>920 min</span>
                <span>1,340 msgs</span>
              </div>
            </div>
            <div className="history-item">
              <div className="history-date">
                <Calendar size={16} />
                <span>Oct 15 - Nov 14, 2024</span>
              </div>
              <div className="history-stats">
                <span>19.7 GB</span>
                <span>875 min</span>
                <span>1,215 msgs</span>
              </div>
            </div>
            <div className="history-item">
              <div className="history-date">
                <Calendar size={16} />
                <span>Sep 15 - Oct 14, 2024</span>
              </div>
              <div className="history-stats">
                <span>21.3 GB</span>
                <span>940 min</span>
                <span>1,452 msgs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Usage
