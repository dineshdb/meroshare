import type { LoginDetails } from "./config.ts";
import { fetchMeroshare } from "./fetch.ts";

export async function getApplicableIssues(
  { authorization }: LoginDetails,
): Promise<string> {
  const res = await fetchMeroshare("/companyShare/applicableIssue/", {
    "headers": {
      "Authorization": authorization!,
    },
    body: JSON.stringify({
      filterFieldParams: [
        {
          key: "companyIssue.companyISIN.script",
          alias: "Scrip",
        },
        {
          key: "companyIssue.companyISIN.company.name",
          alias: "Company Name",
        },
        {
          key: "companyIssue.assignedToClient.name",
          value: "",
          alias: "Issue Manager",
        },
      ],
      page: 1,
      size: 10,
      searchRoleViewConstants: "VIEW_APPLICABLE_SHARE",
      filterDateParams: [
        {
          key: "minIssueOpenDate",
          condition: "",
          alias: "",
          value: "",
        },
        {
          key: "maxIssueCloseDate",
          condition: "",
          alias: "",
          value: "",
        },
      ],
    }),
    method: "POST",
  });
  return await res.text();
}
