# CSS Files – Kahan Kya Hai (Inspect ke baad search kaise karein)

Browser mein **Inspect** karke jo **class name** dikhe (jaise `dashboard-metric-card`), usko Cursor/VS Code mein **Ctrl+Shift+F** (Find in Files) se search karein. Neeche diye map se andaza ho jayega kaun si file kahan use ho rahi hai.

---

## 1. `src/index.css`
- **Kya hai:** Global styles (body, reset, fonts).
- **Kahan use:** `main.tsx` import karta hai – poore app pe lagta hai.

---

## 2. `src/pages/LoginPage.css`
- **Kya hai:** Login page – left/right split, form, logo, button.
- **Class names (search in project):**  
  `login-page`, `login-left`, `login-right`, `login-form-wrap`, `login-input`, `login-btn`, `login-logo-img`, `login-password-wrap`, `login-eye`, `login-forgot`, etc.
- **Kaun import karta hai:** `src/pages/LoginPage.tsx`

---

## 3. `src/components/superadmin/SuperAdminLayout.css`
- **Kya hai:** Sidebar, header, main content area, hamburger, overlay.
- **Class names:**  
  `superadmin-layout`, `superadmin-sidebar`, `superadmin-main-wrap`, `superadmin-header`, `superadmin-sidebar-toggle`, `superadmin-header-greeting`, `superadmin-header-search`, `superadmin-main-content`, `superadmin-sidebar-overlay`, `hamburger-icon`, etc.
- **Kaun import karta hai:** `src/components/superadmin/SuperAdminLayout.tsx`

---

## 4. `src/components/superadmin/SuperAdminDashboard.css`
- **Kya hai:** Dashboard cards, date range, metric cards, status distribution, balance chart, **aur Disbursed Leads Reloan page** (table, filters, rows).
- **Class names:**  
  - Dashboard: `dashboard-metric-card`, `dashboard-metric-card-title`, `dashboard-metric-card-rupee`, `dashboard-metric-card-value`, `dashboard-metric-card-breakdown`, `superadmin-dashboard-page`, `superadmin-dashboard-cards-grid`, `superadmin-dashboard-section`, `dashboard-date-range-*`, `dashboard-status-distribution-*`, `dashboard-balance-*`, `dashboard-total-finances-*`  
  - Disbursed Leads: `disbursed-leads-reloan-page`, `disbursed-leads-reloan-main-panel`, `disbursed-leads-reloan-header`, `disbursed-leads-reloan-filters`, `disbursed-leads-reloan-table-wrap`, `disbursed-leads-reloan-row-card`, `disbursed-leads-reloan-search`, `disbursed-leads-reloan-details-btn`, etc.
- **Kaun import karta hai:**  
  - `src/pages/superadmin/SuperAdminDashboardPage.tsx`  
  - `src/pages/superadmin/SuperAdminDisbursedLeadsReloanPage.tsx`

---

## 5. `src/components/layout/Layout.css`
- **Kya hai:** Agar koi purana/generic layout use ho raha ho.
- **Kaun import karta hai:** `src/components/layout/Layout.tsx`

---

## Inspect ke baad kaise search karein

1. Browser mein element pe **Right-click → Inspect**.
2. DevTools mein jo **class** dikhe (jaise `dashboard-metric-card-title`) use copy karein.
3. Cursor/VS Code mein **Ctrl+Shift+F** (Find in Files) kholen.
4. Wahi class name paste karke search karein.
5. Jo **.css** file result mein aaye, wahi file mein woh style hai (aur kabhi .tsx mein inline/style object bhi ho sakta hai).

**Example:**  
- Class dikha `disbursed-leads-reloan-row-card` → search kiya → mila `SuperAdminDashboard.css` → **CSS file: `src/components/superadmin/SuperAdminDashboard.css`**

---

## Short summary

| Page / Area        | CSS File                                      |
|--------------------|-----------------------------------------------|
| Login              | `src/pages/LoginPage.css`                     |
| Sidebar, Header    | `src/components/superadmin/SuperAdminLayout.css` |
| Dashboard + Disbursed Leads table | `src/components/superadmin/SuperAdminDashboard.css` |
| Global             | `src/index.css`                               |

Ab inspect mein jo class dikhe, usko project mein search karke turant pata chal jayega kaun si file kahan hai.
