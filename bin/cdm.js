#!/usr/bin/env node
/*
 * cdm — installer for the cross-disciplinary-models agent skill.
 * Zero dependencies. Works from a clone or via `npx github:MrJiaTu/cross-disciplinary-models`.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const PKG_ROOT = path.resolve(__dirname, '..');
const SKILL_NAME = 'cross-disciplinary-models';
const MARK_BEGIN = '<!-- BEGIN cross-disciplinary-models (managed block, do not edit inside) -->';
const MARK_END = '<!-- END cross-disciplinary-models -->';

const PAYLOAD = ['SKILL.md', 'AGENTS.md', 'prompts', 'references'];

// ruleBody: the thin pointer written into vendor rule files.
const RULE_BODY = [
  '# 跨学科方法通论 (cross-disciplinary-models)',
  '',
  '当用户要求「深度分析 / 多角度分析 / 系统分析 / 用思维模型分析」，或面临要不要做、怎么选、',
  '值不值得的决策（职业、副业、投资、感情、消费、健康、技术方案），或需要拆解复杂局面、',
  '找主要矛盾、排优先级、复盘一段经验时，启用本技能。',
  '',
  '不要启用：单点事实查询、纯执行类任务（写代码、改格式、翻译）、只需一个学科答案的问题。',
  '',
  '执行方式（渐进式披露，禁止一次全读）：',
  '',
  '1. 读取 `SKILL.md`，严格按其五步工作流与输出模板执行。',
  '2. 每次分析必加载 `references/00-three-methodologies.md`（资本论 / 矛盾论 / 实践论操作流程）。',
  '3. 按 `SKILL.md` 第三步的学科路由，只读 `references/01-hard-sciences.md`、',
  '   `references/02-society-economy-business.md`、`references/03-philosophy-and-praxis.md`',
  '   中命中的模块。',
  '',
  '红线：结论先行且带置信度；每个模型产出独立增量；财富类判断用净资产口径；预言写成条件句并',
  '给对账时间；只引用参考文件中真实存在的模型名，库里没有就直说，不编造模型名与统计数字。',
].join('\n');

const TOOLS = {
  claude: {
    label: 'Claude Code / Claude Skills',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.claude', 'skills') : path.join(dir, '.claude', 'skills')),
    needsRuleFile: false,
    globalSupported: true,
  },
  codex: {
    label: 'OpenAI Codex CLI',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.codex', 'agents') : path.join(dir, '.agents')),
    needsRuleFile: false,
    blockInto: (global, dir) => (global ? path.join(os.homedir(), '.codex', 'AGENTS.md') : path.join(dir, 'AGENTS.md')),
    globalSupported: true,
  },
  cursor: {
    label: 'Cursor',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.agents') : path.join(dir, '.agents')),
    needsRuleFile: true,
    ruleFile: (global, dir) => (global ? path.join(os.homedir(), '.cursor', 'rules', SKILL_NAME + '.mdc') : path.join(dir, '.cursor', 'rules', SKILL_NAME + '.mdc')),
    frontmatter: '---\ndescription: 跨学科思维模型深度分析工作流（结论直断 + 主要矛盾 + 可证伪对账）\nglobs: "**/*"\nalwaysApply: false\n---\n\n',
    globalSupported: true,
  },
  windsurf: {
    label: 'Windsurf',
    payloadBase: () => null,
    needsRuleFile: true,
    ruleFile: (global, dir) => path.join(dir, '.windsurf', 'rules', SKILL_NAME + '.md'),
    frontmatter: '---\ntrigger: model_decision\ndescription: 用户要求深度/多角度/系统分析、决策排序、复盘经验时启用\n---\n\n',
    globalSupported: false,
  },
  cline: {
    label: 'Cline / Roo Code',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.agents') : path.join(dir, '.agents')),
    needsRuleFile: true,
    ruleFile: (global, dir) => path.join(dir, '.clinerules', SKILL_NAME + '.md'),
    frontmatter: '',
    globalSupported: false,
  },
  gemini: {
    label: 'Gemini CLI',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.gemini', 'agents') : path.join(dir, '.agents')),
    needsRuleFile: false,
    blockInto: (global, dir) => (global ? path.join(os.homedir(), '.gemini', 'GEMINI.md') : path.join(dir, 'GEMINI.md')),
    globalSupported: true,
  },
  qoder: {
    label: 'Qoder',
    // payload goes to .agents/ so .qoder/rules/ only holds the rule file itself
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.agents') : path.join(dir, '.agents')),
    needsRuleFile: true,
    ruleFile: (global, dir) => (global ? path.join(os.homedir(), '.agents', SKILL_NAME + '.md') : path.join(dir, '.qoder', 'rules', SKILL_NAME + '.md')),
    frontmatter: '---\ndescription: 跨学科思维模型深度分析工作流\n---\n\n',
    globalSupported: true,
  },
  copilot: {
    label: 'GitHub Copilot coding agent',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.agents') : path.join(dir, '.agents')),
    needsRuleFile: false,
    blockInto: (global, dir) => path.join(dir, '.github', 'copilot-instructions.md'),
    globalSupported: false,
  },
  generic: {
    label: '其他 / 自定义 agent（仅放置文件，自行接入）',
    payloadBase: (global, dir) => (global ? path.join(os.homedir(), '.agents') : path.join(dir, '.agents')),
    needsRuleFile: false,
    globalSupported: true,
  },
};

