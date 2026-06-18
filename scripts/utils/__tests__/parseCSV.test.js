import { parseCSV } from "../parseCSV.js";

describe("parseCSV", () => {
  test("returns empty array for empty input", () => {
    expect(parseCSV("")).toEqual([]);
  });

  test("returns empty array for header-only file", () => {
    expect(parseCSV("Name,Value\n")).toEqual([]);
  });

  test("parses simple rows", () => {
    const text = "Name,Value\nAlice,1\nBob,2\n";
    expect(parseCSV(text)).toEqual([
      { Name: "Alice", Value: "1" },
      { Name: "Bob", Value: "2" },
    ]);
  });

  test("handles quoted fields with commas", () => {
    const text = 'Name,Description\nAlice,"Hello, world"\n';
    expect(parseCSV(text)).toEqual([
      { Name: "Alice", Description: "Hello, world" },
    ]);
  });

  test("handles escaped quotes inside quoted fields", () => {
    const text = 'Name,Quote\nAlice,"Say ""hi"""\n';
    expect(parseCSV(text)).toEqual([{ Name: "Alice", Quote: 'Say "hi"' }]);
  });

  test("handles CRLF line endings", () => {
    const text = "A,B\r\n1,2\r\n";
    expect(parseCSV(text)).toEqual([{ A: "1", B: "2" }]);
  });

  test("handles LF line endings", () => {
    const text = "A,B\n1,2\n";
    expect(parseCSV(text)).toEqual([{ A: "1", B: "2" }]);
  });

  test("trims header and cell values", () => {
    const text = " Name , Value \n Alice , 1 \n";
    expect(parseCSV(text)).toEqual([{ Name: "Alice", Value: "1" }]);
  });
});
