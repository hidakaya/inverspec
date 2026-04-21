import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerAllTools } from './tools/register-all.js';

const APP_NAME = 'mcp-server-inverspec';
const APP_VERSION = '1.1.4';

const mcpServer = new McpServer(
  {
    name: APP_NAME,
    version: APP_VERSION,
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
  const args = process.argv.slice(2);
  if (args.includes('-v') || args.includes('--version')) {
    console.log(APP_VERSION);
    return;
  }

  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error(`${APP_NAME}: ready (stdio)`);
}

main().catch((error: unknown) => {
  console.error(`${APP_NAME}: fatal error`, error);
  process.exit(1);
});
