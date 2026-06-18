import { generatePath } from "../generatePath";

describe("generatePath", () => {
  test("returns empty string when dimensions or count are missing", () => {
    expect(generatePath(0, 100, 2)).toBe("");
    expect(generatePath(100, 0, 2)).toBe("");
    expect(generatePath(100, 100, 0)).toBe("");
  });

  test("generates move and curve commands for a single segment", () => {
    const path = generatePath(100, 100, 1);
    expect(path).toMatch(/^M 25 0/);
    expect(path).toContain(" C ");
    expect(path).toContain("75");
  });

  test("alternates control points for multiple segments", () => {
    const path = generatePath(200, 200, 2);
    expect(path.match(/ C /g)).toHaveLength(2);
  });
});
