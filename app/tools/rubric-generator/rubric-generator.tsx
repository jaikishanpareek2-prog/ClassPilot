"use client";

import { useMemo, useState } from "react";

type Criterion = { id: number; name: string; descriptions: string[] };
const initialLevels = ["Beginning", "Developing", "Proficient", "Exemplary"];
const starterCriteria = [
  { name: "Understanding of the topic", descriptions: ["Shows limited understanding; major ideas are missing.", "Shows partial understanding; some ideas need clarification.", "Shows clear understanding of the key ideas.", "Shows thorough understanding and makes insightful connections."] },
  { name: "Use of evidence", descriptions: ["Provides little or no relevant evidence.", "Uses some evidence, but support is inconsistent.", "Uses relevant evidence to support most ideas.", "Selects strong evidence and explains it convincingly."] },
  { name: "Organisation and structure", descriptions: ["Work is difficult to follow or incomplete.", "Some organisation is present, but flow is uneven.", "Work is organised and easy to follow.", "Work is purposeful, coherent and carefully structured."] },
  { name: "Communication", descriptions: ["Ideas are unclear or difficult to understand.", "Meaning is mostly understandable, with some unclear parts.", "Ideas are communicated clearly and appropriately.", "Communication is precise, engaging and well adapted to the audience."] },
];

export default function RubricGenerator() {
  const [title, setTitle] = useState("Project assessment rubric");
  const [subject, setSubject] = useState("General");
  const [task, setTask] = useState("Class project");
  const [levels, setLevels] = useState(initialLevels);
  const [criteria, setCriteria] = useState<Criterion[]>(starterCriteria.map((item, index) => ({ ...item, id: index + 1 })));
  const [nextId, setNextId] = useState(5);
  const [showScore, setShowScore] = useState(true);

  const maximum = useMemo(() => criteria.length * levels.length, [criteria.length, levels.length]);
  const updateCriterion = (id: number, patch: Partial<Criterion>) =>
    setCriteria((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const updateDescription = (id: number, levelIndex: number, value: string) =>
    setCriteria((current) => current.map((item) => item.id === id ? { ...item, descriptions: item.descriptions.map((d, i) => i === levelIndex ? value : d) } : item));
  const addCriterion = () => {
    if (criteria.length >= 10) return;
    setCriteria((current) => [...current, { id: nextId, name: "New criterion", descriptions: levels.map(() => "Describe what performance at this level looks like.") }]);
    setNextId((id) => id + 1);
  };
  const removeCriterion = (id: number) => setCriteria((current) => current.length > 1 ? current.filter((item) => item.id !== id) : current);

  return (
    <section className="rubric-layout wrap">
      <aside className="rubric-controls">
        <div className="form-heading"><span className="form-step">RUBRIC BUILDER</span><h2>Set the context</h2><p>Start with a task, then tailor the criteria and descriptions to your learners.</p></div>
        <label>Rubric title<input value={title} maxLength={90} onChange={(e) => setTitle(e.target.value)} /></label>
        <label>Subject or class<input value={subject} maxLength={60} onChange={(e) => setSubject(e.target.value)} /></label>
        <label>Assignment or task<input value={task} maxLength={100} onChange={(e) => setTask(e.target.value)} /></label>
        <div className="rubric-level-settings"><div className="form-step">PERFORMANCE LEVELS</div><p>Rename the levels to match your school's language.</p>{levels.map((level, i) => <label key={i}>Level {i + 1}<input value={level} maxLength={30} onChange={(e) => setLevels((current) => current.map((v, j) => i === j ? e.target.value : v))} /></label>)}</div>
        <label className="rubric-check"><input type="checkbox" checked={showScore} onChange={(e) => setShowScore(e.target.checked)} /> Show point values</label>
        <div className="rubric-total"><span>Maximum points</span><strong>{showScore ? maximum : "Hidden"}</strong></div>
        <p className="privacy-note"><span>✳</span> Your rubric stays in this browser. No student data is uploaded.</p>
      </aside>
      <div className="rubric-preview">
        <div className="preview-heading"><div><span className="form-step">LIVE RUBRIC</span><h2>Edit every cell</h2></div><span className="preview-hint">A4 · Landscape</span></div>
        <div className="rubric-paper">
          <div className="worksheet-paper-brand">CLASSPILOT <span>✳</span></div>
          <input className="rubric-title-edit" aria-label="Edit rubric title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="rubric-meta"><span><b>Subject:</b> {subject || "—"}</span><span><b>Task:</b> {task || "—"}</span></div>
          <div className="rubric-student">Student: __________________________________________ <span>Date: ______________</span></div>
          <div className="rubric-table-wrap"><table className="rubric-table">
            <thead><tr><th>Criteria</th>{levels.map((level, i) => <th key={i}><span>{level || `Level ${i + 1}`}</span>{showScore && <small>{i + 1} pt{i === 0 ? "" : "s"}</small>}</th>)}</tr></thead>
            <tbody>{criteria.map((criterion) => <tr key={criterion.id}>
              <th><input aria-label="Edit criterion name" value={criterion.name} onChange={(e) => updateCriterion(criterion.id, { name: e.target.value })} /><button className="rubric-remove" type="button" onClick={() => removeCriterion(criterion.id)} aria-label={`Remove ${criterion.name}`}>×</button></th>
              {levels.map((_, i) => <td key={i}><textarea aria-label={`Edit ${criterion.name}, level ${i + 1}`} value={criterion.descriptions[i] ?? ""} onChange={(e) => updateDescription(criterion.id, i, e.target.value)} rows={5} /></td>)}
            </tr>)}</tbody>
          </table></div>
          <div className="rubric-paper-footer"><span>ASSESSMENT GUIDE</span><span>{criteria.length} criteria · {levels.length} performance levels</span></div>
          {showScore && <div className="rubric-score-note">Score each criterion from 1 to {levels.length}. Maximum score: {maximum} points.</div>}
        </div>
        <div className="rubric-actions"><button className="button button-light" type="button" onClick={addCriterion} disabled={criteria.length >= 10}>+ Add criterion</button><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF <span>↗</span></button></div>
        <p className="certificate-footnote">Descriptions are editable starting points. Adjust them to your learning objectives and assessment policy.</p>
      </div>
    </section>
  );
}
