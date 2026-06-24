<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🤝 Cross-agent continuity — READ FIRST (OpenCode · Antigravity IDE · Claude Code)

You are **not** the only agent on this project. Amir runs OpenCode, Antigravity IDE, and Claude Code as interchangeable "main" agents. To pick up exactly where the last one left off — and never contradict it — follow this every session:

1. **READ FIRST (before any work):**
   - **Repo quick-state (git-shared, always available):** [`AGENT-LOG.md`](./AGENT-LOG.md) → "🧭 Current state".
   - **Full capsule (single entry point — don't crawl the vault):** `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Brain/pages/projects/medcore-imaging/CONTEXT.md` → "🧭 Handoff State" + the auto "Ground Truth" block.
   - **Latest live news in one command:** `bash scripts/agent-sync.sh` (git, open PRs, Vercel prod, real off-network site status).
2. **UPDATE LAST (before you finish — even mid-task, even if you think you're done):** append a line to `AGENT-LOG.md` **and** update the Handoff State block in the capsule (Last touched / Just done / Next up / Blocked / Decisions locked). Then refresh machine ground-truth: `node "$BRAIN/tools/sync-truth.mjs" medcore-imaging`.
3. **Don't relitigate locked decisions.** Full protocol (binds every agent): Brain → `pages/ai-knowledge/agent-handoff-protocol.md`.

⚠️ **Before believing a "site is down" report, verify from OUTSIDE the reporting network** (`scripts/agent-sync.sh` does an off-network check) — a local `curl` failure can be a local network filter, not a real outage. Don't change DNS/Vercel/registrar over it.
