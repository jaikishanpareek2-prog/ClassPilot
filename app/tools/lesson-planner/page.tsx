import type { Metadata } from "next";
import Link from "next/link";
import LessonPlannerForm from "./lesson-planner-form";

export const metadata: Metadata = {
  title: "Free Lesson Plan Generator",
  description: "Create a structured lesson plan with learning objectives, activities, materials and assessment. Free, quick and easy to edit.",
};

export default function LessonPlannerPage() {
  return (
    <main className="tool-page">
      <nav className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><Link className="back-link" href="/">← Back to toolkit</Link></nav>
      <section className="tool-intro wrap"><div className="eyebrow"><span className="eyebrow-dot" /> CLASSROOM TOOL 01</div><h1>Your next lesson,<br /><em>thoughtfully planned.</em></h1><p>Give us the basics. ClassPilot will shape them into a practical lesson outline you can edit, print and take into class.</p></section>
      <LessonPlannerForm />
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Made to make teaching a little easier.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
