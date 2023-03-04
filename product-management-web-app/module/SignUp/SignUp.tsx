import * as React from "react";
import { useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Face6Outlined } from "@mui/icons-material";
import AxiosPost from "../../@Jahid/APIResource/AxiosAPIPost";
import {routes} from "../../@Jahid/Common/apiRoutes";
import {frontendLink} from "../../@Jahid/Common/appLink";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUpForm = () => {
  const router = useRouter();
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().trim().required().label("Name"),
      email: yup.string().trim().required().label("Email"),
      password: yup.string().trim().required().label("Password"),
    });
  }, []);
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: any) => {
    try {
      await AxiosPost(data, routes.PRIVATE.CREATE_USER);
      alert("Sign Up Complete");
      router.push("/sign-in");
    } catch (e) {
      alert("Something went wrong!Please try again");
      console.log("errors", e);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/*<CssBaseline />*/}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Face6Outlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              autoComplete="email"
              autoFocus
              // helperText={errors.name?.message}
              {...register("name")}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              // helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              // helperText={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>

          <Grid container>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Link href={frontendLink.PUBLIC.SIGN_IN} variant="body2">
                  {"Already have an Account? Sign In"}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignUpForm;
