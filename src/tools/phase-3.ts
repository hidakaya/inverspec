import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase3Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_3_features',
    {
      description:
        'Returns the Phase 3 prompt template for routes, screens, APIs, and user-visible behavior.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(3) }],
    }),
  );
}
