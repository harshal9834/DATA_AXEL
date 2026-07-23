import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, Lightbulb, Boxes, Calendar, Code, FileText, BookOpen } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/app-shell";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — AI Research Copilot" },
      { name: "description", content: "Chat with your project-aware AI copilot." },
      { property: "og:title", content: "AI Assistant — AI Research Copilot" },
      { property: "og:description", content: "Research, architect and document — in one conversation." },
    ],
  }),
  component: Assistant,
});

const prompts = [
  { icon: Lightbulb, label: "Improve my idea" },
  { icon: Boxes, label: "Generate Architecture" },
  { icon: Calendar, label: "Generate Timeline" },
  { icon: Code, label: "Generate APIs" },
  { icon: FileText, label: "Generate Documentation" },
  { icon: BookOpen, label: "Explain Research" },
];

type Msg = { role: "user" | "ai"; text: string };

function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your Research Copilot. Ask me to research, architect, or document your project — I'll do the heavy lifting." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMsgs((m) => [...m, {
        role: "ai",
        text: `Great question. Here's my synthesis on "${t}": I'd start with 3 targeted user interviews to validate the pain, then benchmark 2 open-source baselines, and finally scope a 4-week prototype. Want me to draft the full plan and generate the architecture?`,
      }]);
      setBusy(false);
    }, 900);
  };

  return (
    <div>
      <PageHeader title="AI Assistant" subtitle="Your research, architecture and documentation copilot — in one chat." />
      <div className="card-premium flex h-[calc(100vh-260px)] min-h-[500px] flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "ai" && (
                <div className="mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user" ? "bg-gradient-brand text-white" : "border border-border/60 bg-white"
              }`}>{m.text}</div>
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-500 [animation-delay:.15s]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 [animation-delay:.3s]" />
              Streaming response...
            </div>
          )}
        </div>
        <div className="border-t border-border/60 p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {prompts.map((p) => (
              <button key={p.label} onClick={() => send(p.label)} className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-white px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-primary">
                <p.icon className="h-3 w-3" /> {p.label}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 rounded-xl border border-border/60 bg-white px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10" />
            <button className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
