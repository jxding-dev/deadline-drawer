// JSON 백업 만들기 / 파싱·검증. 잘못된 파일이 들어와도 throw 하지 않는다.

import { nowISO } from './dateUtils'

export const BACKUP_VERSION = 1

/** 내보내기용 백업 객체. */
export function buildBackup(deadlines, customCategories) {
  return {
    app: 'kkamukgi-jeone',
    version: BACKUP_VERSION,
    exportedAt: nowISO(),
    deadlines,
    categories: customCategories,
  }
}

function isValidDeadline(x) {
  return x && typeof x === 'object' && typeof x.id === 'string' && typeof x.title === 'string'
}

// 누락 필드를 기본값으로 채워 안전한 형태로 정규화.
function normalizeDeadline(d) {
  return {
    id: String(d.id),
    title: String(d.title),
    category: typeof d.category === 'string' ? d.category : 'etc',
    dueDate: typeof d.dueDate === 'string' ? d.dueDate : null,
    importance: ['low', 'medium', 'high'].includes(d.importance) ? d.importance : 'medium',
    status: ['pending', 'completed', 'postponed', 'onHold'].includes(d.status)
      ? d.status
      : 'pending',
    memo: typeof d.memo === 'string' ? d.memo : '',
    createdAt: typeof d.createdAt === 'string' ? d.createdAt : nowISO(),
    updatedAt: typeof d.updatedAt === 'string' ? d.updatedAt : nowISO(),
    postponedCount: Number.isFinite(d.postponedCount) ? d.postponedCount : 0,
    completedAt: typeof d.completedAt === 'string' ? d.completedAt : null,
  }
}

/**
 * 백업 텍스트를 파싱·검증한다.
 * 반환: { ok: true, data: { deadlines, categories } } | { ok: false, error }
 */
export function parseBackup(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    return { ok: false, error: 'JSON 파일을 읽을 수 없어요.' }
  }

  // 백업 객체({deadlines}) 또는 배열(기한 목록)만 허용
  const rawList = Array.isArray(data?.deadlines)
    ? data.deadlines
    : Array.isArray(data)
      ? data
      : null

  if (!rawList) {
    return { ok: false, error: '백업 형식이 올바르지 않아요.' }
  }
  if (!rawList.every(isValidDeadline)) {
    return { ok: false, error: '기한 데이터 형식이 올바르지 않아요.' }
  }

  const deadlines = rawList.map(normalizeDeadline)
  const categories = Array.isArray(data?.categories)
    ? data.categories.filter((c) => c && c.id && c.label)
    : []

  return { ok: true, data: { deadlines, categories } }
}
