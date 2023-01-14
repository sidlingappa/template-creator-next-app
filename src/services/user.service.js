// import {BehaviorSubject} from "rxjs";
// import Router from "next/router";
// const https = require('https');
// import { apiLink } from "../helpers";
// const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
// });
// const userSubject = new BehaviorSubject(
//     process.browser && localStorage.getItem("user") !== undefined
// );

// export const userService = {
//     user: userSubject.asObservable(),
//     get userValue() {
//         return userSubject.value;
//     },
//     login,
//     logout,
// };

// async function login(username, password) {
//     const details = {username, password};
//     let formBody = [];
//     for (const property in details) {
//         const encodedKey = encodeURIComponent(property);
//         const encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//     }
//     formBody = formBody.join("&");
//     try {
//         const request = await fetch(`${apiLink}/services/login?useAuthtoken=true`, {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 'asid-services-app': `${process.env.APP_TOKEN}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: formBody,
//             agent: httpsAgent,
//         });

//        // const json = await request.json();

//         if (request.ok) {
//             return await getLoginUser();

//         } else {
//             throw json.message;
//         }
//     } catch (e) {
//         throw new Error(e);
//     }
// }

// async function getLoginUser() {
//     try {
//         const request = await fetch(`${apiLink}/users/currentUser`, {
//             method: "GET",
//             credentials: 'include',
//             headers: {
//                 "Content-Type": "application/json",
//                 'asid-services-app': `${process.env.APP_TOKEN}`,
//             },
//         }) .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error ${response.status}`);
//             }
//             return response.json();
//         });
//         let jsonData = JSON.parse(JSON.stringify(request)).response;
//         if (jsonData.results.length ===1) {
//             userSubject.next(jsonData.results[0]);
//             localStorage.setItem("user", jsonData.results[0]);
//             return jsonData.results[0];
//         }else {
//              throw{"error":"Unable to fetch user "};
//         }
//     } catch (e) {
//         throw new Error(e);
//     }

// }

// async function logout() {
//     // remove user from local storage, publish null to user subscribers and redirect to HOME page
//     // ! move down if Drupal server use SSL !
//     localStorage.removeItem("user");
//     userSubject.next(null);
//     Router.push("/login");

//     try {
//         const request = await fetch(`${apiLink}/users/logout`, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (request.ok) {
//             // clear localstorage, userSubject
//         }
//     } catch (e) {
//         throw new Error(e);
//     }
// }
