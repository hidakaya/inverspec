import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase2Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_2_data_model',
    {
      description:
        'Returns the Phase 2 prompt template for data models, persistence, and validation. ' +
        'For large primary schemas (>20 tables), the prompt instructs domain-split Mermaid ER diagrams. ' +
        'Run after Phase 1 architecture map is complete.',
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
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(2)}`,
        },
      ],
    }),
  );
}