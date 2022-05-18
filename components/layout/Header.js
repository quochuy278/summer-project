import { useContext, useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { getSession, signOut, useSession } from "next-auth/react";
import {MainNavigation,UserDropdownMenuItem,LoadingSpinner} from '../../components'
import Image from "next/image";
import getUser from '../../lib/helper'
import { Divider } from "@mui/material";
import AuthContext from "../../store/auth-context";
import { Router, useRouter } from "next/router";

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter()
  const { status } = useSession();
  const theme = useTheme();

  const authCtx = useContext(AuthContext)

 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigationItems = MainNavigation(); //Nav items
  const userDropdownItems = UserDropdownMenuItem(); //Dropdown items
  const logoutHandler = () => {
    signOut();
    router.replace('/')
  };
  if (status == "loading" || !authCtx) {
    return <LoadingSpinner />;
  } 
 
  return (
    <AppBar position="static">
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          {/* Logo here */}
          <IconButton>
            <Link href={"/"}>
              <Image src="/icons/education.svg" alt="Logo" width={50} height={50} />
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navigationItems.map((item) => (
              <Button
                key={item.index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block", mx: "20px" }}
              >
                <Link href={item.path}>{item.title}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {status === "authenticated" && authCtx && (
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src='/images/avatars/2.png'
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userDropdownItems.map((item) => (
                    <MenuItem key={item.index} onClick={handleCloseUserMenu}>
                      <Link href={item.path}>
                        <Typography textAlign="center">{item.title}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logoutHandler}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {status === "unauthenticated" && (
              <Box>
                <Button variant="outline">
                  <Link href={"/pages/login"}>Login</Link>
                </Button>
                <Button variant="outline">
                  <Link href={"/pages/signup"}>signup</Link>
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/pages/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};