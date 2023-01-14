import { NextApiRequest, NextApiResponse } from "next";
import { apiLink } from "../../../helpers";
import https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getLoginUser(req, res);
    default:
      return res.status(501).end();
  }

  async function getLoginUser(req: NextApiRequest, res: NextApiResponse) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    try {
      const request = await fetch(`${apiLink}/users/currentUser`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "asid-services-app": "cd05f2b8-b222-4068-a78d-749fffeced76",
        },
        // @ts-ignore
        agent: httpsAgent,
      }).then((response) => {
        if (!response.ok) {
          console.log(response.status);
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      });
      let jsonData = JSON.parse(JSON.stringify(request)).response;
      if (jsonData.results.length === 1) {
        //userSubject.next(jsonData.results[0]);
        localStorage.setItem("user", jsonData.results[0]);
        return jsonData.results[0];
      } else {
        throw { error: "Unable to fetch user " };
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
