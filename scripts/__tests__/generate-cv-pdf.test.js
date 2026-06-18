import { readFile, mkdtemp, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";
import { writeCvPdf } from "../generate-cv-pdf.js";

const fixturePath = fileURLToPath(
  new URL("../__fixtures__/sample-linkedin.json", import.meta.url),
);

describe("writeCvPdf", () => {
  let tempDir;
  let sampleData;

  beforeAll(async () => {
    sampleData = JSON.parse(await readFile(fixturePath, "utf8"));
  });

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), "cv-pdf-test-"));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  test("writes a valid PDF file", async () => {
    const outputPath = join(tempDir, "cv.pdf");
    await writeCvPdf(sampleData, outputPath);

    const buffer = await readFile(outputPath);
    expect(buffer.length).toBeGreaterThan(0);
    expect(buffer.subarray(0, 4).toString()).toBe("%PDF");
  });
});
