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
import { styled, useTheme } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
// ** Packages
import { StudentSignUp } from "../../../lib/auth";
import LoadingSpinner from "../../../components/ui/loading-spinner";
import ProjectCard from "../../../components/layout/Card";
import Icon from "../../../components/icon";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "30rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const StudentForm = () => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [isLoading, setIsloading] = useState(false);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  // ** Hook
  const theme = useTheme();

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const signupHandler = async () => {
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredUsername)
    StudentSignUp(enteredUsername, enteredEmail, enteredPassword, false)
      .then((res) => {
        // console.log(message)
        // } else {
        //   setStatus("error");
        //   setError(message);
        //   setLoading(false);
        // }
        setIsloading(true);
        const {message} = res.data
        
        if (message == "Created user!") {
          router.replace("/pages/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ProjectCard>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box className="content-center">
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
                 <Icon/>
               </svg>
                <Typography
                  variant="h7"
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "1.5rem !important",
                    marginBottom: '20px'
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
              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
              >
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
                  onClick={signupHandler}
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

export default StudentForm;
