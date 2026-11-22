import type { Metadata } from "next";
import Link from "next/link";
import RubricGenerator from "./rubric-generator";

export const metadata: Metadata = {
  title: "Free Rubric Generator for Teachers",
  description: "Build editable classroom assessment rubrics with clear performance levels, criteria and scoring. Print or save your rubric as a PDF.",
};

export default function RubricGeneratorPage() {
  return (
    <main className="tool-page">
      <nav className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><Link className="back-link" href="/">← Back to toolkit</Link></nav>
      <section className="tool-intro wrap"><div className="eyebrow"><span className="eyebrow-dot" /> CLASSROOM TOOL 05</div><h1>Make expectations clear.<br /><em>Make progress visible.</em></h1><p>Create a practical assessment rubric with editable criteria and performance descriptions. Adapt it to your class, then print or save it as a PDF.</p></section>
      <RubricGenerator />
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Made to make teaching a little easier.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
