import { resolve } from "path";
import { fileURLToPath } from "url";
import { buildLinkedInData } from "../parse-linkedin-export.js";

const fixturesDir = resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../__fixtures__/minimal-export",
);

describe("buildLinkedInData", () => {
  test("parses minimal LinkedIn export into structured data", async () => {
    const data = await buildLinkedInData(fixturesDir);

    expect(data.profile).toEqual({
      firstName: "Jane",
      lastName: "Doe",
      headline: "Software Engineer",
      summary: "Experienced developer.",
      industry: "Technology",
      location: "San Francisco, CA",
      website: "https://example.com",
    });

    expect(data.experience).toEqual([
      {
        title: "Developer",
        company: "Acme Corp",
        startDate: "Jan 2022",
        endDate: "Jun 2024",
        description: "Built web apps.",
      },
    ]);

    expect(data.education).toEqual([
      {
        school: "State University",
        degree: "BS Computer Science",
        startDate: "Sep 2018",
        endDate: "May 2022",
        notes: "Honors",
      },
    ]);

    expect(data.certifications).toEqual([
      {
        name: "AWS Certified",
        authority: "Amazon",
        url: "https://aws.example.com",
        licenseNumber: "ABC-123",
        startDate: "Mar 2023",
        endDate: "Present",
      },
    ]);

    expect(data.skills).toEqual(["React", "TypeScript"]);

    expect(data.posts).toHaveLength(2);
    expect(data.posts[0]).toMatchObject({
      title: "Hello world.",
      url: "https://linkedin.com/post/1",
      date: "Jun 2024",
      excerpt: "This is a longer excerpt for testing.",
    });
    expect(data.posts[1]).toMatchObject({
      title: "Short post.",
      date: "Jan 2023",
    });
  });
});
