import Layout from '../components/Layout'
import { Check, Zap, Star, Crown } from 'lucide-react'
import './Plans.css'

interface PlansProps {
  onLogout: () => void
}

const Plans = ({ onLogout }: PlansProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="plans">
        <div className="page-header">
          <h1>Plans & Services</h1>
          <p>Choose the perfect plan for your needs</p>
        </div>

        <div className="current-plan-banner">
          <div className="current-plan-info">
            <h3>Your Current Plan</h3>
            <h2>Unlimited Plus</h2>
            <p>$127.99/month</p>
          </div>
          <button className="manage-plan-btn">Manage Plan</button>
        </div>

        <div className="plans-section">
          <h2>Upgrade Your Plan</h2>
          <p className="section-subtitle">Get more data, better speeds, and premium features</p>

          <div className="plans-grid">
            <div className="plan-card">
              <div className="plan-header">
                <Zap size={32} color="#2563eb" />
                <h3>Unlimited Welcome</h3>
                <p className="plan-tagline">Great value for everyday use</p>
              </div>
              <div className="plan-price">
                <span className="price-amount">$65</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check size={18} />
                  <span>Unlimited 5G/4G LTE data</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Unlimited talk & text</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Mobile hotspot included</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>International texting</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Standard definition streaming</span>
                </li>
              </ul>
              <button className="plan-btn">Select Plan</button>
            </div>

            <div className="plan-card current">
              <div className="current-badge">
                <Star size={16} />
                <span>Current Plan</span>
              </div>
              <div className="plan-header">
                <Star size={32} color="#ca8a04" />
                <h3>Unlimited Plus</h3>
                <p className="plan-tagline">Premium features & performance</p>
              </div>
              <div className="plan-price">
                <span className="price-amount">$80</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check size={18} />
                  <span>Premium unlimited 5G/4G LTE</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Unlimited talk & text</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>50GB premium mobile hotspot</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>International calling & texting</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>HD streaming included</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Disney+ subscription (6 months)</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Cloud storage (100GB)</span>
                </li>
              </ul>
              <button className="plan-btn current-btn" disabled>Current Plan</button>
            </div>

            <div className="plan-card premium">
              <div className="premium-badge">
                <Crown size={16} />
                <span>Premium</span>
              </div>
              <div className="plan-header">
                <Crown size={32} color="#cd040b" />
                <h3>Unlimited Ultimate</h3>
                <p className="plan-tagline">Everything you need & more</p>
              </div>
              <div className="plan-price">
                <span className="price-amount">$100</span>
                <span className="price-period">/month</span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check size={18} />
                  <span>Premium unlimited 5G Ultra Wideband</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Unlimited premium talk & text</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>100GB premium mobile hotspot</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>International day pass included</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>4K UHD streaming</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Apple Music (6 months)</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Disney+ & Hulu bundle (1 year)</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Cloud storage (600GB)</span>
                </li>
                <li>
                  <Check size={18} />
                  <span>Premium tech support</span>
                </li>
              </ul>
              <button className="plan-btn premium-btn">Upgrade Now</button>
            </div>
          </div>
        </div>

        <div className="addons-section">
          <h2>Add-Ons & Services</h2>
          <p className="section-subtitle">Enhance your plan with additional features</p>

          <div className="addons-grid">
            <div className="addon-card">
              <h4>International Plan</h4>
              <p>Unlimited calling to 200+ countries</p>
              <div className="addon-price">$15/month</div>
              <button className="addon-btn">Add to Plan</button>
            </div>

            <div className="addon-card">
              <h4>Total Mobile Protection</h4>
              <p>Device insurance & tech support</p>
              <div className="addon-price">$17/month</div>
              <button className="addon-btn">Add to Plan</button>
            </div>

            <div className="addon-card">
              <h4>Premium Streaming</h4>
              <p>Netflix, Hulu & Disney+ bundle</p>
              <div className="addon-price">$20/month</div>
              <button className="addon-btn">Add to Plan</button>
            </div>

            <div className="addon-card">
              <h4>Extra Data</h4>
              <p>Additional 10GB high-speed data</p>
              <div className="addon-price">$10/month</div>
              <button className="addon-btn">Add to Plan</button>
            </div>
          </div>
        </div>

        <div className="plan-comparison">
          <h2>Compare All Plans</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Welcome</th>
                  <th>Plus</th>
                  <th>Ultimate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5G/4G LTE Data</td>
                  <td>Unlimited</td>
                  <td>Unlimited Premium</td>
                  <td>Unlimited Premium</td>
                </tr>
                <tr>
                  <td>Mobile Hotspot</td>
                  <td>Included</td>
                  <td>50GB Premium</td>
                  <td>100GB Premium</td>
                </tr>
                <tr>
                  <td>Video Streaming</td>
                  <td>SD (480p)</td>
                  <td>HD (720p)</td>
                  <td>4K UHD</td>
                </tr>
                <tr>
                  <td>International</td>
                  <td>Texting</td>
                  <td>Calling & Texting</td>
                  <td>Day Pass Included</td>
                </tr>
                <tr>
                  <td>Cloud Storage</td>
                  <td>5GB</td>
                  <td>100GB</td>
                  <td>600GB</td>
                </tr>
                <tr>
                  <td>Entertainment</td>
                  <td>-</td>
                  <td>Disney+ (6mo)</td>
                  <td>Multiple Services</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Plans
