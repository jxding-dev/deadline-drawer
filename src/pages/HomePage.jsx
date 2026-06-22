import SummaryCard from '../components/SummaryCard'
import DeadlineCard from '../components/DeadlineCard'
import EmptyState from '../components/EmptyState'
import QuickAddButton from '../components/QuickAddButton'
import {
  getDueTodayItems,
  getThisWeekItems,
  getOverdueItems,
  getUrgentItems,
} from '../utils/deadlineFilters'
import './HomePage.css'

// 홈 = "위험한 기한 알림판". 지금 터질 기한을 가장 먼저 보여준다.
export default function HomePage({ deadlines = [], onOpenItem, onQuickAdd }) {
  const todayCount = getDueTodayItems(deadlines).length
  const weekCount = getThisWeekItems(deadlines).length
  const overdueCount = getOverdueItems(deadlines).length
  const urgent = getUrgentItems(deadlines)
  const primary = urgent[0]
  const rest = urgent.slice(1)

  return (
    <section className="home">
      <section className="home-brief" aria-label="오늘 요약">
        <span className="home-brief__eyebrow">Today Brief</span>
        <p className="home-brief__text">
          오늘 {todayCount}개, 놓친 기한 {overdueCount}개
        </p>
        <div className="home-brief__metrics">
          <SummaryCard label="오늘" count={todayCount} tone="today" />
          <SummaryCard label="이번 주" count={weekCount} tone="neutral" />
          <SummaryCard label="지남" count={overdueCount} tone="overdue" />
        </div>
      </section>

      <div className="home__section">
        <h2 className="home__heading">
          <span>지금 챙겨야 할 기한</span>
          {urgent.length > 0 && (
            <span className="home__heading-count">{urgent.length}</span>
          )}
        </h2>

        {urgent.length > 0 ? (
          <ul className="home__list">
            {primary && (
              <li key={primary.id}>
                <DeadlineCard
                  item={primary}
                  variant="featured"
                  onOpen={onOpenItem}
                />
              </li>
            )}
            {rest.map((item) => (
              <li key={item.id}>
                <DeadlineCard item={item} onOpen={onOpenItem} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="✅"
            title="지금 터질 기한은 없어요"
            hint="오늘 마감이나 기한 지난 일이 생기면 여기에 바로 떠요."
          />
        )}
      </div>

      <QuickAddButton onClick={onQuickAdd} />
    </section>
  )
}
