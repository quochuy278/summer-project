import { useState, useRef } from "react";
import ProjectCard from "../../components/layout/Card";
// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { signIn } from "next-auth/react";
// ** Icons Imports
import Icon from "../../components/icon";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Error from "../ui/error";
import {Card,LinkStyled,FormControlLabel} from '../../components/ui/customComponents'


const LoginForm = () => {
  // ** State
  const [values, setValues] = useState({
    showPassword: false,
  });
  // ** Hook
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const loginHandler = async (event) => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    event.preventDefault();
    const result = await signIn(
      "credentials",
      {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      },
      setIsloading(true)
    )
      .then((res) => {
        const message = res.error;
        if (message === null) {
          console.log("Login Successfully");
          router.replace("/");
          setIsloading(false);
        } else if (message) {
          setShowError(true);
          setError(message);
        }
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsloading(false);
  };

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  if (showError) {
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  }
  return (
    <ProjectCard>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box className="content-center">
          {showError ? <Error error={error} /> : null}
          <Card sx={{ zIndex: 1 }}>
            <CardContent
              sx={{
                padding: (theme) => `${theme.spacing(12, 9, 7)} !important`,
              }}
            >
              <Box
                sx={{
                  mb: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={45} height={50}>
                  <Icon />
                </svg>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    ml: 1,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "1.5rem !important",
                  }}
                >
                  Summer 2022
                </Typography>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, marginBottom: 1.5 }}
                >
                  Welcome to my summer project 👋🏻
                </Typography>
                <Typography variant="body2">
                  Please sign-in to your account and start the adventure
                </Typography>
              </Box>
              <form noValidate autoComplete="off" onSubmit={loginHandler}>
                <TextField
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email"
                  sx={{ marginBottom: 4 }}
                  inputRef={emailInputRef}
                  autoComplete="true"
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-login-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    id="auth-login-password"
                    inputRef={passwordInputRef}
                    type={values.showPassword ? "text" : "password"}
                    autoComplete="true"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <EyeOutline />
                          ) : (
                            <EyeOffOutline />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                  />
                  <Link passHref href="/">
                    <LinkStyled onClick={(e) => e.preventDefault()}>
                      Forgot Password?
                    </LinkStyled>
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ marginBottom: 7 }}
                >
                  Login
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    New on our platform?
                  </Typography>
                  <Typography variant="body2">
                    <Link passHref href="/pages/signup">
                      <LinkStyled>Create an account</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
    </ProjectCard>
  );
};

export default LoginForm;
