import type { LoginDetails } from "./config.ts";
import { fetchMeroshare } from "./fetch.ts";

export type Portfolio = {
  meroShareMyPortfolio: {
    currentBalance: number;
    lastTransactionPrice: string;
    previousClosingPrice: string;
    script: string;
    scriptDesc: string;
    valueAsOfLastTransactionPrice: string;
    valueAsOfPreviousClosingPrice: string;
    valueOfLastTransPrice: number;
    valueOfPrevClosingPrice: number;
  }[];
  totalItems: number;
  totalValueAsOfLastTransactionPrice: string;
  totalValueAsOfPreviousClosingPrice: string;
  totalValueOfLastTransPrice: number;
  totalValueOfPrevClosingPrice: number;
};

export async function getPortfolio(
  { authorization, demat, clientCode }: LoginDetails,
): Promise<Portfolio> {
  const res = await fetchMeroshare("View/myPortfolio/", {
    headers: {
      authorization: authorization!,
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
  return await res.json();
}
