jest.mock("child_process", () => ({
  execFile: jest.fn(),
}));

describe("extractZip", () => {
  let extractZip;
  let execFile;

  beforeEach(async () => {
    jest.resetModules();
    ({ execFile } = await import("child_process"));
    execFile.mockReset();
    ({ extractZip } = await import("../extractZip.js"));
  });

  test("extracts zip to a temp directory and returns its path", async () => {
    execFile.mockImplementation((cmd, args, cb) => {
      cb(null, "", "");
    });

    const tmpPath = await extractZip("/path/to/export.zip");

    expect(tmpPath).toMatch(/^.*linkedin-export-/);
    expect(execFile).toHaveBeenCalledWith(
      "unzip",
      ["-o", "/path/to/export.zip", "-d", tmpPath],
      expect.any(Function),
    );
  });

  test("throws when unzip fails", async () => {
    execFile.mockImplementation((cmd, args, cb) => {
      const err = new Error("unzip failed");
      err.code = 1;
      cb(err);
    });

    await expect(extractZip("/bad.zip")).rejects.toThrow("unzip failed");
  });
});
