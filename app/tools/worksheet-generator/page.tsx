import type { Metadata } from "next";
import Link from "next/link";
import WorksheetGenerator from "./worksheet-generator";

export const metadata: Metadata = {
  title: "Free Worksheet Generator for Teachers",
  description: "Create printable classroom worksheets with editable questions and an answer key. Choose a subject, grade and topic. Free and easy to use.",
};

export default function WorksheetGeneratorPage() {
  return (
    <main className="tool-page">
      <nav className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><Link className="back-link" href="/">← Back to toolkit</Link></nav>
      <section className="tool-intro wrap"><div className="eyebrow"><span className="eyebrow-dot" /> CLASSROOM TOOL 03</div><h1>Practice that makes<br /><em>learning stick.</em></h1><p>Build a classroom worksheet in moments. Choose your subject and topic, edit the questions, then print a clean student copy with an optional answer key.</p></section>
      <WorksheetGenerator />
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Made to make teaching a little easier.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
