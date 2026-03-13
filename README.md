# 🛡️ Deltek Change AI Analyst

**AI-powered ITSM toolkit for Deltek Global Cloud — Change Management, ITIL CDS Aligned**

Built for the Deltek Global Cloud ITSM team. This app runs inside **Claude.ai** and requires no installation, no API keys, and no technical setup. Just open it and use it.

---

## 📋 Table of Contents

- [What is this?](#what-is-this)
- [How to open the app](#how-to-open-the-app)
- [Tab 1 — AI Analyst](#tab-1--ai-analyst-)
- [Tab 2 — Change Reviewer](#tab-2--change-reviewer-)
- [Tab 3 — Incident Classifier](#tab-3--incident-classifier-)
- [Tab 4 — Aging Follow-up](#tab-4--aging-follow-up-)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## What is this?

The **Deltek Change AI Analyst** is a unified, AI-powered app that combines four tools used daily by the Change Management team:

| Tool | What it does |
|------|-------------|
| 🤖 AI Analyst | Ask any question about changes, CAB, blackout periods, ITIL policy |
| 📋 Change Reviewer | Upload a change request PDF and get a full automated review |
| 🔍 Incident Classifier | Upload an incident PDF and find out if it's release-related |
| ⏰ Aging Follow-up | Upload an Excel aging report and compose Teams follow-up messages |

All four tools are in one file: `DeltekChangeAI.jsx`

---

## How to open the app

This app is designed to run as a **Claude.ai Artifact**. To use it:

1. Open [claude.ai](https://claude.ai)
2. Start a conversation with Claude
3. Upload or paste the `DeltekChangeAI.jsx` file and ask Claude to render it
4. The app will appear as an interactive panel on the right side of your screen

> ✅ No installation needed. No API keys needed. Works directly in Claude.ai.

---

## Tab 1 — AI Analyst 🤖

Your always-available Change Management expert. Ask it anything about ITIL, change policy, CAB schedules, blackout periods, and more.

### How to use it

1. Click the **AI Analyst** tab
2. Either click one of the **Quick Questions** buttons for common queries, or type your own question in the text box
3. Press **Enter** or click **Send**
4. The AI will respond with a structured, policy-aligned answer
5. You can keep the conversation going — it remembers the full chat history within the session
6. Click **Clear** to start a fresh conversation

### What you can ask

- *"When is the next CAB meeting and what's the submission deadline?"*
- *"Are there any blackout periods in Q1 2026?"*
- *"What fields are required for a Normal change request?"*
- *"What's the difference between Standard, Normal, and Emergency changes?"*
- *"How do I classify a change vs an incident vs a problem?"*
- *"What are the production change window times?"*
- *"Draft a risk assessment for a WebLogic JVM memory upgrade"*
- *"What approvals do I need for an emergency change?"*

### What it knows

- Deltek Global Cloud 2025 Change Management Policy
- ChangeRequestFields requirements
- CAB schedules and submission deadlines
- Blackout period rules (Q4: Nov 15 – Jan 15, fiscal year-end, etc.)
- Change window times (Production: Saturday 10PM – Sunday 6AM EST)
- ITIL5 / CDS best practices
- AWS & Azure cloud infrastructure standards
- Incident vs Problem vs Change process boundaries

---

## Tab 2 — Change Reviewer 📋

Upload any change request PDF from ServiceNow and get a full structured review against Deltek's change management policy.

### How to use it

1. Click the **Change Reviewer** tab
2. **Export your change request from ServiceNow:**
   - Open the Change Request record in ServiceNow
   - Right-click the form header → **Save as PDF**
   - (Or use browser Print → Save as PDF)
3. Drag and drop the PDF into the upload zone, or click to browse
4. Click **📋 Review Change Request**
5. Wait a few seconds — the AI reads the full document
6. Review the structured report that appears
7. Click **+ Review Another Change** to start over

### What the review covers

The AI produces a 5-section report:

| Section | What it checks |
|---------|---------------|
| ✅ Completeness Check | All required fields — title, type, dates, implementation plan, rollback plan, risk assessment, testing, approvals, and more |
| ⚠ Risk Assessment | Overall risk rating (Low/Medium/High/Critical), blast radius, rollback complexity, security implications, timing risks |
| 🏛 Policy Compliance | Change window violations, blackout period conflicts, CAB submission deadline compliance, mandatory approvers |
| 💡 Improvement Recommendations | 3–5 specific actions to improve approval likelihood |
| 🏁 Overall Verdict | **READY FOR CAB** / **NEEDS REVISION** / **NOT APPROVABLE** |

---

## Tab 3 — Incident Classifier 🔍

Upload an incident PDF from ServiceNow and instantly determine whether the incident was caused by a software release or was an unrelated operational issue.

### How to use it

1. Click the **Incident Classifier** tab
2. **Export your incident from ServiceNow:**
   - Open the Incident record
   - Right-click the form header → **Save as PDF**
3. Drag and drop the PDF into the upload zone, or click to browse
4. Click **🔍 Classify Incident**
5. The result appears with classification, confidence score, and evidence

### What the result shows

| Field | Description |
|-------|-------------|
| Classification | **RELEASE-RELATED**, **NOT RELEASE-RELATED**, or **INCONCLUSIVE** |
| Confidence % | How certain the AI is (0–100%) |
| CHG Link | Whether a Change record is linked, and the CHG number(s) |
| Release Signals | Keywords found that suggest a release caused the incident |
| Ops Signals | Keywords found that suggest an operational/infrastructure cause |
| Supporting Evidence | Direct quotes from the incident record supporting the classification |
| Recommendation | Next action steps based on the classification |

### Classification rules

- **RELEASE-RELATED** — Incident was caused by a deployment, upgrade, hotfix, sprint release, or release pipeline failure
- **NOT RELEASE-RELATED** — Incident was operational (query blocking, infrastructure failure, capacity issue, certificate renewal, OS patching, network issue)
- **INCONCLUSIVE** — Some evidence present but not enough to make a firm call — the AI will tell you what additional information to gather

---

## Tab 4 — Aging Follow-up ⏰

Upload your ServiceNow aging Excel report, filter and sort open change tickets, select the ones you need to chase, and compose ready-to-send Teams messages in one click.

### How to use it

#### Step 1 — Upload your aging report
1. Click the **Aging Follow-up** tab
2. Export your aging report from ServiceNow as an `.xlsx` or `.xls` file
3. Drag and drop it into the upload zone, or click **Choose file**
4. The table will populate automatically with all change records

> 💡 The tool auto-detects column names — it works with most ServiceNow export formats without any manual setup.

#### Step 2 — Filter and find tickets
- Use the **search bar** to find by CHG number, description, assignee, or requestor
- Use the **State dropdown** to filter by Implement, Scheduled, Review, etc.
- Use the **Assignee dropdown** or click the **assignee pill tabs** to focus on one person's tickets
- Click any **column header** to sort ascending/descending
- Use **Select all** to grab everything in the current filtered view

#### Step 3 — Select tickets to follow up on
- Tick the checkboxes next to the tickets you want to chase
- A **blue selected bar** will appear showing how many are selected and who they're assigned to

#### Step 4 — Compose your Teams message
Once tickets are selected, choose a follow-up tier:

| Tier | Tone | When to use |
|------|------|-------------|
| **1st Follow-up** | Friendly, normal check-in | First time chasing — ticket is aging |
| **2nd Follow-up ⚡** | Urgent, still open | No response to first message, ticket overdue |
| **3rd Follow-up 🚨** | Escalation warning | Final warning before escalating to IT Management |
| **Custom** | Blank — write your own | Any situation that doesn't fit the above |

The message auto-fills with the assignee name(s) and full ticket details. You can edit it before sending.

#### Step 5 — Send
- Click **📋 Copy message** to copy it to your clipboard, then paste it into Teams
- Click **Open Teams chat ↗** to jump directly into a Teams chat with the first assignee

---

## Frequently Asked Questions

**Do I need an API key or any technical setup?**
No. The app runs entirely inside Claude.ai. Everything is handled automatically.

**Is it safe to upload change request PDFs and incident PDFs?**
The documents are sent to Claude AI for analysis. Follow your organisation's data handling guidelines for what information is appropriate to share with AI tools.

**The Excel file I uploaded isn't showing data — what's wrong?**
Make sure the file is a standard ServiceNow export in `.xlsx` or `.xls` format. The tool looks for common column names like *Number*, *Short Description*, *State*, *Assigned to*, *Planned End Date*. If your export uses different column names, check that your ServiceNow report includes those standard fields.

**Can I use this for non-production or standard changes?**
Yes — the AI Analyst and Change Reviewer work for all change types: Standard, Normal, Emergency, and Expedited.

**Who built this?**
Built by the Deltek Global Cloud Change Management team. Powered by Claude AI (Anthropic). ITIL CDS aligned.

---

## File Structure

```
DeltekChangeAI.jsx    ← The entire app (single file, no dependencies)
README.md             ← This file
```

---

## Support

For questions about this tool, contact the **Deltek Global Cloud Change Management team**.

For questions about the underlying change management policy, refer to the **Deltek Global Cloud 2025 Change Management Policy** in ServiceNow.

---

*Deltek Global Cloud · ITSM · Change Management · ITIL CDS Aligned · Powered by Claude AI*
