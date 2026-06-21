import './SummaryCard.css'

// 홈 상단 요약 카드 1개. count 를 크게, label 을 아래 작게.
// tone: 'today' | 'overdue' | 'neutral' — 색만 바꾼다.
export default function SummaryCard({ label, count, tone = 'neutral' }) {
  return (
    <div className="summary-card" data-tone={tone} data-empty={count === 0}>
      <span className="summary-card__count">{count}</span>
      <span className="summary-card__label">{label}</span>
    </div>
  )
}
