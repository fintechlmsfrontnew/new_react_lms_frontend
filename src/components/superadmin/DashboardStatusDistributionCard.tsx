/**
 * Status Distribution card: Donut chart using SVG paths (arcs) - guaranteed perfect circle.
 */
type DashboardStatusDistributionCardProps = {
  completed: number
  pending: number
  cancelled: number
}

export function DashboardStatusDistributionCard({
  completed,
  pending,
  cancelled,
}: DashboardStatusDistributionCardProps) {
  const total = completed + pending + cancelled
  const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0
  const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0
  const cancelledPercent = total > 0 ? Math.round((cancelled / total) * 100) : 0

  // SVG donut chart dimensions
  const size = 240
  const center = size / 2
  const outerRadius = 100 // Outer radius of donut
  const innerRadius = 60  // Inner radius of donut (creates the hole)
  
  // Helper function to create arc path
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    outerR: number,
    innerR: number
  ): string => {
    const startAngleRad = ((startAngle - 90) * Math.PI) / 180
    const endAngleRad = ((endAngle - 90) * Math.PI) / 180
    
    const x1 = center + outerR * Math.cos(startAngleRad)
    const y1 = center + outerR * Math.sin(startAngleRad)
    const x2 = center + outerR * Math.cos(endAngleRad)
    const y2 = center + outerR * Math.sin(endAngleRad)
    
    const x3 = center + innerR * Math.cos(endAngleRad)
    const y3 = center + innerR * Math.sin(endAngleRad)
    const x4 = center + innerR * Math.cos(startAngleRad)
    const y4 = center + innerR * Math.sin(startAngleRad)
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
    
    return [
      `M ${x1} ${y1}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ')
  }

  // Calculate angles for each segment
  const completedStartAngle = 0
  const completedEndAngle = total > 0 ? (completed / total) * 360 : 0
  
  const pendingStartAngle = completedEndAngle
  const pendingEndAngle = total > 0 ? completedEndAngle + (pending / total) * 360 : completedEndAngle
  
  const cancelledStartAngle = pendingEndAngle
  const cancelledEndAngle = 360

  // Calculate text positions for percentages
  const getTextPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2
    const angleRad = ((midAngle - 90) * Math.PI) / 180
    const textRadius = (outerRadius + innerRadius) / 2
    const x = center + textRadius * Math.cos(angleRad)
    const y = center + textRadius * Math.sin(angleRad)
    return { x, y }
  }

  const completedTextPos = getTextPosition(completedStartAngle, completedEndAngle)
  const pendingTextPos = getTextPosition(pendingStartAngle, pendingEndAngle)
  const cancelledTextPos = getTextPosition(cancelledStartAngle, cancelledEndAngle)

  return (
    <div className="dashboard-status-distribution-card">
      <div className="dashboard-status-distribution-content">
        <div className="dashboard-status-distribution-left">
          <div className="dashboard-status-distribution-header">
            <h3 className="dashboard-status-distribution-title">Status Distribution</h3>
            <p className="dashboard-status-distribution-subtitle">Current application status overview</p>
          </div>
          <div className="dashboard-status-distribution-legend">
            <div className="dashboard-status-distribution-legend-item">
              <span className="dashboard-status-distribution-legend-dot dashboard-status-distribution-legend-dot--completed"></span>
              <span className="dashboard-status-distribution-legend-label">Completed</span>
              <span className="dashboard-status-distribution-legend-value">{completed}</span>
            </div>
            <div className="dashboard-status-distribution-legend-item">
              <span className="dashboard-status-distribution-legend-dot dashboard-status-distribution-legend-dot--pending"></span>
              <span className="dashboard-status-distribution-legend-label">Pending</span>
              <span className="dashboard-status-distribution-legend-value">{pending}</span>
            </div>
            <div className="dashboard-status-distribution-legend-item">
              <span className="dashboard-status-distribution-legend-dot dashboard-status-distribution-legend-dot--cancelled"></span>
              <span className="dashboard-status-distribution-legend-label">Cancelled</span>
              <span className="dashboard-status-distribution-legend-value">{cancelled}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-status-distribution-chart">
          <div className="dashboard-status-distribution-chart-wrapper">
            <svg 
              width={size} 
              height={size} 
              viewBox={`0 0 ${size} ${size}`} 
              className="dashboard-status-distribution-donut-svg"
            >
              <defs>
                <filter id="donutShadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
                </filter>
                <filter id="donutGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Gradient for Completed (Green) */}
                <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="1" />
                </linearGradient>
                
                {/* Gradient for Pending (Orange) */}
                <linearGradient id="pendingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
                </linearGradient>
                
                {/* Gradient for Cancelled (Red) */}
                <linearGradient id="cancelledGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Completed segment (Green) */}
              {completed > 0 && (
                <>
                  <path
                    d={createArcPath(completedStartAngle, completedEndAngle, outerRadius, innerRadius)}
                    fill="url(#completedGradient)"
                    filter="url(#donutShadow)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    className="donut-segment donut-segment--completed"
                  />
                  {completedPercent >= 3 && (
                    <text
                      x={completedTextPos.x}
                      y={completedTextPos.y}
                      fill="white"
                      fontSize="17"
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      filter="url(#donutGlow)"
                      style={{ 
                        textShadow: "0 2px 6px rgba(0,0,0,0.6), 0 0 8px rgba(16,185,129,0.3)", 
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {completedPercent}%
                    </text>
                  )}
                </>
              )}

              {/* Pending segment (Orange) */}
              {pending > 0 && (
                <>
                  <path
                    d={createArcPath(pendingStartAngle, pendingEndAngle, outerRadius, innerRadius)}
                    fill="url(#pendingGradient)"
                    filter="url(#donutShadow)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    className="donut-segment donut-segment--pending"
                  />
                  {pendingPercent >= 3 && (
                    <text
                      x={pendingTextPos.x}
                      y={pendingTextPos.y}
                      fill="white"
                      fontSize="17"
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      filter="url(#donutGlow)"
                      style={{ 
                        textShadow: "0 2px 6px rgba(0,0,0,0.6), 0 0 8px rgba(245,158,11,0.3)", 
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {pendingPercent}%
                    </text>
                  )}
                </>
              )}

              {/* Cancelled segment (Red) */}
              {cancelled > 0 && (
                <>
                  <path
                    d={createArcPath(cancelledStartAngle, cancelledEndAngle, outerRadius, innerRadius)}
                    fill="url(#cancelledGradient)"
                    filter="url(#donutShadow)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                    className="donut-segment donut-segment--cancelled"
                  />
                  {cancelledPercent >= 3 && (
                    <text
                      x={cancelledTextPos.x}
                      y={cancelledTextPos.y}
                      fill="white"
                      fontSize="17"
                      fontWeight="800"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      filter="url(#donutGlow)"
                      style={{ 
                        textShadow: "0 2px 6px rgba(0,0,0,0.6), 0 0 8px rgba(239,68,68,0.3)", 
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {cancelledPercent}%
                    </text>
                  )}
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
