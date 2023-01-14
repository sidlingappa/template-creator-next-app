import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { UserProfileDetails } from "../../components/user/user-profile-details";
import NavBar from "../../components/navbar";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Role, getAccess } from "../../dtos/Roles";
import { mutate } from "swr";
const Profile: NextPage & { auth?: boolean } = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<Role>(null);

  const getUserInfo = async (userId) => {
    const result = await fetch(`/api/user/` + userId, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "asid-services-app": `cd05f2b8-b222-4068-a78d-749fffeced76`,
      },
    });
    const data = await result.json();
    if (result.ok) {
      //   console.log("APP_TOKEN " + data['response']['results'][0])
      setUser(data["response"]["results"][0]?.user);
      mutate("user", data["response"]["results"][0]?.user);
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    const value = window.localStorage.getItem("loginInfo");
    // setUser(JSON.parse(value)?.user);
    setRole(JSON.parse(value)?.role);
    getUserInfo(JSON.parse(value)?.user.id);
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <Head>
        <title>Profile | Material Kit</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Profile
          </Typography>
          <UserProfileDetails user={user} role={role} />
        </Container>
      </Box>
    </>
  );
};

Profile.auth = true;
export default Profile;
