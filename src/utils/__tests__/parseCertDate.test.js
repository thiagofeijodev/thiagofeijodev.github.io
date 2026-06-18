import { parseCertDate } from "../parseCertDate";

describe("parseCertDate", () => {
  test("converts Mon YYYY to sortable month index", () => {
    expect(parseCertDate("Jan 2024")).toBe(2024 * 12);
    expect(parseCertDate("Mar 2023")).toBe(2023 * 12 + 2);
  });

  test("returns -Infinity for unknown or invalid dates", () => {
    expect(parseCertDate("")).toBe(-Infinity);
    expect(parseCertDate("Present")).toBe(-Infinity);
    expect(parseCertDate("Invalid")).toBe(-Infinity);
  });

  test("sorts Present after dated certifications", () => {
    const certs = [
      { startDate: "Present" },
      { startDate: "Jan 2024" },
      { startDate: "Mar 2023" },
    ];
    const sorted = [...certs].sort(
      (a, b) => parseCertDate(b.startDate) - parseCertDate(a.startDate),
    );
    expect(sorted.map((c) => c.startDate)).toEqual([
      "Jan 2024",
      "Mar 2023",
      "Present",
    ]);
  });

  test("later dates sort higher than earlier dates", () => {
    expect(parseCertDate("Jun 2024")).toBeGreaterThan(
      parseCertDate("Jan 2023"),
    );
  });
});
