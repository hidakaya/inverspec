import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase2Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_2_data_model',
    {
      description: 'Returns the Phase 2 prompt template for data models, persistence, and validation.',
      inputSchema: {
        projectPath: z.string().describe(
          'Absolute path to the root directory of the project to analyse.',
        ),
      },
    },
    async ({ projectPath }) => ({
      content: [{
        type: 'text',
        text: `# Target project\n\`${projectPath}\`\n\n${loadPromptTemplate(2)}`,
      }],
    }),
  );
}
