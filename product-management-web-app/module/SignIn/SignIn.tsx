import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
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

const SignIn = () => {
  const router = useRouter();
  const validationSchema = useMemo(() => {
    return yup.object().shape({
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
      const response = await AxiosPost(
        data,
        routes.PUBLIC.LOGIN
      );
      if (response?.data == true) {
        router.push("/product");
      } else {
        alert("You are not a valid user");
      }
    } catch (e) {
      console.log(e);
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {/*{errors.email && <p>{errors.email.message}</p>}*/}
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              // helperText={errors.password?.message}
              {...register("password")}
            />
            {/*{errors.password && <p>{errors.password.message}</p>}*/}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={frontendLink.PUBLIC.SIGN_UP} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
