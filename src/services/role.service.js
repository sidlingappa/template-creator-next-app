import { apiLink } from "../helpers";
import { appToken } from "../helpers";
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
export const roleService = {
  getUserRoles,
};
async function getUserRoles() {
  try {
    const appKey = `${process.env.APP_TOKEN}`;
    console.log("appKey" + appKey);
    const request = await fetch(`${apiLink}/roles/3?appKey=${appToken}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": "cd05f2b8-b222-4068-a78d-749fffeced76",
      },
      agent: httpsAgent,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    });
    let jsonData = JSON.parse(JSON.stringify(request)).response;
    if (jsonData.results.length === 1) {
      userSubject.next(jsonData.results[0]);
      localStorage.setItem("user", jsonData.results[0]);
      return jsonData.results[0];
    } else {
      throw { error: "Unable to fetch user " };
    }
  } catch (e) {
    throw new Error(e);
  }
}
