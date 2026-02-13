import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { logoutUser } from "../services/authService"
import { startSessionTimer, stopSessionTimer, setupActivityListeners } from "../utils/sessionManager"

/**
 * ProtectedRoute Component
 * 
 * Ye component check karta hai ki user logged in hai ya nahi.
 * Agar token nahi hai, to login page par redirect kar deta hai.
 * Session timeout: 20 minutes inactivity par auto-logout (no warning)
 * 
 * Usage:
 * <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  // Check if token exists in localStorage
  const token = localStorage.getItem("authToken")

  // Agar token nahi hai, to login page par redirect
  if (!token) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    // Handle logout when session expires (20 minutes inactivity)
    const handleLogout = () => {
      logoutUser()
      stopSessionTimer()
      navigate("/login", { replace: true })
      // Show session expired message
      alert("Your session has expired due to inactivity. Please login again.")
    }

    // Start session timer (20 minutes, no warning)
    startSessionTimer(handleLogout)

    // Setup activity listeners
    const cleanup = setupActivityListeners()

    // Cleanup on unmount
    return () => {
      cleanup()
      stopSessionTimer()
    }
  }, [navigate])

  return <>{children}</>
}
