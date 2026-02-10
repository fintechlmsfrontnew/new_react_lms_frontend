import { Link, useLocation } from "react-router-dom"

const SIDEBAR_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: "▦" },
  { path: "/dashboard/action-plan", label: "Action Plan", icon: "⚙" },
  { path: "/dashboard/add-employee", label: "Add Employe", icon: "⊕" },
]

/**
 * Super Admin left sidebar: logo + nav (Dashboard, Action Plan, Add Employe).
 */
export function SuperAdminSidebar() {
  const location = useLocation()

  return (
    <aside className="superadmin-sidebar">
      <div className="superadmin-sidebar-logo">
        <img src="/main_Logo.png" alt="धनwalle" className="superadmin-sidebar-logo-img" />
      </div>
      <nav className="superadmin-sidebar-nav">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`superadmin-sidebar-nav-item ${isActive ? "superadmin-sidebar-nav-item--active" : ""}`}
            >
              <span className="superadmin-sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
