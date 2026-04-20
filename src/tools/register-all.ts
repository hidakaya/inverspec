import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerPhase0Tool } from './phase-0.js';
import { registerPhase1Tool } from './phase-1.js';
import { registerPhase2Tool } from './phase-2.js';
import { registerPhase3Tool } from './phase-3.js';
import { registerPhase4Tool } from './phase-4.js';
import { registerPhase5Tool } from './phase-5.js';
import { registerPhase6Tool } from './phase-6.js';
import { registerPhase7Tool } from './phase-7.js';
import { registerFilesystemTools } from './filesystem.js';

export function registerAllTools(server: McpServer): void {
  registerPhase0Tool(server);
  registerPhase1Tool(server);
  registerPhase2Tool(server);
  registerPhase3Tool(server);
  registerPhase4Tool(server);
  registerPhase5Tool(server);
  registerPhase6Tool(server);
  registerPhase7Tool(server);
  registerFilesystemTools(server);
}
