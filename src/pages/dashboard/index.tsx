import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { NextPage, NextPageContext } from "next";
import NavBar from "../../components/navbar";
import { useEffect, useState } from "react";
import { Role, getAccess } from "../../dtos/Roles";
import { User, getRoleId } from "../../dtos/User";
import { useRouter } from "next/router";
import { mutate } from "swr";
const Typography = styled(Paper)({
  margin: 0.6,
  marginLeft: 0,
  marginRight: 0,
  fontSize: 15,
  padding: 5,
  borderRadius: 1,
  backgroundColor: "#a5247a",
  color: "#FFF",
  cursor: "pointer",
});
const Item = styled(Paper)({
  backgroundColor: "#00977b",
  textAlign: "center",
  margin: 5,
  padding: 5,
  color: "#FFF",
});

const Dashboard: NextPage & { auth?: boolean } = () => {
  const router = useRouter();
  let { userId } = router.query;
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<User>(null);
  const [loginInfo, setLoginInfo] = useState({ user: null, role: null });
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const getUserInfo = async () => {
    if (userId == undefined) {
      const value = window.localStorage.getItem("loginInfo");
      userId = JSON.parse(value)?.user.id;
    }
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
      getUserRole(data["response"]["results"][0]?.user);
    } else {
      router.push("/login");
    }
  };
  const getUserRole = async (user) => {
    let roleId = getRoleId(user);
    const result = await fetch(`/api/roles/` + roleId, {
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
      setRole(data["response"]["results"][0]?.role);
      mutate("role", data["response"]["results"][0]?.role);
      loginInfo.user = user;
      loginInfo.role = data["response"]["results"][0]?.role;
      window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      mutate("loginInfo", loginInfo);
    } else {
      router.push("/login");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const handleEmpMngt = () => {
    router.push("/employeeMngt");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar></NavBar>
      <Grid container sx={{ marginTop: 10 }} columns={{ xs: 4, sm: 8, md: 24 }}>
        {getAccess(role, "user", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item onClick={handleEmpMngt}>
              <img width="99%" alt="test" src="images/emp-mangmt.png" />
              <Typography>Employee Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "site", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/client-mangmt.png" />
              <Typography>Client Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "user", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/payrol-mangmt.png" />
              <Typography>Payroll Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "leave", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/leave-mangmt.png" />
              <Typography>Leave Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "workshift", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/clocking-mangmt.png" />
              <Typography>Clocking Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "workshift", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/time-mangmt.png" />
              <Typography>Time Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "patrolling", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/reporting.png" />
              <Typography>Reporting</Typography>
            </Item>
          </Grid>
        )}
        <Grid item={true} xs={2} sm={4} md={4} lg={4}>
          <Item>
            <img width="99%" alt="test" src="images/support.png" />
            <Typography>Support</Typography>
          </Item>
        </Grid>
        <Grid item={true} xs={2} sm={4} md={4} lg={4}>
          <Item>
            <img width="99%" alt="test" src="images/admin.png" />
            <Typography>Administration</Typography>
          </Item>
        </Grid>
        {getAccess(role, "incident", "read") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/incident-mangmt.png" />
              <Typography>Incident Management</Typography>
            </Item>
          </Grid>
        )}
        {getAccess(role, "leave", "update") && (
          <Grid item={true} xs={2} sm={4} md={4} lg={4}>
            <Item>
              <img width="99%" alt="test" src="images/approvals.png" />
              <Typography>Approvals</Typography>
            </Item>
          </Grid>
        )}
        <Grid item={true} xs={2} sm={4} md={4} lg={4}>
          <Item>
            <img width="99%" alt="test" src="images/client-mangmt.png" />
            <Typography>Others</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
Dashboard.auth = true;
export default Dashboard;
