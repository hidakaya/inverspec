import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase6Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_6_integration',
    {
      description:
        'Returns the Phase 6 prompt template for merging Phase 0–5 outputs into a final specification.',
      inputSchema: {
        projectPath: z.string().describe(
          'Absolute path to the root directory of the project to analyse.',
        ),
      },
    },
    async ({ projectPath }) => ({
      content: [{
        type: 'text',
        text: `# Target project\n\`${projectPath}\`\n\n${loadPromptTemplate(6)}`,
      }],
    }),
  );
}
