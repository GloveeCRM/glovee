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
