import './AppHeader.css'

export default function AppHeader({ onOpenSettings }) {
  return (
    <header className="app-header">
      <div className="app-header__titles">
        <h1 className="app-header__name">까먹지말자</h1>
        <p className="app-header__tagline">놓치기 전에 꺼내보기</p>
      </div>
      {onOpenSettings && (
        <button
          type="button"
          className="app-header__settings"
          onClick={onOpenSettings}
          aria-label="설정"
        >
          <span aria-hidden="true" />
        </button>
      )}
    </header>
  )
}
