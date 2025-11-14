import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import './Login.css'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!mobileNumber || !password) {
      setError('Please enter both mobile number and password')
      return
    }

    if (mobileNumber.length < 10) {
      setError('Please enter a valid mobile number')
      return
    }

    // For demo purposes, accept any credentials
    setError('')
    onLogin()
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setMobileNumber(formatted)
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="login-logo-icon">VZ</div>
              <div className="login-logo-text">
                <h1>Omni 2.0</h1>
                <p>Verizon Wireless</p>
              </div>
            </div>
          </div>

          <div className="login-content">
            <h2>Sign in to your account</h2>
            <p className="login-subtitle">Manage your Verizon services</p>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="input-wrapper">
                  <Smartphone size={20} className="input-icon" />
                  <input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <button type="button" className="secondary-button">
                Create Account
              </button>
            </form>

            <div className="login-footer">
              <p>Demo credentials: Any mobile number (10 digits) and password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
