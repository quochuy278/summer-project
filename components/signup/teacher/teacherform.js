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
import { TeacherSignup } from "../../../lib/auth";
import LoadingSpinner from "../../../components/ui/loading-spinner";
import ProjectCard from "../../../components/layout/Card";
import Icon from "../../../components/icon";
import { Chip, MenuItem, Select } from "@mui/material";

const names = [
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "30rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const TeacherForm = () => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [personName, setPersonName] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [department, setDepartment] = useState("");
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
  const handlerDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const chipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const signupHandler = async () => {
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   
  };
  console.log(personName);
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
                    ml: 3,
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
                <Box sx={{ minWidth: 120, mb: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Your Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={department}
                      label="Your Department"
                      onChange={handlerDepartment}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormControl sx={{ mb: 4 }} fullWidth>
                  <InputLabel id="demo-multiple-chip-label">
                    Your experiences
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
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
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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

export default TeacherForm;
