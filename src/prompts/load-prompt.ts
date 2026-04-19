import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PHASE_FILES = {
  0: 'phase-0-inventory.md',
  1: 'phase-1-architecture.md',
  2: 'phase-2-data-model.md',
  3: 'phase-3-features.md',
  4: 'phase-4-business-logic.md',
  5: 'phase-5-operations.md',
  6: 'phase-6-integration.md',
  7: 'phase-7-maintenance.md',
} as const;

export type SpecPhase = keyof typeof PHASE_FILES;

const IRON_RULES_FILE = 'iron-rules.md';
const FRAMEWORK_GUIDE_FILE = 'framework-guide.md';

const promptsDir = dirname(fileURLToPath(import.meta.url));

const PHASES_WITH_FRAMEWORK_GUIDE = [1, 4] as const satisfies readonly SpecPhase[];

let ironRulesCache: string | undefined;
let frameworkGuideCache: string | undefined;

export function loadIronRules(): string {
  if (ironRulesCache !== undefined) {
    return ironRulesCache;
  }
  const ironPath = join(promptsDir, IRON_RULES_FILE);
  try {
    ironRulesCache = readFileSync(ironPath, 'utf8');
  } catch (e) {
    throw new Error(`Failed to load ${IRON_RULES_FILE} from ${promptsDir}: ${String(e)}`);
  }
  return ironRulesCache;
}

function shouldIncludeFrameworkGuide(phase: SpecPhase): boolean {
  return (PHASES_WITH_FRAMEWORK_GUIDE as readonly SpecPhase[]).includes(phase);
}

/**
 * Framework-specific reading guide (full Markdown). Cached after first read.
 * On missing file or read failure, throws the same shape of Error as loadIronRules (promptsDir in message).
 */
export function loadFrameworkGuide(): string {
  if (frameworkGuideCache !== undefined) {
    return frameworkGuideCache;
  }
  const guidePath = join(promptsDir, FRAMEWORK_GUIDE_FILE);
  try {
    frameworkGuideCache = readFileSync(guidePath, 'utf8');
  } catch (e) {
    throw new Error(`Failed to load ${FRAMEWORK_GUIDE_FILE} from ${promptsDir}: ${String(e)}`);
  }
  return frameworkGuideCache;
}

function readPhaseMarkdown(relativeName: string): string {
  const path = join(promptsDir, relativeName);
  try {
    return readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`Failed to load ${relativeName} from ${promptsDir}: ${String(e)}`);
  }
}

export function loadPromptTemplate(phase: SpecPhase): string {
  if (!(phase in PHASE_FILES)) {
    const valid = Object.keys(PHASE_FILES).join(', ');
    throw new RangeError(`Invalid phase: ${String(phase)}. Valid phases: ${valid}`);
  }
  const relativeName = PHASE_FILES[phase];
  const body = readPhaseMarkdown(relativeName);
  const iron = loadIronRules();
  if (!shouldIncludeFrameworkGuide(phase)) {
    return `${iron}\n\n---\n\n${body}`;
  }
  const guide = loadFrameworkGuide();
  return `${iron}\n\n---\n\n${guide}\n\n---\n\n${body}`;
}
