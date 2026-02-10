import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className="login-page">
      <div className="login-left">
      </div>

      <div className="login-right">
        <form className="login-form-wrap" onSubmit={handleSubmit}>
          <img src="/main_Logo.png" alt="धनwalle" className="login-logo-img" />

          <input
            type="email"
            placeholder="Email"
            className="login-input"
          />

          <div className="login-password-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
            />
            <button
              type="button"
              className="login-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="login-forgot-wrap">
            <a href="#" className="login-forgot">Forget your password?</a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}