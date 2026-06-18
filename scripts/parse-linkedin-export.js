import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { extractZip } from "./utils/extractZip.js";
import { normalizeDate } from "./utils/normalizeDate.js";
import { parseShareDate } from "./utils/parseShareDate.js";
import { readCSV } from "./utils/readCSV.js";
import { splitCommentary } from "./utils/splitCommentary.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const OUTPUT = resolve(__dirname, "../src/data/linkedin.json");

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error(
      "Usage: npm run parse-linkedin -- <path-to-export-folder-or-zip>",
    );
    process.exit(1);
  }

  const inputPath = resolve(input);
  let exportDir;

  if (inputPath.endsWith(".zip")) {
    console.log(`Extracting ZIP: ${inputPath}`);
    exportDir = await extractZip(inputPath);
    console.log(`Extracted to: ${exportDir}`);
  } else {
    exportDir = inputPath;
  }

  console.log(`Reading export from: ${exportDir}`);

  const positions = await readCSV(exportDir, "Positions.csv");
  const experience = positions.map((p) => ({
    title: p["Title"] || "",
    company: p["Company Name"] || "",
    startDate: normalizeDate(p["Started On"] || ""),
    endDate: normalizeDate(p["Finished On"] || ""),
    description: p["Description"] || "",
  }));

  const skillRows = await readCSV(exportDir, "Skills.csv");
  const skills = skillRows.map((r) => r["Name"] || "").filter(Boolean);

  const certRows = await readCSV(exportDir, "Certifications.csv");
  const certifications = certRows.map((c) => ({
    name: c["Name"] || "",
    authority: c["Authority"] || "",
    url: c["Url"] || "",
    licenseNumber: c["License Number"] || "",
    startDate: normalizeDate(c["Started On"] || ""),
    endDate: normalizeDate(c["Finished On"] || ""),
  }));

  const eduRows = await readCSV(exportDir, "Education.csv");
  const education = eduRows.map((e) => ({
    school: e["School Name"] || "",
    degree: e["Degree Name"] || "",
    startDate: normalizeDate(e["Start Date"] || ""),
    endDate: normalizeDate(e["End Date"] || ""),
    notes: e["Notes"] || "",
  }));

  const profileRows = await readCSV(exportDir, "Profile.csv");
  const profileRow = profileRows[0] ?? {};
  const rawWebsite = profileRow["Websites"] || "";
  const websiteMatch = rawWebsite.match(/:\s*([^\]]+)\]/);
  const profile = {
    firstName: profileRow["First Name"] || "",
    lastName: profileRow["Last Name"] || "",
    headline: profileRow["Headline"] || "",
    summary: profileRow["Summary"] || "",
    industry: profileRow["Industry"] || "",
    location: profileRow["Geo Location"] || "",
    website: websiteMatch ? websiteMatch[1].trim() : "",
  };

  const shares = await readCSV(exportDir, "Shares.csv");
  const posts = shares
    .filter((s) => s["ShareCommentary"] && s["ShareCommentary"].trim())
    .map((s) => {
      const { title, excerpt } = splitCommentary(s["ShareCommentary"]);
      return {
        title,
        url: s["ShareLink"] || "",
        date: parseShareDate(s["Date"] || ""),
        excerpt,
      };
    });

  const existing = JSON.parse(await readFile(OUTPUT, "utf8").catch(() => "{}"));

  const output = {
    ...existing,
    updatedAt: new Date().toISOString().slice(0, 10),
    profile,
    experience,
    education,
    certifications,
    skills,
    posts,
  };

  await writeFile(OUTPUT, JSON.stringify(output, null, 2) + "\n");
  console.log(
    `Done! Wrote ${experience.length} experience, ${education.length} education, ${certifications.length} certifications, ${skills.length} skills, ${posts.length} posts.`,
  );
  console.log(`Output: ${OUTPUT}`);

  console.log("Generating CV PDF...");
  const pdfScript = resolve(__dirname, "generate-cv-pdf.js");
  spawnSync(process.execPath, [pdfScript], { stdio: "inherit" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
