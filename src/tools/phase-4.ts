import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase4Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_4_business_logic',
    {
      description:
        'Returns the Phase 4 prompt template for domain rules, services, workflows, and background jobs.',
      inputSchema: {
        projectPath: z.string().describe(
          'Absolute path to the root directory of the project to analyse.',
        ),
      },
    },
    async ({ projectPath }) => ({
      content: [{
        type: 'text',
        text: `# Target project\n\`${projectPath}\`\n\n${loadPromptTemplate(4)}`,
      }],
    }),
  );
}
