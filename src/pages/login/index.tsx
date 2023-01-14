import { Grid, TextField, Button, Link, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, useRef, useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "../../dtos/ApiResponse";
import { Role } from "../../dtos/Roles";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const router = useRouter();
  // const dispatch = useDispatch()
  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["user"]);
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement;

    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    // Get data from the form.
    try {
      const result = await fetch(`/api/user/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else setError("Username or password is wrong");
        })
        .then(function (result) {
          // @ts-ignore
          setCookie("remember-me", result.userToken, {
            path: "/",
            maxAge: 1209600, // Expires after 1hr
            sameSite: true,
          });
          //console.log("cookie"+result.userToken)
          router.push({
            pathname: "/dashboard",
            query: { userId: result.userId },
          });
        });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Grid container component="main" sx={{ justifyContent: "space-around" }}>
      <Grid
        item={true}
        container={true}
        xs={12}
        sm={4}
        md={7}
        sx={{
          borderRadius: 2,
        }}
      >
        {error.length > 0 ? <p className="text-sm">{error}</p> : ""}
        {/* <iframe src="https://pages.spireon.com/kahu-login-01" frameBorder="none" className={classes.iframe} />*/}
      </Grid>

      <Grid
        item={true}
        xs={10}
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        square
        sx={{
          borderRadius: 2,
          p: 1,
          padding: 1,
          marginX: 5,
          marginY: 5,
        }}
      >
        <div>
          {/* <Image
                        src="/images/login-logo.png"
                        alt="login"
                        width="321"
                        height="84"
                    />*/}
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth={true}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameInput}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth={true}
              size={"small"}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordInput}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid item={true} xs={12} container>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
LoginPage.auth = false;
export default LoginPage;
