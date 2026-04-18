import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PHASE_COUNT = 7 as const;

export type SpecPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const PHASE_FILES: Record<SpecPhase, string> = {
  0: 'phase-0-inventory.md',
  1: 'phase-1-architecture.md',
  2: 'phase-2-data-model.md',
  3: 'phase-3-features.md',
  4: 'phase-4-business-logic.md',
  5: 'phase-5-operations.md',
  6: 'phase-6-integration.md',
};

const promptsDir = dirname(fileURLToPath(import.meta.url));

export function loadPromptTemplate(phase: SpecPhase): string {
  if (phase < 0 || phase >= PHASE_COUNT) {
    throw new RangeError(`phase must be 0..${PHASE_COUNT - 1}, got ${String(phase)}`);
  }
  const file = join(promptsDir, PHASE_FILES[phase]);
  return readFileSync(file, 'utf8');
}
