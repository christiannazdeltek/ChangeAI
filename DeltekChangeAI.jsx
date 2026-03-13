import { useState, useRef, useCallback, useEffect } from "react";

// ── Deltek Brand ────────────────────────────────────────────────────────────
const D = {
  navy:    "#00021D",
  blue:    "#1742F5",
  teal:    "#08E9EB",
  violet:  "#6D18F1",
  magenta: "#C200CC",
  midBlue: "#3895FF",
  slate:   "#3C454E",
  lightBg: "#DFEEFF",
  white:   "#FFFFFF",
};

const DELTEK_LOGO_SVG = `<svg viewBox="0 0 121.84 31.08" xmlns="http://www.w3.org/2000/svg" id="Layer_2" overflow="hidden"><g id="Layer_1-2"><g><path d="M42.07 25.92C41.16 26.51 40.01 26.8 38.61 26.8 37.4 26.8 36.29 26.54 35.29 26.03 34.29 25.52 33.48 24.78 32.88 23.82 32.37 23.01 32.09 22.07 32.01 21.01L49.18 21.01C49.18 18.44 48.7 16.23 47.75 14.37 46.79 12.51 45.5 11.09 43.86 10.11 42.22 9.12 40.38 8.63 38.35 8.63 36.1 8.63 34.11 9.11 32.36 10.06 30.61 11.02 29.24 12.34 28.24 14.02 27.24 15.71 26.74 17.65 26.74 19.84 26.74 22.03 27.23 23.98 28.22 25.66 29.21 27.35 30.56 28.67 32.27 29.62 33.98 30.57 35.95 31.05 38.17 31.05 39.9 31.05 41.44 30.82 42.79 30.36 44.14 29.9 45.31 29.25 46.3 28.39 47.29 27.53 48.1 26.53 48.74 25.39L44.23 23.59C43.71 24.53 43 25.3 42.09 25.88ZM33.19 15.04C33.8 14.28 34.56 13.71 35.47 13.33 36.38 12.94 37.29 12.75 38.2 12.75 39.11 12.75 39.98 12.94 40.82 13.33 41.65 13.72 42.34 14.29 42.89 15.04 43.34 15.66 43.59 16.43 43.67 17.33L32.32 17.33C32.41 16.43 32.69 15.66 33.19 15.04Z" fill="#1742F5"/><path d="M51.03 30.55 51.03 0 55.92 0 55.92 30.55 51.03 30.55Z" fill="#1742F5"/><path d="M72.08 25.75C71.64 26.07 71.25 26.29 70.9 26.4 70.55 26.52 70.23 26.57 69.94 26.57 69.01 26.57 68.3 26.31 67.82 25.78 67.34 25.26 67.1 24.49 67.1 23.47L67.1 12.91 72.99 12.91 72.99 8.72 67.1 8.72 67.1 1.93 62.26 1.93 62.26 8.74 58.64 8.74 58.64 12.93 62.26 12.93 62.26 24.41C62.26 26.56 62.86 28.21 64.07 29.36 65.28 30.51 67.03 31.08 69.33 31.08 70.09 31.08 70.84 30.94 71.6 30.67 72.36 30.39 73.11 29.99 73.87 29.47L72.08 25.76Z" fill="#1742F5"/><path d="M89.73 25.92C88.82 26.51 87.67 26.8 86.27 26.8 85.06 26.8 83.95 26.54 82.95 26.03 81.95 25.52 81.14 24.78 80.54 23.82 80.03 23.01 79.75 22.07 79.67 21.01L96.84 21.01C96.84 18.44 96.36 16.23 95.41 14.37 94.45 12.51 93.16 11.09 91.52 10.11 89.88 9.12 88.04 8.63 86.01 8.63 83.76 8.63 81.77 9.11 80.02 10.06 78.27 11.02 76.9 12.34 75.9 14.02 74.9 15.71 74.4 17.65 74.4 19.84 74.4 22.03 74.89 23.98 75.88 25.66 76.87 27.35 78.22 28.67 79.93 29.62 81.64 30.58 83.61 31.05 85.83 31.05 87.56 31.05 89.1 30.82 90.45 30.36 91.8 29.9 92.97 29.25 93.96 28.39 94.95 27.53 95.76 26.53 96.4 25.39L91.89 23.59C91.37 24.53 90.66 25.3 89.75 25.88ZM80.85 15.04C81.46 14.28 82.22 13.71 83.13 13.33 84.04 12.95 84.95 12.75 85.86 12.75 86.77 12.75 87.64 12.94 88.48 13.33 89.32 13.72 90 14.29 90.55 15.04 91 15.66 91.25 16.43 91.33 17.33L79.98 17.33C80.07 16.43 80.35 15.66 80.85 15.04Z" fill="#1742F5"/><path d="M112.79 30.55 118.59 30.55 109.64 17.77 117.85 8.73 111.96 8.73 103.8 17.62 103.8 0 98.91 0 98.91 30.55 103.8 30.55 103.8 24.2 106.47 21.26 112.79 30.55Z" fill="#1742F5"/><g><circle cx="2.54" cy="21.44" r="2.54" fill="#1742F5"/><path d="M23.03 7.33C21.71 5.03 19.89 3.24 17.57 1.94 15.26 0.65 12.6 0 9.61 0L2.77 0C1.29 0 0.09 1.17 0.01 2.63L0.01 17.89C0.72 17.38 1.59 17.08 2.53 17.08 3.47 17.08 4.35 17.39 5.07 17.9L5.07 4.71 9.61 4.71C11.04 4.71 12.37 4.98 13.62 5.52 14.87 6.06 15.96 6.81 16.89 7.77 17.82 8.73 18.55 9.85 19.07 11.13 19.59 12.41 19.86 13.79 19.86 15.28 19.86 16.77 19.6 18.15 19.07 19.43 18.55 20.71 17.82 21.83 16.89 22.79 15.96 23.75 14.87 24.5 13.62 25.04 12.37 25.58 11.03 25.85 9.61 25.85L2.4 25.85C1.05 25.85 0 26.91 0 28.21 0 29.51 1.06 30.57 2.36 30.57L9.61 30.56C12.61 30.56 15.26 29.91 17.57 28.6 19.88 27.29 21.7 25.49 23.03 23.19 24.35 20.89 25.02 18.26 25.02 15.29 25.02 12.32 24.36 9.65 23.03 7.35Z" fill="#1742F5"/></g></g></g></svg>`;

