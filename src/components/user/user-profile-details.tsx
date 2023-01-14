import { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  CardActions,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { Role, getAccess } from "../../dtos/Roles";
import { User } from "../../dtos/User";
import { mutate } from "swr";
import { useForm, Controller, useFieldArray } from "react-hook-form";
type UserInfoProps = {
  user: any;
  role: any;
};
const myHelper = {
  email: {
    required: "Email is Required",
    pattern: "Invalid Email Address",
  },
};
export const UserProfileDetails = ({ user, role }: UserInfoProps) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset, setValue } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  //console.count("app rerender");
  const onSubmit = async (data) => {
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    const result = await User.updateUserInfo(user);
    const d = await result.json();
    if (result.ok) {
      //console.log("APP_TOKEN " + d['response']['results'][0])
      user = d["response"]["results"][0]?.user;
      //  mutate('user', d['response']['results'][0]?.user)

      alert("User Updated.");
    } else {
      alert("User Update failed.");
    }
    console.log(data);
  };
  const firstName = "firstName";
  const lastName = "lastName";
  const email = "email";

  useEffect(() => {
    // Update form fields
    setValue(firstName, user?.firstName ? user.firstName : "");
    setValue(lastName, user?.lastName ? user.lastName : "");
    setValue(email, user?.email ? user.email : "");
  }, [user]);
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  height: 64,
                  mb: 2,
                  width: 64,
                }}
              />
              <Typography color="textPrimary" gutterBottom variant="h5">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {`${user?.addresses[0]?.city} ${user?.addresses[0]?.country}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {user?.timezone}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          {getAccess(role, "user", "update") && (
            <CardActions>
              <Button color="primary" fullWidth variant="text">
                Upload picture
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader subheader="Your profile information." title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name={firstName}
                    defaultValue=""
                    rules={{ required: "First name required" }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth={true}
                        required={true}
                        label="First name"
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        helperText={
                          error
                            ? error.message
                            : "Please specify the first name"
                        }
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="lastName"
                    defaultValue=""
                    rules={{ required: "Last name required" }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth={true}
                        required={true}
                        helperText="Please specify the last name"
                        label="Last name"
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    rules={{
                      required: "Email required",
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth={true}
                        required={true}
                        label="Email Address"
                        error={error !== undefined}
                        helperText={error ? myHelper.email[error.type] : ""}
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            {getAccess(role, "user", "update") && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button color="primary" variant="contained" type="submit">
                  {" "}
                  Save{" "}
                </Button>
              </Box>
            )}
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};
