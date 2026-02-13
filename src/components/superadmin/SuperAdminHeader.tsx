import { HiChevronDown } from "react-icons/hi"

interface SuperAdminHeaderProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

/**
 * Super Admin top bar: logo, sidebar toggle, greeting, search, Admin dropdown, user avatar.
 */
export function SuperAdminHeader({ onToggleSidebar, sidebarOpen }: SuperAdminHeaderProps) {
  return (
    <header className="superadmin-header">
      {/* <div className="superadmin-header-logo">
        <img src="/main_Logo.png" alt="धनwalle" className="superadmin-header-logo-img" />
      </div> */}
      <button 
        type="button" 
        className="superadmin-sidebar-toggle" 
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
      >
        {sidebarOpen ? (
          <span className="sidebar-toggle-icon">‹‹</span>
        ) : (
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        )}
      </button>
      <p className="superadmin-header-greeting">Hello Dhanwalle 👋</p>
      <div className="superadmin-header-search-wrap">
        <span className="superadmin-header-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by Pan or Mobile"
          className="superadmin-header-search"
        />
      </div>
      <div className="superadmin-header-actions">
        <button type="button" className="superadmin-admin-dropdown">
          <span>Admin</span>
          <HiChevronDown className="superadmin-admin-dropdown-icon" />
        </button>
        <div className="superadmin-header-avatar">LY</div>
      </div>
    </header>
  )
}
