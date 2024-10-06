interface FormatDateInput {
  date: string // UTC date string
  timezone?: string
}

export function formatDateToShortMonthDayYearTime({ date, timezone }: FormatDateInput): string {
  const dateObj = new Date(date)

  if (!timezone) {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }

  const formattedDate = dateObj.toLocaleString('en-US', options)

  return formattedDate.replace(',', '').replace('at ', '-')
}
