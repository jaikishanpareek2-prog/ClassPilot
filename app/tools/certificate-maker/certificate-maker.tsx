"use client";

import { ChangeEvent, useState } from "react";

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

const csvTemplate = "recipient,award,message,issuer,date,signature,style\nAlex Morgan,Certificate of Achievement,\"In recognition of your hard work and effort.\",Classroom Teacher,2026-11-22,Your Teacher,classic\n";

function parseCSV(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '"') {
      if (quoted && input[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim()); cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i++;
      row.push(cell.trim()); cell = "";
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
    } else {
      cell += char;
    }
  }
  row.push(cell.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

function downloadTemplate() {
  const blob = new Blob([csvTemplate], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "classpilot-certificates-template.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function CertificateMaker() {
  const [data, setData] = useState<Certificate>(initial);
  const [bulk, setBulk] = useState<Certificate[]>([]);
  const [bulkError, setBulkError] = useState("");
  const [bulkName, setBulkName] = useState("");
  const update = (key: keyof Certificate, value: string) =>
    setData((current) => ({ ...current, [key]: value }));

  async function importCSV(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBulkError("");
    try {
      const rows = parseCSV(await file.text());
      if (rows.length < 2) throw new Error("Add a header row and at least one student row.");
      const headers = rows[0].map((value) => value.toLowerCase().trim());
      const recipientIndex = headers.indexOf("recipient");
      if (recipientIndex < 0) throw new Error("The CSV must include a recipient column.");
      const get = (cells: string[], key: string, fallback: string) => {
        const index = headers.indexOf(key);
        return index >= 0 && cells[index] ? cells[index] : fallback;
      };
      const certificates = rows.slice(1).map((cells) => {
        const style = get(cells, "style", data.style).toLowerCase();
        return {
          recipient: cells[recipientIndex] || "",
          award: get(cells, "award", data.award),
          message: get(cells, "message", data.message),
          issuer: get(cells, "issuer", data.issuer),
          date: get(cells, "date", data.date),
          signature: get(cells, "signature", data.signature),
          style: (["classic", "botanical", "modern"].includes(style) ? style : data.style) as Certificate["style"],
        };
      }).filter((certificate) => certificate.recipient.trim().length > 0);
      if (!certificates.length) throw new Error("No recipient names were found. Check the recipient column.");
      if (certificates.length > 250) throw new Error("For reliable browser printing, please import up to 250 certificates at a time.");
      setBulk(certificates);
      setBulkName(file.name);
    } catch (error) {
      setBulk([]);
      setBulkError(error instanceof Error ? error.message : "Could not read this CSV file.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className={`certificate-layout wrap ${bulk.length ? "bulk-print-active" : ""}`}>
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

        <div className="bulk-import-panel">
          <span className="form-step">SAVE TIME WITH A WHOLE CLASS</span>
          <h3>Bulk certificates</h3>
          <p>Upload a CSV class list and create a separate certificate page for every student. Your file stays in this browser.</p>
          <button className="button button-light bulk-template-button" type="button" onClick={downloadTemplate}>Download CSV template</button>
          <label className="bulk-file-label">Choose class CSV<input type="file" accept=".csv,text/csv" onChange={importCSV} /></label>
          {bulkError && <p className="bulk-error" role="alert">{bulkError}</p>}
          {bulk.length > 0 && <div className="bulk-ready"><strong>{bulk.length} certificates ready</strong><span>{bulkName}</span><button className="button button-dark" type="button" onClick={() => window.print()}>Print all {bulk.length} certificates ↗</button><button className="bulk-clear" type="button" onClick={() => setBulk([])}>Clear class list</button></div>}
          <p className="bulk-csv-hint">CSV columns: recipient, award, message, issuer, date, signature, style. Only recipient is required.</p>
        </div>
        <p className="privacy-note"><span>✳</span> Your certificate details stay in this browser. Nothing is uploaded.</p>
      </form>
      <div className="certificate-preview-column">
        <div className="preview-heading"><div><span className="form-step">LIVE PREVIEW</span><h2>Ready to celebrate</h2></div><span className="preview-hint">A4 landscape</span></div>
        <CertificateArt data={data} />
        <div className="certificate-actions"><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF <span>↗</span></button><button className="button button-light" type="button" onClick={() => { setData(initial); setBulk([]); }}>Reset details</button></div>
        <p className="certificate-footnote">For best results, choose A4 landscape and enable background graphics in your print settings.</p>
      </div>
      {bulk.length > 0 && <div className="bulk-print-sheet" aria-hidden="true">{bulk.map((certificate, index) => <CertificateArt key={index} data={certificate} />)}</div>}
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
