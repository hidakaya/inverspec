const VALIDATION_API = "https://inverspec-api.hidakaya.workers.dev/validate";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface Cache {
  valid: boolean;
  expires: number;
}

let cache: Cache | null = null;

/**
 * Checks whether the provided key is eligible for Pro output.
 * Returns a boolean only; does not throw to keep tool responses non-empty.
 */
export async function checkPro(licenseKey: string | undefined): Promise<boolean> {
  if (!licenseKey) {
    return false;
  }

  // Use cached validation result if still valid
  if (cache && Date.now() < cache.expires) {
    return cache.valid;
  }

  try {
    const res = await fetch(VALIDATION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ license_key: licenseKey }),
    });
    const { valid } = await res.json() as { valid: boolean };
    cache = { valid, expires: Date.now() + CACHE_TTL_MS };
    return valid;
  } catch {
    // On network failures, use previous validation if available.
    return cache?.valid ?? false;
  }
}

export async function requirePro(licenseKey: string | undefined): Promise<void> {
  if (!licenseKey) {
    throw new Error(
      "\n[Inverspec Pro] Phase 3–6 is available with a Pro license.\n" +
      "With a license, you can generate high-quality specifications quickly and reliably using Inverspec's structured templates.\n" +
      "Get your license at: https://inverspec.lemonsqueezy.com\n" +
      "Then add it to: ~/.config/inverspec/config.json\n" +
      '  { "license_key": "YOUR-KEY" }\n' +
      "Or set the environment variable: INVERSPEC_LICENSE_KEY=YOUR-KEY\n"
    );
  }

  // Use cached validation result if still valid
  if (cache && Date.now() < cache.expires) {
    if (!cache.valid) {
      throw new Error(
        "\n[Inverspec Pro] Your license is inactive or expired.\n" +
        "Please check your license at: https://inverspec.lemonsqueezy.com\n"
      );
    }
    return;
  }

  // Call validation API
  try {
    const res = await fetch(VALIDATION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ license_key: licenseKey }),
    });
    const { valid } = await res.json() as { valid: boolean };

    cache = { valid, expires: Date.now() + CACHE_TTL_MS };

    if (!valid) {
      throw new Error(
        "\n[Inverspec Pro] Your license is inactive or expired.\n" +
        "Please check your license at: https://inverspec.lemonsqueezy.com\n"
      );
    }
  } catch (e: any) {
    if (e.message.includes("Inverspec Pro")) throw e;
    // On network errors, allow if we have a previous successful cache
    if (cache !== null) return;
    throw new Error("\n[Inverspec Pro] Could not verify license. Check your internet connection.\n");
  }
}
