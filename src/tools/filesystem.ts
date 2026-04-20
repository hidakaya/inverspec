import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { z } from 'zod';

const MAX_READ_FILE_BYTES = 1_000_000;
const MAX_READ_FILES_BYTES = 500_000;
const MAX_RECURSION_DEPTH = 5;

export function registerFilesystemTools(server: McpServer): void {
  server.registerTool(
    'inverspec_list_directory',
    {
      description:
        'List files and directories at the given path. Use this to explore the project structure before reading files.',
      inputSchema: {
        path: z.string().describe('Absolute path to the directory to list.'),
        recursive: z
          .boolean()
          .optional()
          .default(false)
          .describe('If true, list files recursively. Avoid on very large projects.'),
      },
    },
    async ({ path, recursive }) => {
      const absPath = resolve(path);
      if (!existsSync(absPath)) {
        return {
          content: [{ type: 'text', text: `Error: Path does not exist: ${absPath}` }],
        };
      }

      try {
        const lines: string[] = [];

        const walk = (dir: string, depth: number): void => {
          const entries = readdirSync(dir, { withFileTypes: true });

          for (const entry of entries) {
            if (entry.name.startsWith('.') && depth > 0) {
              continue;
            }

            const indent = '  '.repeat(depth);
            const fullPath = join(dir, entry.name);

            if (entry.isDirectory()) {
              lines.push(`${indent}${entry.name}/`);
              if (recursive && depth < MAX_RECURSION_DEPTH) {
                walk(fullPath, depth + 1);
              }
            } else {
              lines.push(`${indent}${entry.name}`);
            }
          }
        };

        walk(absPath, 0);
        return { content: [{ type: 'text', text: lines.join('\n') }] };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${message}` }] };
      }
    },
  );

  server.registerTool(
    'inverspec_read_file',
    {
      description:
        'Read the contents of a file. Use this to read source code, config files, and other project files.',
      inputSchema: {
        path: z.string().describe('Absolute path to the file to read.'),
      },
    },
    async ({ path }) => {
      const absPath = resolve(path);
      if (!existsSync(absPath)) {
        return {
          content: [{ type: 'text', text: `Error: File does not exist: ${absPath}` }],
        };
      }

      try {
        const fileStat = statSync(absPath);
        if (fileStat.size > MAX_READ_FILE_BYTES) {
          return {
            content: [
              {
                type: 'text',
                text:
                  `Error: File too large (${fileStat.size} bytes). ` +
                  'Read in smaller chunks or choose a specific file.',
              },
            ],
          };
        }

        const content = readFileSync(absPath, 'utf-8');
        return { content: [{ type: 'text', text: content }] };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${message}` }] };
      }
    },
  );

  server.registerTool(
    'inverspec_read_files',
    {
      description:
        "Read multiple files at once. Returns each file's path and contents. Useful for reading related source files together.",
      inputSchema: {
        paths: z.array(z.string()).describe('List of absolute file paths to read.'),
      },
    },
    async ({ paths }) => {
      const results: string[] = [];

      for (const rawPath of paths) {
        const absPath = resolve(rawPath);
        if (!existsSync(absPath)) {
          results.push(`### ${absPath}\nError: File does not exist.\n`);
          continue;
        }

        try {
          const fileStat = statSync(absPath);
          if (fileStat.size > MAX_READ_FILES_BYTES) {
            results.push(
              `### ${absPath}\nError: File too large (${fileStat.size} bytes), skipped.\n`,
            );
            continue;
          }

          const content = readFileSync(absPath, 'utf-8');
          results.push(`### ${absPath}\n\`\`\`\n${content}\n\`\`\`\n`);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : String(error);
          results.push(`### ${absPath}\nError: ${message}\n`);
        }
      }

      return { content: [{ type: 'text', text: results.join('\n') }] };
    },
  );

  // File write
  server.registerTool(
    'inverspec_write_file',
    {
      description:
        'Write content to a file on the local filesystem. Creates the file if it does not exist, overwrites if it does. Use this to save generated specification documents.',
      inputSchema: {
        path: z.string().describe('Absolute path to the file to write.'),
        content: z.string().describe('Content to write to the file.'),
      },
    },
    async ({ path, content }) => {
      const absPath = resolve(path);
      try {
        const dir = absPath.substring(0, absPath.lastIndexOf('/'));
        if (dir && !existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }
        writeFileSync(absPath, content, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: `✓ Written to ${absPath} (${Buffer.byteLength(content, 'utf-8')} bytes)`,
            },
          ],
        };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${message}` }] };
      }
    },
  );

  // Directory creation
  server.registerTool(
    'inverspec_create_directory',
    {
      description: 'Create a directory (and any missing parent directories) on the local filesystem.',
      inputSchema: {
        path: z.string().describe('Absolute path to the directory to create.'),
      },
    },
    async ({ path }) => {
      const absPath = resolve(path);
      try {
        mkdirSync(absPath, { recursive: true });
        return {
          content: [{ type: 'text', text: `✓ Directory created: ${absPath}` }],
        };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text', text: `Error: ${message}` }] };
      }
    },
  );
}
