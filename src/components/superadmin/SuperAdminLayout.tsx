import { useState } from "react"
import { Outlet } from "react-router-dom"
import { SuperAdminHeader } from "./SuperAdminHeader"
import { SuperAdminSidebar } from "./SuperAdminSidebar"
import "./SuperAdminLayout.css"

/**
 * Super Admin layout: sidebar + header + main content.
 * Login ke baad yahi layout dikhega.
 */
export function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="superadmin-layout">
      <SuperAdminSidebar />
      <div className="superadmin-main-wrap">
        <SuperAdminHeader 
          onToggleSidebar={handleToggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        <main className="superadmin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
