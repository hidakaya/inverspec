var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

var ALLOWED_ORIGIN = "*";
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
__name(corsHeaders, "corsHeaders");

async function isProLicense(licenseKey, env) {
  if (!licenseKey) return false;
  const res = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ license_key: licenseKey })
  });
  const data = await res.json();
  return data.valid === true && data.license_key?.status === "active";
}
__name(isProLicense, "isProLicense");

function promptKeyForPhase(phase, isPro) {
  if (phase >= 0 && phase <= 2) return `prompt:phase${phase}`;
  if (phase >= 3 && phase <= 6) return `prompt:phase${phase}:${isPro ? "pro" : "free"}`;
  if (phase === 7) return isPro ? "prompt:phase7" : null;
  return null;
}
__name(promptKeyForPhase, "promptKeyForPhase");

var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/validate") {
      try {
        const { license_key } = await request.json();
        if (!license_key) {
          return Response.json(
            { valid: false, error: "license_key is required" },
            { status: 400, headers: corsHeaders() }
          );
        }
        const res = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ license_key })
        });
        const data = await res.json();
        const valid = data.valid === true && data.license_key?.status === "active";
        return Response.json(
          { valid },
          { headers: corsHeaders() }
        );
      } catch (e) {
        return Response.json(
          { valid: false, error: "Internal error" },
          { status: 500, headers: corsHeaders() }
        );
      }
    }
    if (request.method === "POST" && url.pathname === "/prompt") {
      try {
        const body = await request.json();
        const phase = body?.phase;
        const licenseKey = body?.license_key;

        if (phase === void 0 || phase === null) {
          return Response.json(
            { error: "phase is required" },
            { status: 400, headers: corsHeaders() }
          );
        }

        const phaseNumber = Number(phase);
        if (!Number.isInteger(phaseNumber) || phaseNumber < 0 || phaseNumber > 7) {
          return Response.json(
            { error: "invalid_phase" },
            { status: 400, headers: corsHeaders() }
          );
        }

        const isPro = licenseKey ? await isProLicense(licenseKey, env) : false;
        const key = promptKeyForPhase(phaseNumber, isPro);

        if (!key) {
          return Response.json(
            { error: "pro_required" },
            { headers: corsHeaders() }
          );
        }

        const prompt = await env.PROMPTS.get(key);
        if (!prompt) {
          return Response.json(
            { error: "prompt_not_found" },
            { headers: corsHeaders() }
          );
        }

        return Response.json(
          { prompt },
          { headers: corsHeaders() }
        );
      } catch (e) {
        return Response.json(
          { error: "Internal error" },
          { status: 500, headers: corsHeaders() }
        );
      }
    }
    return new Response("Not found", { status: 404, headers: corsHeaders() });
  }
};
export {
  index_default as default
};
