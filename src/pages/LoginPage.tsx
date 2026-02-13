import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { FaceVerification } from "../components/FaceVerification"
import { getStoredFaceDescriptor, storeFaceDescriptor, clearFaceDescriptor } from "../utils/faceStorage"
import { logger } from "../utils/logger"
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
  const navigate = useNavigate()

  // Load stored face descriptor when email changes
  useEffect(() => {
    if (email) {
      const stored = getStoredFaceDescriptor(email)
      logger.log("Loading stored face descriptor for email:", email.toLowerCase())
      logger.log("Stored face descriptor found:", !!stored)
      if (stored) {
        logger.log("Stored descriptor length:", stored.length)
      }
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

    logger.log("Login form submitted, opening face verification...")
    logger.log("Stored face descriptor exists:", !!storedFaceDescriptor)
    
    // Open face verification modal first
    setPendingLogin(true)
    setShowFaceVerification(true)
  }

  // Handle actual login after face verification
  const performLogin = async () => {
    logger.log("performLogin called - Starting login API call...")
    setLoading(true)
    setError("")

    try {
      // Real API call using authService
      logger.log("Calling loginUser API with email:", email)
      const result = await loginUser(email, password)
      logger.log("Login API response:", result)

      if (result.success && result.token) {
        logger.log("Login successful! Token received.")
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
          logger.log("Navigating to dashboard...")
          navigate("/dashboard")
        }, 1500)
      } else {
        logger.error("Login failed:", result.message)
        // Show error message below input fields
        setError(result.message || "Invalid email or password. Please try again.")
        setLoading(false)
      }
    } catch (error: any) {
      logger.error("Login error:", error)
      setError(error.message || "An error occurred during login. Please try again.")
      setLoading(false)
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
              {error.includes("Face verification failed") && storedFaceDescriptor && (
                <button
                  type="button"
                  onClick={() => {
                    clearFaceDescriptor(email)
                    setStoredFaceDescriptor(null)
                    setError("Stored face cleared. Please try logging in again to register a new face.")
                    logger.log("Stored face cleared for:", email)
                  }}
                  style={{
                    marginTop: "8px",
                    padding: "6px 12px",
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  Clear Stored Face & Register New
                </button>
              )}
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
            logger.log("onFaceCaptured called - Image captured, descriptor:", !!faceDescriptor)
            logger.log("Stored face descriptor exists:", !!storedFaceDescriptor)
            setCapturedFaceImage(imageData)
            
            // IMPORTANT: If stored face exists, DO NOT proceed with login here
            // Wait for onVerify callback to confirm face matches
            if (storedFaceDescriptor) {
              logger.log("Stored face exists - MUST wait for onVerify callback. DO NOT login here.")
              return // Don't proceed - wait for onVerify
            }
            
            // Only proceed if NO stored face exists (first time registration)
            if (faceDescriptor && !storedFaceDescriptor) {
              logger.log("First time registration - storing face descriptor for:", email.toLowerCase())
              const stored = storeFaceDescriptor(email, faceDescriptor)
              logger.log("Face descriptor stored successfully:", stored)
              
              // First time registration - proceed with login
              if (pendingLogin) {
                logger.log("First time registration - proceeding with login")
                setShowFaceVerification(false)
                performLogin()
                setPendingLogin(false)
              }
            } else if (!faceDescriptor && !storedFaceDescriptor) {
              // No face descriptor and no stored face - basic mode (models not loaded)
              logger.log("Basic mode - no face descriptor, no stored face")
              if (pendingLogin) {
                setShowFaceVerification(false)
                performLogin()
                setPendingLogin(false)
              }
            }
          }}
          onVerify={(isVerified) => {
            logger.log("onVerify called - isVerified:", isVerified)
            logger.log("Stored face descriptor exists:", !!storedFaceDescriptor)
            
            if (isVerified) {
              // Face verified successfully - ONLY way to login when stored face exists
              logger.log("Face verified successfully - proceeding with login")
              setShowFaceVerification(false)
              if (pendingLogin) {
                performLogin()
                setPendingLogin(false)
              }
            } else {
              // Face verification failed - REJECT login
              logger.log("Face verification FAILED - REJECTING login")
              setError("Face verification failed. Your face does not match the registered face. Only the registered user can login. Click 'Clear Stored Face' to register a new face.")
              setShowFaceVerification(false)
              setPendingLogin(false)
              // Clear any pending state
              setCapturedFaceImage("")
            }
          }}
          onClose={() => {
            setShowFaceVerification(false)
            setPendingLogin(false)
            // Clear error if user cancels
            if (pendingLogin) {
              setError("Face verification cancelled. Please try again.")
            }
          }}
        />
      )}
    </div>
  )
}