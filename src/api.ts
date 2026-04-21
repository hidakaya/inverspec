import { getLicenseKey } from './config.js';

const PROMPT_API = 'https://inverspec-api.hidakaya.workers.dev/prompt';

export const PRO_REQUIRED_MESSAGE =
  '\n[Inverspec Pro] Phase 3–6 is available with a Pro license.\n' +
  "With a license, you can generate high-quality specifications quickly and reliably using Inverspec's structured templates.\n" +
  'Get your license at: https://inverspec.lemonsqueezy.com\n' +
  'Then add it to: ~/.config/inverspec/config.json\n' +
  '  { "license_key": "YOUR-KEY" }\n' +
  'Or set the environment variable: INVERSPEC_LICENSE_KEY=YOUR-KEY\n';

/**
 * サーバーからプロンプトを取得する
 * ネットワークエラー時はnullを返す（フェイルオープン）
 */
export async function fetchPrompt(phase: number): Promise<string | null> {
  const licenseKey = getLicenseKey();
  try {
    const res = await fetch(PROMPT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phase, license_key: licenseKey }),
    });
    const data = (await res.json()) as { prompt?: string; error?: string };
    if (data.error === 'pro_required') {
      throw new ProRequiredError();
    }
    return data.prompt ?? null;
  } catch (e) {
    if (e instanceof ProRequiredError) throw e;
    return null;
  }
}

export class ProRequiredError extends Error {
  constructor() {
    super('pro_required');
  }
}
