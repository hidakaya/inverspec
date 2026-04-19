import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "inverspec", "config.json");

interface Config {
  license_key?: string;
}

export function getLicenseKey(): string | undefined {
  // Prefer environment variable
  if (process.env.INVERSPEC_LICENSE_KEY) {
    return process.env.INVERSPEC_LICENSE_KEY;
  }
  // Load from config file
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config: Config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
      return config.license_key;
    }
  } catch {
    // Ignore read failures
  }
  return undefined;
}
