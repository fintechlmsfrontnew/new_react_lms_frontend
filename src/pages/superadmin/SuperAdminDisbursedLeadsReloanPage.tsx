import { useState, useEffect } from "react";
import { HiChevronDown, HiUser } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import API_BASE_URL from "../../config/api";
import "../../components/superadmin/SuperAdminDashboard.css";

interface Lead {
  leadId: number;
  fullName: string;
  mobile: number;
  pan: string;
  loanAmount: string;
  status: string;
  isReloan: boolean;
  assignee: string;
  assigneeId: number;
  source: string;
}

export function SuperAdminDisbursedLeadsReloanPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const response = await fetch(`${API_BASE_URL}/leads/disbursed-reloan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || data || []);
      } else {
        const sampleLead: Lead = {
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
        };
        setLeads(Array(4).fill(sampleLead));
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      const sampleLead: Lead = {
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
      };
      setLeads(Array(4).fill(sampleLead));
    } finally {
      setLoading(false);
    }
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                  Loading...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead, i) => (
                <tr key={i}>
                  <td className="disbursed-leads-reloan-table-cell-bold">{lead.leadId}</td>
                  <td className="disbursed-leads-reloan-table-cell-bold">{lead.fullName}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
