/**
 * Ek metric card: title, main value, aur neeche Fresh / Reloan breakdown (value + %).
 * Color prop se card ka background set hota hai.
 */
type DashboardMetricCardProps = {
  title: string
  mainValue: string
  showRupeeIcon?: boolean
  freshValue: string
  freshPercent: string
  reloanValue: string
  reloanPercent: string
  cardColor: "green" | "orange" | "red" | "yellow" | "purple" | "blue" | "teal" | "grey"
  onClick?: () => void
}

const CARD_COLORS: Record<DashboardMetricCardProps["cardColor"], { main: string; light: string }> = {
  green: { main: "#04C84F", light: "#00D3B0" }, // Exact gradient colors from design (Average Loan Size)
  orange: { main: "#F1AF01", light: "#FF8B00" }, // Exact gradient colors from design (Pending Application)
  red: { main: "#C6010D", light: "#FC3845" }, // Exact gradient colors from design (Recovered Overdues Monthwise)
  yellow: { main: "#F3AD02", light: "#FD8B00" }, // Exact gradient colors from design
  purple: { main: "#951AFA", light: "#645CFF" }, // Exact gradient colors from design (Recovered Amount Breakup)
  blue: { main: "#376AA5", light: "#163B6E" }, // Exact gradient colors from design (Fresh Customer Landing)
  teal: { main: "#007770", light: "#007494" }, // Exact gradient colors from design (Recovered Amount)
  grey: { main: "#47576E", light: "#697082" }, // Exact gradient colors from design (Avrage Tenure)
}

export function DashboardMetricCard({
  title,
  mainValue,
  showRupeeIcon = true,
  freshValue,
  freshPercent,
  reloanValue,
  reloanPercent,
  cardColor,
  onClick,
}: DashboardMetricCardProps) {
  const colors = CARD_COLORS[cardColor]

  return (
    <div
      className={`dashboard-metric-card ${onClick ? 'dashboard-metric-card--clickable' : ''}`}
      style={{
        background: `linear-gradient(180deg, ${colors.main} 0%, ${colors.main} 60%, ${colors.light} 100%)`,
      }}
      onClick={onClick}
    >
      <div className="dashboard-metric-card-top">
        <span className="dashboard-metric-card-title">
          {title === "Pending Sanction Amount" ? (
            <>
              Pending Sanction<br />Amount
            </>
          ) : (
            title
          )}
        </span>
        {showRupeeIcon && <span className="dashboard-metric-card-rupee">₹</span>}
      </div>
      <p className="dashboard-metric-card-value">{mainValue}</p>
      <div className="dashboard-metric-card-breakdown" style={{ backgroundColor: colors.light }}>
        <div className="dashboard-metric-card-breakdown-item">
          <span className="dashboard-metric-card-breakdown-value">{freshValue}</span>
          <span className="dashboard-metric-card-breakdown-pill">Fresh</span>
          <span className="dashboard-metric-card-breakdown-percent">{freshPercent}</span>
        </div>
        <div className="dashboard-metric-card-breakdown-item">
          <span className="dashboard-metric-card-breakdown-value">{reloanValue}</span>
          <span className="dashboard-metric-card-breakdown-pill">Reloan</span>
          <span className="dashboard-metric-card-breakdown-percent">{reloanPercent}</span>
        </div>
      </div>
    </div>
  )
}
