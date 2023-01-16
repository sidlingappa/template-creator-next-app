import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import NavBar from "../../components/navbar";
import { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
const PreView: NextPage & { auth?: boolean } = () => {
  const [blog, setBlog] = useState("");
  const router = useRouter();
  let { data } = router.query;
  function createMarkup(c) {
    return { __html: c };
  }
  useEffect(() => {
    console.log(data);
    setBlog(data);
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
            Preview
          </Typography>
          {blog && <div dangerouslySetInnerHTML={createMarkup(blog)}></div>}
        </Container>
      </Box>
    </>
  );
};

PreView.auth = false;
export default PreView;