// ── System Prompts ──────────────────────────────────────────────────────────
const CHAT_SYSTEM_PROMPT = `You are a Change AI Analyst for Deltek's IT Service Management team (ITIL5), specializing in cloud infrastructure changes (AWS/Azure) and enterprise application deployments. You are ITIL CDS aligned.

CORE KNOWLEDGE AREAS:
- Change Management Policy (Deltek Global Cloud 2025)
- ChangeRequestFields requirements & validation
- Blackout period awareness & CAB scheduling
- Problem Management (DGCProblemManagementPolicy)
- Incident Management (DGCIncidentManagementPolicy)
- Capacity & Change Guide best practices
- AWS/Azure cloud infrastructure best practices
- ITIL Well-Architected Framework

CAPABILITIES:
1. REVIEW draft change requests for completeness, risks, and policy compliance
2. GENERATE pre/post testing plans, implementation procedures, rollback steps
3. VALIDATE change type classification (Standard/Normal/Emergency)
4. ASSESS risks: technical debt, security, rollback complexity, dependencies
5. ANSWER questions about CAB schedules, blackout periods, policies
6. DISTINGUISH between Change/Incident/Problem management processes
7. IDENTIFY stakeholders and recommend appropriate approvers

RESPONSE GUIDELINES:
- Always be concise, professional, and ITIL-aligned
- Reference policy sections when applicable (e.g., "Per DGC Change Policy Section 4.2...")
- For change reviews, structure output: ✅ Present | ❌ Missing | ⚠ Risk | 💡 Recommendation
- For CAB questions, always check submission deadlines (typically 3 business days before CAB)
- For blackout periods: Q4 (Nov 15 – Jan 15), major product releases, fiscal year-end
- Standard CAB meets every Wednesday; Emergency CAB convened within 4 hours
- Change windows: Production = Saturday 10PM–Sunday 6AM EST; Non-Prod = weekdays off-hours
- Emergency changes require P1/P2 incident linkage and ECAB approval
- Always flag if a change falls in a blackout period
- For AWS/Azure changes: recommend change freeze notifications to dependent teams

CHANGE TYPE CLASSIFICATION:
- Standard: Pre-approved, low risk, repeatable (e.g., certificate renewal, routine patch)
- Normal: Requires CAB approval, planned, moderate-high risk
- Emergency: Unplanned, incident-driven, requires ECAB, documented post-implementation

ITIL PROCESS BOUNDARIES:
- Change Management: Planned modifications to IT services/infrastructure
- Incident Management: Restoring service ASAP; may trigger emergency change
- Problem Management: Root cause analysis; may result in change request (RFC)

Respond in a helpful, structured way. Use markdown-style formatting with clear headers and bullet points.`;

const CLASSIFIER_SYSTEM_PROMPT = `You are an ITSM incident classifier for Deltek Global Cloud. Determine whether an incident is RELEASE-RELATED based on the full incident PDF content provided.

DEFINITIONS:
- RELEASE_RELATED: the incident was caused by, occurred during, or directly resulted from a software/application release activity — deployments, upgrades, hotfixes, cumulative bundles, maintenance release rollouts, release pipelines, version updates, or release execution failures.
- NOT_RELEASE_RELATED: the incident was operational/runtime (query blocking, infrastructure failure, capacity, user error, certificate renewal, OS patching, network issue) NOT triggered by a software release.
- INCONCLUSIVE: evidence is present but insufficient to make a firm determination.

DECISION RULES:
1. If no CHG reference is present AND no release/deployment activity is evident → NOT_RELEASE_RELATED.
2. If a CHG is linked AND it is a release/deployment type (hotfix, upgrade, rollout, sprint release) → RELEASE_RELATED.
3. If a CHG is linked BUT it is infrastructure/ops (OS patch, cert renewal, network, disk) → NOT_RELEASE_RELATED.
4. Do NOT assume. If evidence is ambiguous → INCONCLUSIVE with explanation.

Respond ONLY with valid JSON (no markdown, no backticks, no explanation outside JSON):
{
  "classification": "RELEASE_RELATED" | "NOT_RELEASE_RELATED" | "INCONCLUSIVE",
  "confidence": 0-100,
  "incident_number": "extracted INC number or null",
  "summary": "1-2 sentence plain-English explanation of why",
  "evidence": ["specific quote or field value supporting classification"],
  "change_link_present": true | false,
  "change_ids_found": ["CHG numbers found"],
  "release_signals_found": ["deployment", "hotfix", etc],
  "non_release_signals_found": ["blocking", "CPU", etc],
  "missing_info_needed_if_inconclusive": ["what to check"]
}`;

// ── Classification result config ────────────────────────────────────────────
const RESULT_CONFIG = {
  RELEASE_RELATED:     { bg: "#FEF0EF", border: "#F5C6C2", accent: "#C0392B", dot: "#E74C3C", label: "RELEASE-RELATED",     icon: "⚠" },
  NOT_RELEASE_RELATED: { bg: "#EEF9F1", border: "#B8E4C4", accent: "#1E7E34", dot: "#27AE60", label: "NOT RELEASE-RELATED", icon: "✓" },
  INCONCLUSIVE:        { bg: "#F3EFFE", border: "#C9B8F5", accent: "#5B2DC4", dot: "#7D4FE0", label: "INCONCLUSIVE",         icon: "?" },
};

const RECO = {
  RELEASE_RELATED:     "Link incident to the release CHG. Escalate to Release Manager. Tag as Release-Related in ServiceNow and initiate post-release review.",
  NOT_RELEASE_RELATED: "Handle as standard operational incident. No release linkage required. Assign to appropriate ops team.",
  INCONCLUSIVE:        "Gather additional evidence. Confirm the CHG type, check the release calendar, and review deployment logs before finalising classification.",
};

// ── Shared API call ──────────────────────────────────────────────────────────
async function callClaude({ systemPrompt, messages }) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.map(c => c.text || "").join("") || "";
}

// ── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^### (.+)$/gm, '<h3 style="color:#00021D;font-size:13px;font-weight:700;margin:14px 0 6px;letter-spacing:0.3px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#00021D;font-size:15px;font-weight:800;margin:16px 0 8px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color:#00021D;font-size:17px;font-weight:800;margin:16px 0 8px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#EEF2FF;color:#1742F5;padding:1px 5px;border-radius:3px;font-size:12px">$1</code>')
    .replace(/^- (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#1742F5;font-weight:700;flex-shrink:0">•</span><span>$1</span></div>')
    .replace(/^(\d+)\. (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#1742F5;font-weight:700;flex-shrink:0;min-width:18px">$1.</span><span>$2</span></div>')
    .replace(/^✅ (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0;padding:4px 8px;background:#EEF9F1;border-radius:4px"><span>✅</span><span>$1</span></div>')
    .replace(/^❌ (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0;padding:4px 8px;background:#FEF0EF;border-radius:4px"><span>❌</span><span>$1</span></div>')
    .replace(/^⚠ (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0;padding:4px 8px;background:#FFFBEB;border-radius:4px"><span>⚠</span><span>$1</span></div>')
    .replace(/^💡 (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0;padding:4px 8px;background:#EEF2FF;border-radius:4px"><span>💡</span><span>$1</span></div>')
    .replace(/\n\n/g, '<div style="height:8px"></div>')
    .replace(/\n/g, "<br/>");
}

// ── NAV TABS ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "chat",       label: "AI Analyst",         icon: "🤖", desc: "Ask anything about changes, CAB, blackout periods, policies" },
  { id: "review",     label: "Change Reviewer",    icon: "📋", desc: "Upload a change request PDF for automated review" },
  { id: "classifier", label: "Incident Classifier",icon: "🔍", desc: "Classify if an incident is release-related" },
  { id: "aging",      label: "Aging Follow-up",    icon: "⏰", desc: "Upload Excel aging report and compose Teams follow-up messages" },
];

// ── XLSX column aliases ──────────────────────────────────────────────────────
const COL_ALIASES = {
  number:        ['number','chg#','chg number','change number','change_number','ticket'],
  description:   ['short description','description','short_description','summary','title','subject'],
  state:         ['state','status'],
  planned_start: ['planned start date','planned start','start date','planned_start_date'],
  planned_end:   ['planned end date','planned end','end date','planned_end_date','due date'],
  requested_by:  ['requested by','requestor','requested_by','requester','opened by'],
  assigned_to:   ['assigned to','assignee','assigned_to','owner','engineer'],
  approval:      ['approval','approval status','approved','approval state'],
};

function detectCols(headers) {
  const m = {};
  headers.forEach((h, i) => {
    const hn = String(h || '').toLowerCase().trim();
    for (const [k, aliases] of Object.entries(COL_ALIASES))
      if (m[k] === undefined && aliases.includes(hn)) m[k] = i;
  });
  return m;
}

function parseExcelDate(v) {
  if (!v && v !== 0) return '';
  if (v instanceof Date) return v.toISOString().split('T')[0];
  const s = String(v).trim(), m = s.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : s;
}

const AGING_TEMPLATES = {
  1: (items, names) =>
`Hi ${names.join(' / ')},

I hope you're doing well! I wanted to follow up on the change request(s) listed below, which are currently showing as open in our aging report:

${items.map(r => `• ${r.number} — ${r.description}\n  State: ${r.state} | Planned end: ${r.planned_end}`).join('\n\n')}

Could you please provide a quick status update at your earliest convenience? If the work has already been completed, kindly update the record in ServiceNow so we can close it out.

Thank you for your time — I really appreciate it!

Best regards,
Change Management Team`,

  2: (items, names) =>
`Hi ${names.join(' / ')},

This is a second follow-up on the change request(s) below, which remain open and unresolved past their planned end date. We have not yet received a response to our previous message.

${items.map(r => `• ${r.number} — ${r.description}\n  State: ${r.state} | Planned end: ${r.planned_end} ⚠️ OVERDUE`).join('\n\n')}

These items are flagged in the aging report and are impacting our compliance metrics. We kindly ask you to take immediate action:

1. ✅ Close the record in ServiceNow if implementation is complete
2. 📅 Provide a revised planned end date if work is still in progress
3. 🚧 Let us know if there is a blocker we can help resolve

Please respond to this message with an update as soon as possible.

Thank you,
Change Management Team`,

  3: (items, names) =>
`Hi ${names.join(' / ')},

This is our THIRD and final follow-up regarding the change request(s) below. Despite previous messages, these items remain unresolved and continue to appear in the aging report without any update.

${items.map(r => `• ${r.number} — ${r.description}\n  State: ${r.state} | Planned end: ${r.planned_end} 🚨 CRITICALLY OVERDUE`).join('\n\n')}

⚠️ IMPORTANT: If we do not receive a response or status update by end of business today, we will be required to escalate this matter to IT Management and Service Leadership for review.

Escalation may result in:
• Formal review of the change by the Change Advisory Board (CAB)
• Impact to team performance metrics and SLA compliance
• Mandatory justification for delay

We strongly encourage you to respond immediately to avoid escalation. If there is a legitimate reason for the delay, please communicate this to the Change Management Team directly so we can document it appropriately.

Please treat this as a high-priority action item.

Regards,
Change Management Team
⚠️ This message has been logged for escalation tracking.`,

  c: () => ``,
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div style={{
      fontFamily: "'Figtree', 'Segoe UI', sans-serif",
      background: "#F5F7FA",
      minHeight: "100vh",
      padding: 0,
    }}>
      {/* ── Top Nav ── */}
      <div style={{
        background: D.navy,
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,2,29,0.35)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div dangerouslySetInnerHTML={{ __html: DELTEK_LOGO_SVG }} style={{ width: 100 }} />
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, letterSpacing: 0.3 }}>
            Global Cloud · ITSM
          </span>
        </div>
        <div style={{
          background: "rgba(23,66,245,0.25)",
          border: "1px solid rgba(23,66,245,0.5)",
          borderRadius: 4,
          padding: "4px 12px",
          color: "#8AABFF",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 0.8,
        }}>
          CHANGE MANAGEMENT · ITIL CDS
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div style={{
        background: `linear-gradient(115deg, ${D.navy} 0%, #070D63 55%, #0D1A8A 100%)`,
        padding: "28px 40px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", right: 0, top: 0, height: "100%", opacity: 0.12 }}
          viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
          <path d="M110 80 C110 40 140 20 160 20 L300 20 L300 0 L0 0 L0 160 L300 160 L300 115 L160 115 C140 115 110 100 110 80Z" fill="url(#hg)"/>
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1742F5"/>
              <stop offset="1" stopColor="#08E9EB"/>
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: "rgba(23,66,245,0.35)",
              border: "1px solid rgba(23,66,245,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
            }}>🛡️</div>
            <div>
              <div style={{ color: D.white, fontSize: 22, fontWeight: 800, letterSpacing: 0.2 }}>
                Change AI Analyst
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>
                AI-powered · ITIL5 Aligned · Deltek Global Cloud ITSM
              </div>
            </div>
          </div>
          {/* Tab bar inside hero */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  border: activeTab === tab.id ? "1px solid rgba(8,233,235,0.5)" : "1px solid rgba(255,255,255,0.15)",
                  background: activeTab === tab.id ? "rgba(23,66,245,0.5)" : "rgba(255,255,255,0.07)",
                  color: activeTab === tab.id ? D.teal : "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                  transition: "all 0.2s",
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 40px" }}>
        {activeTab === "chat"       && <ChatTab />}
        {activeTab === "review"     && <ReviewTab />}
        {activeTab === "classifier" && <ClassifierTab />}
        {activeTab === "aging"      && <AgingTab />}
      </div>

      {/* ── Footer ── */}
      <div style={{
        borderTop: "1px solid #DDE3EE",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: D.white,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div dangerouslySetInnerHTML={{ __html: DELTEK_LOGO_SVG }} style={{ width: 55, opacity: 0.35 }} />
          <span style={{ color: "#B0BAD0", fontSize: 11 }}>Global Cloud · Change Management · ITIL CDS Aligned</span>
        </div>
        <div style={{ color: "#B0BAD0", fontSize: 11 }}>Powered by Claude AI · Deltek ITSM</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — AI Chat Analyst
// ══════════════════════════════════════════════════════════════════════════════
const QUICK_PROMPTS = [
  "When is the next CAB meeting and what's the submission deadline?",
  "Are there any blackout periods in Q1 2026?",
  "What fields are required for a Normal change request?",
  "What's the difference between Standard, Normal, and Emergency changes?",
  "How do I classify a change vs an incident vs a problem?",
  "What are the change window times for production environments?",
];

function ChatTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const reply = await callClaude({
        systemPrompt: CHAT_SYSTEM_PROMPT,
        messages: newMessages,
      });
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: `⚠ Error: ${err.message}` }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse { 0%,100% { opacity:0.4 } 50% { opacity:1 } }
        .msg-enter { animation: fadeInUp 0.3s ease; }
        .chat-input:focus { outline:none; border-color: #1742F5 !important; box-shadow: 0 0 0 3px rgba(23,66,245,0.12); }
      `}</style>

      {/* Quick prompts */}
      {messages.length === 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            background: D.white,
            borderRadius: 10,
            border: "1px solid #DDE3EE",
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,2,29,0.06)",
          }}>
            <div style={{
              padding: "14px 20px",
              background: "#F9FAFD",
              borderBottom: "1px solid #DDE3EE",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
              <span style={{ color: D.navy, fontWeight: 700, fontSize: 13 }}>QUICK QUESTIONS</span>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUICK_PROMPTS.map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  padding: "7px 14px",
                  background: "#EEF2FF",
                  border: "1px solid #C7D2FE",
                  borderRadius: 20,
                  color: "#3730A3",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  transition: "all 0.15s",
                }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.length > 0 && (
        <div style={{
          background: D.white,
          borderRadius: 10,
          border: "1px solid #DDE3EE",
          marginBottom: 16,
          maxHeight: 480,
          overflowY: "auto",
          boxShadow: "0 1px 6px rgba(0,2,29,0.06)",
        }}>
          <div style={{
            padding: "14px 20px",
            background: "#F9FAFD",
            borderBottom: "1px solid #DDE3EE",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
              <span style={{ color: D.navy, fontWeight: 700, fontSize: 13 }}>CONVERSATION</span>
            </div>
            <button onClick={() => setMessages([])} style={{
              padding: "3px 10px", fontSize: 11, borderRadius: 4,
              border: "1px solid #DDE3EE", background: "transparent",
              color: "#8896B0", cursor: "pointer", fontFamily: "inherit",
            }}>Clear</button>
          </div>

          <div style={{ padding: "16px 20px" }}>
            {messages.map((m, i) => (
              <div key={i} className="msg-enter" style={{
                marginBottom: 16,
                display: "flex",
                gap: 10,
                flexDirection: m.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-start",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                  background: m.role === "user" ? D.blue : `linear-gradient(135deg, ${D.navy}, #0D2ED4)`,
                  border: m.role === "assistant" ? `1px solid ${D.blue}30` : "none",
                }}>
                  {m.role === "user" ? "👤" : "🤖"}
                </div>
                {/* Bubble */}
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                  background: m.role === "user" ? D.blue : "#F9FAFD",
                  border: m.role === "assistant" ? "1px solid #DDE3EE" : "none",
                  color: m.role === "user" ? "#fff" : D.navy,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}>
                  {m.role === "assistant"
                    ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                    : m.content
                  }
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${D.navy}, #0D2ED4)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
                <div style={{ padding: "10px 14px", background: "#F9FAFD", border: "1px solid #DDE3EE", borderRadius: "4px 12px 12px 12px" }}>
                  <span style={{ animation: "pulse 1s infinite", display: "inline-block" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.2s infinite", display: "inline-block", margin: "0 3px" }}>●</span>
                  <span style={{ animation: "pulse 1s 0.4s infinite", display: "inline-block" }}>●</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* Input box */}
      <div style={{
        background: D.white,
        borderRadius: 10,
        border: "1px solid #DDE3EE",
        padding: "14px 16px",
        display: "flex",
        gap: 10,
        alignItems: "flex-end",
        boxShadow: "0 1px 6px rgba(0,2,29,0.06)",
      }}>
        <textarea
          ref={inputRef}
          className="chat-input"
          rows={2}
          placeholder="Ask about change requests, CAB schedules, blackout periods, ITIL policies, risk assessments..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          style={{
            flex: 1,
            border: "1px solid #DDE3EE",
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            fontFamily: "inherit",
            resize: "none",
            lineHeight: 1.5,
            color: D.navy,
            background: "#FAFBFE",
            transition: "all 0.2s",
          }}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: input.trim() && !loading ? `linear-gradient(90deg, ${D.blue}, #0D2ED4)` : "#C5CFE8",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            height: 44,
            flexShrink: 0,
            boxShadow: input.trim() && !loading ? "0 4px 12px rgba(23,66,245,0.3)" : "none",
            transition: "all 0.2s",
          }}>
          Send ↑
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — Change Request Reviewer
// ══════════════════════════════════════════════════════════════════════════════
const CHANGE_REVIEW_PROMPT = `You are reviewing a change request PDF from Deltek's ServiceNow instance against the Deltek Global Cloud 2025 Change Management Policy and ChangeRequestFields requirements.

Perform a structured review covering:

## 1. COMPLETENESS CHECK
Check each required field and mark ✅ Present or ❌ Missing:
- Change Title / Short Description
- Change Type (Standard/Normal/Emergency)  
- Priority / Risk Level
- Implementation Start & End Date/Time
- Change Window (Production: Sat 10PM–Sun 6AM EST)
- Environment (Production/Non-Production)
- Assigned Team / Assignment Group
- Change Owner / Requested By
- Business Justification / Reason for Change
- Implementation Plan / Step-by-Step Procedure
- Pre-Testing / Validation Steps
- Post-Implementation Testing
- Rollback Plan
- Test Results / Evidence
- Risk Assessment
- Impact Assessment (Users/Services affected)
- CAB Approval Status
- Communication Plan

## 2. RISK ASSESSMENT
Rate overall risk: Low / Medium / High / Critical
Identify specific risks including:
- Technical complexity
- Blast radius / impact scope
- Rollback complexity
- Dependency risks
- Security implications
- Timing risks (blackout periods, peak hours)

## 3. POLICY COMPLIANCE
Flag any violations of:
- Change window requirements
- Blackout period conflicts
- CAB submission deadline compliance
- Emergency change criteria (if applicable)
- Mandatory approver requirements

## 4. IMPROVEMENT RECOMMENDATIONS
Provide 3-5 specific, actionable improvements to increase CAB approval likelihood.

## 5. OVERALL VERDICT
Rate: ✅ READY FOR CAB | ⚠ NEEDS REVISION | ❌ NOT APPROVABLE
Give a 2-3 sentence summary with the primary reason.

Be specific and reference field names as they appear in the document.`;

function ReviewTab() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const readFile = (f) => {
    if (!f || f.type !== "application/pdf") {
      setError("Please attach a PDF file.");
      return;
    }
    setFile(f); setResult(null); setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setFileData(e.target.result.split(",")[1]);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    readFile(e.dataTransfer.files[0]);
  }, []);

  const review = async () => {
    if (!fileData) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const reply = await callClaude({
        systemPrompt: CHANGE_REVIEW_PROMPT,
        messages: [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileData } },
            { type: "text", text: "Please perform a full structured review of this change request against Deltek's change management policy and field requirements." }
          ]
        }]
      });
      setResult(reply);
    } catch (err) {
      setError("Review failed: " + err.message);
    }
    setLoading(false);
  };

  const reset = () => { setFile(null); setFileData(null); setResult(null); setError(null); };

  return (
    <div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }`}</style>
      {!result ? (
        <div>
          <div style={{
            background: D.white, borderRadius: 10,
            border: "1px solid #DDE3EE",
            boxShadow: "0 1px 6px rgba(0,2,29,0.06)",
            overflow: "hidden", marginBottom: 20,
          }}>
            <div style={{
              padding: "14px 20px", background: "#F9FAFD",
              borderBottom: "1px solid #DDE3EE", display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
              <span style={{ color: D.navy, fontWeight: 700, fontSize: 13 }}>ATTACH CHANGE REQUEST PDF</span>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <div style={{
                background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 8,
                padding: "10px 14px", marginBottom: 20, fontSize: 12.5, color: "#3730A3", lineHeight: 1.6,
              }}>
                <strong>Export from ServiceNow:</strong> Open the Change Request record → right-click form header → <em>Save as PDF</em>. The AI will review all fields including implementation plan, risk assessment, and approvals.
              </div>

              <div
                onDrop={onDrop}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragging ? D.blue : (file ? "#27AE60" : "#C5CFE8")}`,
                  borderRadius: 10, padding: "36px 24px", textAlign: "center",
                  cursor: "pointer",
                  background: dragging ? "#EEF2FF" : (file ? "#F0FBF4" : "#FAFBFE"),
                  transition: "all 0.2s",
                }}>
                <input ref={fileRef} type="file" accept="application/pdf"
                  style={{ display: "none" }} onChange={e => readFile(e.target.files[0])} />
                {file ? (
                  <div>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
                    <div style={{ color: "#1E7E34", fontWeight: 700, fontSize: 15 }}>{file.name}</div>
                    <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{(file.size / 1024).toFixed(1)} KB · Ready for review</div>
                    <button onClick={(e) => { e.stopPropagation(); reset(); }} style={{
                      marginTop: 12, padding: "4px 14px", border: "1px solid #ccc",
                      borderRadius: 20, background: "transparent", color: "#666", cursor: "pointer", fontSize: 11
                    }}>✕ Remove</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 44, marginBottom: 10 }}>📋</div>
                    <div style={{ color: D.navy, fontWeight: 600, fontSize: 15 }}>Drop change request PDF here</div>
                    <div style={{ color: "#8896B0", fontSize: 12, marginTop: 6 }}>or click to browse · PDF files only</div>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ marginTop: 14, background: "#FEF0EF", border: "1px solid #F5C6C2", borderRadius: 8, padding: "10px 14px", color: "#C0392B", fontSize: 12.5 }}>
                  ⚠ {error}
                </div>
              )}

              <button onClick={review} disabled={!fileData || loading} style={{
                marginTop: 20, width: "100%", padding: 14, borderRadius: 8, border: "none",
                cursor: fileData && !loading ? "pointer" : "not-allowed",
                background: fileData && !loading ? `linear-gradient(90deg, ${D.blue} 0%, #0D2ED4 100%)` : "#C5CFE8",
                color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
                boxShadow: fileData && !loading ? "0 4px 16px rgba(23,66,245,0.35)" : "none",
                transition: "all 0.2s",
              }}>
                {loading ? "⏳  Reviewing with Claude AI…" : fileData ? "📋  Review Change Request" : "Attach a PDF to continue"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{
            background: D.white, borderRadius: 10, border: "1px solid #DDE3EE",
            boxShadow: "0 1px 6px rgba(0,2,29,0.06)", overflow: "hidden", marginBottom: 16,
          }}>
            <div style={{
              padding: "14px 20px", background: "#F9FAFD",
              borderBottom: "1px solid #DDE3EE", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
                <span style={{ color: D.navy, fontWeight: 700, fontSize: 13 }}>CHANGE REQUEST REVIEW REPORT</span>
              </div>
              <span style={{ color: "#8896B0", fontSize: 11 }}>📄 {file?.name}</span>
            </div>
            <div style={{ padding: "20px 24px", fontSize: 13, lineHeight: 1.7, color: D.navy }}>
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={reset} style={{
              padding: "10px 24px", borderRadius: 8, border: "none",
              background: `linear-gradient(90deg, ${D.blue}, #0D2ED4)`,
              color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 12px rgba(23,66,245,0.3)",
            }}>
              ＋ Review Another Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — Incident Classifier (original component preserved)
// ══════════════════════════════════════════════════════════════════════════════

// Note: AgingTab is defined after ClassifierTab below
function ClassifierTab() {
  const [file, setFile]         = useState(null);
  const [fileData, setFileData] = useState(null);
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const readFile = (f) => {
    if (!f || f.type !== "application/pdf") { setError("Please attach a PDF file."); return; }
    setFile(f); setResult(null); setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setFileData(e.target.result.split(",")[1]);
    reader.readAsDataURL(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false); readFile(e.dataTransfer.files[0]);
  }, []);

  const classify = async () => {
    if (!fileData) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const text = await callClaude({
        systemPrompt: CLASSIFIER_SYSTEM_PROMPT,
        messages: [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileData } },
            { type: "text", text: "Classify this incident. Respond only with the JSON object as specified." }
          ]
        }]
      });
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (err) {
      setError("Classification failed: " + err.message);
    }
    setLoading(false);
  };

  const reset = () => { setFile(null); setFileData(null); setResult(null); setError(null); };
  const cfg = result ? RESULT_CONFIG[result.classification] : null;

  return (
    <div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {!result ? (
        <div>
          <div style={{
            background: D.white, borderRadius: 10, border: "1px solid #DDE3EE",
            boxShadow: "0 1px 6px rgba(0,2,29,0.06)", overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 20px", background: "#F9FAFD",
              borderBottom: "1px solid #DDE3EE", display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
              <span style={{ color: D.navy, fontWeight: 700, fontSize: 13 }}>ATTACH INCIDENT PDF</span>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <div style={{
                background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 8,
                padding: "10px 14px", marginBottom: 20, fontSize: 12.5, color: "#3730A3", lineHeight: 1.6,
              }}>
                <strong>How to export from ServiceNow:</strong> Open the incident record → right-click the form header → <em>Save as PDF</em>. The AI reads the full incident including work notes, resolution, and all linked records.
              </div>

              <div
                onDrop={onDrop}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragging ? D.blue : (file ? "#27AE60" : "#C5CFE8")}`,
                  borderRadius: 10, padding: "36px 24px", textAlign: "center",
                  cursor: "pointer",
                  background: dragging ? "#EEF2FF" : (file ? "#F0FBF4" : "#FAFBFE"),
                  transition: "all 0.2s",
                }}>
                <input ref={fileRef} type="file" accept="application/pdf"
                  style={{ display: "none" }} onChange={e => readFile(e.target.files[0])} />
                {file ? (
                  <div>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
                    <div style={{ color: "#1E7E34", fontWeight: 700, fontSize: 15 }}>{file.name}</div>
                    <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{(file.size / 1024).toFixed(1)} KB · PDF ready for analysis</div>
                    <button onClick={(e) => { e.stopPropagation(); reset(); }} style={{
                      marginTop: 12, padding: "4px 14px", border: "1px solid #ccc",
                      borderRadius: 20, background: "transparent", color: "#666", cursor: "pointer", fontSize: 11
                    }}>✕ Remove</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 44, marginBottom: 10 }}>📂</div>
                    <div style={{ color: D.navy, fontWeight: 600, fontSize: 15 }}>Drop incident PDF here</div>
                    <div style={{ color: "#8896B0", fontSize: 12, marginTop: 6 }}>or click to browse · PDF files only</div>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ marginTop: 14, background: "#FEF0EF", border: "1px solid #F5C6C2", borderRadius: 8, padding: "10px 14px", color: "#C0392B", fontSize: 12.5 }}>
                  ⚠ {error}
                </div>
              )}

              <button onClick={classify} disabled={!fileData || loading} style={{
                marginTop: 20, width: "100%", padding: 14, borderRadius: 8, border: "none",
                cursor: fileData && !loading ? "pointer" : "not-allowed",
                background: fileData && !loading ? `linear-gradient(90deg, ${D.blue} 0%, #0D2ED4 100%)` : "#C5CFE8",
                color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "inherit",
                boxShadow: fileData && !loading ? "0 4px 16px rgba(23,66,245,0.35)" : "none",
                transition: "all 0.2s",
              }}>
                {loading ? "⏳  Analysing with Claude AI…" : fileData ? "🔍  Classify Incident" : "Attach a PDF to continue"}
              </button>
              {loading && (
                <div style={{ marginTop: 14, textAlign: "center", color: "#6B7A99", fontSize: 12 }}>
                  Reading full incident record — work notes, resolution, change links…
                </div>
              )}
            </div>
          </div>
        </div>
      ) : cfg && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          {/* Classification badge */}
          <div style={{
            background: cfg.bg, border: `2px solid ${cfg.border}`, borderRadius: 12,
            padding: "24px 28px", marginBottom: 16,
            display: "flex", alignItems: "flex-start", gap: 20,
            boxShadow: `0 4px 20px ${cfg.border}80`,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12, background: cfg.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 24, flexShrink: 0, fontWeight: 700,
            }}>{cfg.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: cfg.accent, fontWeight: 800, fontSize: 20 }}>{cfg.label}</div>
              {result.incident_number && (
                <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>
                  Incident: <strong style={{ color: D.navy }}>{result.incident_number}</strong>
                </div>
              )}
              <div style={{ color: "#444", fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{result.summary}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: cfg.accent, lineHeight: 1 }}>{result.confidence}%</div>
              <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>Confidence</div>
            </div>
          </div>

          {/* Detail cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ background: D.white, borderRadius: 10, border: "1px solid #DDE3EE", padding: "16px 18px" }}>
              <div style={{ color: "#8896B0", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>CHG LINK</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: result.change_link_present ? "#1E7E34" : "#C0392B" }}>
                {result.change_link_present ? "✓ Present" : "✗ None"}
              </div>
              {result.change_ids_found?.length > 0 && (
                <div style={{ marginTop: 6 }}>
                  {result.change_ids_found.map(id => (
                    <span key={id} style={{ display: "inline-block", background: "#EEF2FF", color: D.blue, border: "1px solid #C7D2FE", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontFamily: "monospace", marginRight: 4, marginTop: 2 }}>{id}</span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ background: D.white, borderRadius: 10, border: "1px solid #DDE3EE", padding: "16px 18px" }}>
              <div style={{ color: "#8896B0", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>RELEASE SIGNALS</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: D.navy }}>{result.release_signals_found?.length || 0} found</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6 }}>
                {result.release_signals_found?.slice(0, 4).map(s => (
                  <span key={s} style={{ background: "#FEF0EF", color: "#C0392B", border: "1px solid #F5C6C2", borderRadius: 4, padding: "1px 7px", fontSize: 10 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background: D.white, borderRadius: 10, border: "1px solid #DDE3EE", padding: "16px 18px" }}>
              <div style={{ color: "#8896B0", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, marginBottom: 8 }}>OPS SIGNALS</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: D.navy }}>{result.non_release_signals_found?.length || 0} found</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6 }}>
                {result.non_release_signals_found?.slice(0, 4).map(s => (
                  <span key={s} style={{ background: "#EEF9F1", color: "#1E7E34", border: "1px solid #B8E4C4", borderRadius: 4, padding: "1px 7px", fontSize: 10 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Evidence */}
          {result.evidence?.length > 0 && (
            <div style={{ background: D.white, borderRadius: 10, border: "1px solid #DDE3EE", padding: "18px 22px", marginBottom: 16 }}>
              <div style={{ color: "#8896B0", fontSize: 10, fontWeight: 700, letterSpacing: 0.8, marginBottom: 12 }}>SUPPORTING EVIDENCE</div>
              {result.evidence.map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, paddingLeft: 12, borderLeft: `3px solid ${D.blue}` }}>
                  <div style={{ color: "#555", fontSize: 13, lineHeight: 1.5 }}>{e}</div>
                </div>
              ))}
            </div>
          )}

          {/* Missing info */}
          {result.missing_info_needed_if_inconclusive?.length > 0 && (
            <div style={{ background: "#F3EFFE", borderRadius: 10, border: "1px solid #C9B8F5", padding: "16px 20px", marginBottom: 16 }}>
              <div style={{ color: "#5B2DC4", fontWeight: 700, fontSize: 12, marginBottom: 8 }}>❓ ADDITIONAL INFORMATION NEEDED</div>
              {result.missing_info_needed_if_inconclusive.map((m, i) => (
                <div key={i} style={{ color: "#4A3B8C", fontSize: 13, marginBottom: 4 }}>• {m}</div>
              ))}
            </div>
          )}

          {/* Recommendation */}
          <div style={{
            background: `linear-gradient(135deg, ${D.navy} 0%, #070D63 100%)`,
            borderRadius: 10, padding: "18px 22px", marginBottom: 16,
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>💡</div>
            <div>
              <div style={{ color: D.teal, fontWeight: 700, fontSize: 11, letterSpacing: 0.8, marginBottom: 6 }}>RECOMMENDATION</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 1.6 }}>{RECO[result.classification]}</div>
            </div>
          </div>

          {/* Reset */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: "#F9FAFD", border: "1px solid #DDE3EE", borderRadius: 8,
          }}>
            <div style={{ color: "#8896B0", fontSize: 12 }}>
              📄 Analysed: <strong style={{ color: D.navy }}>{file?.name}</strong> · {(file?.size / 1024).toFixed(1)} KB
            </div>
            <button onClick={reset} style={{
              padding: "7px 18px", background: D.blue,
              color: "#fff", border: "none", borderRadius: 6,
              cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
            }}>＋ Classify Another Incident</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — Aging Ticket Follow-Up
