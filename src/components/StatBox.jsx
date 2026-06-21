import './StatBox.css'

// 통계 수치 한 칸. 숫자를 크게, 라벨은 짧게.
// tone: 'neutral' | 'ok' | 'overdue' | 'hold'
export default function StatBox({ label, value, tone = 'neutral' }) {
  return (
    <div className="stat-box" data-tone={tone} data-empty={value === 0}>
      <span className="stat-box__value">{value}</span>
      <span className="stat-box__label">{label}</span>
    </div>
  )
}
