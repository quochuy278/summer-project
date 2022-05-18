// ** React Imports
import { useState, useRef } from "react";
// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";
// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
// ** Packages
import { SignUp } from "../../lib/auth";
import {
  ProjectCard,
  Error,
  LoadingSpinner,
  Card,
  LinkStyled,
} from "..";
import Image from "next/image";

// ** Styled Components

const SignUpForm = () => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  // ** Hook

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const signupHandler = (event) => {
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsloading(true);
    SignUp(enteredUsername, enteredEmail, enteredPassword)
      .then((res) => {
        // setIsloading(true);
        // const { message } = res.data;
        if (message == "Created user!") {
          // router.replace("/pages/login");
          console.log('Success')
        }
        setIsloading(false);
        console.log(res.data)
      })
      .catch((err) => {
        // if (err.response.data.message) {
        //   setError(err.response.data.message);
        //   setShowError(true);
        // } else setError(err.message);
        // setIsloading(false);
        // return;
        console.log(err)
      });
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
                <Image src="/icons/education.svg" alt="Logo" width={45} height={50} />
                <Typography
                  variant="h7"
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "1.5rem !important",
                  }}
                >
                  My Summer Project
                </Typography>
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, marginBottom: 1.5 }}
                >
                  Starts here 🚀
                </Typography>
                <Typography variant="body2">
                  Make your work management easy and fun!
                </Typography>
              </Box>
              <form noValidate autoComplete="off" onSubmit={signupHandler}>
                <TextField
                  autoFocus
                  fullWidth
                  id="username"
                  label="Username"
                  sx={{ marginBottom: 4 }}
                  inputRef={usernameInputRef}
                />
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  sx={{ marginBottom: 4 }}
                  inputRef={emailInputRef}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="auth-register-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    label="Password"
                    inputRef={passwordInputRef}
                    id="auth-register-password"
                    type={values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <EyeOutline fontSize="small" />
                          ) : (
                            <EyeOffOutline fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ my: 4 }}
                >
                  Sign up
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
                    Already have an account?
                  </Typography>
                  <Typography variant="body2">
                    <Link passHref href="/pages/login">
                      <LinkStyled>Sign in instead</LinkStyled>
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

export default SignUpForm;
