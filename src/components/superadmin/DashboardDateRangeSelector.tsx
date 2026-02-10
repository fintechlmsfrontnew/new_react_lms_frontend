import { useState, useEffect, useRef } from "react"
import { HiChevronDown } from "react-icons/hi"

const DATE_RANGE_OPTIONS = [
  "Today",
  "Yesterday",
  "Data Range",
  "This Week",
  "This Month",
  "Last Month",
  "Overall",
]

/**
 * Date range dropdown for dashboard (Today, Yesterday, This Week, etc.).
 */
export function DashboardDateRangeSelector() {
  const [selected, setSelected] = useState("Today")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    // Use click event with capture phase for better detection
    document.addEventListener("click", handleClickOutside, true)

    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [isOpen])

  return (
    <div className="dashboard-date-range-wrap" ref={dropdownRef}>
      <button
        type="button"
        className="dashboard-date-range-trigger"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <span>{selected}</span>
        <HiChevronDown className={`dashboard-date-range-icon ${isOpen ? 'dashboard-date-range-icon--open' : ''}`} />
      </button>
      {isOpen && (
        <ul className="dashboard-date-range-dropdown">
          {DATE_RANGE_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={`dashboard-date-range-option ${selected === option ? "dashboard-date-range-option--active" : ""}`}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
