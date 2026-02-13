/**
 * LMS Dashboard card config.
 * Replace this with API response when dashboard API is ready (same shape).
 */
import type { DashboardMetricCardColor } from "../components/superadmin/DashboardMetricCard"

export type DashboardMetricCardConfig = {
  cardKey: string
  title: string
  mainValue: string
  showRupeeIcon: boolean
  freshValue: string
  freshPercent: string
  reloanValue: string
  reloanPercent: string
  cardColor: DashboardMetricCardColor
  navigateTo?: string
}

/** Section 1: First 8 cards (financial metrics) */
export const DASHBOARD_SECTION_1_CARDS: DashboardMetricCardConfig[] = [
  {
    cardKey: "amount_sanctioned",
    title: "Amount Sanctioned",
    mainValue: "₹5,71,480",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "green",
    navigateTo: "/dashboard/disbursed-leads-reloan",
  },
  {
    cardKey: "amount_disbursal",
    title: "Amount Disbursal",
    mainValue: "₹5,71,480",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "orange",
  },
  {
    cardKey: "pending_sanction_amount",
    title: "Pending Sanction Amount",
    mainValue: "₹11,95,658",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "red",
  },
  {
    cardKey: "repayment_amount",
    title: "Repayment Amount",
    mainValue: "₹33,21,123",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "yellow",
  },
  {
    cardKey: "unassigned_leads",
    title: "Unassigned Leads",
    mainValue: "224",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "red",
  },
  {
    cardKey: "pending_disbursal_amount",
    title: "Pending Disbursal Amount",
    mainValue: "₹10,54,125",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "purple",
  },
  {
    cardKey: "processing_fees_collected",
    title: "Processing Fees Collected",
    mainValue: "₹4,75,537",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "blue",
  },
  {
    cardKey: "average_loan_size",
    title: "Average Loan Size",
    mainValue: "₹4,34,250",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "green",
  },
]

/** Section 2: Next 8 cards */
export const DASHBOARD_SECTION_2_CARDS: DashboardMetricCardConfig[] = [
  {
    cardKey: "applications",
    title: "Applications",
    mainValue: "186",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "blue",
  },
  {
    cardKey: "applications_disbursed",
    title: "Applications Disbursed",
    mainValue: "₹4,34,250",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "green",
  },
  {
    cardKey: "pending_application",
    title: "Pending Application",
    mainValue: "263",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "orange",
  },
  {
    cardKey: "recovered_amount",
    title: "Recovered Amount",
    mainValue: "₹4,12,123",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "teal",
  },
  {
    cardKey: "average_tenure",
    title: "Avrage Tenure",
    mainValue: "26 days",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "grey",
  },
  {
    cardKey: "recovered_amount_breakup",
    title: "Recovered Amount Breakup",
    mainValue: "₹2,34,250",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "purple",
  },
  {
    cardKey: "rejected_applications",
    title: "Rejected Applications",
    mainValue: "25",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "red",
  },
  {
    cardKey: "fresh_customer_landing",
    title: "Fresh Customer Landing",
    mainValue: "186",
    showRupeeIcon: false,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "blue",
  },
]

/** Section 3: Two metric cards (third is status distribution) */
export const DASHBOARD_SECTION_3_METRIC_CARDS: DashboardMetricCardConfig[] = [
  {
    cardKey: "recovered_overdues_monthwise",
    title: "Recovered Overdues Monthwise",
    mainValue: "₹34,250",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "red",
  },
  {
    cardKey: "total_earnings",
    title: "Total Earnings",
    mainValue: "₹4,34,250",
    showRupeeIcon: true,
    freshValue: "₹5,71,480",
    freshPercent: "76.2%",
    reloanValue: "₹5,71,480",
    reloanPercent: "23.9%",
    cardColor: "green",
  },
]
