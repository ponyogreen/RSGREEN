import Layout from '../components/Layout'
import { MessageCircle, Phone, Mail, Book, Search, HelpCircle, Settings, Smartphone } from 'lucide-react'
import './Support.css'

interface SupportProps {
  onLogout: () => void
}

const Support = ({ onLogout }: SupportProps) => {
  return (
    <Layout onLogout={onLogout}>
      <div className="support">
        <div className="page-header">
          <h1>Help & Support</h1>
          <p>We're here to help you with any questions</p>
        </div>

        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, or topics..."
            className="search-input"
          />
        </div>

        <div className="contact-options">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <button className="contact-btn">Start Chat</button>
              <span className="availability">Available 24/7</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <h3>Call Us</h3>
              <p>Speak with a representative</p>
              <button className="contact-btn">1-800-VERIZON</button>
              <span className="availability">Mon-Fri 8am-8pm EST</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={32} />
              </div>
              <h3>Email Support</h3>
              <p>Send us a detailed message</p>
              <button className="contact-btn">Send Email</button>
              <span className="availability">Response within 24hrs</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-category">
              <div className="category-icon">
                <Settings size={24} />
              </div>
              <h3>Account & Billing</h3>
              <ul className="faq-list">
                <li>
                  <a href="#">How do I view my bill?</a>
                </li>
                <li>
                  <a href="#">How do I make a payment?</a>
                </li>
                <li>
                  <a href="#">How do I set up AutoPay?</a>
                </li>
                <li>
                  <a href="#">How do I update my payment method?</a>
                </li>
                <li>
                  <a href="#">What's included in my bill?</a>
                </li>
              </ul>
            </div>

            <div className="faq-category">
              <div className="category-icon">
                <Smartphone size={24} />
              </div>
              <h3>Devices & Equipment</h3>
              <ul className="faq-list">
                <li>
                  <a href="#">How do I activate a new device?</a>
                </li>
                <li>
                  <a href="#">How do I transfer data to a new phone?</a>
                </li>
                <li>
                  <a href="#">How do I upgrade my device?</a>
                </li>
                <li>
                  <a href="#">What is device protection?</a>
                </li>
                <li>
                  <a href="#">How do I report a lost or stolen device?</a>
                </li>
              </ul>
            </div>

            <div className="faq-category">
              <div className="category-icon">
                <HelpCircle size={24} />
              </div>
              <h3>Plans & Features</h3>
              <ul className="faq-list">
                <li>
                  <a href="#">How do I change my plan?</a>
                </li>
                <li>
                  <a href="#">What's included in unlimited plans?</a>
                </li>
                <li>
                  <a href="#">How do I add international calling?</a>
                </li>
                <li>
                  <a href="#">How does mobile hotspot work?</a>
                </li>
                <li>
                  <a href="#">What streaming services are included?</a>
                </li>
              </ul>
            </div>

            <div className="faq-category">
              <div className="category-icon">
                <Book size={24} />
              </div>
              <h3>Technical Support</h3>
              <ul className="faq-list">
                <li>
                  <a href="#">How do I troubleshoot network issues?</a>
                </li>
                <li>
                  <a href="#">How do I improve my signal?</a>
                </li>
                <li>
                  <a href="#">How do I set up voicemail?</a>
                </li>
                <li>
                  <a href="#">How do I manage data usage?</a>
                </li>
                <li>
                  <a href="#">How do I reset my password?</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="resources-section">
          <h2>Self-Service Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <Book size={24} />
              <h4>User Guides</h4>
              <p>Detailed guides for all features</p>
              <a href="#" className="resource-link">View Guides →</a>
            </div>
            <div className="resource-card">
              <MessageCircle size={24} />
              <h4>Community Forum</h4>
              <p>Connect with other users</p>
              <a href="#" className="resource-link">Visit Forum →</a>
            </div>
            <div className="resource-card">
              <Settings size={24} />
              <h4>Troubleshooting</h4>
              <p>Fix common issues yourself</p>
              <a href="#" className="resource-link">Get Help →</a>
            </div>
            <div className="resource-card">
              <Smartphone size={24} />
              <h4>Video Tutorials</h4>
              <p>Step-by-step video guides</p>
              <a href="#" className="resource-link">Watch Now →</a>
            </div>
          </div>
        </div>

        <div className="support-tickets">
          <h2>My Support Tickets</h2>
          <div className="tickets-list">
            <div className="ticket-item">
              <div className="ticket-info">
                <h4>Ticket #12345</h4>
                <p>Billing inquiry about last month's charges</p>
                <span className="ticket-date">Opened: Jan 10, 2025</span>
              </div>
              <div className="ticket-status">
                <span className="status-badge in-progress">In Progress</span>
              </div>
            </div>
            <div className="ticket-item">
              <div className="ticket-info">
                <h4>Ticket #12344</h4>
                <p>Technical support for network connectivity</p>
                <span className="ticket-date">Opened: Jan 8, 2025</span>
              </div>
              <div className="ticket-status">
                <span className="status-badge resolved">Resolved</span>
              </div>
            </div>
          </div>
          <button className="new-ticket-btn">Create New Ticket</button>
        </div>
      </div>
    </Layout>
  )
}

export default Support
