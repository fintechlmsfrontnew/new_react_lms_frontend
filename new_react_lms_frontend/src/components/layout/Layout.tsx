import { Link, Outlet } from "react-router-dom"
import "./Layout.css"

export function Layout() {
  return (
    <div className="layout-wrap">
      <aside className="layout-sidebar">
        <p className="sidebar-logo">धनwalle</p>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/loans">Loans</Link>
        </nav>
      </aside>
      <div className="layout-main">
        <header className="layout-header">
          <span>Header</span>
        </header>
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
