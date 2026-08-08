import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

/**
 * Registers the Phase 3 features tool.
 *
 * @param server - MCP server instance.
 */
export function registerPhase3Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_3_features',
    {
      description:
        'Returns the Phase 3 prompt template for routes, API contracts, UI screens, and webhooks. ' +
        'Run after Phase 2 data model is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const prompt = loadPromptTemplate(3);
      return {
        content: [
          {
            type: 'text',
            text: `**Target project:** \`${projectPath}\`\n\n${prompt}`,
          },
        ],
      };
    },
  );
}
