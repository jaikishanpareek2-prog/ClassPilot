import Link from "next/link";

const tools = [
  { number: "01", name: "Lesson planner", detail: "Turn a topic into a clear, teachable lesson.", tag: "Available now", href: "/tools/lesson-planner", icon: "✳" },
  { number: "02", name: "Certificate maker", detail: "Create polished certificates worth keeping.", tag: "Available now", href: "/tools/certificate-maker", icon: "✧" },
  { number: "03", name: "Worksheet builder", detail: "Make practice sheets for every level.", tag: "Available now", href: "/tools/worksheet-generator", icon: "▤" },
  { number: "04", name: "Quiz generator", detail: "Build quick checks for understanding.", tag: "Available now", href: "/tools/quiz-generator", icon: "⌁" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav wrap">
        <Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link>
        <div className="nav-links"><a href="#tools">Explore tools</a><a href="#why">Why ClassPilot</a><Link className="nav-cta" href="/tools/lesson-planner">Try it free <span>↗</span></Link></div>
      </nav>

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A calmer way to teach</div>
          <h1>Less time making.<br /><em>More time teaching.</em></h1>
          <p className="hero-text">The little toolkit that takes the busywork out of your school day. Thoughtful, practical tools made for the people who make learning happen.</p>
          <div className="hero-actions"><Link className="button button-dark" href="/tools/lesson-planner">Make a lesson plan <span>↗</span></Link><a className="text-link" href="#tools">Explore the toolkit <span>↓</span></a></div>
          <div className="hero-note"><span className="note-check">✓</span> Free to get started <span className="note-sep">·</span> No account needed</div>
        </div>
        <div className="hero-art" aria-label="Illustration of a lesson plan workspace">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="paper-card">
            <div className="paper-top"><span>CLASSROOM NOTES</span><span className="paper-star">✳</span></div>
            <div className="paper-title">A little plan.<br /><i>A big idea.</i></div>
            <div className="paper-line line-long" /><div className="paper-line line-short" />
            <div className="paper-section"><span className="paper-icon">01</span><div><b>Learning goal</b><small>What will they discover today?</small></div></div>
            <div className="paper-section"><span className="paper-icon peach">02</span><div><b>Activities</b><small>Make room for curiosity.</small></div></div>
            <div className="paper-section"><span className="paper-icon green">03</span><div><b>Reflection</b><small>Notice what worked.</small></div></div>
            <div className="paper-footer"><span>MADE WITH CLASSPILOT</span><span>✦</span></div>
          </div>
          <div className="floating-note note-top">✦ &nbsp; Your next great lesson</div>
          <div className="floating-note note-bottom"><span className="mini-check">✓</span> One less thing on your list</div>
          <span className="art-spark spark-a">✳</span><span className="art-spark spark-b">✧</span>
        </div>
      </section>

      <section className="trust-strip"><div className="wrap trust-inner"><span>MADE FOR THE EVERYDAY MAGIC OF TEACHING</span><div><b>Simple</b><i>✳</i><b>Useful</b><i>✳</i><b>Teacher-first</b><i>✳</i><b>Always evolving</b></div></div></section>

      <section className="tools-section wrap" id="tools">
        <div className="section-heading"><div><div className="eyebrow">THE TOOLKIT</div><h2>Good tools. <em>Good days.</em></h2></div><p>Everything you need to plan, create and bring your classroom ideas to life. All in one friendly place.</p></div>
        <div className="tool-grid">{tools.map((tool) => <article className="tool-card" key={tool.number}><div className="tool-card-top"><span className="tool-icon">{tool.icon}</span><span className={tool.tag === "Available now" ? "status status-live" : "status"}>{tool.tag}</span></div><div className="tool-number">{tool.number} / TOOL</div><h3>{tool.name}</h3><p>{tool.detail}</p><Link className="tool-link" href={tool.href}>{tool.tag === "Available now" ? "Open tool" : "Coming soon"} <span>↗</span></Link></article>)}</div>
      </section>

      <section className="why-section" id="why"><div className="wrap why-inner"><div><div className="eyebrow">A LITTLE MORE HUMAN</div><h2>Made for teachers,<br /><em>not the other way around.</em></h2></div><div className="why-points"><div><span>01</span><p><b>Easy from the first click.</b><br />No complicated setup. Just open a tool and get going.</p></div><div><span>02</span><p><b>Your work, your way.</b><br />Create resources you can adapt, print and make your own.</p></div><div><span>03</span><p><b>Useful things, thoughtfully made.</b><br />A growing toolkit shaped around real classroom needs.</p></div></div></div></section>

      <section className="closing wrap" id="roadmap"><div className="closing-mark">✳</div><div><div className="eyebrow">START WITH ONE THING</div><h2>Let's make your next<br /><em>school day a little easier.</em></h2></div><Link className="button button-dark" href="/tools/lesson-planner">Try the lesson planner <span>↗</span></Link></section>
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Thoughtful tools for the people who teach.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
