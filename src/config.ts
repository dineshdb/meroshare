import { getCapitals } from "./getCapitals.ts";
import { isNotNil, keyBy } from "@es-toolkit/es-toolkit";

export type UserDetails = {
  demat: string;
  username: string;
  clientId: number;
  clientCode: string;
};

export type LoginDetails = UserDetails & {
  password: string;
  authorization?: string;
};

function getUsernamePassword(): { demat: string; password: string } {
  const demat = Deno.env.get("DEMAT_ACCOUNT");
  const password = Deno.env.get("DEMAT_PASSWORD");
  if (demat?.length !== 16) {
    throw new Error("DEMAT_ACCOUNT should be provided");
  }
  if (!isNotNil(password)) {
    throw new Error("DEMAT_PASSWORD is needed");
  }
  return { demat, password };
}

export async function loadConfig(): Promise<LoginDetails> {
  const { demat, password } = getUsernamePassword();

  const capitals = await getCapitals();
  const capitalsMap = keyBy(capitals, (capital) => capital.code);

  const clientCode = demat.substring(3, 8);
  const username = demat.substring(8, demat.length);
  return {
    clientId: capitalsMap[clientCode].id,
    password,
    username,
    clientCode,
    demat,
  };
}
