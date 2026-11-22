"use client";

import { useState } from "react";

type Certificate = {
  recipient: string; award: string; message: string; issuer: string;
  date: string; signature: string; style: "classic" | "botanical" | "modern";
};

const today = new Date().toISOString().slice(0, 10);
const initial: Certificate = {
  recipient: "Alex Morgan", award: "Certificate of Achievement",
  message: "In recognition of your hard work, positive attitude and wonderful effort.",
  issuer: "Classroom Teacher", date: today, signature: "Your Teacher", style: "classic",
};

export default function CertificateMaker() {
  const [data, setData] = useState<Certificate>(initial);
  const update = (key: keyof Certificate, value: string) =>
    setData((current) => ({ ...current, [key]: value }));
  return (
    <section className="certificate-layout wrap">
      <form className="certificate-form" onSubmit={(event) => event.preventDefault()}>
        <div className="form-heading"><span className="form-step">MAKE IT PERSONAL</span><h2>Your certificate details</h2><p>Change any detail and your certificate preview updates straight away.</p></div>
        <label>Recipient's name<input required maxLength={70} value={data.recipient} onChange={(e) => update("recipient", e.target.value)} placeholder="Enter a student's name" /></label>
        <label>Award title<input required maxLength={90} value={data.award} onChange={(e) => update("award", e.target.value)} placeholder="Certificate of Achievement" /></label>
        <label>Personal message<textarea maxLength={240} rows={3} value={data.message} onChange={(e) => update("message", e.target.value)} /></label>
        <div className="form-row"><label>Presented by<input maxLength={70} value={data.issuer} onChange={(e) => update("issuer", e.target.value)} /></label><label>Date<input type="date" value={data.date} onChange={(e) => update("date", e.target.value)} /></label></div>
        <label>Signature name<input maxLength={70} value={data.signature} onChange={(e) => update("signature", e.target.value)} /></label>
        <div className="certificate-style-label">Choose a design</div>
        <div className="certificate-styles" role="group" aria-label="Certificate design">
          <button type="button" className={data.style === "classic" ? "style-choice selected" : "style-choice"} onClick={() => update("style", "classic")}><span className="style-swatch swatch-classic" />Classic</button>
          <button type="button" className={data.style === "botanical" ? "style-choice selected" : "style-choice"} onClick={() => update("style", "botanical")}><span className="style-swatch swatch-botanical" />Botanical</button>
          <button type="button" className={data.style === "modern" ? "style-choice selected" : "style-choice"} onClick={() => update("style", "modern")}><span className="style-swatch swatch-modern" />Modern</button>
        </div>
        <p className="privacy-note"><span>✳</span> Your certificate details stay in this browser. Nothing is uploaded.</p>
      </form>
      <div className="certificate-preview-column">
        <div className="preview-heading"><div><span className="form-step">LIVE PREVIEW</span><h2>Ready to celebrate</h2></div><span className="preview-hint">A4 landscape</span></div>
        <CertificateArt data={data} />
        <div className="certificate-actions"><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF <span>↗</span></button><button className="button button-light" type="button" onClick={() => setData(initial)}>Reset details</button></div>
        <p className="certificate-footnote">For best results, choose A4 landscape and enable background graphics in your print settings.</p>
      </div>
    </section>
  );
}

function CertificateArt({ data }: { data: Certificate }) {
  const date = data.date ? new Date(data.date + "T12:00:00").toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }) : " ";
  return (
    <article className={`certificate-art certificate-${data.style}`}>
      <div className="certificate-inner">
        <div className="certificate-topline"><span>✳</span><span>CLASSPILOT · CELEBRATING LEARNING</span><span>✳</span></div>
        <div className="certificate-emblem">✦</div>
        <div className="certificate-overline">THIS CERTIFICATE IS PROUDLY PRESENTED TO</div>
        <div className="certificate-recipient">{data.recipient || "Recipient's name"}</div>
        <div className="certificate-award">{data.award || "Certificate of Achievement"}</div>
        <div className="certificate-message">{data.message}</div>
        <div className="certificate-bottom">
          <div><span className="certificate-line">{date}</span><small>DATE</small></div>
          <div className="certificate-seal">✳</div>
          <div><span className="certificate-line">{data.signature || data.issuer}</span><small>{data.issuer || "PRESENTED BY"}</small></div>
        </div>
      </div>
    </article>
  );
}
