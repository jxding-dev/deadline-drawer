import { TABS } from '../data/tabs'
import './TabBar.css'

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar" aria-label="화면 전환">
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            className="tab"
            data-active={isActive}
            data-tab={tab.id}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange(tab.id)}
          >
            <span className="tab__icon" aria-hidden="true" />
            <span className="tab__label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
