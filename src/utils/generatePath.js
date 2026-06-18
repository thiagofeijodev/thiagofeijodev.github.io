export function generatePath(w, h, n) {
  if (!w || !h || !n) return "";
  const step = h / n;
  const lx = w * 0.25;
  const rx = w * 0.75;
  let d = `M ${lx} 0`;
  for (let i = 0; i < n; i++) {
    const y1 = i * step;
    const y2 = (i + 1) * step;
    const sx = i % 2 === 0 ? lx : rx;
    const ex = i % 2 === 0 ? rx : lx;
    d += ` C ${sx} ${y1 + step * 0.5} ${ex} ${y1 + step * 0.5} ${ex} ${y2}`;
  }
  return d;
}
