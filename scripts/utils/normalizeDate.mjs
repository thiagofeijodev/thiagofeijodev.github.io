const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function normalizeDate(str) {
  if (!str || !str.trim()) return 'Present';
  str = str.trim();

  if (/^[A-Z][a-z]{2} \d{4}$/.test(str)) return str;

  const isoMatch = str.match(/^(\d{4})-(\d{2})/);
  if (isoMatch) {
    const month = parseInt(isoMatch[2], 10);
    return `${MONTHS[month - 1]} ${isoMatch[1]}`;
  }

  if (/^\d{4}$/.test(str)) return str;

  return str;
}
