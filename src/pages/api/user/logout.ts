import { NextApiRequest, NextApiResponse } from "next";
import { apiLink } from "../../../helpers";
import https from "https";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return logout(req, res);
    default:
      return res.status(501).end();
  }
  async function logout(req: NextApiRequest, res: NextApiResponse) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    try {
      const response = await fetch(
        `${apiLink}/services/logout?useAuthtoken=true`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "asid-services-app": `${process.env.APP_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
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
