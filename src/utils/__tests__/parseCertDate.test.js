import { parseCertDate } from "../parseCertDate";

describe("parseCertDate", () => {
  test("converts Mon YYYY to sortable month index", () => {
    expect(parseCertDate("Jan 2024")).toBe(2024 * 12);
    expect(parseCertDate("Mar 2023")).toBe(2023 * 12 + 2);
  });

  test("returns NaN components as NaN for invalid month", () => {
    expect(parseCertDate("")).toBeNaN();
    expect(parseCertDate("Invalid")).toBeNaN();
  });

  test("later dates sort higher than earlier dates", () => {
    expect(parseCertDate("Jun 2024")).toBeGreaterThan(
      parseCertDate("Jan 2023"),
    );
  });
});
