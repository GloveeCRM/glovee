export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function compareDates(date1: Date, date2: Date): number {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  return d1 > d2 ? 1 : d1 < d2 ? -1 : 0
}
