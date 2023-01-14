import type { NextApiRequest } from "next";
import { apiLink, appToken } from "../helpers";
import https from "https";
export class RestUtils {
  static createPostRequest(req: NextApiRequest, url: string): Request {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    return new Request(url, {
      method: "POST",
      body: JSON.stringify(req.body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `${appToken}`,
        Cookie: req.headers.cookie,
      },
      // @ts-ignore
      agent: httpsAgent,
    });
  }

  static createPutRequest(req: NextApiRequest, url: string): Request {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    return new Request(url, {
      method: "PUT",
      body: JSON.stringify(req.body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `${appToken}`,
        Cookie: req.headers.cookie,
      },
      // @ts-ignore
      agent: httpsAgent,
    });
  }

  static createGetRequest(req: NextApiRequest, url: string): Request {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    return new Request(url, {
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
  }
}
