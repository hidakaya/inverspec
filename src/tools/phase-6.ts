import { checkPro } from '../license.js';
import { getLicenseKey } from '../config.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate, type PromptMode } from '../prompts/load-prompt.js';

export function registerPhase6Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_6_integration',
    {
      description:
        'Run Inverspec Phase 6 analysis on the target project. ' +
        'Returns a full specification for Pro users, or a concise preview for Free users. ' +
        'To unlock the full output, get a Pro license at: https://inverspec.lemonsqueezy.com',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      const isPro = await checkPro(getLicenseKey());
      const mode: PromptMode = isPro ? 'full' : 'preview';
      return ({
      content: [
        {
          type: 'text',
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(6, mode)}`,
        },
      ],
    });
    },
  );
}