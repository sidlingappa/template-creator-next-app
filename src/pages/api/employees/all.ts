import { NextApiRequest, NextApiResponse } from "next";
import { apiLink, appToken } from "../../../helpers";
import https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllEmployee(req, res);
    default:
      return res.status(501).end();
  }

  async function getAllEmployee(req: NextApiRequest, res: NextApiResponse) {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    try {
      const response = await fetch(`${apiLink}/employee/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "asid-services-app": `${appToken}`,
          Cookie: req.headers.cookie,
        },

        // @ts-ignore
        agent: httpsAgent,
      });
      const json = await response.json();
      console.log(response);
      if (response.ok) {
        return res.status(response.status).send(json);
      } else {
        return res.status(response.status).json({ results: undefined });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }
  }
}
