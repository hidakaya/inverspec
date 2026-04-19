import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerAllTools } from './tools/register-all.js';

const mcpServer = new McpServer(
  {
    name: 'mcp-server-inverspec',
    version: '1.0.0',
  },
  {
    instructions:
      'Inverspec MCP server exposes tools that return English Markdown prompt templates for reverse-engineering ' +
      'a technical specification in eight phases (0–7). Phase 7 covers ongoing spec maintenance after the initial pass. ' +
      'Call the phase tool that matches the current workflow step.',
  },
);

registerAllTools(mcpServer);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('mcp-server-inverspec: ready (stdio)');
}

main().catch((error: unknown) => {
  console.error('mcp-server-inverspec: fatal error', error);
  process.exit(1);
});
