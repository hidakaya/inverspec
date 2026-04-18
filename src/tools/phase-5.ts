import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase5Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_5_operations',
    {
      description:
        'Returns the Phase 5 prompt template for configuration, deployment, and operational concerns.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(5) }],
    }),
  );
}
