import { useNavigate } from "react-router-dom"
import { DashboardDateRangeSelector } from "../../components/superadmin/DashboardDateRangeSelector"
import { DashboardMetricCard } from "../../components/superadmin/DashboardMetricCard"
import { DashboardStatusDistributionCard } from "../../components/superadmin/DashboardStatusDistributionCard"
import { DashboardBalanceCard } from "../../components/superadmin/DashboardBalanceCard"
import "../../components/superadmin/SuperAdminDashboard.css"

/**
 * Super Admin ka main dashboard: date range selector + teeno sections (8 cards + 8 cards + 3 cards with chart).
 * Login ke baad yahi page dikhega.
 */
export function SuperAdminDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="superadmin-dashboard-page">
      <DashboardDateRangeSelector />

      {/* Section 1: Pehli 8 cards */}
      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-cards-grid">
          <DashboardMetricCard
            title="Amount Sanctioned"
            mainValue="₹5,71,480"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="green"
            onClick={() => navigate("/dashboard/disbursed-leads-reloan")}
          />
          <DashboardMetricCard
            title="Amount Disbursal"
            mainValue="₹5,71,480"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="orange"
          />
          <DashboardMetricCard
            title="Pending Sanction Amount"
            mainValue="₹11,95,658"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="red"
          />
          <DashboardMetricCard
            title="Repayment Amount"
            mainValue="₹33,21,123"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="yellow"
          />
          <DashboardMetricCard
            title="Unassigned Leads"
            mainValue="224"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="red"
          />
          <DashboardMetricCard
            title="Pending Disbursal Amount"
            mainValue="₹10,54,125"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="purple"
          />
          <DashboardMetricCard
            title="Processing Fees Collected"
            mainValue="₹4,75,537"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="blue"
          />
          <DashboardMetricCard
            title="Average Loan Size"
            mainValue="₹4,34,250"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="green"
          />
        </div>
      </div>

      {/* Section 2: Doosri 8 cards */}
      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-cards-grid">
          <DashboardMetricCard
            title="Applications"
            mainValue="186"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="blue"
          />
          <DashboardMetricCard
            title="Applications Disbursed"
            mainValue="₹4,34,250"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="green"
          />
          <DashboardMetricCard
            title="Pending Application"
            mainValue="263"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="orange"
          />
          <DashboardMetricCard
            title="Recovered Amount"
            mainValue="₹4,12,123"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="teal"
          />
          <DashboardMetricCard
            title="Avrage Tenure"
            mainValue="26 days"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="grey"
          />
          <DashboardMetricCard
            title="Recovered Amount Breakup"
            mainValue="₹2,34,250"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="purple"
          />
          <DashboardMetricCard
            title="Rejected Applications"
            mainValue="25"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="red"
          />
          <DashboardMetricCard
            title="Fresh Customer Landing"
            mainValue="186"
            showRupeeIcon={false}
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="blue"
          />
        </div>
      </div>

      {/* Section 3: Teesri section - 3 cards (2 metric + 1 status distribution) */}
      <div className="superadmin-dashboard-section">
        <div className="superadmin-dashboard-three-cards-grid">
          <DashboardMetricCard
            title="Recovered Overdues Monthwise"
            mainValue="₹34,250"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="red"
          />
          <DashboardMetricCard
            title="Total Earnings"
            mainValue="₹4,34,250"
            freshValue="₹5,71,480"
            freshPercent="76.2%"
            reloanValue="₹5,71,480"
            reloanPercent="23.9%"
            cardColor="green"
          />
          <DashboardStatusDistributionCard completed={260} pending={21} cancelled={50} />
        </div>
      </div>

      {/* Section 4: Balance Chart - Sabse niche */}
      <div className="superadmin-dashboard-section">
        <DashboardBalanceCard />
      </div>
    </div>
  )
}
