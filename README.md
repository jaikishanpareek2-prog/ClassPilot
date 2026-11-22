# ClassPilot

Thoughtful, practical tools for teachers and schools.

ClassPilot is a responsive teacher toolkit. The current MVP focuses on useful browser-based classroom workflows that teachers can edit, print and save without creating an account.

## Available tools

- **Lesson planner** — create and edit a structured lesson outline.
- **Certificate maker** — design individual certificates and print batches from a CSV file.
- **Worksheet builder** — prepare editable practice sheets with an optional answer key.
- **Quiz generator** — create editable multiple-choice or short-answer starter questions with teacher guidance.
- **Rubric generator** — build an editable assessment rubric with criteria, performance levels and point values.

The quiz and rubric tools provide editable starter content. Teachers should review and adapt materials for subject accuracy, learning objectives and local curriculum before classroom use. They are not presented as AI-generated or curriculum-validated assessments.

## Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS for a lightweight, custom visual system

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

## Product principles

- Teacher-first, mobile-friendly workflows
- Useful free tools before account complexity
- Keep student personal data out of AI prompts
- Prefer local processing for simple document workflows
- Make exports and printed resources practical
- Add features incrementally and verify each milestone

## Roadmap

1. Complete and test the five-tool MVP with teachers.
2. Improve accessibility, mobile layouts and print output.
3. Deploy a public beta and connect a custom domain when approved.
4. Add optional accounts and saved projects.
5. Validate demand before introducing paid plans and school features.
