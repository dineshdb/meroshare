import type { LoginDetails } from "./config.ts";
import { fetchMeroshare } from "./fetch.ts";

export async function login(
  { clientId, username, password }: LoginDetails,
): Promise<{ authorization: string }> {
  const res = await fetchMeroshare("/auth/", {
    method: "POST",
    body: JSON.stringify({
      clientId,
      username,
      password,
    }),
  });
  const authorization = res.headers.get("authorization");
  if (!authorization) {
    throw new Error("Authorization token not found");
  }
  return {
    authorization,
  };
}
