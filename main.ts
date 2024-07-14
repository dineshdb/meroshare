import { loadConfig } from "./src/config.ts";
import { getPortfolioCsv } from "./src/getPortfolioCsv.ts";
import { getPortfolio } from "./src/getPortfolio.ts";
import { login } from "./src/login.ts";
import { getOwnDetail } from "./src/getOwnDetail.ts";
import { getApplicableIssues } from "./src/getApplicableIssues.ts";

type Args = {
  command: string;
  subcommand?: string;
};

const commands: Record<string, (args: Args) => void> = {
  "portfolio csv": async () => {
    const loginDetails = await loadConfig();
    const { authorization } = await login(loginDetails);
    loginDetails.authorization = authorization!;
    const myPortfolio = await getPortfolioCsv(loginDetails);
    console.log(myPortfolio);
  },
  "portfolio json": async () => {
    const loginDetails = await loadConfig();
    const { authorization } = await login(loginDetails);
    loginDetails.authorization = authorization!;
    const portfolio = await getPortfolio(loginDetails);
    console.log(portfolio);
  },
  "apply": async () => {
    const loginDetails = await loadConfig();
    const { authorization } = await login(loginDetails);
    loginDetails.authorization = authorization!;
    const issues = await getApplicableIssues(loginDetails);
    console.log(issues);
  },
  info: async () => {
    const loginDetails = await loadConfig();
    const { authorization } = await login(loginDetails);
    loginDetails.authorization = authorization!;
    const info = await getOwnDetail(loginDetails.authorization);
    console.log(info);
  },
};

export default function main() {
  const [command, subcommand] = Deno.args;
  const cmd = commands[`${command} ${subcommand}`] ?? commands[command];
  const args = {
    command,
    subcommand,
  };
  if (cmd) {
    return cmd(args);
  } else {
    if (Deno.args.length > 0) {
      console.error("ERROR: command not found:", command, subcommand);
    }
    console.info("Available commands:");
    Object.keys(commands).forEach((cmd) => {
      console.info(`  - ${cmd}`);
    });
  }
}

if (import.meta.main) {
  main();
}
