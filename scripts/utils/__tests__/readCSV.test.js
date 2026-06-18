import { fileURLToPath } from "url";
import { readCSV } from "../readCSV.js";

const fixturesDir = fileURLToPath(
  new URL("../../__fixtures__/minimal-export", import.meta.url),
);

describe("readCSV", () => {
  test("reads and parses a CSV from the export folder", async () => {
    const rows = await readCSV(fixturesDir, "Skills.csv");
    expect(rows).toEqual([{ Name: "React" }, { Name: "TypeScript" }]);
  });

  test("returns empty array and warns when file is missing", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const rows = await readCSV(fixturesDir, "Missing.csv");
    expect(rows).toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Missing.csv not found"),
    );
    warnSpy.mockRestore();
  });
});
