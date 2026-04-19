const VALIDATION_API = "https://inverspec-api.hidakaya.workers.dev/validate";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1時間

interface Cache {
  valid: boolean;
  expires: number;
}

let cache: Cache | null = null;

export async function requirePro(licenseKey: string | undefined): Promise<void> {
  if (!licenseKey) {
    throw new Error(
      "\n[Inverspec Pro] A license key is required for Phase 3–6.\n" +
      "Get your license at: https://inverspec.lemonsqueezy.com\n" +
      "Then add it to: ~/.config/inverspec/config.json\n" +
      '  { "license_key": "YOUR-KEY" }\n' +
      "Or set the environment variable: INVERSPEC_LICENSE_KEY=YOUR-KEY\n"
    );
  }

  // キャッシュ確認
  if (cache && Date.now() < cache.expires) {
    if (!cache.valid) {
      throw new Error("\n[Inverspec Pro] Your license is inactive or expired.\n");
    }
    return;
  }

  // Validation APIへ問い合わせ
  try {
    const res = await fetch(VALIDATION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ license_key: licenseKey }),
    });
    const { valid } = await res.json() as { valid: boolean };

    cache = { valid, expires: Date.now() + CACHE_TTL_MS };

    if (!valid) {
      throw new Error("\n[Inverspec Pro] Your license is inactive or expired.\n");
    }
  } catch (e: any) {
    if (e.message.includes("Inverspec Pro")) throw e;
    // ネットワークエラー時はキャッシュがあれば許可
    if (cache !== null) return;
    throw new Error("\n[Inverspec Pro] Could not verify license. Check your internet connection.\n");
  }
}
