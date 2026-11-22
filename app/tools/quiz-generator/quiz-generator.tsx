"use client";

import { useState } from "react";

type Question = { prompt: string; options: string[]; answer: number; explanation: string };
type Format = "multiple" | "short";

function buildQuiz(topic: string, subject: string, difficulty: string, count: number, format: Format): Question[] {
  const t = topic.trim();
  const easy = difficulty === "Beginner";
  const prompts = subject === "Mathematics" ? [
    { prompt: `Which operation would you use first to solve a problem about ${t}?`, options: ["Identify the numbers and what is being asked", "Choose an answer at random", "Ignore the units", "Add every number automatically"], answer: 0, explanation: "Start by understanding the information and what the problem asks." },
    { prompt: `When checking a calculation involving ${t}, what is a useful strategy?`, options: ["Estimate the result", "Skip checking", "Change the question", "Always multiply"], answer: 0, explanation: "An estimate helps you decide whether an answer is reasonable." },
    { prompt: `What should a good mathematical explanation about ${t} include?`, options: ["Clear steps and reasoning", "Only a guess", "Unrelated facts", "No working"], answer: 0, explanation: "Clear working shows how a result was reached." },
    { prompt: `If two methods give different results for ${t}, what should you do?`, options: ["Check each step", "Pick the larger result", "Stop immediately", "Delete the working"], answer: 0, explanation: "Reviewing each step helps locate an error." }
  ] : [
    { prompt: `Which statement best describes the main idea of “${t}”?`, options: [`A central concept or explanation connected to ${t}`, "A detail that is unrelated", "A personal guess without evidence", "A random collection of words"], answer: 0, explanation: "A main idea expresses the central point of a topic." },
    { prompt: `Which is the best way to support a claim about “${t}”?`, options: ["Use relevant facts or examples", "Repeat the claim only", "Use an unrelated opinion", "Leave out all details"], answer: 0, explanation: "Relevant evidence makes an explanation stronger." },
    { prompt: `Why is it useful to compare examples of “${t}”?`, options: ["To notice similarities and differences", "To avoid understanding the topic", "To make every example identical", "To remove important information"], answer: 0, explanation: "Comparison helps identify patterns and distinctions." },
    { prompt: `Which question would help you investigate “${t}” further?`, options: ["What evidence explains how it works?", "Can I ignore the topic?", "Why should I guess?", "Can I skip the details?"], answer: 0, explanation: "A focused question guides further investigation." }
  ];
  const shortPrompts = [
    { prompt: `Explain “${t}” in your own words.`, options: [], answer: 0, explanation: "Look for an accurate explanation using the learner's own words." },
    { prompt: `Give one example related to “${t}” and explain why it fits.`, options: [], answer: 0, explanation: "Accept a relevant example with a clear explanation." },
    { prompt: `Name one important fact about “${t}” and explain its importance.`, options: [], answer: 0, explanation: "Look for a correct fact and a relevant reason." },
    { prompt: `What is one question you still have about “${t}”?`, options: [], answer: 0, explanation: "Answers will vary. Look for a thoughtful, topic-related question." }
  ];
  const bank = format === "multiple" ? prompts : shortPrompts;
  return Array.from({ length: count }, (_, i) => {
    const source = bank[i % bank.length];
    const options = [...source.options];
    if (format === "multiple" && !easy && i % 2 === 1) options.reverse();
    const answer = format === "multiple" && !easy && i % 2 === 1 ? options.length - 1 : source.answer;
    return { ...source, options, answer };
  });
}

