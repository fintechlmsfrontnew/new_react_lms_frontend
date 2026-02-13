/**
 * Session Manager
 * Handles session timeout, activity tracking, and auto-logout
 */

const SESSION_TIMEOUT = 20 * 60 * 1000 // 20 minutes in milliseconds

let inactivityTimer: ReturnType<typeof setTimeout> | null = null
let onLogoutCallback: (() => void) | null = null

/**
 * Start session timeout tracking
 * @param onLogout - Callback function when session expires
 */
export const startSessionTimer = (onLogout: () => void) => {
  // Store callback
  onLogoutCallback = onLogout

  // Clear existing timer
  resetSessionTimer()

  // Set logout timer (20 minutes)
  inactivityTimer = setTimeout(() => {
    if (onLogoutCallback) {
      onLogoutCallback()
    }
  }, SESSION_TIMEOUT)
}

/**
 * Reset session timer on user activity
 */
export const resetSessionTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
    inactivityTimer = null
  }
}

/**
 * Stop session timer (on logout)
 */
export const stopSessionTimer = () => {
  resetSessionTimer()
  onLogoutCallback = null
}

/**
 * Get remaining session time in minutes
 */
export const getRemainingSessionTime = (): number => {
  // This is approximate, actual implementation would need to track start time
  return Math.ceil(SESSION_TIMEOUT / (60 * 1000))
}

/**
 * Setup activity listeners
 * Tracks mouse movement, clicks, keyboard input, scroll
 */
export const setupActivityListeners = () => {
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  
  const handleActivity = () => {
    // Reset timer on any activity
    if (onLogoutCallback) {
      startSessionTimer(onLogoutCallback)
    }
  }

  events.forEach(event => {
    document.addEventListener(event, handleActivity, true)
  })

  // Return cleanup function
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, handleActivity, true)
    })
  }
}
