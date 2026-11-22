import type { Metadata } from "next";
import Link from "next/link";
import CertificateMaker from "./certificate-maker";

export const metadata: Metadata = {
  title: "Free Certificate Maker",
  description: "Create beautiful, personalised classroom certificates. Edit the recipient, award, message and signature, then print or save as PDF.",
};

export default function CertificateMakerPage() {
  return (
    <main className="tool-page">
      <nav className="nav wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><Link className="back-link" href="/">← Back to toolkit</Link></nav>
      <section className="tool-intro wrap"><div className="eyebrow"><span className="eyebrow-dot" /> CLASSROOM TOOL 02</div><h1>A little recognition<br /><em>goes a long way.</em></h1><p>Create a certificate that makes someone's achievement feel special. Personalise it, preview it and print it in a few clicks.</p></section>
      <CertificateMaker />
      <footer className="footer wrap"><Link className="brand" href="/"><span className="brand-mark">c</span> classpilot<span className="brand-dot">.</span></Link><span>Made to make teaching a little easier.</span><span>© {new Date().getFullYear()} ClassPilot</span></footer>
    </main>
  );
}
