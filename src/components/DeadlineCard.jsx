import { formatDday, formatDate, isOverdue, isDueToday } from '../utils/dateUtils'
import { getCategory } from '../data/defaultCategories'
import { getStatus } from '../utils/labelUtils'
import './DeadlineCard.css'

// 마감 항목 한 건을 카드로. D-day 를 가장 크게, 위험할수록 강하게 보여준다.
// 완료/보류는 색을 죽여 긴급 항목과 구분한다.
function getTone(item) {
  if (item.status === 'completed') return 'done'
  if (item.status === 'onHold') return 'hold'
  if (isOverdue(item.dueDate)) return 'overdue'
  if (isDueToday(item.dueDate)) return 'today'
  return 'normal'
}

// 카드 하단 액션. 핸들러가 하나라도 주어질 때만 노출.
const ACTIONS = [
  { key: 'complete', label: '완료' },
  { key: 'postpone', label: '미룸' },
  { key: 'hold', label: '보류' },
  { key: 'edit', label: '수정' },
  { key: 'delete', label: '삭제', tone: 'danger' },
]

export default function DeadlineCard({
  item,
  variant = 'list',
  onOpen,
  onComplete,
  onPostpone,
  onHold,
  onEdit,
  onDelete,
}) {
  const tone = getTone(item)
  const category = getCategory(item.category)
  const status = getStatus(item.status)
  const isHigh = item.importance === 'high'

  const handlers = {
    complete: onComplete,
    postpone: onPostpone,
    hold: onHold,
    edit: onEdit,
    delete: onDelete,
  }
  const hasActions = Object.values(handlers).some(Boolean)

  return (
    <article
      className="deadline-card"
      data-tone={tone}
      data-high={isHigh}
      data-variant={variant}
    >
      <div
        className="deadline-card__main"
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onClick={onOpen ? () => onOpen(item) : undefined}
        onKeyDown={
          onOpen
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onOpen(item)
                }
              }
            : undefined
        }
      >
        <span className="deadline-card__marker" aria-hidden="true" />

        <div className="deadline-card__body">
          <div className="deadline-card__top">
            <h3 className="deadline-card__title">{item.title}</h3>
            <span className="deadline-card__dday">
              {item.dueDate ? formatDday(item.dueDate) : '–'}
            </span>
          </div>

          <div className="deadline-card__meta">
            <span className="deadline-card__category-dot" aria-hidden="true" />
            <span className="deadline-card__category">{category.label}</span>
            {item.dueDate && <span>{formatDate(item.dueDate, 'compact')}</span>}
          </div>

          <div className="deadline-card__tags" aria-label="상태">
            {isHigh && <span className="deadline-card__flag">중요</span>}
            {item.status !== 'pending' && (
              <span className="deadline-card__status" data-color={status.color}>
                {status.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {hasActions && (
        <div className="deadline-card__actions">
          {ACTIONS.map((a) => (
            <button
              key={a.key}
              type="button"
              className="deadline-card__action"
              data-tone={a.tone}
              disabled={!handlers[a.key]}
              onClick={() => handlers[a.key]?.(item)}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
