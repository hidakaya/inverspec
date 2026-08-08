import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

/**
 * Registers the Phase 1 architecture tool.
 *
 * @param server - MCP server instance.
 */
export function registerPhase1Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_1_architecture',
    {
      description:
        'Returns the Phase 1 prompt template for high-level architecture and request-flow mapping. ' +
        'Run after Phase 0 inventory is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const prompt = loadPromptTemplate(1);
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
