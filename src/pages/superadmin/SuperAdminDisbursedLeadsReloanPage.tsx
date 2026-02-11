import { HiChevronDown, HiUser } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import "../../components/superadmin/SuperAdminDashboard.css";

export function SuperAdminDisbursedLeadsReloanPage() {
  const leads = Array(4).fill({
    leadId: 7180,
    fullName: "Vedanaparthi Sivakumar",
    mobile: 9794981485,
    pan: "MSBPS5643B",
    loanAmount: "₹18,804",
    status: "Loan Disbursed",
    isReloan: true,
    assignee: "Kallu Chaddha",
    assigneeId: 420,
    source: "DHANWALLE",
  });

  return (
    <div className="disbursed-leads-reloan-page">
      {/* Header Pill - Top Right */}
      <div className="disbursed-leads-reloan-header-wrap">
        <div className="disbursed-leads-reloan-header">
          <HiUser className="disbursed-leads-reloan-header-icon" />
          <span>Disbursed Leads Reloan</span>
        </div>
      </div>

      {/* Filters Card */}
      <div className="disbursed-leads-reloan-filters-card">
        <div className="disbursed-leads-reloan-filters">
          <div className="disbursed-leads-reloan-search-wrap">
            <IoSearchOutline className="disbursed-leads-reloan-search-icon" />
            <input
              type="text"
              placeholder="Search by Pan or Mobile"
              className="disbursed-leads-reloan-search"
            />
          </div>

          <div className="disbursed-leads-reloan-sort-wrap">
            <span className="disbursed-leads-reloan-sort-label">Short by:</span>
            <button className="disbursed-leads-reloan-sort-trigger">
              <span>Newest</span>
              <HiChevronDown className="disbursed-leads-reloan-sort-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="disbursed-leads-reloan-table-wrap">
        <table className="disbursed-leads-reloan-table">
          <thead>
            <tr>
              <th>LEAD ID</th>
              <th>FULL NAME</th>
              <th>MOBILE</th>
              <th>PAN</th>
              <th>LOAN AMOUNT</th>
              <th>STATUS</th>
              <th>ASSIGNEE</th>
              <th>SOURCE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr key={i}>
                <td className="disbursed-leads-reloan-table-cell-bold">{lead.leadId}</td>
                <td className="disbursed-leloan-table-cell-bold">{lead.fullName}</td>
                <td>{lead.mobile}</td>
                <td>{lead.pan}</td>
                <td className="disbursed-leads-reloan-table-cell-bold">{lead.loanAmount}</td>
                <td>
                  <span className="disbursed-leads-reloan-status">
                    {lead.status}
                    {lead.isReloan && (
                      <span className="disbursed-leads-reloan-reloan-badge">(Reloan)</span>
                    )}
                  </span>
                </td>
                <td>
                  <div className="disbursed-leads-reloan-assignee">
                    <span className="disbursed-leads-reloan-assignee-name">{lead.assignee}</span>
                    <span className="disbursed-leads-reloan-assignee-id">ID:{lead.assigneeId}</span>
                  </div>
                </td>
                <td className="disbursed-leads-reloan-table-cell-bold">{lead.source}</td>
                <td>
                  <button className="disbursed-leads-reloan-details-btn">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
