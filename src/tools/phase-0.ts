import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase0Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_0_inventory',
    {
      description:
        'Returns the Phase 0 prompt template for source file inventory and scope definition. ' +
        'Always run this first before any other phase.',
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
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(0)}`,
        },
      ],
    }),
  );
}