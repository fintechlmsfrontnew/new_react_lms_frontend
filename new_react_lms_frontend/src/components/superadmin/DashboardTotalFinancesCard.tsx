import { useState, useRef } from "react"

/**
 * Total Finances card: Area chart showing Incomes and Expenses over 12 months.
 * Figma design exact match with interactive tooltip.
 */
export function DashboardTotalFinancesCard() {
  const [selectedYear, setSelectedYear] = useState("2026")
  const [isYearOpen, setIsYearOpen] = useState(false)
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; value: number; month: string } | null>(null)
  const chartWrapRef = useRef<HTMLDivElement>(null)

  // Sample data matching Figma
  const incomes = [8000, 7500, 9000, 6000, 5500, 10000, 8500, 9200, 8800, 9500, 9000, 8700]
  const expenses = [6000, 5800, 7000, 5000, 4800, 7500, 6500, 8000, 7200, 7800, 7500, 7000]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Now", "Dec"]

  const maxValue = 10000
  const chartHeight = 200
  const chartWidth = 1000

  // Normalize values to chart height
  const normalize = (value: number) => (value / maxValue) * chartHeight

  // Generate smooth area path
  const generateAreaPath = (values: number[]) => {
    let path = `M 0,${chartHeight} `
    values.forEach((val, i) => {
      const x = (i / (values.length - 1)) * chartWidth
      const y = chartHeight - normalize(val)
      if (i === 0) {
        path += `L ${x},${y} `
      } else {
        path += `L ${x},${y} `
      }
    })
    path += `L ${chartWidth},${chartHeight} Z`
    return path
  }

  // Generate line path
  const generateLinePath = (values: number[]) => {
    return values.map((val, i) => {
      const x = (i / (values.length - 1)) * chartWidth
      const y = chartHeight - normalize(val)
      return i === 0 ? `M ${x},${y}` : `L ${x},${y}`
    }).join(" ")
  }

  // Handle mouse move on chart
  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartWrapRef.current) return

    const rect = chartWrapRef.current.getBoundingClientRect()
    const svgRect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - svgRect.left
    const relativeX = (x / svgRect.width) * chartWidth

    // Find nearest data point
    const dataIndex = Math.round((relativeX / chartWidth) * (months.length - 1))
    const clampedIndex = Math.max(0, Math.min(dataIndex, months.length - 1))

    const incomeValue = incomes[clampedIndex]

    // Show tooltip for incomes (as per Figma - shows ₹6000)
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 60,
      value: incomeValue,
      month: months[clampedIndex],
    })
  }

  const handleChartMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <div className="dashboard-total-finances-card">
      <div className="dashboard-total-finances-header">
        <h3 className="dashboard-total-finances-title">Total finances</h3>
        <div className="dashboard-total-finances-year-wrap">
          <button
            type="button"
            className="dashboard-total-finances-year-trigger"
            onClick={() => setIsYearOpen(!isYearOpen)}
          >
            {selectedYear}
            <span className="dashboard-total-finances-year-icon">▼</span>
          </button>
          {isYearOpen && (
            <ul className="dashboard-total-finances-year-dropdown">
              <li>
                <button
                  type="button"
                  className="dashboard-total-finances-year-option"
                  onClick={() => {
                    setSelectedYear("2026")
                    setIsYearOpen(false)
                  }}
                >
                  2026
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dashboard-total-finances-year-option"
                  onClick={() => {
                    setSelectedYear("2025")
                    setIsYearOpen(false)
                  }}
                >
                  2025
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="dashboard-total-finances-chart-container">
        <div className="dashboard-total-finances-y-axis">
          {[0, 2, 4, 6, 8, 10].map((val) => (
            <span key={val} className="dashboard-total-finances-y-label">
              ₹{val}k
            </span>
          ))}
        </div>
        <div className="dashboard-total-finances-chart-wrap" ref={chartWrapRef}>
          {tooltip && tooltip.visible && (
            <div
              className="dashboard-total-finances-tooltip"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
              }}
            >
              ₹{tooltip.value.toLocaleString("en-IN")}
            </div>
          )}
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="dashboard-total-finances-chart"
            preserveAspectRatio="none"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
          >
            <defs>
              <linearGradient id="incomesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 2, 4, 6, 8, 10].map((val) => (
              <line
                key={val}
                x1="0"
                y1={chartHeight - normalize(val * 1000)}
                x2={chartWidth}
                y2={chartHeight - normalize(val * 1000)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

            {/* Expenses area (orange) - drawn first */}
            <path
              d={generateAreaPath(expenses)}
              fill="url(#expensesGradient)"
            />
            <path
              d={generateLinePath(expenses)}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            />

            {/* Incomes area (blue) - drawn on top */}
            <path
              d={generateAreaPath(incomes)}
              fill="url(#incomesGradient)"
            />
            <path
              d={generateLinePath(incomes)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="dashboard-total-finances-x-axis">
          {months.map((month) => (
            <span key={month} className="dashboard-total-finances-x-label">
              {month}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="dashboard-total-finances-legend">
        <div className="dashboard-total-finances-legend-item">
          <span className="dashboard-total-finances-legend-dot dashboard-total-finances-legend-dot--incomes"></span>
          <span className="dashboard-total-finances-legend-label">Incomes</span>
        </div>
        <div className="dashboard-total-finances-legend-item">
          <span className="dashboard-total-finances-legend-dot dashboard-total-finances-legend-dot--expenses"></span>
          <span className="dashboard-total-finances-legend-label">Expenses</span>
        </div>
      </div>
    </div>
  )
}
