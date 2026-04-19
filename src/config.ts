import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const CONFIG_PATH = path.join(os.homedir(), ".config", "inverspec", "config.json");

interface Config {
  license_key?: string;
}

export function getLicenseKey(): string | undefined {
  // 環境変数を優先
  if (process.env.INVERSPEC_LICENSE_KEY) {
    return process.env.INVERSPEC_LICENSE_KEY;
  }
  // 設定ファイルから読み込み
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const config: Config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
      return config.license_key;
    }
  } catch {
    // 読み込み失敗時は無視
  }
  return undefined;
}
