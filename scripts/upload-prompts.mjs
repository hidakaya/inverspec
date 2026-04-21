import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENVS = ['CF_ACCOUNT_ID', 'CF_API_TOKEN', 'CF_NAMESPACE_ID'];
const missingEnvs = REQUIRED_ENVS.filter((name) => !process.env[name]);

if (missingEnvs.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvs.join(', ')}`);
  process.exit(1);
}

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');

const mappings = [
  ['prompt:phase0', 'src/prompts/phase-0-inventory.md'],
  ['prompt:phase1', 'src/prompts/phase-1-architecture.md'],
  ['prompt:phase2', 'src/prompts/phase-2-data-model.md'],
  ['prompt:phase3:free', 'src/prompts/phase-3-preview.md'],
  ['prompt:phase3:pro', 'src/prompts/phase-3-features.md'],
  ['prompt:phase4:free', 'src/prompts/phase-4-preview.md'],
  ['prompt:phase4:pro', 'src/prompts/phase-4-business-logic.md'],
  ['prompt:phase5:free', 'src/prompts/phase-5-preview.md'],
  ['prompt:phase5:pro', 'src/prompts/phase-5-operations.md'],
  ['prompt:phase6:free', 'src/prompts/phase-6-preview.md'],
  ['prompt:phase6:pro', 'src/prompts/phase-6-integration.md'],
  ['prompt:phase7', 'src/prompts/phase-7-maintenance.md'],
];

const accountId = process.env.CF_ACCOUNT_ID;
const apiToken = process.env.CF_API_TOKEN;
const namespaceId = process.env.CF_NAMESPACE_ID;

async function uploadPrompt(key, relativeFilePath) {
  const absoluteFilePath = path.resolve(PROJECT_ROOT, relativeFilePath);
  const content = await fs.readFile(absoluteFilePath, 'utf8');
  const encodedKey = encodeURIComponent(key);
  const endpoint =
    `https://api.cloudflare.com/client/v4/accounts/${accountId}` +
    `/storage/kv/namespaces/${namespaceId}/values/${encodedKey}`;

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'text/plain',
    },
    body: content,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    const message = payload?.errors?.[0]?.message ?? `${response.status} ${response.statusText}`;
    throw new Error(message);
  }
}

async function main() {
  console.log(`Starting upload to Cloudflare KV namespace: ${namespaceId}`);

  let successCount = 0;
  let failureCount = 0;
  const failures = [];

  for (const [key, filePath] of mappings) {
    process.stdout.write(`Uploading ${key} <- ${filePath} ... `);
    try {
      await uploadPrompt(key, filePath);
      successCount += 1;
      console.log('OK');
    } catch (error) {
      failureCount += 1;
      const reason = error instanceof Error ? error.message : String(error);
      failures.push({ key, filePath, reason });
      console.log(`FAILED (${reason})`);
    }
  }

  console.log('\nUpload summary');
  console.log(`- Total: ${mappings.length}`);
  console.log(`- Success: ${successCount}`);
  console.log(`- Failed: ${failureCount}`);

  if (failures.length > 0) {
    console.log('\nFailed entries:');
    for (const failure of failures) {
      console.log(`- ${failure.key} (${failure.filePath}): ${failure.reason}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
