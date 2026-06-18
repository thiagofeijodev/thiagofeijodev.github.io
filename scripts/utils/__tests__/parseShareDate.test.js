import { parseShareDate } from "../parseShareDate.js";

describe("parseShareDate", () => {
  test("converts ISO YYYY-MM to Mon YYYY", () => {
    expect(parseShareDate("2024-06")).toBe("Jun 2024");
    expect(parseShareDate("2023-01")).toBe("Jan 2023");
  });

  test("returns empty string for empty input", () => {
    expect(parseShareDate("")).toBe("");
    expect(parseShareDate(null)).toBe("");
    expect(parseShareDate(undefined)).toBe("");
  });

  test("returns original string when format does not match", () => {
    expect(parseShareDate("Jan 2024")).toBe("Jan 2024");
    expect(parseShareDate("invalid")).toBe("invalid");
  });
});