function parseArgs(argv) {
  const out = { tool: null, global: false, dir: process.cwd(), print: false, stats: false, check: false, list: false, dry: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tool' || a === '-t') out.tool = argv[++i];
    else if (a === '--all') out.tool = 'all';
    else if (a === '--global' || a === '-g') out.global = true;
    else if (a === '--dir' || a === '-d') out.dir = path.resolve(argv[++i]);
    else if (a === '--print' || a === '-p') out.print = true;
    else if (a === '--stats') out.stats = true;
    else if (a === '--check') out.check = true;
    else if (a === '--list' || a === '-l') out.list = true;
    else if (a === '--dry-run') out.dry = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else if (!a.startsWith('-') && !out.tool) out.tool = a;
    else fail('未知参数：' + a);
  }
  return out;
}

function fail(msg) {
  console.error('cdm: ' + msg);
  console.error('用法：cdm --tool <' + Object.keys(TOOLS).join('|') + '> [--global] [--dir <path>] [--dry-run]');
  console.error('     cdm --all          为当前目录已检测到的所有宿主安装');
  console.error('     cdm --print        输出自包含精简提示词（粘贴进 ChatGPT / 豆包 / DeepSeek 等）');
  console.error('     cdm --stats        统计各参考文件的模块数与模型条目数');
  console.error('     cdm --check        一致性校验：cdm-lite 封闭名单 / 两份 README 计数 / 全部相对链接');
  console.error('     cdm --list         列出支持的宿主');
  process.exit(1);
}

function ensureDir(d, dry) {
  if (dry) return;
  fs.mkdirSync(d, { recursive: true });
}

function copyTree(src, dest, dry) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    ensureDir(dest, dry);
    for (const name of fs.readdirSync(src)) copyTree(path.join(src, name), path.join(dest, name), dry);
  } else {
    if (dry) return;
    ensureDir(path.dirname(dest), dry);
    fs.copyFileSync(src, dest);
  }
}

function writeFile(file, content, dry) {
  ensureDir(path.dirname(file), dry);
  if (dry) return;
  fs.writeFileSync(file, content, 'utf8');
}

function injectBlock(file, body, dry) {
  const block = MARK_BEGIN + '\n' + body + '\n' + MARK_END + '\n';
  let cur = '';
  if (fs.existsSync(file)) cur = fs.readFileSync(file, 'utf8');
  const b = cur.indexOf(MARK_BEGIN);
  const e = cur.indexOf(MARK_END);
  let next;
  if (b !== -1 && e !== -1) {
    next = cur.slice(0, b) + block + cur.slice(e + MARK_END.length + 1);
  } else if (cur.trim().length === 0) {
    next = '# AGENTS.md\n\n' + block;
  } else {
    next = cur.replace(/\s*$/, '\n\n') + '\n' + block;
  }
  writeFile(file, next, dry);
}

