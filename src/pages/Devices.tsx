import Layout from '../components/Layout'
import { Smartphone, Watch, Tablet, Wifi, Battery, Signal } from 'lucide-react'
import './Devices.css'

interface DevicesProps {
  onLogout: () => void
}

const Devices = ({ onLogout }: DevicesProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="devices">
        <div className="page-header">
          <h1>My Devices</h1>
          <p>Manage all your connected devices</p>
        </div>

        <button className="add-device-btn">+ Add New Device</button>

        <div className="devices-grid">
          <div className="device-card primary">
            <div className="device-badge primary-badge">Primary</div>
            <div className="device-icon-large">
              <Smartphone size={48} />
            </div>
            <h3>iPhone 15 Pro</h3>
            <p className="device-number">(555) 123-4567</p>
            <div className="device-details">
              <div className="detail-item">
                <span className="detail-label">IMEI</span>
                <span className="detail-value">123456789012345</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model</span>
                <span className="detail-value">A2848</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Storage</span>
                <span className="detail-value">256 GB</span>
              </div>
            </div>
            <div className="device-status-grid">
              <div className="status-item">
                <Signal size={18} color="#16a34a" />
                <span>Connected</span>
              </div>
              <div className="status-item">
                <Battery size={18} color="#16a34a" />
                <span>85%</span>
              </div>
            </div>
            <div className="device-actions">
              <button className="action-btn-primary">Manage Device</button>
              <button className="action-btn-secondary">View Details</button>
            </div>
          </div>

          <div className="device-card">
            <div className="device-badge">Connected</div>
            <div className="device-icon-large">
              <Watch size={48} />
            </div>
            <h3>Apple Watch Series 9</h3>
            <p className="device-number">(555) 123-4568</p>
            <div className="device-details">
              <div className="detail-item">
                <span className="detail-label">IMEI</span>
                <span className="detail-value">987654321098765</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model</span>
                <span className="detail-value">A2846</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Size</span>
                <span className="detail-value">45mm</span>
              </div>
            </div>
            <div className="device-status-grid">
              <div className="status-item">
                <Signal size={18} color="#16a34a" />
                <span>Connected</span>
              </div>
              <div className="status-item">
                <Battery size={18} color="#ca8a04" />
                <span>42%</span>
              </div>
            </div>
            <div className="device-actions">
              <button className="action-btn-primary">Manage Device</button>
              <button className="action-btn-secondary">View Details</button>
            </div>
          </div>

          <div className="device-card">
            <div className="device-badge inactive">Inactive</div>
            <div className="device-icon-large">
              <Tablet size={48} />
            </div>
            <h3>iPad Pro 11"</h3>
            <p className="device-number">(555) 123-4569</p>
            <div className="device-details">
              <div className="detail-item">
                <span className="detail-label">IMEI</span>
                <span className="detail-value">456789012345678</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model</span>
                <span className="detail-value">A2759</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Storage</span>
                <span className="detail-value">128 GB</span>
              </div>
            </div>
            <div className="device-status-grid">
              <div className="status-item inactive">
                <Signal size={18} color="#9ca3af" />
                <span>Disconnected</span>
              </div>
              <div className="status-item">
                <Battery size={18} color="#9ca3af" />
                <span>--</span>
              </div>
            </div>
            <div className="device-actions">
              <button className="action-btn-primary">Activate</button>
              <button className="action-btn-secondary">View Details</button>
            </div>
          </div>
        </div>

        <div className="devices-info-cards">
          <div className="info-card">
            <div className="info-card-header">
              <Wifi size={24} color="#2563eb" />
              <h3>Device Protection</h3>
            </div>
            <p>Protect your devices with Total Mobile Protection. Get coverage for loss, theft, and damage.</p>
            <button className="info-btn">Learn More</button>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <Smartphone size={24} color="#16a34a" />
              <h3>Upgrade Available</h3>
            </div>
            <p>You're eligible for a device upgrade. Check out the latest phones and exclusive deals.</p>
            <button className="info-btn">View Offers</button>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <Battery size={24} color="#ca8a04" />
              <h3>Trade-In Program</h3>
            </div>
            <p>Trade in your old device and get credit towards a new one. Get an instant quote now.</p>
            <button className="info-btn">Get Quote</button>
          </div>
        </div>

        <div className="device-tips">
          <h2>Device Management Tips</h2>
          <div className="tips-grid">
            <div className="tip-item">
              <h4>Keep Your Devices Updated</h4>
              <p>Regularly update your device software to ensure optimal performance and security.</p>
            </div>
            <div className="tip-item">
              <h4>Monitor Your Usage</h4>
              <p>Track data usage per device to avoid overages and optimize your plan.</p>
            </div>
            <div className="tip-item">
              <h4>Enable Security Features</h4>
              <p>Use device locator and remote wipe features to protect your data.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Devices
