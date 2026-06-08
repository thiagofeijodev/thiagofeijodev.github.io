export function parseCSV(text) {
  const lines = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\r' && next === '\n') {
        row.push(field);
        field = '';
        lines.push(row);
        row = [];
        i++;
      } else if (ch === '\n') {
        row.push(field);
        field = '';
        lines.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }

  if (row.length > 0) {
    row.push(field);
    if (row.some((f) => f !== '')) lines.push(row);
  }

  if (lines.length === 0) return [];

  const headers = lines[0].map((h) => h.trim());
  return lines.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, i) => (obj[h] = (cols[i] ?? '').trim()));
    return obj;
  });
}
