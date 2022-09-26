export function isValidDate(date: any) {
  return date instanceof Date && isFinite(date.getTime());
}
