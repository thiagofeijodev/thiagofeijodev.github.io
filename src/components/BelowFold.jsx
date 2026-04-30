import CV from "./CV";
import Education from "./Education";
import Certifications from "./Certifications";
import Skills from "./Skills";
import BlogPosts from "./BlogPosts";
import Projects from "./Projects";
import SectionNav from "./SectionNav";
import linkedinData from "../data/linkedin.json";

const BelowFold = () => (
  <div>
    <SectionNav />
    <CV experience={linkedinData.experience} />
    <Education education={linkedinData.education ?? []} />
    <Certifications certifications={linkedinData.certifications ?? []} />
    <Projects projects={linkedinData.projects} />
    <Skills skills={linkedinData.skills} />
    <BlogPosts posts={linkedinData.posts} />
  </div>
);

export default BelowFold;
