import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

/**
 * Registers the Phase 4 business-logic tool.
 *
 * @param server - MCP server instance.
 */
export function registerPhase4Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_4_business_logic',
    {
      description:
        'Returns the Phase 4 prompt template for domain rules, state machines, permissions, and jobs. ' +
        'Run after Phase 3 features is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const prompt = loadPromptTemplate(4);
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
