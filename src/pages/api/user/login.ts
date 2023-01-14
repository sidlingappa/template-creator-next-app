import { NextApiRequest, NextApiResponse } from "next";
import { apiLink } from "../../../helpers";
import https from "https";
import { serialize } from "cookie";

export interface UserInfo {
  userToken: string;
  userId: string;
}

export const cookieOptions = {
  httpOnly: true,
  maxAge: 1209600,
  domain: "gca.com",
  path: "/",
  sameSite: "none",
  secure: false,
};

function setAPICookie(
  res: any,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
): void {
  //console.log(value);
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
  console.log(stringValue);

  // @ts-ignore
  res.setHeader("Set-Cookie", serialize(name, String(stringValue, options)));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return login(req, res);
    default:
      return res.status(501).end();
  }

  async function login(req: NextApiRequest, res: NextApiResponse<UserInfo>) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    const user = JSON.parse(req.body);
    let formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("client_id", "entrance-app");
    formData.append("username", user.username);
    formData.append("password", user.password);
    try {
      const response = await fetch(
        `${apiLink}/services/login?useAuthtoken=true`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "asid-services-app": `${process.env.APP_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          // @ts-ignore
          agent: httpsAgent,
        }
      );

      //

      if (response.ok) {
        let data = response.headers
          .get("Set-Cookie")
          ?.split(";")[0]
          ?.split("=")[1];
        let loginUserId = response.headers
          .get("location")
          ?.substring(response.headers.get("location").lastIndexOf("/") + 1);
        // console.log('#########################'+loginUserId)
        //setAPICookie(res, 'userToken', data, cookieOptions);
        return res.status(200).json({ userToken: data, userId: loginUserId });
      } else {
        const jsonData = await response.json();
        return res
          .status(response.status)
          .setHeader("set-cookie", response.headers.get("Set-Cookie"))
          .json(jsonData);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  }
}
