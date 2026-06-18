const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseShareDate(str) {
  const m = str && str.match(/^(\d{4})-(\d{2})/);
  if (!m) return str || "";
  return `${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`;
}
