interface FormatDateInput {
  date: string // UTC date string
  timezone?: string
  format?: 'short' | 'long'
  includeTime?: boolean
}

export function formatDateToShortMonthDayYearTime({
  date,
  timezone,
  format = 'short',
  includeTime = true,
}: FormatDateInput): string {
  const dateObj = new Date(date)

  if (!timezone) {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format,
    day: 'numeric',
    hour: includeTime ? '2-digit' : undefined,
    minute: includeTime ? '2-digit' : undefined,
    hour12: false,
    timeZone: timezone,
  }

  const formattedDate = dateObj.toLocaleString('en-US', options)

  return formattedDate
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
    }
  }

  return 'just now'
}
