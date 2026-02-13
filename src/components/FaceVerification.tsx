import { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import Webcam from "react-webcam"
import "./FaceVerification.css"

interface FaceVerificationProps {
  onFaceCaptured: (imageData: string, faceDescriptor?: Float32Array) => void
  onClose: () => void
  onVerify?: (isVerified: boolean) => void
  storedFaceDescriptor?: Float32Array | null // For verification (comparing with stored face)
  requireVerification?: boolean // If true, face must match stored face
}

/**
 * Face Verification Component
 * 
 * Features:
 * - Real-time face detection
 * - Selfie capture
 * - Face verification (optional)
 * - Liveness detection hints
 */
export function FaceVerification({
  onFaceCaptured,
  onClose,
  onVerify,
  storedFaceDescriptor,
  requireVerification = false
}: FaceVerificationProps) {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const [error, setError] = useState<string>("")
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Try loading from CDN first (faster, no download needed)
        const CDN_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model"
        
        try {
          // Try CDN first
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(CDN_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(CDN_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(CDN_URL)
          ])
          setModelsLoaded(true)
          return
        } catch (cdnError) {
          console.log("CDN models failed, trying local models...")
        }

        // Fallback to local models
        const MODEL_URL = "/models"
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ])
        
        setModelsLoaded(true)
      } catch (err: any) {
        console.error("Error loading models:", err)
        setError(`Models not found. Using basic camera mode.`)
        // Allow camera to open even without models (basic capture only)
        setTimeout(() => {
          setModelsLoaded(true)
        }, 1000)
      }
    }

    loadModels()
  }, [])

  // Detect face in real-time
  useEffect(() => {
    if (!modelsLoaded || !webcamRef.current || capturing) return

    const detectFace = async () => {
      try {
        if (webcamRef.current?.video?.readyState === 4) {
          const video = webcamRef.current.video
          const canvas = canvasRef.current

          if (!canvas || !video) return

          const displaySize = {
            width: video.videoWidth,
            height: video.videoHeight
          }

          faceapi.matchDimensions(canvas, displaySize)

          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors()

          const resizedDetections = faceapi.resizeResults(detections, displaySize)

          // Clear canvas
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
          }

          // Draw face detection box
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

          // Check if face is detected
          if (detections.length > 0) {
            setFaceDetected(true)
          } else {
            setFaceDetected(false)
          }
        }
      } catch (err) {
        // If face detection fails, allow basic capture
        console.log("Face detection error (using basic mode):", err)
        setFaceDetected(true) // Allow capture even without detection
      }
    }

    const interval = setInterval(detectFace, 100) // Check every 100ms
    return () => clearInterval(interval)
  }, [modelsLoaded, capturing])

  // Capture selfie
  const captureSelfie = async () => {
    if (!webcamRef.current) {
      setError("Camera not available. Please allow camera access.")
      return
    }

    setCapturing(true)
    setError("")

    try {
      // Get screenshot from webcam
      const imageSrc = webcamRef.current.getScreenshot()
      if (!imageSrc) {
        throw new Error("Failed to capture image")
      }

      // Try to detect face if models are loaded
      let faceDescriptor: Float32Array | undefined
      let isVerified = false

      try {
        const img = await faceapi.fetchImage(imageSrc)
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()

        if (detections.length === 0) {
          setError("No face detected in captured image. Please try again.")
          setCapturing(false)
          return
        }

        // Get face descriptor
        faceDescriptor = detections[0].descriptor

        // If stored face descriptor provided, verify
        if (storedFaceDescriptor) {
          const distance = faceapi.euclideanDistance(faceDescriptor, storedFaceDescriptor)
          
          // Threshold: 0.6 (lower = more strict, 0.6 = good balance)
          // Lower threshold = stricter matching
          const isMatch = distance < 0.6
          setVerificationResult(isMatch)
          
          // Call onVerify callback first
          if (onVerify) {
            onVerify(isMatch)
          }

          if (!isMatch) {
            // Face doesn't match - reject
            setError(`Face verification failed! Distance: ${distance.toFixed(3)} (threshold: 0.6). Your face does not match the registered face for this account.`)
            setCapturing(false)
            return // Don't proceed with login
          }

          // Face matches - proceed
          isVerified = true
        } else {
          // No stored face - first time registration
          // Allow capture without verification
          isVerified = true
        }
      } catch (detectionError: any) {
        // If face detection fails
        if (requireVerification) {
          setError("Face detection failed. Please ensure models are loaded and try again.")
          setCapturing(false)
          return
        }
        console.log("Face detection skipped, using basic capture")
        // If models not loaded, still allow (basic mode)
        isVerified = true
      }

      // Only call callback if verified
      if (isVerified) {
        // Call callback with captured image and descriptor
        onFaceCaptured(imageSrc, faceDescriptor)
        
        // Auto close after 1.5 seconds
        setTimeout(() => {
          onClose()
        }, 1500)
      }
    } catch (err: any) {
      console.error("Error capturing face:", err)
      setError(err.message || "Failed to capture image. Please try again.")
    } finally {
      setCapturing(false)
    }
  }

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user" // Front camera
  }

  if (!modelsLoaded) {
    return (
      <div className="face-verification-overlay">
        <div className="face-verification-modal">
          <div className="loading-spinner"></div>
          <p>Loading face detection models...</p>
          {error && (
            <div className="face-error-message" style={{ marginTop: "1rem" }}>
              {error}
            </div>
          )}
          <button 
            className="cancel-btn" 
            onClick={onClose}
            style={{ marginTop: "1rem" }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="face-verification-overlay">
      <div className="face-verification-modal">
        <div className="face-verification-header">
          <h3>Face Verification</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="face-verification-content">
          <div className="camera-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam-video"
            />
            <canvas ref={canvasRef} className="face-canvas" />
            
            {faceDetected && !error.includes("Models not found") && (
              <div className="face-detected-indicator">
                ✓ Face Detected
              </div>
            )}
            {error.includes("Models not found") && (
              <div className="face-detected-indicator" style={{ background: "rgba(251, 191, 36, 0.9)" }}>
                ⚠ Basic Mode (Models not loaded)
              </div>
            )}
          </div>

          {error && (
            <div className="face-error-message">
              {error}
            </div>
          )}

          {verificationResult !== null && (
            <div className={`face-verification-result ${verificationResult ? "success" : "failed"}`}>
              {verificationResult ? "✓ Face Verified Successfully" : "✕ Face Verification Failed"}
            </div>
          )}

          <div className="face-verification-instructions">
            <p>📸 Position your face in the center</p>
            <p>👁️ Look directly at the camera</p>
            <p>💡 Ensure good lighting</p>
          </div>

          <div className="face-verification-actions">
            <button
              className="capture-btn"
              onClick={captureSelfie}
              disabled={capturing}
            >
              {capturing ? "Capturing..." : "Capture Selfie"}
            </button>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
