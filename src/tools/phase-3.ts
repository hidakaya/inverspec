import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase3Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_3_features',
    {
      description:
        'Returns the Phase 3 prompt template for routes, screens, APIs, and user-visible behavior. ' +
        'Run after Phase 2 data model is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => ({
      content: [
        {
          type: 'text',
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(3)}`,
        },
      ],
    }),
  );
}