import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

/**
 * Registers the Phase 5 operations tool.
 *
 * @param server - MCP server instance.
 */
export function registerPhase5Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_5_operations',
    {
      description:
        'Returns the Phase 5 prompt template for config, deploy pipeline, observability, and runbooks. ' +
        'Run after Phase 4 business logic is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const prompt = loadPromptTemplate(5);
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
