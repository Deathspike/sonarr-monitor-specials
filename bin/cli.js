#!/usr/bin/env node
import process from "node:process";
import { mainAsync } from "../src/index.js";

(async function () {
  const apiKey = getArg("api-key") ?? process.env["API_KEY"];
  const baseUrl = getArg("base-url") ?? process.env["BASE_URL"];
  const filePath = getArg("file-path") ?? process.env["FILE_PATH"];
  const intervalArg = getArg("interval") ?? process.env["INTERVAL"];
  const interval = intervalArg ? parseInt(intervalArg, 10) || 0 : undefined;
  await mainAsync(apiKey, baseUrl, filePath, interval);
})();

/** @param {string} name */
function getArg(name) {
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (!arg) {
      continue;
    } else if (arg === `--${name}` && process.argv[i + 1]) {
      return process.argv[i + 1];
    } else if (arg.startsWith(`--${name}=`)) {
      return arg.slice(name.length + 3);
    }
  }
  return undefined;
}
