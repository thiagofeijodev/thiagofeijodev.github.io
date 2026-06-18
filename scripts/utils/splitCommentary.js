export function splitCommentary(text) {
  if (!text) return { title: "", excerpt: "" };
  text = text.trim();

  const sentenceEnd = text.search(/[.!?]\s/);
  if (sentenceEnd > 0 && sentenceEnd < 120) {
    return {
      title: text.slice(0, sentenceEnd + 1).trim(),
      excerpt: text.slice(sentenceEnd + 2).trim(),
    };
  }

  if (text.length <= 80) return { title: text, excerpt: "" };

  const cut = text.lastIndexOf(" ", 80);
  const boundary = cut > 0 ? cut : 80;
  return {
    title: text.slice(0, boundary).trim(),
    excerpt: text.slice(boundary).trim(),
  };
}