// ══════════════════════════════════════════════════════════════════════════════
function AgingTab() {
  const [raw, setRaw]           = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [sortKey, setSortKey]   = useState('');
  const [sortDir, setSortDir]   = useState('asc');
  const [search, setSearch]     = useState('');
  const [filterState, setFilterState]     = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [activeTpl, setActiveTpl] = useState(1);
  const [msgBody, setMsgBody]   = useState('');
  const [fileName, setFileName] = useState('');
  const [toast, setToast]       = useState('');
  const fileRef = useRef();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  // ── File parsing (uses SheetJS from CDN via script tag) ──────────────────
  const handleFile = (file) => {
    if (!file) return;
    if (!window.XLSX) { showToast('XLSX library not loaded yet, please try again'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = window.XLSX.read(e.target.result, { type: 'array', cellDates: true });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (rows.length < 2) { showToast('File appears empty'); return; }
        const headers = rows[0].map(h => String(h || ''));
        const idx = detectCols(headers);
        const parsed = rows.slice(1)
          .filter(row => row.some(c => c !== ''))
          .map(row => ({
            number:        String(row[idx.number]  ?? '').trim(),
            description:   String(row[idx.description] ?? '').trim(),
            state:         String(row[idx.state]   ?? '').trim(),
            planned_start: parseExcelDate(row[idx.planned_start]),
            planned_end:   parseExcelDate(row[idx.planned_end]),
            requested_by:  String(row[idx.requested_by] ?? '').trim(),
            assigned_to:   String(row[idx.assigned_to]  ?? '').trim(),
            approval:      String(row[idx.approval] ?? '').trim(),
          }))
          .filter(r => r.number);
        setRaw(parsed);
        setSelected(new Set());
        setSortKey(''); setSortDir('asc');
        setSearch(''); setFilterState(''); setFilterAssignee('');
        setFileName(file.name);
        showToast(`Loaded ${parsed.length} change records from ${file.name}`);
      } catch (err) { showToast('Error reading file: ' + err.message); }
    };
    reader.readAsArrayBuffer(file);
  };

  // ── Filter + sort ─────────────────────────────────────────────────────────
  useEffect(() => {
    let f = raw.filter(r =>
      (!filterState    || r.state === filterState) &&
      (!filterAssignee || r.assigned_to === filterAssignee) &&
      (!search || [r.number, r.description, r.assigned_to, r.requested_by]
        .some(v => v.toLowerCase().includes(search.toLowerCase())))
    );
    if (sortKey) {
      f = [...f].sort((a, b) => {
        const va = String(a[sortKey] || '').toLowerCase();
        const vb = String(b[sortKey] || '').toLowerCase();
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    setFiltered(f);
  }, [raw, search, filterState, filterAssignee, sortKey, sortDir]);

  // ── Template rendering ────────────────────────────────────────────────────
  useEffect(() => {
    if (selected.size > 0) {
      const items = raw.filter(r => selected.has(r.number));
      const names = [...new Set(items.map(r => r.assigned_to))];
      const fn = AGING_TEMPLATES[activeTpl];
      setMsgBody(fn ? fn(items, names) : '');
    }
  }, [activeTpl, selected, raw]);

  const toggleRow = (num) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  };

  const toggleAll = (checked) => {
    setSelected(checked ? new Set(filtered.map(r => r.number)) : new Set());
  };

  const handleSort = (key) => {
    setSortDir(sortKey === key && sortDir === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  const states    = [...new Set(raw.map(r => r.state).filter(Boolean))].sort();
  const assignees = [...new Set(raw.map(r => r.assigned_to).filter(Boolean))].sort();
  const selItems  = raw.filter(r => selected.has(r.number));
  const selNames  = [...new Set(selItems.map(r => r.assigned_to))];

  const stateBadgeStyle = (s) => {
    const lc = (s || '').toLowerCase();
    if (lc === 'implement') return { background: '#FAEEDA', color: '#854F0B' };
    if (lc === 'scheduled') return { background: '#E6F1FB', color: '#185FA5' };
    if (lc === 'review')    return { background: '#EEEDFE', color: '#3C3489' };
    if (lc === 'approved')  return { background: '#EAF3DE', color: '#3B6D11' };
    return { background: '#F1EFE8', color: '#5f5e5a' };
  };

  const TH = ({ col, label, width }) => (
    <th onClick={() => handleSort(col)} style={{
      padding: '9px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12,
      color: sortKey === col ? D.blue : '#5f5e5a',
      borderBottom: '1px solid #d3d1c7', cursor: 'pointer', whiteSpace: 'nowrap',
      background: '#F1EFE8', width,
    }}>
      {label}{sortKey === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
    </th>
  );

  const tplConfig = {
    1: { label: '1st Follow-up', sub: 'Normal check-in',     activeColor: '#185FA5' },
    2: { label: '2nd Follow-up', sub: 'Urgent — still open', activeColor: '#BA7517' },
    3: { label: '3rd Follow-up', sub: 'Escalation warning',  activeColor: '#a32d2d' },
    c: { label: 'Custom',        sub: 'Write your own',      activeColor: '#3B6D11' },
  };

  return (
    <div>
      {/* SheetJS CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" />

      <style>{`
        .aging-th:hover { color: #185FA5 !important; }
        .aging-tr:hover td { background: #f8f7f4; }
        .aging-input:focus { outline: none; border-color: #185FA5 !important; box-shadow: 0 0 0 2px rgba(24,95,165,0.12); }
        .aging-textarea:focus { outline: none; border-color: #185FA5 !important; box-shadow: 0 0 0 2px rgba(24,95,165,0.12); }
      `}</style>

      {/* Upload zone */}
      <div
        onClick={() => fileRef.current.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `1.5px dashed ${fileName ? '#1D9E75' : '#b4b2a9'}`,
          borderRadius: 12, padding: '14px 18px', background: '#fff',
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          marginBottom: 16, transition: 'all 0.15s',
          boxShadow: '0 1px 6px rgba(0,2,29,0.06)',
        }}>
        <input ref={fileRef} type="file" accept=".xlsx,.xls" style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])} />
        <div style={{ width: 38, height: 38, borderRadius: 8, background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>📊</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: D.navy }}>Upload Excel aging report</div>
          <div style={{ fontSize: 12, color: '#888780', marginTop: 2 }}>
            {fileName ? `✓ ${fileName}` : 'Drag & drop or click to browse — .xlsx / .xls'}
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); fileRef.current.click(); }} style={{
          padding: '6px 14px', fontSize: 13, border: 'none', borderRadius: 8,
          background: D.blue, color: '#fff', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit',
        }}>Choose file</button>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Total changes', value: raw.length || '—' },
          { label: 'Assignees',     value: raw.length ? new Set(raw.map(r => r.assigned_to)).size : '—' },
          { label: 'Implement',     value: raw.length ? raw.filter(r => r.state.toLowerCase() === 'implement').length : '—' },
          { label: 'Scheduled',     value: raw.length ? raw.filter(r => r.state.toLowerCase() === 'scheduled').length : '—' },
          { label: 'Selected',      value: selected.size, highlight: true },
        ].map(m => (
          <div key={m.label} style={{ background: '#fff', border: '1px solid #d3d1c7', borderRadius: 8, padding: '12px 14px', boxShadow: '0 1px 4px rgba(0,2,29,0.04)' }}>
            <div style={{ fontSize: 11, color: '#5f5e5a', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: m.highlight ? D.blue : D.navy }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="aging-input" placeholder="Search CHG#, description, assignee, requestor..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '6px 10px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, fontFamily: 'inherit', color: D.navy }} />
        <select className="aging-input" value={filterState} onChange={e => setFilterState(e.target.value)}
          style={{ padding: '6px 10px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#fff', color: D.navy, fontFamily: 'inherit' }}>
          <option value="">All states</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="aging-input" value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)}
          style={{ padding: '6px 10px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#fff', color: D.navy, fontFamily: 'inherit' }}>
          <option value="">All assignees</option>
          {assignees.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button onClick={() => { setSearch(''); setFilterState(''); setFilterAssignee(''); }}
          style={{ padding: '6px 14px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Reset</button>
        <button onClick={() => setSelected(new Set(filtered.map(r => r.number)))}
          style={{ padding: '6px 14px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Select all</button>
        <button onClick={() => setSelected(new Set())}
          style={{ padding: '6px 14px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
      </div>

      {/* Assignee pill tabs */}
      {assignees.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
          {assignees.map(name => {
            const cnt = raw.filter(r => r.assigned_to === name).length;
            const active = filterAssignee === name;
            return (
              <button key={name} onClick={() => setFilterAssignee(active ? '' : name)} style={{
                padding: '4px 11px', fontSize: 12, border: `1px solid ${active ? D.blue : '#b4b2a9'}`,
                borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
                background: active ? D.blue : '#fff', color: active ? '#fff' : '#5f5e5a',
                transition: 'all 0.12s',
              }}>
                {name} <span style={{ opacity: 0.6 }}>({cnt})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected bar */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
          background: '#f0f6fd', border: '1px solid #b5d4f4', borderRadius: 8,
          marginBottom: 12, fontSize: 13, color: '#185FA5', flexWrap: 'wrap',
        }}>
          <strong style={{ color: '#0C447C' }}>{selected.size}</strong> change(s) selected — {selNames.join(', ')}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[1, 2, 3].map(tier => (
              <button key={tier} onClick={() => setActiveTpl(tier)} style={{
                padding: '4px 10px', fontSize: 12, borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                background: tier === 1 ? '#185FA5' : tier === 2 ? '#FAEEDA' : '#FCEBEB',
                color: tier === 1 ? '#fff' : tier === 2 ? '#854F0B' : '#a32d2d',
                border: `1px solid ${tier === 1 ? '#185FA5' : tier === 2 ? '#EF9F27' : '#f09595'}`,
              }}>
                {tier === 1 ? '1st follow-up' : tier === 2 ? '2nd follow-up ⚡' : '3rd follow-up 🚨'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ border: '1px solid #d3d1c7', borderRadius: 12, overflow: 'hidden', marginBottom: 16, background: '#fff', boxShadow: '0 1px 6px rgba(0,2,29,0.06)' }}>
        {!raw.length ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#888780', fontSize: 13 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
            Upload an Excel aging report above to get started
          </div>
        ) : !filtered.length ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#888780', fontSize: 13 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
            No results match your current filters
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th style={{ width: 36, padding: '9px 12px', background: '#F1EFE8', borderBottom: '1px solid #d3d1c7' }}>
                    <input type="checkbox" onChange={e => toggleAll(e.target.checked)}
                      checked={filtered.length > 0 && filtered.every(r => selected.has(r.number))}
                      style={{ cursor: 'pointer' }} />
                  </th>
                  <TH col="number"       label="CHG#"         width="108px" />
                  <TH col="description"  label="Description"  width={undefined} />
                  <TH col="state"        label="State"        width="95px" />
                  <TH col="assigned_to"  label="Assigned to"  width="140px" />
                  <TH col="requested_by" label="Requested by" width="140px" />
                  <TH col="planned_end"  label="Planned end"  width="110px" />
                  <TH col="approval"     label="Approval"     width="90px" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.number} className="aging-tr" style={{ background: selected.has(r.number) ? '#f0f6fd' : undefined }}>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7' }}>
                      <input type="checkbox" checked={selected.has(r.number)} onChange={() => toggleRow(r.number)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7', fontFamily: 'monospace', fontSize: 11, color: '#888780', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.number}</td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.description}>{r.description}</td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7' }}>
                      {r.state && <span style={{ ...stateBadgeStyle(r.state), display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{r.state}</span>}
                    </td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.assigned_to}</td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7', color: '#5f5e5a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.requested_by}</td>
                    <td style={{ padding: '9px 12px', borderBottom: '1px solid #d3d1c7', fontSize: 12, color: '#888780' }}>{r.planned_end}</td>
                    <td style={{ padding: '9px 12px', borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #d3d1c7' }}>
                      {r.approval && <span style={{ background: r.approval.toLowerCase() === 'approved' ? '#EAF3DE' : '#f1efe8', color: r.approval.toLowerCase() === 'approved' ? '#3B6D11' : '#5f5e5a', display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{r.approval}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Teams Message Composer */}
      <div style={{ border: '1px solid #d3d1c7', borderRadius: 14, background: '#fff', marginBottom: 16, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,2,29,0.06)' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #d3d1c7', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 6, height: 20, borderRadius: 3, background: `linear-gradient(180deg, ${D.blue}, ${D.teal})` }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: D.navy, flex: 1 }}>💬 Teams Message Composer</span>
          <span style={{ fontSize: 12, color: '#888780' }}>Select rows above, then choose a follow-up tier</span>
        </div>
        <div style={{ padding: '16px 18px' }}>
          {/* Template tier tabs */}
          <div style={{ display: 'flex', border: '1px solid #d3d1c7', borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
            {Object.entries(tplConfig).map(([tier, cfg]) => {
              const key = tier === 'c' ? 'c' : Number(tier);
              const isActive = activeTpl === key;
              return (
                <button key={tier} onClick={() => setActiveTpl(key)} style={{
                  flex: 1, padding: '8px 6px', fontSize: 12, border: 'none',
                  borderRight: tier !== 'c' ? '1px solid #d3d1c7' : 'none',
                  background: isActive ? cfg.activeColor : '#fff',
                  color: isActive ? '#fff' : '#5f5e5a',
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: isActive ? 600 : 500,
                  lineHeight: 1.35, transition: 'all 0.12s',
                }}>
                  {cfg.label}<br /><span style={{ fontSize: 10, opacity: 0.8 }}>{cfg.sub}</span>
                </button>
              );
            })}
          </div>

          {selected.size === 0 ? (
            <div style={{ fontSize: 13, color: '#888780', padding: '10px 0' }}>
              ☝️ Select one or more change requests from the table above, then choose a follow-up tier.
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: '#5f5e5a', display: 'block', marginBottom: 4, fontWeight: 500 }}>To (assignee)</label>
                <input value={selNames.join(', ')} readOnly style={{ width: '100%', padding: '7px 10px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, background: '#f8f7f4', color: '#5f5e5a', fontFamily: 'inherit' }} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: '#5f5e5a', display: 'block', marginBottom: 4, fontWeight: 500 }}>Message — edit as needed before sending</label>
                <textarea className="aging-textarea" value={msgBody} onChange={e => setMsgBody(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', fontSize: 13, border: '1px solid #b4b2a9', borderRadius: 8, fontFamily: 'inherit', minHeight: 160, lineHeight: 1.65, color: D.navy, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => { navigator.clipboard.writeText(msgBody); showToast('✓ Message copied to clipboard'); }} style={{
                  padding: '7px 16px', fontSize: 13, borderRadius: 8, border: 'none',
                  background: D.blue, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                }}>📋 Copy message</button>
                <button onClick={() => {
                  const name = selNames[0];
                  if (!name) return;
                  window.open(`https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(name)}`, '_blank');
                  showToast('Opening Teams...');
                }} style={{
                  padding: '7px 16px', fontSize: 13, borderRadius: 8, border: 'none',
                  background: D.blue, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                }}>Open Teams chat ↗</button>
                <button onClick={() => {
                  const items = raw.filter(r => selected.has(r.number));
                  const names = [...new Set(items.map(r => r.assigned_to))];
                  const fn = AGING_TEMPLATES[activeTpl];
                  setMsgBody(fn ? fn(items, names) : '');
                }} style={{
                  padding: '7px 16px', fontSize: 13, borderRadius: 8, border: '1px solid #b4b2a9',
                  background: '#fff', color: D.navy, cursor: 'pointer', fontFamily: 'inherit',
                }}>Reset message</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 22, right: 22,
          background: D.navy, color: '#fff', padding: '10px 18px',
          borderRadius: 8, fontSize: 13, fontWeight: 500,
          zIndex: 9999, boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>{toast}</div>
      )}
    </div>
  );
}
