# Cross-Disciplinary Models · 跨学科方法通论

[中文](./README.md) | **English**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Models](https://img.shields.io/badge/mental%20models-189-blue)](references/)
[![Disciplines](https://img.shields.io/badge/disciplines-25%2B-green)](references/)

> An agent skill that turns AI "analysis" from correct-sounding platitudes into verifiable judgment — using core mental models from 25+ disciplines plus three classic methodologies: *On Contradiction* (矛盾论), *Das Kapital* (资本论), and *On Practice* (实践论).

The framework spans 25+ disciplines — natural sciences (entropy & thermodynamics, systems theory, engineering, function thinking, complexity science, probability & statistics, information theory, brain science, physiology), social sciences & business (cognitive psychology, social network science, finance, psychology, language & expression, economics, anthropology, marketing, history, accounting), and philosophy & practice (ancient philosophy, modern philosophy, investment masters, self-management, back to the real world) — organized as one workflow: **locate the principal contradiction → cross-examine with multiple disciplines → dissect the interest structure → close the loop through practice**.

---

## See It in 30 Seconds

Same question: *"I'm 24, two years into my job, 100k in savings, no debt. I want to marry and own a home debt-free before 30, while keeping cash flow. How do I plan this first 100k to compound?"*

**Without the skill** — and to be clear up front: today's frontier models already reason well without it. They produce numbers, thresholds and action lists, and they even catch mutually exclusive goals; [Example 01](examples/01-quit-job-for-side-business.md) and [Example 02](examples/02-first-100k-compound-plan.md) ship real screenshots of Gemini and ChatGPT answering those questions. What they still consistently omit is four things: **they never declare their own assumptions** (on the same background, the two models computed a monthly shortfall of 3,000 and 7,200 respectively — a 2.4x gap — and neither said how it read the input), **they contradict themselves across sections** (ChatGPT's "100k + 480k = 580k" drops the very compounding it argues for; the same inputs compound to 776k), **thresholds without review dates or exit criteria**, and **no "here is where I could be wrong" section**.

**With the skill** — the four passages below are translated from a **real host run, unedited** ([full output](examples/skill-output-qoder-02.md): Qoder + Qwen3.8-Flash, fresh session, no prompt engineering; the Chinese original is the authoritative text):

> Wherever concrete numbers are involved — house prices, down-payment ratio, loan rates, your income, your city — I will not invent them. They are all flagged as *to be verified* and turned into action items, because that is exactly where the answer is decided.
>
> **Verdict**: your question is framed as "how do I invest this 100k", but its real name is "how does my earning power grow over the next six years".
>
> **Conflict B · the impossible triangle**: buy a home × stay debt-free × keep cash flow — usually only two of the three survive. The arbitration depends on the unknown "total price in my target city". **Do not force a choice before you have checked the price**; if checking shows you must drop one, that is the real fork in the road (and the assumption most likely to break).
>
> **Where this analysis could be wrong**: **"a home is a hard precondition for marriage"** — if your partner or their family does not require one, the rigidity of "owning a home" collapses and the centre of gravity shifts to living and skills… **(this is the premise that most affects everything else)**

Three of the four gaps listed above are closed here: assumptions stated up front, missing data turned into verification tasks, five unverified premises admitted at the end. **The fourth one failed** — its review checkpoints were written as "the month I turn 30", "after two full years" rather than calendar dates. That defect was written back into `SKILL.md` as a hard rule and the re-run follows it verbatim (see the 规则加固 section of [CHANGELOG.md](CHANGELOG.md)). **This is more trustworthy than a flawless demo**: the defect, the discovery and the fix are all in this repository.

Full derivations: [Example 02 · compounding your first 100k](examples/02-first-100k-compound-plan.md)｜[Example 01 · should I quit for a cross-border side business](examples/01-quit-job-for-side-business.md) (Chinese).

A fifth omission: **they never audit the user's own goals.** A hard deadline like "must marry before 30" is accepted as given; the skill first asks whether it is an external script, and prepares a criterion for *when to abandon the goal itself*.

All of the above has been reproduced on an independent host (Qoder + Qwen3.8-Flash, xhigh reasoning, fresh session, no prompt engineering, output unedited): [real output 01](examples/skill-output-qoder-01.md)｜[real output 02](examples/skill-output-qoder-02.md). Both runs invented essentially no model names, but both used relative dates for review checkpoints — a defect now hardened into a rule in `SKILL.md`.

---

## Why This Skill Exists

AI analysis fails in four predictable ways. This skill is built to fix them.

### Failure #1: Correct-Sounding Nonsense

> "Everything has two sides. You should look at it dialectically."

**The problem**: You ask "should I quit my job for a side business?" and get a both-sides essay that says nothing.

**The fix**: The skill enforces **verdict-first, plain-spoken output**. The first section of the output template is "Direct Conclusion (with confidence)" — no throat-clearing allowed.

### Failure #2: One Lens for Everything

> To a man with a hammer, everything looks like a nail.

**The problem**: Agents default to one or two disciplinary lenses. Ask about relationships, get communication tips. Ask about business, get "work hard." Shallow by construction.

**The fix**: A routing table over **25+ disciplines and 189 model entries**. Each analysis picks 3–6 disciplines; every model must contribute an independent increment — redundant ones get cut.

### Failure #3: No Sense of Priority

**The problem**: Ten recommendations dumped in parallel. Which one is the linchpin and which is noise? Your guess.

**The fix**: Structured prioritization via *On Contradiction* — list all contradictions → lock the principal one → identify its dominant aspect → predict the conditions under which priorities flip. Once the principal contradiction is named, everything else falls into place.

### Failure #4: Unfalsifiable Predictions

> "Your finances look promising next year."

**The problem**: Unverifiable. If right, not reproducible; if wrong, no accountability.

**The fix**: *On Practice* closes the loop — every judgment is rewritten as a **conditional prediction** ("if X happens within T, then Y holds — execute Z"), with a review date and an exit criterion. Wins and losses both get reconciled.

---

## The Five-Step Workflow

```
① Frame the real question → ② Locate the principal  → ③ Pick models   → ④ Cross-validate  → ⑤ Close the loop
   symptom vs root cause    contradiction              3-6 disciplines   consensus vs        actions + conditional
   scan fatal risks         dominant aspect            money? run        conflict → weight   predictions + review
                                                      Kapital lens      the verdict         dates
```

## Model Index

| Reference file | Disciplines | Models |
|---|---|---|
| [00 · Three Methodologies](references/00-three-methodologies.md) | Das Kapital · On Contradiction · On Practice (plus a combined quick-reference) | 24 |
| [01 · Math & Hard Sciences](references/01-hard-sciences.md) | Entropy & Thermodynamics · Systems Theory · Engineering · Function Thinking · Complexity Science · Probability & Statistics · Information Theory · Brain Science · Physiology | 62 |
| [02 · Society, Economy & Business](references/02-society-economy-business.md) | Cognitive Psychology · Social Network Science · Finance · Psychology · Language & Expression · Economics · Anthropology · Marketing · History · Accounting | 64 |
| [03 · Philosophy & Self-Management](references/03-philosophy-and-praxis.md) | Ancient Philosophy · Modern Philosophy · Investment Masters · Self-Management · Back to the Real World | 39 |

**189 model entries** in total (a few entries, e.g. peak-end rule and flow, appear under more than one discipline; 186 unique models after deduplication).

Every model follows one format: **one-line principle → a ready-to-use analytical question**, plus "when to use" and "common misuses". The three methodology modules (`00`) additionally carry step-by-step operating procedures, and are the only mandatory load per analysis — about 6.8k characters.

*Note: the reference library is written in Chinese; the workflow in `SKILL.md` works in any language.*

## Installation

One line (needs Node >= 14; pulled straight from GitHub, no npm publish required):

```bash
npx github:MrJiaTu/cross-disciplinary-models --tool <host>

# hosts: claude | codex | cursor | windsurf | cline | gemini | qoder | copilot | generic
# --all      detect existing host config in the current directory and install for each
# --global   install into your home directory (windsurf / cline / copilot are project-level only)
# --dry-run  print the paths it would write
# --list     show all supported hosts
```

<details>
<summary><strong>Agents that can read files (Claude Code / Codex / Cursor / Windsurf / Cline / Gemini CLI / Qoder / Copilot)</strong></summary>

The installer places `SKILL.md`, `AGENTS.md`, `references/` and `prompts/` into that host's skill or rules directory, plus a thin adapter whose only job is to trigger the skill and point at the files. The model library loads through progressive disclosure, so it never lands in context all at once. The only mandatory read per analysis is `references/00-three-methodologies.md` (about 6.8k characters).

Claude Code can also be installed by hand:

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/MrJiaTu/cross-disciplinary-models.git ~/.claude/skills/cross-disciplinary-models
```

</details>

<details>
<summary><strong>Hosts that only accept a pasted prompt (ChatGPT custom instructions / GPTs, Doubao, DeepSeek, Kimi web, Gemini web, Coze)</strong></summary>

Copy everything below the divider in [`prompts/cdm-lite.md`](prompts/cdm-lite.md) (about 2.5k characters) into your system instructions. It is self-contained: the five-step workflow, the operating procedures of the three methodologies, and an index of model names — no external files, because these hosts cannot read `references/`.

```bash
node bin/cdm.js --print          # dumps the lite prompt to stdout
```

</details>

<details>
<summary><strong>Verify the numbers</strong></summary>

```bash
node bin/cdm.js --stats          # modules, entries and deduplicated model count per file
```

Both READMEs must stay in sync with this output. Re-run it after touching `references/`.

</details>

## Trigger Examples

```
"Deep-dive: should I quit and go all-in on a cross-border side business?"
"Analyze this project from multiple angles — is it worth investing in?"
"Break down my current situation with mental models."
"Exam prep, side hustle, savings — how should I prioritize the next six months?"
```

## Design Principles

- **Verdict first, plain speech** — no fence-sitting
- **Falsifiable** — predictions as conditional statements with review dates; both hits and misses get reconciled
- **Hammer-syndrome defense** — every model must add an independent increment; redundancy is cut
- **Jargon translated** — every methodology term gets a one-line plain-language gloss on first use
- **Pragmatic cut** — models inspire; the output must land as actions startable from current conditions

## Contributing

PRs welcome: new discipline modules, sharper question templates, real-world failure reports. Keep the unified model format (one-line principle → analytical question) and fill in "when to use" and "common misuses" for each module.

## License

[MIT License](LICENSE)

## Disclaimer

This repository is a general-audience compilation of mental models drawn from public disciplinary knowledge and classic methodology texts. It is not investment, career, or life advice. Analytical outputs are for reference only; decisions remain the user's own responsibility.
