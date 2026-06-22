import Icon from './Icon'
import './SummaryCard.css'

// 홈 상단 요약 카드 1개. 아이콘 칩 + 큰 숫자 + 라벨, 톤별 옅은 배경.
// tone: 'today' | 'overdue' | 'neutral'
export default function SummaryCard({ label, count, tone = 'neutral' }) {
  const iconName = tone === 'overdue' ? 'clock' : 'calendar'
  return (
    <div className="summary-card" data-tone={tone} data-empty={count === 0}>
      <span className="summary-card__icon">
        <Icon name={iconName} size={18} />
      </span>
      <span className="summary-card__count">{count}</span>
      <span className="summary-card__label">{label}</span>
    </div>
  )
}
