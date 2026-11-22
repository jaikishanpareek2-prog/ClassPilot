"use client";

import { useState } from "react";

type Subject = "Mathematics" | "English" | "Science" | "Social studies";
type Question = { prompt: string; answer: string };

const subjects: Subject[] = ["Mathematics", "English", "Science", "Social studies"];

function makeQuestions(subject: Subject, topic: string, count: number, level: string): Question[] {
  const cleanTopic = topic.trim();
  if (subject === "Mathematics") {
    const base = level === "Early primary" ? 10 : level === "Upper primary" ? 30 : 75;
    return Array.from({ length: count }, (_, i) => {
      const a = base + i * 3 + 2;
      const b = 2 + (i * 7) % Math.max(3, Math.floor(base / 2));
      const kind = i % 4;
      if (kind === 0) return { prompt: `Calculate: ${a} + ${b} = ______`, answer: String(a + b) };
      if (kind === 1) return { prompt: `Calculate: ${a + b} − ${b} = ______`, answer: String(a) };
      if (kind === 2) return { prompt: `Calculate: ${b} × ${(i % 5) + 2} = ______`, answer: String(b * ((i % 5) + 2)) };
      return { prompt: `A class has ${a + b} pencils and shares them equally among ${b} groups. How many pencils does each group receive, and how many are left?`, answer: `${Math.floor((a + b) / b)} each, ${(a + b) % b} left.` };
    });
  }
  if (subject === "English") {
    const prompts = [
      `Write a clear definition of “${cleanTopic}” in your own words.`,
      `Use “${cleanTopic}” in a sentence that shows you understand its meaning.`,
      `Write three words or phrases connected to “${cleanTopic}”. Explain one connection.`,
      `What is one important detail a reader should remember about “${cleanTopic}”?`,
      `Write a short paragraph explaining “${cleanTopic}” to a younger student.`,
      `Create a question about “${cleanTopic}” and write a thoughtful answer.`,
      `Choose a key word related to “${cleanTopic}”. Give a synonym or explain why no exact synonym fits.`,
      `Write two sentences about “${cleanTopic}”: one fact and one opinion.`
    ];
    return Array.from({ length: count }, (_, i) => ({ prompt: prompts[i % prompts.length], answer: "Answers will vary. Check for clear meaning, relevant details and complete sentences." }));
  }
  const prompts = [
    `Describe the main idea of “${cleanTopic}” in two or three sentences.`,
    `List three important facts about “${cleanTopic}”.`,
    `Explain why “${cleanTopic}” matters in everyday life or in the world around us.`,
    `Identify one cause and one effect connected to “${cleanTopic}”.`,
    `Give a real-world example of “${cleanTopic}” and explain what it shows.`,
    `Compare two parts or examples of “${cleanTopic}”. How are they alike and different?`,
    `What question do you still have about “${cleanTopic}”? Explain how you might find the answer.`,
    `Summarise what you have learned about “${cleanTopic}” using your own words.`
  ];
  return Array.from({ length: count }, (_, i) => ({ prompt: prompts[i % prompts.length], answer: "Answers will vary. Look for accurate facts, relevant examples and a clear explanation." }));
}

export default function WorksheetGenerator() {
  const [subject, setSubject] = useState<Subject>("Mathematics");
  const [level, setLevel] = useState("Upper primary");
  const [topic, setTopic] = useState("Addition and subtraction");
  const [count, setCount] = useState("8");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [showKey, setShowKey] = useState(true);
  const [studentName, setStudentName] = useState(true);

  const generate = () => {
    if (!topic.trim()) return;
    setQuestions(makeQuestions(subject, topic, Number(count), level));
  };
  const updateQuestion = (index: number, value: string) => setQuestions((current) => current?.map((q, i) => i === index ? { ...q, prompt: value } : q) ?? null);

  return (
    <section className="worksheet-layout wrap">
      <div className="worksheet-controls">
        <div className="form-heading"><span className="form-step">BUILD A WORKSHEET</span><h2>Set up your activity</h2><p>Start with a topic. Your questions are editable before you print.</p></div>
        <label>Worksheet topic<input value={topic} maxLength={100} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions, plants, persuasive writing" /></label>
        <label>Worksheet title<input value={title} maxLength={90} onChange={(e) => setTitle(e.target.value)} placeholder="Optional custom title" /></label>
        <div className="form-row">
          <label>Subject<select value={subject} onChange={(e) => setSubject(e.target.value as Subject)}>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Level<select value={level} onChange={(e) => setLevel(e.target.value)}>{["Early primary","Upper primary","Middle school","High school"].map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label>Number of questions<select value={count} onChange={(e) => setCount(e.target.value)}>{["5","8","10","12","15"].map((item) => <option key={item} value={item}>{item} questions</option>)}</select></label>
        <div className="worksheet-options">
          <label className="worksheet-check"><input type="checkbox" checked={studentName} onChange={(e) => setStudentName(e.target.checked)} /> Include student name and date lines</label>
          <label className="worksheet-check"><input type="checkbox" checked={showKey} onChange={(e) => setShowKey(e.target.checked)} /> Include answer key when printing</label>
        </div>
        <button className="button button-dark generate-button" type="button" onClick={generate} disabled={!topic.trim()}>Generate worksheet <span>↗</span></button>
        <p className="privacy-note"><span>✳</span> Generated in your browser. No student information is uploaded.</p>
        <div className="worksheet-note"><b>A useful starting point, not a finished curriculum.</b><p>Review the questions for your class and curriculum, then edit anything that needs adjusting.</p></div>
      </div>
      <div className="worksheet-preview">
        <div className="preview-heading"><div><span className="form-step">WORKSHEET PREVIEW</span><h2>{questions ? "Ready for your classroom" : "Your page starts here"}</h2></div><span className="preview-hint">A4 · Print ready</span></div>
        {questions ? (
          <>
            <article className="worksheet-paper">
              <div className="worksheet-paper-brand">CLASSPILOT <span>✳</span></div>
              <h2>{title.trim() || topic || "Classroom worksheet"}</h2>
              <p className="worksheet-subtitle">{subject} · {level}</p>
              {studentName && <div className="worksheet-student-line"><span>Name: __________________________</span><span>Date: ______________</span></div>}
              <p className="worksheet-instructions">Read each question carefully. Show your thinking and write your answers in the space provided.</p>
              <ol className="worksheet-question-list">{questions.map((question, index) => <li key={index}><div>{question.prompt}</div><div className="worksheet-answer-space" /></li>)}</ol>
              <div className="worksheet-paper-footer">YOU'VE GOT THIS <span>✦</span></div>
            </article>
            {showKey && <article className="worksheet-key"><div className="form-step">TEACHER COPY</div><h3>Answer key · {title.trim() || topic}</h3><ol>{questions.map((q, i) => <li key={i}>{q.answer}</li>)}</ol></article>}
            <div className="certificate-actions"><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF <span>↗</span></button><button className="button button-light" type="button" onClick={generate}>Regenerate</button></div>
            <p className="certificate-footnote">Edit any question directly on the page before printing. The answer key is included only when selected.</p>
          </>
        ) : (
          <div className="worksheet-empty"><div>✳</div><h3>A fresh page for curious minds.</h3><p>Choose a topic and select Generate worksheet to create your first set of questions.</p></div>
        )}
      </div>
    </section>
  );
}
