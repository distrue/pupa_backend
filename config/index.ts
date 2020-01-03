import fs from 'fs-extra';
import jsonfile from 'jsonfile';
import logger from '../tools/logger';
import path from 'path';

interface KakaoAppConfig {
  clientId: String;
  redirectUri: String;
}
interface ConfigStore {
  kakaoAppConfig: KakaoAppConfig;
  dbUrl: string;
}

type keys = 'kakaoAppConfig' | 'dbUrl';

let config: ConfigStore = {
  kakaoAppConfig: {
      clientId: "",
      redirectUri: ""
  },
  dbUrl: ""
};

const STORE_PATH = path.join(__dirname, 'store');

export function init() {
  fs.exists(STORE_PATH, async (exists) => {
    if (exists) {
      try {
        const file = await jsonfile.readFile(STORE_PATH);
        config = Object.assign(config, file);
      } catch (err) {
        logger.error(err, 'config');
      }
    }
    await update();
  });
}

async function update() {
  try {
    await jsonfile.writeFile(STORE_PATH, config);
  } catch (err) {
    throw err;
  }
}

export function getValue(key: keys): any {
    return config[key];
}

export async function set(key: keys, value: any) {
  config[key] = value;
  await update();
}
