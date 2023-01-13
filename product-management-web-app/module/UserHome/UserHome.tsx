import { Box, Button, Container, Grid, Paper } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/router";

const UserHome = () => {
  const router = useRouter();
  const gotoSignUp = () => {
    router.push("sign-up");
  };
  const gotoSignIn = () => {
    router.push("sign-in");
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": {
            m: 1,
            width: 600,
            height: 200,
          },
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "600",
              margin: "20px 0px",
            }}
          >
            Welcome to Project-Management
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "30px 10px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  sx={{ float: "right" }}
                  onClick={() => gotoSignIn()}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => gotoSignUp()}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
export default UserHome;
