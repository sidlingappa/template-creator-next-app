import useSWR from "swr";

export class User {
  id: bigint;
  username: string;
  roles: [];
  account: any;
  accountType: string;
  activationDate: Date;
  addresses: [];
  createdOn: Date;
  crmId: string;
  email: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  lastModifiedOn: Date;
  passwordUpdated: boolean;
  phoneNumbers: [];
  terminationDate: Date;
  timeZone: string;
  version: bigint;
  public static USER_API_ENDPOINT = "/api/user";
  public static async updateUserInfo(user: User) {
    const userData = { user };
    return await fetch(this.USER_API_ENDPOINT + `/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `cd05f2b8-b222-4068-a78d-749fffeced76`,
      },
      body: JSON.stringify(userData),
    });
  }
}

export function getRoleId(user: User): number {
  const userInfo = JSON.parse(JSON.stringify(user));
  const role = userInfo?.roles[0];
  if (role === undefined) {
    return 0;
  } else {
    let url = role?.href;
    return url?.substring(url?.lastIndexOf("/") + 1);
  }
}
