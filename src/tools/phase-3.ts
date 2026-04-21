import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { fetchPrompt, ProRequiredError, PRO_REQUIRED_MESSAGE } from '../api.js';
import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase3Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_3_features',
    {
      description:
        'Run Inverspec Phase 3 analysis on the target project. ' +
        'Returns a full specification for Pro users, or a concise preview for Free users. ' +
        'To unlock the full output, get a Pro license at: https://inverspec.lemonsqueezy.com',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      try {
        const prompt = (await fetchPrompt(3)) ?? loadPromptTemplate(3, 'preview');
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