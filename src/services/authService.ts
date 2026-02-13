import API_BASE_URL from "../config/api"
import { logger } from "../utils/logger"

/**
 * Login User Function
 * API se login karta hai aur token return karta hai
 */
export const loginUser = async (email: string, password: string) => {
  // Input validation
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required"
    }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address"
    }
  }

  // Password length validation (minimum 3 characters)
  if (password.length < 3) {
    return {
      success: false,
      message: "Password must be at least 3 characters"
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    // Get response text first to handle both JSON and non-JSON responses
    const responseText = await response.text()
    logger.log("Raw API Response:", responseText)
    logger.log("Response Headers:", Object.fromEntries(response.headers.entries()))

    let data: any = {}
    
    // Try to parse as JSON
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      logger.error("Failed to parse response as JSON:", parseError)
      return {
        success: false,
        message: `Server returned an invalid response: ${responseText.substring(0, 100)}`
      }
    }
    logger.log("API Response Status:", response.status)
    logger.log("API Response Data:", data)

    // Check multiple possible success conditions
    // Swagger might return status: true OR response.ok with token
    if (response.ok) {
      // Check if token exists (could be in data.token or data.data.token)
      const token = data.token || data.data?.token || data.access_token
      
      if (token) {
        return {
          success: true,
          message: data.message || data.msg || "Login successful",
          token: token
        }
      } else if (data.status === true || data.success === true) {
        // Some APIs return status: true but token might be in different field
        return {
          success: true,
          message: data.message || data.msg || "Login successful",
          token: token || data.data?.token || ""
        }
      }
    }
    
    // If we reach here, login failed
    return {
      success: false,
      message: data.message || data.msg || data.error || "Invalid email or password. Please check your credentials and try again."
    }
  } catch (error: any) {
    logger.error("Login API error:", error)
    logger.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return {
      success: false,
      message: error.message || "Network error. Please check your connection and try again."
    }
  }
}

/**
 * Logout User Function
 * Token ko localStorage se remove karta hai
 */
export const logoutUser = () => {
  localStorage.removeItem("authToken")
  // Future: API call for logout (if backend supports it)
  // await fetch(`${API_BASE_URL}/api/logout`, { method: "POST" })
}

/**
 * Check if user is authenticated
 * Returns true if token exists
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken")
  return !!token // Returns true if token exists, false otherwise
}