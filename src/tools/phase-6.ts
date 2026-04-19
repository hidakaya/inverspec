import { requirePro } from '../license.js';
import { getLicenseKey } from '../config.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase6Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_6_integration',
    {
      description:
        'Returns the Phase 6 prompt template for merging Phase 0–5 outputs into a final specification. ' +
        'Run after all previous phases are complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      await requirePro(getLicenseKey());
      return ({
      content: [
        {
          type: 'text',
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(6)}`,
        },
      ],
    });
    },
  );
}