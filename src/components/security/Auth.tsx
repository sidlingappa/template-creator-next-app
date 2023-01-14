import React, { useEffect, useState } from "react";
import { apiLink, appToken } from "../../helpers";
import { useRouter } from "next/router";
import Spinner from "../Spinner/Spinner";
import https from "https";
import { withCookies, Cookies } from "react-cookie";

// @ts-ignore
export default function Auth({ children, ...props }) {
  const cookies = new Cookies();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onRouteChangeStart = () => {
    setLoading(true);
    setAuthorized(false);
  };

  useEffect(() => {
    authCheck();
    // setAuthorized(true);
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [authorized]);

  const authCheck = () => {
    //console.log("  --> "+cookies.get('remember-me'));
    if (
      cookies.get("remember-me") === undefined ||
      cookies.get("remember-me") === ""
    ) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  };

  if (!loading) return authorized ? children : <Spinner />;
  else return <Spinner />;
}
