# Cross-Disciplinary Models · 跨学科方法通论

中文 | **[English](./README_EN.md)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Models](https://img.shields.io/badge/mental%20models-188-blue)](references/)
[![Disciplines](https://img.shields.io/badge/disciplines-25%2B-green)](references/)

> An agent skill that turns AI "analysis" from correct-sounding platitudes into verifiable judgment — using core mental models from 25+ disciplines plus three classic methodologies: *On Contradiction* (矛盾论), *Das Kapital* (资本论), and *On Practice* (实践论).

The knowledge framework is drawn from a 25-lecture interdisciplinary course by Chinese educator Lin Chao, organized as one workflow: **locate the principal contradiction → cross-examine with multiple disciplines → dissect the interest structure → close the loop through practice**.

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

**The fix**: A routing table over **25+ disciplines and 188 mental models**. Each analysis picks 3–6 disciplines; every model must contribute an independent increment — redundant ones get cut.

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
| [01 · Math & Hard Sciences](references/01-数理与硬科学.md) | Entropy & Thermodynamics · Systems Theory · Engineering · Functions · Complexity Science · Probability & Statistics · Information Theory · Brain Science · Physiology | 62 |
| [02 · Society, Economy & Business](references/02-社会经济与商业.md) | Cognitive Psychology · Social Network Science · Finance · Psychology · Language & Expression · Economics · Anthropology · Marketing · History · Accounting | 63 |
| [03 · Philosophy & Practice](references/03-哲学与实践方法论.md) | Ancient Philosophy · Modern Philosophy · Investment Masters · Self-Management · Das Kapital · On Contradiction · On Practice | 63 |

Every model follows one format: **one-line principle → a ready-to-use analytical question**, plus "when to use" and "common misuses." The three methodology modules (Kapital / Contradiction / Practice) additionally carry step-by-step operating procedures.

*Note: the reference library is written in Chinese; the workflow in `SKILL.md` works in any language.*

## Installation

<details>
<summary><strong>Kimi</strong></summary>

Download `cross-disciplinary-models.skill` from Releases and import it in skill management.

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
mkdir -p ~/.claude/skills
git clone https://github.com/MrJiaTu/cross-disciplinary-models.git ~/.claude/skills/cross-disciplinary-models
```

</details>

<details>
<summary><strong>Other agents / custom setups</strong></summary>

Inject `SKILL.md` into your system prompt and load files under `references/` on demand (progressive disclosure — don't read them all at once).

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
