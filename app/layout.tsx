import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ClassPilot — Teach with a little more ease",
    template: "%s | ClassPilot",
  },
  description:
    "Practical, beautifully simple tools for teachers. Create lesson plans, classroom resources and more, without the busywork.",
  applicationName: "ClassPilot",
  openGraph: {
    title: "ClassPilot — Teach with a little more ease",
    description: "Thoughtful tools that give teachers more time to teach.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
