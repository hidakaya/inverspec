import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { fetchPrompt, ProRequiredError, PRO_REQUIRED_MESSAGE } from '../api.js';
import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase7Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_7_maintenance',
    {
      description:
        'Returns the Phase 7 prompt template for partial updates to an existing technical specification after code changes. ' +
        'Maps changed file patterns to the right spec phase and rewrites only affected sections. Requires a completed initial spec (Phases 0–6).',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      try {
        const prompt = (await fetchPrompt(7)) ?? loadPromptTemplate(7);
        return {
          content: [
            {
              type: 'text',
              text: `**Target project:** \`${projectPath}\`\n\n${prompt}`,
            },
          ],
        };
      } catch (error) {
        if (error instanceof ProRequiredError) {
          throw new Error(PRO_REQUIRED_MESSAGE);
        }
        throw error;
      }
    },
  );
}
