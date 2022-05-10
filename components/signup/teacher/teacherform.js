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
import { useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
// ** Packages
import { TeacherSignup } from "../../../lib/auth";
import LoadingSpinner from "../../../components/ui/loading-spinner";
import ProjectCard from "../../../components/layout/Card";
import Icon from "../../../components/icon";
import { Chip, MenuItem, Select } from "@mui/material";
import Error from "../../ui/error";
import { Card, LinkStyled, MenuProps } from "../../ui/customComponents";
const experiences = [
  "Math",
  "Chemistry",
  "History",
  "Programming",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const departments = ["Engineeer", "Dancer", "Mathematics", "Researcher"];

// ** Styled Components

const getStyles = (experience, selectedExperiences, theme) => {
  return {
    fontWeight:
      selectedExperiences.indexOf(experience) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const TeacherForm = () => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
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
  const handleDepartment = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const chipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedExperiences(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const closeHandler = () => {
    console.log("Clicked");
    // setShowError(false)
  };
  const signupHandler = (event) => {
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsloading(true);
    TeacherSignup(
      enteredUsername,
      enteredEmail,
      enteredPassword,
      selectedExperiences,
      selectedDepartment
    )
      .then((res) => {
        const { message } = res.data;
        console.log(message);
        if (message == "Created user!") {
          router.replace("/pages/login");
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.data.message) {
          setError(err.response.data.message);
          setShowError(true);
        } else setError(err.message);
        setIsloading(false);
        return;
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
        <Box className="content-center" onClick={closeHandler}>
          {showError ? <Error error={error} /> : null}
          <Card sx={{ zIndex: 1 }}>
            <CardContent
              sx={{
                padding: (theme) => `${theme.spacing(12, 9, 7)} !important`,
              }}
            >
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={45} height={50}>
                  <Icon />
                </svg>
                <Typography
                  variant="h7"
                  sx={{
                    ml: 1,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "1.5rem !important",
                    marginBottom: "20px",
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
                  Starts teaching here 🚀
                </Typography>
                <Typography variant="body2">
                  Make your career become better
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
                <Box sx={{ minWidth: 120, mt: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Your Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedDepartment}
                      label="Your Department"
                      onChange={handleDepartment}
                    >
                      {departments.map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <FormControl sx={{ mt: 4 }} fullWidth>
                  <InputLabel id="demo-multiple-chip-label">
                    Your experiences
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedExperiences}
                    onChange={chipHandler}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Your experiences"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {experiences.map((experience) => (
                      <MenuItem
                        key={experience}
                        value={experience}
                        style={getStyles(
                          experience,
                          selectedExperiences,
                          theme
                        )}
                      >
                        {experience}
                      </MenuItem>
                    ))}
                  </Select>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    Are you a student?
                  </Typography>
                  <Typography variant="body2">
                    <Link passHref href="/pages/signup/student">
                      <LinkStyled>Sign up here as a student</LinkStyled>
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

export default TeacherForm;
