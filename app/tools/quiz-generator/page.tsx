import type { Metadata } from "next";
import Link from "next/link";
import QuizGenerator from "./quiz-generator";

export const metadata: Metadata = {
  title: "Free Quiz Generator for Teachers",
  description: "Create editable classroom quizzes with multiple-choice and short-answer questions, answer keys and print-ready PDF output.",
};

export default function QuizGeneratorPage() {
  return (
    <main className="tool-page">
      <nav className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><Link className="back-link" href="/">← Back to toolkit</Link></nav>
      <section className="tool-intro wrap"><div className="eyebrow"><span className="eyebrow-dot" /> CLASSROOM TOOL 04</div><h1>Check understanding.<br /><em>Celebrate progress.</em></h1><p>Create a quick classroom quiz, edit every question and answer, then print a student copy with a separate teacher answer key.</p></section>
      <QuizGenerator />
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Made to make teaching a little easier.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
