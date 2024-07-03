export * from "./src/getPortfolioCsv.ts";
export * from "./src/getPortfolio.ts";
export * from "./src/login.ts";
export * from "./src/getOwnDetail.ts";
export * from "./src/config.ts";
export * from "./src/fetch.ts";

if (import.meta.main) {
  import("./main.ts").then((main) => main.default());
}
