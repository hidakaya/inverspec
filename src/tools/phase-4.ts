import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase4Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_4_business_logic',
    {
      description:
        'Returns the Phase 4 prompt template for domain rules, services, workflows, and background jobs.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(4) }],
    }),
  );
}
