import { useNavigate } from "react-router-dom"
import { DashboardDateRangeSelector } from "../../components/superadmin/DashboardDateRangeSelector"
import { DashboardMetricCard } from "../../components/superadmin/DashboardMetricCard"
import { DashboardStatusDistributionCard } from "../../components/superadmin/DashboardStatusDistributionCard"
import { DashboardBalanceCard } from "../../components/superadmin/DashboardBalanceCard"
import {
  DASHBOARD_SECTION_1_CARDS,
  DASHBOARD_SECTION_2_CARDS,
  DASHBOARD_SECTION_3_METRIC_CARDS,
} from "../../config/dashboardCards"
import type { DashboardMetricCardConfig } from "../../config/dashboardCards"
import "../../components/superadmin/SuperAdminDashboard.css"

/**
 * LMS Super Admin Dashboard Page
 * Renders date range, metric cards (from config/API), status distribution, and balance chart.
 * Card data comes from dashboardCards.ts; replace with API fetch when backend is ready (same shape).
 */
export function SuperAdminDashboardPage() {
  const navigate = useNavigate()

  const renderMetricCard = (config: DashboardMetricCardConfig) => (
    <DashboardMetricCard
      key={config.cardKey}
      cardKey={config.cardKey}
      title={config.title}
      mainValue={config.mainValue}
      showRupeeIcon={config.showRupeeIcon}
      freshValue={config.freshValue}
      freshPercent={config.freshPercent}
      reloanValue={config.reloanValue}
      reloanPercent={config.reloanPercent}
      cardColor={config.cardColor}
      onClick={config.navigateTo ? () => navigate(config.navigateTo!) : undefined}
    />
  )

  return (
    <div className="superadmin-dashboard-page">
      <DashboardDateRangeSelector />

      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-cards-grid">
          {DASHBOARD_SECTION_1_CARDS.map(renderMetricCard)}
        </div>
      </div>

      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-cards-grid">
          {DASHBOARD_SECTION_2_CARDS.map(renderMetricCard)}
        </div>
      </div>

      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-three-cards-grid">
          {DASHBOARD_SECTION_3_METRIC_CARDS.map(renderMetricCard)}
          <DashboardStatusDistributionCard completed={260} pending={21} cancelled={50} />
        </div>
      </div>

      <div className="superadmin-dashboard-section">
        <DashboardBalanceCard />
      </div>
    </div>
  )
}
