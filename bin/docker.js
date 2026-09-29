#!/usr/bin/env node
import { mainAsync } from "../src/index.js";

await mainAsync(
  process.env["API_KEY"],
  process.env["BASE_URL"],
  process.env["FILE_PATH"],
  Number.parseInt(process.env["INTERVAL"] ?? "86400000") || 86_400_000,
);
