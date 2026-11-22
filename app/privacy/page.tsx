import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ClassPilot handles information when you use its teacher tools.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <nav className="nav wrap">
        <Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link>
        <Link className="nav-cta" href="/">Back to home <span>↗</span></Link>
      </nav>
      <article className="privacy-content wrap">
        <div className="eyebrow">THE IMPORTANT DETAILS</div>
        <h1>Privacy, in plain <em>language.</em></h1>
        <p className="privacy-lead">ClassPilot is designed to help teachers make classroom resources without asking them to create an account.</p>
        <h2>What the tools do</h2>
        <p>The current lesson planner, certificate maker, worksheet generator, quiz generator and rubric generator are designed to create and edit their content in your browser. The tools do not currently require you to upload your work to a ClassPilot account.</p>
        <h2>Information you enter</h2>
        <p>Information you type into a tool is used to create the resource you are working on. Certificate batch files are read in your browser. Do not enter sensitive personal information or details that identify students. Use first names or fictional examples when possible.</p>
        <h2>Website hosting</h2>
        <p>Like most websites, the hosting and delivery provider may process basic technical information such as IP address, browser details and request logs to operate, protect and troubleshoot the site. The final hosting provider and its retention settings will be identified here before public launch.</p>
        <h2>Analytics, advertising and accounts</h2>
        <p>ClassPilot does not currently provide user accounts, paid subscriptions, analytics tracking or advertising features. If these are introduced, this page will be updated before those features are enabled.</p>
        <h2>Changes and contact</h2>
        <p>This is an initial privacy notice for the current beta codebase, not a substitute for a legal review. It will be expanded with the hosting provider, contact details and any additional services before a wider public launch.</p>
        <p className="privacy-updated">Initial version · November 2026</p>
        <Link className="button button-dark" href="/">Return to ClassPilot <span>↗</span></Link>
      </article>
    </main>
  );
}