function detectTools(dir) {
  const hits = [];
  const probe = (name, rel) => {
    if (fs.existsSync(path.join(dir, rel))) hits.push(name);
  };
  probe('cursor', '.cursor');
  probe('windsurf', '.windsurf');
  probe('cline', '.clinerules');
  probe('qoder', '.qoder');
  probe('copilot', '.github');
  probe('claude', '.claude');
  probe('gemini', 'GEMINI.md');
  if (fs.existsSync(path.join(dir, 'AGENTS.md'))) hits.push('codex');
  return Array.from(new Set(hits));
}

function install(tool, opts) {
  const spec = TOOLS[tool];
  if (!spec) fail('不支持的宿主：' + tool + '（可选：' + Object.keys(TOOLS).join(', ') + '）');
  if (opts.global && !spec.globalSupported) fail(spec.label + ' 只支持项目级安装，去掉 --global');

  const base = spec.payloadBase(opts.global, opts.dir);
  const payloadDest = base ? path.join(base, SKILL_NAME) : null;

  if (payloadDest) {
    for (const item of PAYLOAD) {
      const src = path.join(PKG_ROOT, item);
      if (!fs.existsSync(src)) fail('打包缺文件：' + item + '（请确认从完整仓库或 npx github: 运行）');
      copyTree(src, path.join(payloadDest, item), opts.dry);
    }
    console.log('  写入 ' + rel(payloadDest));
  }

  if (spec.needsRuleFile) {
    const rule = spec.ruleFile(opts.global, opts.dir);
    const pointer = payloadDest
      ? RULE_BODY + '\n\n（技能文件已放在：' + rel(payloadDest) + '）\n'
      : RULE_BODY + '\n';
    writeFile(rule, (spec.frontmatter || '') + pointer, opts.dry);
    console.log('  写入 ' + rel(rule));
  }

  if (spec.blockInto) {
    const target = spec.blockInto(opts.global, opts.dir);
    injectBlock(target, RULE_BODY, opts.dry);
    console.log('  更新 ' + rel(target) + '（托管块）');
  }
}

function rel(p) {
  const home = os.homedir();
  return p.startsWith(home) ? '~' + p.slice(home.length).replace(/\\/g, '/') : path.relative(process.cwd(), p) || '.';
}

