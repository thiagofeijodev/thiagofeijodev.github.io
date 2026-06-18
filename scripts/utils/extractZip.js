import { execFile } from "child_process";
import { mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function extractZip(zipPath) {
  const tmpDir = await mkdtemp(join(tmpdir(), "linkedin-export-"));
  await execFileAsync("unzip", ["-o", zipPath, "-d", tmpDir]);
  return tmpDir;
}
