import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { loadPromptTemplate } from '../prompts/load-prompt.js';

export function registerPhase2Tool(server: McpServer): void {
  server.registerTool(
    'inverspec_phase_2_data_model',
    {
      description: 'Returns the Phase 2 prompt template for data models, persistence, and validation.',
      inputSchema: {},
    },
    async () => ({
      content: [{ type: 'text', text: loadPromptTemplate(2) }],
    }),
  );
}