function stats() {
  const dir = path.join(PKG_ROOT, 'references');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  let totalEntries = 0;
  let totalModules = 0;
  const names = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const entries = (text.match(/^- \*\*/gm) || []).length;
    const mods = (text.match(/^## 模块/gm) || []).length;
    const names2 = text.match(/^- \*\*([^*：:]+)/gm) || [];
    names.push(...names2.map((s) => s.replace(/^- \*\*/, '').trim()));
    totalEntries += entries;
    totalModules += mods;
    console.log('  ' + f.padEnd(32) + ' 模块 ' + String(mods).padStart(2) + '  条目 ' + String(entries).padStart(3));
  }
  const uniq = new Set(names.map((n) => n.replace(/（.*?）|\(.*?\)/g, '').trim()));
  console.log('  ' + '-'.padEnd(32) + ' 模块 ' + String(totalModules).padStart(2) + '  条目 ' + String(totalEntries).padStart(3));
  console.log('  去重后唯一模型名 ' + uniq.size + ' 个（重复条目：见 README 模型清单说明）');
  console.log('\nREADME 引用的数字必须与此一致。改动 references/ 后请重跑 cdm --stats。');
}

function check() {
  const utf8 = (f) => fs.readFileSync(f, 'utf8');
  const refDir = path.join(PKG_ROOT, 'references');
  const files = fs.readdirSync(refDir).filter((f) => f.endsWith('.md')).sort();

  // 1. build the authoritative entry/module sets from references/
  const entries = new Set();
  const modules = new Set();
  const perFile = [];
  for (const f of files) {
    const text = utf8(path.join(refDir, f));
    const es = [...text.matchAll(/^- \*\*([^*\n]+)/gm)].map((m) => m[1].replace(/（.*?）|\(.*?\)/g, '').trim());
    es.forEach((e) => entries.add(e));
    const ms = [...text.matchAll(/^## 模块\d+：([^\r\n]+)/gm)].map((m) => m[1].replace(/（.*?）|\(.*?\)/g, '').trim());
    ms.forEach((m) => modules.add(m));
    perFile.push({ file: f, entries: es.length, modules: ms.length });
  }
  const total = perFile.reduce((a, b) => a + b.entries, 0);

  const problems = [];
  const norm = (s) => s.replace(/（.*?）|\(.*?\)/g, '').trim();

  // 2. lite closed list must be a subset of references/, and its module names must exist
  const lite = utf8(path.join(PKG_ROOT, 'prompts', 'cdm-lite.md'));
  let listed = 0;
  for (const m of lite.matchAll(/^- 【([^】]+)】(.+)$/gm)) {
    if (!modules.has(m[1].trim())) problems.push('cdm-lite: 模块名不存在 → ' + m[1]);
    for (const e of m[2].split('·').map((s) => s.trim()).filter(Boolean)) {
      listed++;
      if (!entries.has(norm(e))) problems.push('cdm-lite: 条目名与 references 不符 → ' + m[1] + ' · ' + e);
    }
  }
  console.log('  cdm-lite 封闭名单：' + listed + ' 条条目，模块名 ' + (listed ? '全部' : '无') + '可查');

  // 3. both READMEs must carry the measured counts
  for (const rf of ['README.md', 'README_EN.md']) {
    const text = utf8(path.join(PKG_ROOT, rf));
    const rows = [...text.matchAll(/^\|\s*\[[^\]]*\]\((?:examples\/)?[^)]*?(\d\d)-[^)]*\)\s*\|[^|]*\|\s*(\d+)\s*\|/gm)];
    const map = new Map(rows.map((r) => [r[1], Number(r[2])]));
    for (const p of perFile) {
      const code = p.file.slice(0, 2);
      if (!map.has(code)) problems.push(rf + ': 模型清单缺少 ' + p.file + ' 行');
      else if (map.get(code) !== p.entries) problems.push(rf + ': ' + code + ' 条目数写了 ' + map.get(code) + '，实测 ' + p.entries);
    }
    if (!text.includes(String(total))) problems.push(rf + ': 找不到总数 ' + total);
  }

  // 4. every relative link in every markdown file must resolve
  const mds = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md')) mds.push(p);
    }
  })(PKG_ROOT);
  let links = 0;
  for (const f of mds) {
    for (const l of (utf8(f).match(/\]\(([^)]+)\)/g) || [])) {
      let u = l.slice(2, -1).trim();
      if (/^(http|#|mailto)/.test(u)) continue;
      u = u.split('#')[0];
      if (!u) continue;
      links++;
      if (!fs.existsSync(path.resolve(path.dirname(f), u))) problems.push('断链 ' + path.relative(PKG_ROOT, f) + ' -> ' + u);
    }
  }

  console.log('  references：' + perFile.reduce((a, b) => a + b.modules, 0) + ' 个模块 / ' + total + ' 条条目 / ' + entries.size + ' 个唯一条目名');
  console.log('  链接：' + mds.length + ' 个 md 文件，' + links + ' 条相对链接');
  if (problems.length) {
    console.log('\nFAIL — ' + problems.length + ' 处不一致：');
    problems.forEach((p) => console.log('  ✗ ' + p));
    process.exit(1);
  }
  console.log('\nPASS — cdm-lite 封闭名单、两份 README 计数、全部相对链接均一致。');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) return fail('');
  if (opts.print) {
    process.stdout.write(fs.readFileSync(path.join(PKG_ROOT, 'prompts', 'cdm-lite.md'), 'utf8'));
    return;
  }
  if (opts.stats) return stats();
  if (opts.check) return check();
  if (opts.list) {
    console.log('支持的宿主：');
    for (const k of Object.keys(TOOLS)) console.log('  ' + k.padEnd(10) + TOOLS[k].label + (TOOLS[k].globalSupported ? '' : '（仅项目级）'));
    return;
  }
  if (!opts.tool) fail('未指定宿主。用 --list 查看全部，或 --print 取精简提示词');

  let targets = opts.tool === 'all' ? detectTools(opts.dir) : [opts.tool];
  if (targets.length === 0) fail('--all 未在 ' + opts.dir + ' 检测到任何宿主目录');
  console.log('安装 ' + SKILL_NAME + (opts.dry ? '（dry-run）' : '') + '：');
  for (const t of targets) install(t, opts);
  console.log('\n完成。重启该宿主后，提问「用跨学科思维模型帮我深度分析…」即可触发。');
}

main();
