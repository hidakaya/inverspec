import { requirePro } from '../license.js';
import { getLicenseKey } from '../config.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase4Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_4_business_logic',
    {
      description:
        'Returns the Phase 4 prompt template for domain rules, services, workflows, and background jobs. ' +
        'Instructs reading one implementation file at a time, limiting quoted source code to at most 3 consecutive lines, ' +
        'and flagging comment-vs-code mismatches with `Review needed: comment vs implementation mismatch`. ' +
        'Run after Phase 3 feature specifications are complete.',
      inputSchema: {
        projectPath: z
          .string()
          .describe('Absolute path to the root directory of the project to analyse.'),
      },
    },
    async ({ projectPath }) => {
      await requirePro(getLicenseKey());
      return ({
      content: [
        {
          type: 'text',
          text: `**Target project:** \`${projectPath}\`\n\n${loadPromptTemplate(4)}`,
        },
      ],
    });
    },
  );
}