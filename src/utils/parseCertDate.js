const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export function parseCertDate(str = "") {
  const trimmed = str.trim();
  if (!trimmed || trimmed === "Present") return -Infinity;

  const [mon, year] = trimmed.split(" ");
  const parsedYear = parseInt(year, 10);
  if (Number.isNaN(parsedYear)) return -Infinity;

  return parsedYear * 12 + (MONTHS[mon] ?? 0);
}
