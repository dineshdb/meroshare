import type { LoginDetails } from "./config.ts";
import { fetchMeroshare } from "./fetch.ts";

export async function getPortfolioCsv(
  { authorization, demat, clientCode }: LoginDetails,
): Promise<string> {
  const res = await fetchMeroshare("View/report/myPortfolio/csv", {
    "headers": {
      "Authorization": authorization!,
    },
    body: JSON.stringify({
      sortBy: "script",
      demat: [demat],
      clientCode,
      page: 1,
      size: 200,
      sortAsc: true,
    }),
    method: "POST",
  });
  return await res.text();
}
