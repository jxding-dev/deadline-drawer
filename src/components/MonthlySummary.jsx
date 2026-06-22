import './MonthlySummary.css'

// 이번 달 요약: 4개 수치(2열) + 완료율 막대.
export default function MonthlySummary({ stats }) {
  const { total, completed, overdue, onHold, rate } = stats

  return (
    <div className="monthly-summary">
      <div className="completion">
        <div className="completion__head">
          <span className="completion__label">이번 달 완료율</span>
          <span className="completion__value">{rate}%</span>
        </div>
        <div className="completion__track">
          <div className="completion__fill" style={{ width: `${rate}%` }} />
        </div>
      </div>

      <dl className="monthly-summary__list">
        <div className="monthly-summary__row">
          <dt>전체 등록</dt>
          <dd>{total}</dd>
        </div>
        <div className="monthly-summary__row" data-tone="ok">
          <dt>완료</dt>
          <dd>{completed}</dd>
        </div>
        <div className="monthly-summary__row" data-tone="overdue">
          <dt>기한 지남</dt>
          <dd>{overdue}</dd>
        </div>
        <div className="monthly-summary__row">
          <dt>보류</dt>
          <dd>{onHold}</dd>
        </div>
      </dl>
    </div>
  )
}
