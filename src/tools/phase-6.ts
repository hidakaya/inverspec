import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

/**
 * Registers the Phase 6 integration tool.
 *
 * @param server - MCP server instance.
 */
export function registerPhase6Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_6_integration',
    {
      description:
        'Returns the Phase 6 prompt template for cross-references, glossary, and executive summary. ' +
        'Run after Phase 5 operations is complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const prompt = loadPromptTemplate(6);
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
