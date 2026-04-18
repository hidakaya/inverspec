import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase6Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_6_integration',
    {
      description:
        'Returns the Phase 6 prompt template for merging Phase 0–5 outputs into a final specification.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(6) }],
    }),
  );
}
