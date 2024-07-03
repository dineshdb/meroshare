import { fetchMeroshare } from "./fetch.ts";

export type OwnDetail = {
  address: string;
  boid: string;
  clientCode: string;
  contact: string;
  createdApproveDate: string;
  createdApproveDateStr: string;
  customerTypeCode: string;
  demat: string;
  dematExpiryDate: string;
  email: string;
  expiredDate: string;
  expiredDateStr: string;
  gender: string;
  id: number;
  imagePath: string;
  meroShareEmail: string;
  name: string;
  panNumber: string;
  passwordChangeDate: string;
  passwordChangedDateStr: string;
  passwordExpiryDate: string;
  passwordExpiryDateStr: string;
  profileName: string;
  renderDashboard: boolean;
  renewedDate: string;
  renewedDateStr: string;
  username: string;
};

export async function getOwnDetail(authorization: string): Promise<OwnDetail> {
  const res = await fetchMeroshare("/ownDetail/", {
    "headers": {
      "Authorization": authorization,
    },
  });
  return await res.json();
}
