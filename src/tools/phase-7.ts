import { requirePro } from '../license.js';
import { getLicenseKey } from '../config.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase7Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_7_maintenance',
    {
      description:
        'Returns the Phase 7 prompt template for partial updates to an existing technical specification after code changes. ' +
        'Maps changed file patterns to the right spec phase and rewrites only affected sections. Requires a completed initial spec (Phases 0–6).',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      await requirePro(getLicenseKey());
      return {
        content: [
          {
            type: 'text',
            text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(7)}`,
          },
        ],
      };
    },
  );
}
