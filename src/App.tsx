import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { SuperAdminLayout } from "./components/superadmin/SuperAdminLayout"
import { SuperAdminDashboardPage } from "./pages/superadmin/SuperAdminDashboardPage"
import { SuperAdminActionPlanPage } from "./pages/superadmin/SuperAdminActionPlanPage"
import { SuperAdminAddEmployeePage } from "./pages/superadmin/SuperAdminAddEmployeePage"
import { SuperAdminDisbursedLeadsReloanPage } from "./pages/superadmin/SuperAdminDisbursedLeadsReloanPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboardPage />} />
        <Route path="action-plan" element={<SuperAdminActionPlanPage />} />
        <Route path="add-employee" element={<SuperAdminAddEmployeePage />} />
        <Route path="disbursed-leads-reloan" element={<SuperAdminDisbursedLeadsReloanPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
