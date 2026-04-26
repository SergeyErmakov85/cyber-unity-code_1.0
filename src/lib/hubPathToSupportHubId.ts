import type { HubId } from "@/content/hubs";

/**
 * Maps standalone content paths (cheatsheet, algorithms, math modules, etc.)
 * to one of the six support hubs used on /hub/:hubId and the learning map.
 */
export function hubPathToSupportHubId(hubPath: string): HubId | null {
  if (!hubPath.startsWith("/")) return null;
  if (hubPath.startsWith("/pytorch")) return "pytorch";
  if (hubPath.startsWith("/unity-ml-agents")) return "unity-ml-agents";
  if (hubPath === "/deep-rl" || hubPath.startsWith("/deep-rl/")) return "deep-rl";
  if (hubPath.startsWith("/math-rl")) return "math-rl";
  if (hubPath.startsWith("/fca-rl")) return "fca-rl";
  if (hubPath.startsWith("/unity-projects")) return "project";
  if (hubPath.startsWith("/algorithms")) return "deep-rl";
  return null;
}
