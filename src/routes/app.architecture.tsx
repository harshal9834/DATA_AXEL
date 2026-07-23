import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Database, Server, Globe, Cpu, Zap } from "lucide-react";
import { PageHeader } from "../components/app-shell";

export const Route = createFileRoute("/app/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — AI Research Copilot" },
      { name: "description", content: "Auto-generated system architecture, database and deployment diagrams." },
      { property: "og:title", content: "Architecture — AI Research Copilot" },
      { property: "og:description", content: "From prompt to production-ready architecture in seconds." },
    ],
  }),
  component: Architecture,
});

const tabs = ["System Architecture", "Folder Structure", "Database", "API Flow", "Deployment"] as const;

function Architecture() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("System Architecture");

  return (
    <div>
      <PageHeader title="Architecture Generator" subtitle="From natural language to production-ready architecture — instantly." />

      <div className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-border/60 bg-white/70 p-1 backdrop-blur">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`relative shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === t && <motion.span layoutId="arch-pill" className="absolute inset-0 rounded-xl bg-primary/10" />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <div className="card-premium overflow-hidden p-6">
        {tab === "System Architecture" && <SystemArch />}
        {tab === "Folder Structure" && <Folder />}
        {tab === "Database" && <DB />}
        {tab === "API Flow" && <APIFlow />}
        {tab === "Deployment" && <Deploy />}
      </div>
    </div>
  );
}

function SystemArch() {
  const layers = [
    { title: "Clients", items: [{ i: Globe, t: "Web App" }, { i: Globe, t: "Mobile PWA" }, { i: Globe, t: "Partner API" }], color: "from-blue-500 to-indigo-500" },
    { title: "Edge / Gateway", items: [{ i: Cloud, t: "CDN" }, { i: Zap, t: "API Gateway" }, { i: Zap, t: "Auth" }], color: "from-cyan-500 to-sky-500" },
    { title: "Services", items: [{ i: Server, t: "Match Engine" }, { i: Cpu, t: "Forecast ML" }, { i: Server, t: "Routing" }], color: "from-fuchsia-500 to-violet-500" },
    { title: "Data", items: [{ i: Database, t: "Postgres" }, { i: Database, t: "Vector DB" }, { i: Database, t: "S3" }], color: "from-emerald-500 to-teal-500" },
  ];
  return (
    <div className="space-y-4">
      {layers.map((l, i) => (
        <motion.div key={l.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{l.title}</div>
          <div className="grid gap-3 md:grid-cols-3">
            {l.items.map((it) => (
              <div key={it.t} className="rounded-2xl border border-border/60 bg-white p-4 shadow-soft">
                <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${l.color} text-white`}>
                  <it.i className="h-4 w-4" />
                </div>
                <div className="mt-3 text-sm font-semibold">{it.t}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Folder() {
  const tree = `apps/
  web/
    src/
      routes/
      components/
      lib/
  api/
    src/
      routes/
      services/
packages/
  ui/
  ml-client/
infra/
  terraform/
  docker/`;
  return (
    <pre className="rounded-2xl border border-border/60 bg-slate-50 p-6 font-mono text-xs leading-relaxed text-slate-700">{tree}</pre>
  );
}

function DB() {
  const tables = [
    { t: "restaurants", cols: ["id", "name", "location", "capacity"] },
    { t: "surplus_events", cols: ["id", "restaurant_id", "items", "predicted_at"] },
    { t: "shelters", cols: ["id", "name", "demand", "location"] },
    { t: "matches", cols: ["id", "event_id", "shelter_id", "status"] },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tables.map((tb) => (
        <div key={tb.t} className="rounded-2xl border border-border/60 bg-white shadow-soft">
          <div className="rounded-t-2xl bg-gradient-brand px-4 py-2 text-sm font-bold text-white">{tb.t}</div>
          <ul className="divide-y divide-border/60">
            {tb.cols.map((c) => (
              <li key={c} className="px-4 py-2 font-mono text-xs">{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function APIFlow() {
  const steps = ["POS → Ingest", "Ingest → Forecast", "Forecast → Match Engine", "Match → Notify Shelters", "Shelter Confirm → Dispatch"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="rounded-xl border border-border/60 bg-white px-3 py-2 text-xs font-medium shadow-soft">{s}</div>
          {i < steps.length - 1 && <span className="text-primary">→</span>}
        </div>
      ))}
    </div>
  );
}

function Deploy() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { t: "Frontend", body: "Vercel Edge · Next.js · CDN" },
        { t: "Backend", body: "AWS ECS Fargate · Postgres RDS" },
        { t: "ML", body: "SageMaker · Feature Store · Ray" },
      ].map((d) => (
        <div key={d.t} className="rounded-2xl border border-border/60 bg-white p-5 shadow-soft">
          <div className="text-xs font-semibold text-primary">{d.t}</div>
          <div className="mt-1 text-sm font-medium">{d.body}</div>
        </div>
      ))}
    </div>
  );
}
