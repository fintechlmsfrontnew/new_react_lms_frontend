import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { FaceVerification } from "../components/FaceVerification"
import { getStoredFaceDescriptor, storeFaceDescriptor, hasStoredFace } from "../utils/faceStorage"
import API_BASE_URL from "../config/api"
import "./LoginPage.css"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [showFaceVerification, setShowFaceVerification] = useState(false)
  const [capturedFaceImage, setCapturedFaceImage] = useState<string>("")
  const [pendingLogin, setPendingLogin] = useState(false) // Track if login is pending after face verification
  const [storedFaceDescriptor, setStoredFaceDescriptor] = useState<Float32Array | null>(null)
  const [faceVerified, setFaceVerified] = useState(false)
  const navigate = useNavigate()

  // Load stored face descriptor when email changes
  useEffect(() => {
    if (email) {
      const stored = getStoredFaceDescriptor(email)
      setStoredFaceDescriptor(stored)
    }
  }, [email])

  // Temporarily disabled: Login page hamesha dikhega
  // Jab logout API ready ho jayegi, tab ye logic enable karenge
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken")
  //   if (token) {
  //     navigate("/dashboard", { replace: true })
  //   }
  // }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear previous error
    setSuccessMessage("") // Clear previous success message

    // Validate inputs first
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    // Open face verification modal first
    setPendingLogin(true)
    setShowFaceVerification(true)
  }

  // Handle actual login after face verification
  const performLogin = async () => {
    setLoading(true)
    setError("")

    try {
      // Real API call using authService
      const result = await loginUser(email, password)

      if (result.success && result.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", result.token)
        
        // Store captured face image (optional, for future verification)
        if (capturedFaceImage) {
          localStorage.setItem("userFaceImage", capturedFaceImage)
        }
        
        // Show success message
        setSuccessMessage(result.message || "Login successful!")
        
        // Navigate to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500)
      } else {
        // Show error message below input fields
        setError(result.message || "Invalid email or password. Please try again.")
        setLoading(false)
        setFaceVerified(false)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "An error occurred during login. Please try again.")
      setLoading(false)
      setFaceVerified(false)
    }
  }

  // Clear error when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (error) setError("")
  }

  return (
    <div className="login-page">
      <div className="login-left">
      </div>

      <div className="login-right">
        <form className="login-form-wrap" onSubmit={handleSubmit}>
          <img src="/main_Logo.png" alt="धनwalle" className="login-logo-img" />

          {/* Success Message (only for success) */}
          {successMessage && (
            <div className="login-success-message">
              <span className="login-success-icon">✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="login-input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className={`login-input ${error ? "login-input-error" : ""}`}
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="login-password-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`login-input ${error ? "login-input-error" : ""}`}
              value={password}
              onChange={handlePasswordChange}
              required
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

          {/* Error Message below inputs */}
          {error && (
            <div className="login-field-error">
              <span className="login-error-icon">✕</span>
              <span className="login-error-text">{error}</span>
            </div>
          )}

          <div className="login-forgot-wrap">
            <a href="#" className="login-forgot">Forget your password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading || showFaceVerification}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Face Verification Modal */}
      {showFaceVerification && (
        <FaceVerification
          storedFaceDescriptor={storedFaceDescriptor}
          requireVerification={!!storedFaceDescriptor} // Require verification if stored face exists
          onFaceCaptured={(imageData, faceDescriptor) => {
            setCapturedFaceImage(imageData)
            
            // If face descriptor provided
            if (faceDescriptor) {
              if (!storedFaceDescriptor) {
                // First time - store the face descriptor
                storeFaceDescriptor(email, faceDescriptor)
                setFaceVerified(true)
                // Proceed with login
                if (pendingLogin) {
                  performLogin()
                  setPendingLogin(false)
                }
              }
              // If stored face exists, verification is handled by onVerify callback
            } else {
              // No face descriptor (models not loaded) - allow basic login
              if (pendingLogin) {
                setFaceVerified(true)
                performLogin()
                setPendingLogin(false)
              }
            }
          }}
          onVerify={(isVerified) => {
            if (isVerified) {
              setFaceVerified(true)
              setShowFaceVerification(false)
              // Proceed with login
              if (pendingLogin) {
                performLogin()
                setPendingLogin(false)
              }
            } else {
              // Face verification failed
              setError("Face verification failed. Your face does not match the registered face. Please try again.")
              setShowFaceVerification(false)
              setPendingLogin(false)
              setFaceVerified(false)
            }
          }}
          onClose={() => {
            setShowFaceVerification(false)
            setPendingLogin(false)
            setFaceVerified(false)
          }}
        />
      )}
    </div>
  )
}