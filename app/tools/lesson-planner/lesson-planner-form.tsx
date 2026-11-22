"use client";

import { FormEvent, useState } from "react";

type Plan = { title: string; subject: string; grade: string; duration: string; topic: string; objective: string; materials: string; warmup: string; activities: string; assessment: string; extension: string };

const initial: Plan = { title: "", subject: "Science", grade: "Grade 5", duration: "45 minutes", topic: "", objective: "", materials: "", warmup: "", activities: "", assessment: "", extension: "" };

export default function LessonPlannerForm() {
  const [form, setForm] = useState(initial);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [showPlan, setShowPlan] = useState(false);
  const update = (key: keyof Plan, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const generate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = form.topic.trim();
    setPlan({
      ...form,
      title: form.title.trim() || topic,
      objective: form.objective.trim() || `Students will be able to explain the key ideas behind ${topic.toLowerCase()} and demonstrate their understanding in their own words.`,
      materials: form.materials.trim() || "Board or display, student notebooks, writing materials, and any topic-specific visuals or resources.",
      warmup: form.warmup.trim() || `Begin with a short question: “What do you already know about ${topic.toLowerCase()}?” Invite two or three students to share. Connect their ideas to today's learning.`,
      activities: form.activities.trim() || `1. Introduce the main concept using a clear explanation and one relatable example.\n2. Model the task or thinking process step by step.\n3. Let students work in pairs to apply the idea.\n4. Bring the class together to compare approaches and clarify misconceptions.`,
      assessment: form.assessment.trim() || "Use targeted questions during the activity. Finish with a short exit ticket: ask students to write one thing they learned and one question they still have.",
      extension: form.extension.trim() || "Offer an extra challenge that asks students to apply the concept in a new situation. Provide a guided example or sentence starter for students who need support.",
    });
    setShowPlan(true);
  };
  const printPlan = () => window.print();
  return (
    <section className="planner-layout wrap">
      <form className="planner-form" onSubmit={generate}>
        <div className="form-heading"><span className="form-step">YOUR LESSON</span><h2>Start with the basics</h2><p>A few details are all it takes. You can personalise every section afterwards.</p></div>
        <label>Lesson topic <span className="required">*</span><input required value={form.topic} onChange={(e) => update("topic", e.target.value)} placeholder="e.g. The water cycle" /></label>
        <div className="form-row"><label>Subject<select value={form.subject} onChange={(e) => update("subject", e.target.value)}>{["Science","Mathematics","English","History","Geography","Art","Physical Education","Other"].map((v) => <option key={v}>{v}</option>)}</select></label><label>Grade / level<input value={form.grade} onChange={(e) => update("grade", e.target.value)} /></label></div>
        <div className="form-row"><label>Lesson duration<select value={form.duration} onChange={(e) => update("duration", e.target.value)}>{["30 minutes","45 minutes","60 minutes","90 minutes","2 hours"].map((v) => <option key={v}>{v}</option>)}</select></label><label>Lesson title<input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Optional" /></label></div>
        <div className="form-divider" />
        <div className="form-heading compact"><span className="form-step">MAKE IT YOURS</span><h2>Add your own ideas <small>Optional</small></h2><p>Leave these blank and we'll provide a useful starting point.</p></div>
        <label>Learning objective<textarea value={form.objective} onChange={(e) => update("objective", e.target.value)} placeholder="What should students know or be able to do?" rows={2} /></label>
        <label>Materials needed<input value={form.materials} onChange={(e) => update("materials", e.target.value)} placeholder="Books, worksheets, classroom supplies..." /></label>
        <label>Warm-up activity<textarea value={form.warmup} onChange={(e) => update("warmup", e.target.value)} placeholder="How will you get students thinking?" rows={2} /></label>
        <label>Main activities<textarea value={form.activities} onChange={(e) => update("activities", e.target.value)} placeholder="Describe activities or learning steps..." rows={3} /></label>
        <label>Assessment<textarea value={form.assessment} onChange={(e) => update("assessment", e.target.value)} placeholder="How will you check understanding?" rows={2} /></label>
        <label>Extension / support<textarea value={form.extension} onChange={(e) => update("extension", e.target.value)} placeholder="How can you extend or support learning?" rows={2} /></label>
        <button className="button button-dark generate-button" type="submit">Create my lesson plan <span>↗</span></button>
        <p className="privacy-note"><span>✳</span> Your lesson details stay in this browser. Nothing is uploaded.</p>
      </form>
      <aside className="planner-aside"><div className="aside-card"><div className="aside-icon">✳</div><h3>A good lesson has room to breathe.</h3><p>Start with a clear goal, make space for students to explore, then check what they understood. The best plan is one you can make your own.</p><div className="aside-rule" /><span className="aside-caption">A CLASS PILOT NOTE</span></div><div className="aside-tip"><span>✦</span><p><b>Teacher tip</b><br />Keep one activity flexible. A curious question can take the lesson somewhere better than you expected.</p></div></aside>
      {showPlan && plan && <div className="plan-overlay" role="dialog" aria-modal="true" aria-labelledby="plan-title"><div className="plan-modal"><div className="plan-modal-top"><span className="form-step">YOUR LESSON PLAN</span><button className="close-button" onClick={() => setShowPlan(false)} aria-label="Close">×</button></div><div className="print-area"><div className="plan-kicker">CLASSPILOT · {plan.subject.toUpperCase()}</div><h2 id="plan-title">{plan.title}</h2><div className="plan-meta"><span>{plan.grade}</span><span>{plan.duration}</span><span>{plan.subject}</span></div><PlanSection title="Learning objective" content={plan.objective} /><PlanSection title="Materials" content={plan.materials} /><PlanSection title="Warm-up" content={plan.warmup} /><PlanSection title="Main activities" content={plan.activities} /><PlanSection title="Assessment" content={plan.assessment} /><PlanSection title="Extension & support" content={plan.extension} /><div className="plan-end">MADE WITH CLASSPILOT <span>✳</span></div></div><div className="plan-actions"><button className="button button-dark" onClick={printPlan}>Print / Save as PDF <span>↗</span></button><button className="button button-light" onClick={() => setShowPlan(false)}>Keep editing</button></div></div></div>}
    </section>
  );
}

function PlanSection({ title, content }: { title: string; content: string }) {
  return <section className="plan-section"><h3>{title}</h3><p>{content}</p></section>;
}
