/**
 * Face Storage Utility
 * Stores and retrieves face descriptors for verification
 */

const FACE_STORAGE_PREFIX = "face_descriptor_"

/**
 * Store face descriptor for a user (by email)
 */
export const storeFaceDescriptor = (email: string, descriptor: Float32Array) => {
  try {
    // Convert Float32Array to regular array for storage
    const descriptorArray = Array.from(descriptor)
    const key = `${FACE_STORAGE_PREFIX}${email.toLowerCase()}`
    localStorage.setItem(key, JSON.stringify(descriptorArray))
    return true
  } catch (error) {
    console.error("Error storing face descriptor:", error)
    return false
  }
}

/**
 * Get stored face descriptor for a user (by email)
 */
export const getStoredFaceDescriptor = (email: string): Float32Array | null => {
  try {
    const key = `${FACE_STORAGE_PREFIX}${email.toLowerCase()}`
    const stored = localStorage.getItem(key)
    
    if (!stored) {
      return null
    }
    
    // Convert back to Float32Array
    const descriptorArray = JSON.parse(stored)
    return new Float32Array(descriptorArray)
  } catch (error) {
    console.error("Error retrieving face descriptor:", error)
    return null
  }
}

/**
 * Check if face descriptor exists for a user
 */
export const hasStoredFace = (email: string): boolean => {
  const descriptor = getStoredFaceDescriptor(email)
  return descriptor !== null
}

/**
 * Clear stored face descriptor for a user
 */
export const clearFaceDescriptor = (email: string) => {
  const key = `${FACE_STORAGE_PREFIX}${email.toLowerCase()}`
  localStorage.removeItem(key)
}
