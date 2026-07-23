import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { PageHeader } from "../components/app-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/app/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — AI Research Copilot" },
      { name: "description", content: "Auto-generated README, SRS, architecture and API docs." },
      { property: "og:title", content: "Documentation — AI Research Copilot" },
      { property: "og:description", content: "Notion-quality docs, automatically." },
    ],
  }),
  component: Docs,
});

const nav = [
  { key: "readme", label: "README" },
  { key: "srs", label: "SRS" },
  { key: "arch", label: "Architecture" },
  { key: "api", label: "API Docs" },
  { key: "deploy", label: "Deployment" },
  { key: "ppt", label: "Pitch Deck (PPT)" },
] as const;

const content: Record<string, { title: string; body: string[] }> = {
  readme: {
    title: "AI for Food Waste Reduction",
    body: [
      "A computer-vision + demand-forecasting system that predicts food surplus in restaurants and redistributes it to local shelters through a real-time logistics layer.",
      "## Quickstart\n```bash\npnpm install\npnpm dev\n```",
      "## Features\n- Real-time surplus prediction\n- Automated shelter matching\n- Route optimization\n- Analytics dashboard",
    ],
  },
  srs: { title: "Software Requirements Specification", body: ["1. Introduction — Purpose, Scope, Definitions", "2. Overall Description — Product perspective, user classes", "3. Functional Requirements — 42 items across 6 modules", "4. Non-Functional Requirements — Performance, security, HIPAA-adjacent"] },
  arch: { title: "System Architecture", body: ["High-level: client → CDN → API gateway → services → data layer.", "Event-driven backbone via Kafka.", "ML pipeline via Ray + Feature Store."] },
  api: { title: "API Documentation", body: ["POST /v1/surplus — report surplus", "GET  /v1/matches — list active matches", "POST /v1/matches/:id/confirm — shelter confirms pickup"] },
  deploy: { title: "Deployment Guide", body: ["Terraform infra in `/infra/terraform`", "Deploy: `make deploy env=staging`", "Rollback: `make rollback`"] },
  ppt: { title: "Pitch Deck", body: ["12-slide investor deck ready to export", "Problem, solution, market, traction, team, ask"] },
};

function Docs() {
  const [key, setKey] = useState<keyof typeof content>("readme");
  const doc = content[key];
  return (
    <div>
      <PageHeader title="Documentation" subtitle="Notion-style, auto-generated documentation for your project." />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="card-premium h-fit p-3">
          <ul className="space-y-0.5">
            {nav.map((n) => (
              <li key={n.key}>
                <button onClick={() => setKey(n.key)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                    key === n.key ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}>
                  <FileText className="h-3.5 w-3.5" /> {n.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="card-premium p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-bold">{doc.title}</h2>
            <div className="flex gap-1.5">
              {["PDF", "DOCX", "Markdown"].map((f) => (
                <button key={f} onClick={() => toast.success(`Exported ${f}`)} className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-white px-3 py-1.5 text-xs font-medium hover:bg-accent">
                  <Download className="h-3 w-3" /> {f}
                </button>
              ))}
            </div>
          </div>
          <article className="prose prose-sm max-w-none space-y-3 text-sm leading-relaxed text-muted-foreground">
            {doc.body.map((b, i) => (
              <p key={i} className="whitespace-pre-wrap">{b}</p>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
