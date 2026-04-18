import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase1Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_1_architecture',
    {
      description:
        'Returns the Phase 1 prompt template for high-level architecture and request-flow mapping.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(1) }],
    }),
  );
}
