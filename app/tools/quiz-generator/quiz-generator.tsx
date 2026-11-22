"use client";

import { useState } from "react";

type Question = { prompt: string; options: string[]; answer: number; explanation: string };
type Format = "multiple" | "short";

function buildQuiz(topic: string, subject: string, difficulty: string, count: number, format: Format): Question[] {
  const t = topic.trim();
  if (subject === "Mathematics") {
    const scale = difficulty === "Beginner" ? 12 : difficulty === "Intermediate" ? 35 : 90;
    const bank: Question[] = Array.from({ length: count }, (_, i) => {
      const a = scale + 3 + i * 2;
      const b = 2 + (i * 5) % Math.max(3, Math.floor(scale / 2));
      const kind = i % 6;
      if (kind === 0) {
        const answer = a + b;
        return { prompt: `Calculate: ${a} + ${b} = ?`, options: [String(answer), String(answer + 2), String(answer - 3), String(answer + 5)], answer: 0, explanation: `Add the two numbers: ${a} + ${b} = ${answer}.` };
      }
      if (kind === 1) {
        const answer = a - b;
        return { prompt: `Calculate: ${a} − ${b} = ?`, options: [String(answer + 4), String(answer), String(answer - 2), String(answer + 7)], answer: 1, explanation: `Subtract ${b} from ${a}: the result is ${answer}.` };
      }
      if (kind === 2) {
        const multiplier = 2 + (i % 5);
        const answer = b * multiplier;
        return { prompt: `Calculate: ${b} × ${multiplier} = ?`, options: [String(answer + multiplier), String(answer - multiplier), String(answer), String(answer + 2)], answer: 2, explanation: `${b} groups of ${multiplier} make ${answer}.` };
      }
      if (kind === 3) {
        const divisor = 2 + (i % 4);
        const dividend = divisor * (3 + (i % 7));
        const answer = dividend / divisor;
        return { prompt: `Calculate: ${dividend} ÷ ${divisor} = ?`, options: [String(answer + 1), String(answer), String(answer - 2), String(answer + 3)], answer: 1, explanation: `${dividend} divided into ${divisor} equal groups gives ${answer} in each group.` };
      }
      if (kind === 4) {
        const answer = (i % 8) + 2;
        return { prompt: `A number is multiplied by 3 to make ${answer * 3}. What is the number?`, options: [String(answer + 1), String(answer - 1), String(answer), String(answer * 3)], answer: 2, explanation: `Use the inverse operation: ${answer * 3} ÷ 3 = ${answer}.` };
      }
      const answer = (i % 5) + 2;
      return { prompt: `Which fraction is equivalent to ${answer}/${answer * 2}?`, options: ["1/2", "1/3", "2/5", "3/4"], answer: 0, explanation: `Divide the numerator and denominator by ${answer}: ${answer}/${answer * 2} simplifies to 1/2.` };
    });
    return bank.map((q) => format === "multiple"
      ? q
      : { ...q, options: [], prompt: q.prompt.replace(" = ?", " = ______") });
  }

  const prompts = subject === "English" ? [
    { prompt: `Write a sentence using the word “${t}” correctly.`, options: [`A sentence that uses “${t}” accurately`, "A sentence with no connection to the word", "A list of unrelated words", "A sentence that changes the word's meaning"], answer: 0, explanation: "A correct response uses the target word in a way that shows its meaning." },
    { prompt: `Which step helps a reader identify the main idea of “${t}”?`, options: ["Focus on the central message and supporting details", "Choose the longest sentence only", "Ignore the title and details", "Copy an unrelated paragraph"], answer: 0, explanation: "The main idea is supported by relevant details throughout a text." },
    { prompt: `What makes evidence useful when writing about “${t}”?`, options: ["It supports the point with relevant information", "It repeats the same claim without support", "It changes the subject", "It is unrelated to the argument"], answer: 0, explanation: "Relevant evidence helps explain and support a point." },
    { prompt: `Which revision is most likely to make writing about “${t}” clearer?`, options: ["Use precise words and remove unnecessary repetition", "Add unrelated sentences", "Remove all punctuation", "Repeat every sentence twice"], answer: 0, explanation: "Precise wording and careful editing improve clarity." }
  ] : subject === "Science" ? [
    { prompt: `When investigating “${t}”, why should a scientist record observations?`, options: ["To keep evidence that can be compared and checked", "To replace evidence with guesses", "To guarantee every prediction is correct", "To avoid repeating an investigation"], answer: 0, explanation: "Recorded observations provide evidence for analysis and comparison." },
    { prompt: `Which is the best way to test a prediction about “${t}” fairly?`, options: ["Change one factor while keeping other conditions consistent", "Change every factor at once", "Record only results that agree with the prediction", "Skip measurements"], answer: 0, explanation: "A fair test controls other conditions so the changed factor can be examined." },
    { prompt: `What should a scientific conclusion about “${t}” be based on?`, options: ["The results and evidence collected", "A guess made before testing", "Someone's popularity", "An unrelated example"], answer: 0, explanation: "A conclusion should be supported by the investigation's evidence." },
    { prompt: `Why might scientists repeat an investigation of “${t}”?`, options: ["To check whether results are consistent", "To guarantee the same result every time", "To avoid recording data", "To remove unexpected results"], answer: 0, explanation: "Repeating work helps assess reliability and identify unusual results." }
  ] : [
    { prompt: `Which source would best help verify a claim about “${t}”?`, options: ["A reliable source with relevant evidence", "An anonymous claim with no support", "An unrelated advertisement", "A rumour repeated online"], answer: 0, explanation: "Reliable, relevant evidence is the strongest basis for checking a claim." },
    { prompt: `What is a useful way to compare two examples of “${t}”?`, options: ["Identify similarities and differences using evidence", "Assume they are identical", "Ignore their context", "Choose one without explanation"], answer: 0, explanation: "A comparison explains both similarities and differences." },
    { prompt: `Which question encourages deeper thinking about “${t}”?`, options: ["What evidence explains why it happens?", "Can I avoid learning about it?", "Which answer can I guess?", "Can I ignore the details?"], answer: 0, explanation: "Asking why and looking for evidence encourages deeper understanding." },
    { prompt: `How can you explain an important idea about “${t}” clearly?`, options: ["Use accurate details and a relevant example", "Use unrelated facts", "Repeat the title only", "Leave out the explanation"], answer: 0, explanation: "Accurate details and examples make an explanation clearer." }
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
    return { ...source, options, answer: source.answer };
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
              {format === "multiple" ? <div className="quiz-options">{q.options.map((option, j) => <label key={j}><span>{String.fromCharCode(65 + j)}.</span><input aria-label={`Edit option ${j + 1} for question ${i + 1}`} value={option} onChange={(e) => updateOption(i, j, e.target.value)} /><input className="quiz-correct-radio" type="radio" name={`correct-answer-${i}`} checked={q.answer === j} onChange={() => updateQuestion(i, { answer: j })} aria-label={`Mark option ${j + 1} as correct for question ${i + 1}`} /></label>)}</div><p className="quiz-answer-hint">Select the correct option for the teacher answer key.</p> : <div className="quiz-writing-lines"><i/><i/><i/></div>}
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