export default function QuizGenerator() {
  const [topic, setTopic] = useState("The water cycle");
  const [subject, setSubject] = useState("Science");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [count, setCount] = useState("8");
  const [format, setFormat] = useState<Format>("multiple");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [showKey, setShowKey] = useState(true);

  const generate = () => {
    if (topic.trim()) setQuestions(buildQuiz(topic, subject, difficulty, Number(count), format));
  };
  const updateQuestion = (index: number, patch: Partial<Question>) =>
    setQuestions((current) => current?.map((q, i) => i === index ? { ...q, ...patch } : q) ?? null);
  const updateOption = (qi: number, oi: number, value: string) =>
    setQuestions((current) => current?.map((q, i) => i === qi ? { ...q, options: q.options.map((option, j) => j === oi ? value : option) } : q) ?? null);

  return (
    <section className="quiz-layout wrap">
      <aside className="quiz-controls">
        <div className="form-heading"><span className="form-step">BUILD A QUICK CHECK</span><h2>Set up your quiz</h2><p>Choose a topic and format. You can edit every question before printing.</p></div>
        <label>Quiz topic<input value={topic} maxLength={100} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Fractions, ecosystems, grammar" /></label>
        <div className="form-row">
          <label>Subject<select value={subject} onChange={(e) => setSubject(e.target.value)}>{["Mathematics","English","Science","Social studies","General knowledge"].map((s) => <option key={s}>{s}</option>)}</select></label>
          <label>Difficulty<select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>{["Beginner","Intermediate","Advanced"].map((s) => <option key={s}>{s}</option>)}</select></label>
        </div>
        <label>Question format<select value={format} onChange={(e) => setFormat(e.target.value as Format)}><option value="multiple">Multiple choice</option><option value="short">Short answer</option></select></label>
        <label>Number of questions<select value={count} onChange={(e) => setCount(e.target.value)}>{["5","8","10","12","15"].map((n) => <option key={n} value={n}>{n} questions</option>)}</select></label>
        <label className="quiz-check"><input type="checkbox" checked={showKey} onChange={(e) => setShowKey(e.target.checked)} /> Include teacher answer key</label>
        <button className="button button-dark generate-button" type="button" onClick={generate} disabled={!topic.trim()}>Generate quiz <span>↗</span></button>
        <p className="privacy-note"><span>✳</span> Created in your browser. No student information is uploaded.</p>
        <div className="worksheet-note"><b>Review before sharing.</b><p>Questions are editable starter prompts. Check subject accuracy and curriculum alignment before using them for assessment.</p></div>
      </aside>
      <div className="quiz-preview">
        <div className="preview-heading"><div><span className="form-step">QUIZ PREVIEW</span><h2>{questions ? "Your quiz is ready to edit" : "A quick check for learning"}</h2></div><span className="preview-hint">A4 · Print ready</span></div>
        {questions ? <>
          <article className="quiz-paper">
            <div className="worksheet-paper-brand">CLASSPILOT <span>✳</span></div>
            <h2>{topic}</h2><p className="worksheet-subtitle">{subject} · {difficulty} · {format === "multiple" ? "Multiple choice" : "Short answer"}</p>
            <div className="worksheet-student-line"><span>Name: __________________________</span><span>Date: ______________</span></div>
            <p className="worksheet-instructions">Answer every question. Read carefully and check your work before handing it in.</p>
            <ol className="quiz-question-list">{questions.map((q, i) => <li key={i}>
              <textarea rows={2} aria-label={`Edit question ${i + 1}`} value={q.prompt} onChange={(e) => updateQuestion(i, { prompt: e.target.value })} />
              {format === "multiple" ? <div className="quiz-options">{q.options.map((option, j) => <label key={j}><span>{String.fromCharCode(65 + j)}.</span><input aria-label={`Edit option ${j + 1} for question ${i + 1}`} value={option} onChange={(e) => updateOption(i, j, e.target.value)} /></label>)}</div> : <div className="quiz-writing-lines"><i/><i/><i/></div>}
            </li>)}</ol>
            <div className="worksheet-paper-footer">DO YOUR BEST <span>✦</span></div>
          </article>
          {showKey && <article className="quiz-key"><div className="form-step">TEACHER COPY</div><h3>Answer key and guidance</h3><ol>{questions.map((q, i) => <li key={i}><b>{format === "multiple" ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}` : "Suggested response"}</b><p>{q.explanation}</p></li>)}</ol></article>}
          <div className="certificate-actions"><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF <span>↗</span></button><button className="button button-light" type="button" onClick={generate}>Regenerate</button></div>
          <p className="certificate-footnote">The teacher key is included when selected. Hide it for a student-only printout.</p>
        </> : <div className="worksheet-empty"><div>✳</div><h3>Curiosity makes a great quiz.</h3><p>Choose a topic and generate a set of questions to get started.</p></div>}
      </div>
    </section>
  );
}
