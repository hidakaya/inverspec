import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase1Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_1_architecture',
    {
      description:
        'Returns the Phase 1 prompt template for high-level architecture and request-flow mapping.',
      inputSchema: {
        projectPath: z.string().describe(
          'Absolute path to the root directory of the project to analyse.',
        ),
      },
    },
    async ({ projectPath }) => ({
      content: [{
        type: 'text',
        text: `# Target project\n\`${projectPath}\`\n\n${loadPromptTemplate(1)}`,
      }],
    }),
  );
}
