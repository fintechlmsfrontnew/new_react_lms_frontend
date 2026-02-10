import { useState, useEffect, useRef } from "react"
import { HiChevronDown } from "react-icons/hi"

/**
 * Balance card: Grouped bar chart showing Sanction and Collection over 12 months.
 */
export function DashboardBalanceCard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sample data in crores (matching screenshot)
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
  const sanction = [6.8, 2.8, 9.8, 5.8, 8.0, 9.8, 2.8, 3.8, 3.8, 4.0, 7.0, 9.8] // in crores
  const collection = [2.8, 4.5, 4.5, 4.5, 4.5, 4.5, 1.8, 6.8, 8.8, 4.5, 7.8, 8.0] // in crores

  const maxValue = 10 // Maximum value in crores
  const chartHeight = 280
  const chartWidth = 1000
  const collectionBarWidth = 15 // Exact width from design tool
  const sanctionBarWidth = 16 // Exact width from design tool
  const barGap = 4
  const groupWidth = collectionBarWidth + sanctionBarWidth + barGap // Total width for both bars
  const availableWidth = chartWidth - 40 // Leave some margin
  const totalGroupsWidth = groupWidth * months.length
  const remainingSpace = availableWidth - totalGroupsWidth
  const groupSpacing = remainingSpace / (months.length - 1)
  const startOffset = 20 // Start position
  const topRadius = 9.53 // Exact border radius from design tool

  // Y-axis values in crores
  const yAxisValues = [1, 2, 5, 10]

  // Normalize value to chart height
  const normalize = (value: number) => (value / maxValue) * chartHeight

  // Calculate bar positions - evenly spaced groups
  const getBarX = (monthIndex: number, isCollection: boolean) => {
    const groupStart = startOffset + monthIndex * (groupWidth + groupSpacing)
    return isCollection ? groupStart : groupStart + collectionBarWidth + barGap
  }

  // Create path for bar with top-only rounded corners
  const createBarPath = (x: number, y: number, width: number, height: number, radius: number) => {
    const topY = y
    const bottomY = y + height
    return `M ${x},${bottomY} L ${x},${topY + radius} Q ${x},${topY} ${x + radius},${topY} L ${x + width - radius},${topY} Q ${x + width},${topY} ${x + width},${topY + radius} L ${x + width},${bottomY} Z`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isPeriodOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsPeriodOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside, true)

    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [isPeriodOpen])

  return (
    <div className="dashboard-balance-card">
      <div className="dashboard-balance-header">
        <div className="dashboard-balance-title-wrap">
          <h3 className="dashboard-balance-title">Balance</h3>
          <div className="dashboard-balance-status">
            <span className="dashboard-balance-status-icon">✓</span>
            <span className="dashboard-balance-status-text">On track</span>
          </div>
        </div>
        <div className="dashboard-balance-controls">
          <div className="dashboard-balance-legend">
            <div className="dashboard-balance-legend-item">
              <span className="dashboard-balance-legend-dot dashboard-balance-legend-dot--sanction"></span>
              <span className="dashboard-balance-legend-label">Sanction</span>
            </div>
            <div className="dashboard-balance-legend-item">
              <span className="dashboard-balance-legend-dot dashboard-balance-legend-dot--collection"></span>
              <span className="dashboard-balance-legend-label">Collection</span>
            </div>
          </div>
          <div className="dashboard-balance-period-wrap" ref={dropdownRef}>
            <button
              type="button"
              className="dashboard-balance-period-trigger"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsPeriodOpen(!isPeriodOpen)
              }}
            >
              <span>{selectedPeriod}</span>
              <HiChevronDown className={`dashboard-balance-period-icon ${isPeriodOpen ? 'dashboard-balance-period-icon--open' : ''}`} />
            </button>
            {isPeriodOpen && (
              <ul className="dashboard-balance-period-dropdown">
                <li>
                  <button
                    type="button"
                    className="dashboard-balance-period-option"
                    onClick={() => {
                      setSelectedPeriod("Monthly")
                      setIsPeriodOpen(false)
                    }}
                  >
                    Monthly
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dashboard-balance-period-option"
                    onClick={() => {
                      setSelectedPeriod("Quarterly")
                      setIsPeriodOpen(false)
                    }}
                  >
                    Quarterly
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dashboard-balance-period-option"
                    onClick={() => {
                      setSelectedPeriod("Yearly")
                      setIsPeriodOpen(false)
                    }}
                  >
                    Yearly
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-balance-chart-container">
        <div className="dashboard-balance-y-axis">
          {yAxisValues.map((val) => (
            <span key={val} className="dashboard-balance-y-label">
              {val}cr
            </span>
          ))}
        </div>
        <div className="dashboard-balance-chart-wrap">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="dashboard-balance-chart"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {yAxisValues.map((val) => (
              <line
                key={val}
                x1="0"
                y1={chartHeight - normalize(val)}
                x2={chartWidth}
                y2={chartHeight - normalize(val)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

            {/* Bars for each month */}
            {months.map((month, index) => {
              const collectionX = getBarX(index, true)
              const sanctionX = getBarX(index, false)
              const collectionHeight = normalize(collection[index])
              const sanctionHeight = normalize(sanction[index])
              const collectionY = chartHeight - collectionHeight
              const sanctionY = chartHeight - sanctionHeight

              return (
                <g key={month}>
                  {/* Collection bar (light blue) - left bar */}
                  <path
                    d={createBarPath(collectionX, collectionY, collectionBarWidth, collectionHeight, topRadius)}
                    fill="#64CFF6"
                    className="dashboard-balance-bar dashboard-balance-bar--collection"
                  />
                  
                  {/* Sanction bar (dark blue) - right bar */}
                  <path
                    d={createBarPath(sanctionX, sanctionY, sanctionBarWidth, sanctionHeight, topRadius)}
                    fill="#1C0D7B"
                    className="dashboard-balance-bar dashboard-balance-bar--sanction"
                  />
                </g>
              )
            })}
          </svg>
        </div>
        <div className="dashboard-balance-x-axis">
          {months.map((month) => (
            <span key={month} className="dashboard-balance-x-label">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

