import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const DATA = resolve(scriptDir, "../src/data/linkedin.json");
const OUTPUT = resolve(scriptDir, "../public/cv.pdf");

const DARK = "#1a1a1a";
const MID = "#444444";
const LIGHT = "#777777";
const ACCENT = "#2563eb";

function rule(doc) {
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .strokeColor("#dddddd")
    .lineWidth(0.5)
    .stroke();
  doc.moveDown(0.5);
}

function sectionHeading(doc, text) {
  doc.moveDown(0.8);
  doc
    .fontSize(11)
    .fillColor(ACCENT)
    .font("Helvetica-Bold")
    .text(text.toUpperCase(), 50, doc.y, { characterSpacing: 1.2 });
  doc.moveDown(0.25);
  rule(doc);
}

function bodyText(doc, text) {
  doc.fontSize(9.5).fillColor(MID).font("Helvetica").text(text, 50, doc.y, {
    width: 495,
    lineGap: 2,
  });
}

export async function writeCvPdf(data, outputPath) {
  const {
    profile = {},
    experience = [],
    education = [],
    certifications = [],
    skills = [],
  } = data;

  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
    info: { Title: "CV" },
  });
  const stream = createWriteStream(outputPath);
  doc.pipe(stream);

  const name = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  doc
    .fontSize(24)
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .text(name || "Curriculum Vitae", 50, 50, { align: "center" });

  doc.moveDown(0.3);
  const meta = [profile.headline, profile.location, profile.website]
    .filter(Boolean)
    .join("  ·  ");
  doc
    .fontSize(9.5)
    .fillColor(LIGHT)
    .font("Helvetica")
    .text(meta, 50, doc.y, { align: "center" });

  doc.moveDown(0.6);
  rule(doc);

  if (profile.summary) {
    sectionHeading(doc, "Summary");
    bodyText(doc, profile.summary);
  }

  if (experience.length) {
    sectionHeading(doc, "Experience");
    for (const job of experience) {
      const dates = `${job.startDate} — ${job.endDate}`;
      const titleY = doc.y;
      doc
        .fontSize(10)
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .text(job.title, 50, titleY, { continued: false, width: 350 });
      doc
        .fontSize(9)
        .fillColor(LIGHT)
        .font("Helvetica")
        .text(dates, 395, titleY, { width: 150, align: "right" });
      doc
        .fontSize(9.5)
        .fillColor(MID)
        .font("Helvetica-Oblique")
        .text(job.company, 50, doc.y);
      if (job.description) {
        doc.moveDown(0.2);
        bodyText(doc, job.description);
      }
      doc.moveDown(0.6);
    }
  }

  if (education.length) {
    sectionHeading(doc, "Education");
    for (const edu of education) {
      const dates = `${edu.startDate} — ${edu.endDate}`;
      const titleY = doc.y;
      doc
        .fontSize(10)
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .text(edu.school, 50, titleY, { width: 350 });
      doc
        .fontSize(9)
        .fillColor(LIGHT)
        .font("Helvetica")
        .text(dates, 395, titleY, { width: 150, align: "right" });
      if (edu.degree) {
        doc
          .fontSize(9.5)
          .fillColor(MID)
          .font("Helvetica-Oblique")
          .text(edu.degree, 50, doc.y);
      }
      doc.moveDown(0.6);
    }
  }

  if (certifications.length) {
    sectionHeading(doc, "Certifications");
    for (const cert of certifications) {
      const titleY = doc.y;
      doc
        .fontSize(10)
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .text(cert.name, 50, titleY, { width: 350 });
      if (cert.startDate) {
        doc
          .fontSize(9)
          .fillColor(LIGHT)
          .font("Helvetica")
          .text(cert.startDate, 395, titleY, { width: 150, align: "right" });
      }
      if (cert.authority) {
        doc
          .fontSize(9.5)
          .fillColor(MID)
          .font("Helvetica-Oblique")
          .text(cert.authority, 50, doc.y);
      }
      if (cert.licenseNumber) {
        doc
          .fontSize(8.5)
          .fillColor(LIGHT)
          .font("Helvetica")
          .text(`License: ${cert.licenseNumber}`, 50, doc.y);
      }
      doc.moveDown(0.6);
    }
  }

  if (skills.length) {
    sectionHeading(doc, "Skills");
    doc
      .fontSize(9.5)
      .fillColor(MID)
      .font("Helvetica")
      .text(skills.join("  ·  "), 50, doc.y, { width: 495, lineGap: 2 });
  }

  doc.end();
  await new Promise((res, rej) => {
    stream.on("finish", res);
    stream.on("error", rej);
  });
}

async function main() {
  const data = JSON.parse(await readFile(DATA, "utf8"));
  await writeCvPdf(data, OUTPUT);
  console.log(`CV PDF generated: ${OUTPUT}`);
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
