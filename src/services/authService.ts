import API_BASE_URL from "../config/api"

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

    // Check if response is JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return {
        success: false,
        message: "Server returned an invalid response. Please try again."
      }
    }

    const data = await response.json()

    if (response.ok && data.status === true) {
      return {
        success: true,
        message: data.message || "Login successful",
        token: data.token
      }
    } else {
      return {
        success: false,
        message: data.message || "Login failed"
      }
    }
  } catch (error: any) {
    console.error("Login API error:", error)
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