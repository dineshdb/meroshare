const commonHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:129.0) Gecko/20100101 Firefox/129.0",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US",
  "Content-Type": "application/json",
  "Sec-GPC": "1",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-site",
  "Referer": "https://meroshare.cdsc.com.np/",
};

export async function fetchMeroshare(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(
    `https://webbackend.cdsc.com.np/api/meroShare${path}`,
    {
      credentials: "include",
      mode: "cors",
      ...init,
      headers: {
        ...commonHeaders,
        ...init.headers,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res;
}
