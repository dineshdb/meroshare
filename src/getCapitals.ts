import { fetchMeroshare } from "./fetch.ts";

type Capital = {
  id: number;
  code: string;
  name: string;
};
export async function getCapitals(): Promise<Capital[]> {
  const res = await fetchMeroshare("/capital/");
  return await res.json();
}
