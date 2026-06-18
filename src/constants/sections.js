export const SNAP_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "posts", label: "Recent Posts" },
];

export const NAV_SECTIONS = SNAP_SECTIONS.filter(({ id }) => id !== "hero");
