/**
 * LMS Dashboard Metric Card
 * Shows: title, main value (with optional ₹), and Fresh/Reloan breakdown.
 * Use showRupeeIcon=true for all amount cards so ₹ is visible on every box.
 * Props are API-ready: when dashboard API returns data, pass same shape here.
 */
export type DashboardMetricCardColor =
  | "green"
  | "orange"
  | "red"
  | "yellow"
  | "purple"
  | "blue"
  | "teal"
  | "grey"

export type DashboardMetricCardProps = {
  /** Card key for API mapping (e.g. "amount_sanctioned") */
  cardKey?: string
  title: string
  /** Main value - include "₹" for amounts (e.g. "₹5,71,480") */
  mainValue: string
  /** Show ₹ in title area - use true for all monetary cards */
  showRupeeIcon?: boolean
  freshValue: string
  freshPercent: string
  reloanValue: string
  reloanPercent: string
  cardColor: DashboardMetricCardColor
  onClick?: () => void
}

const CARD_COLORS: Record<DashboardMetricCardColor, { main: string; light: string }> = {
  green: { main: "#04C84F", light: "#00D3B0" }, // Exact gradient colors from design (Average Loan Size)
  orange: { main: "#F1AF01", light: "#FF8B00" }, // Exact gradient colors from design (Pending Application)
  red: { main: "#C6010D", light: "#FC3845" }, // Exact gradient colors from design (Recovered Overdues Monthwise)
  yellow: { main: "#F3AD02", light: "#FD8B00" }, // Exact gradient colors from design
  purple: { main: "#951AFA", light: "#645CFF" }, // Exact gradient colors from design (Recovered Amount Breakup)
  blue: { main: "#376AA5", light: "#163B6E" }, // Exact gradient colors from design (Fresh Customer Landing)
  teal: { main: "#007770", light: "#007494" }, // Exact gradient colors from design (Recovered Amount)
  grey: { main: "#47576E", light: "#697082" }, // Exact gradient colors from design (Avrage Tenure)
}

/** Prefix with ₹ if not already present (for API values that may come as number or plain string) */
function formatWithRupee(value: string, showRupee: boolean): string {
  if (!showRupee) return value
  const trimmed = String(value).trim()
  return trimmed.startsWith("₹") ? trimmed : `₹${trimmed}`
}

export function DashboardMetricCard({
  cardKey,
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
  const displayMainValue = formatWithRupee(mainValue, showRupeeIcon)
  const displayFreshValue = formatWithRupee(freshValue, true)
  const displayReloanValue = formatWithRupee(reloanValue, true)

  return (
    <div
      className={`dashboard-metric-card ${onClick ? "dashboard-metric-card--clickable" : ""}`}
      style={{
        background: `linear-gradient(180deg, ${colors.main} 0%, ${colors.main} 60%, ${colors.light} 100%)`,
      }}
      onClick={onClick}
      data-lms-card={cardKey ?? undefined}
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
        <span className="dashboard-metric-card-rupee" aria-hidden>₹</span>
      </div>
      <p className="dashboard-metric-card-value">{displayMainValue}</p>
      <div className="dashboard-metric-card-breakdown" style={{ backgroundColor: colors.light }}>
        <div className="dashboard-metric-card-breakdown-item">
          <span className="dashboard-metric-card-breakdown-value">{displayFreshValue}</span>
          <span className="dashboard-metric-card-breakdown-pill">Fresh</span>
          <span className="dashboard-metric-card-breakdown-percent">{freshPercent}</span>
        </div>
        <div className="dashboard-metric-card-breakdown-item">
          <span className="dashboard-metric-card-breakdown-value">{displayReloanValue}</span>
          <span className="dashboard-metric-card-breakdown-pill">Reloan</span>
          <span className="dashboard-metric-card-breakdown-percent">{reloanPercent}</span>
        </div>
      </div>
    </div>
  )
}
