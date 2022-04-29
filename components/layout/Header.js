import { useState } from "react";
import Link from 'next/link'
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
import { signOut, useSession } from "next-auth/client";
import MainNavigation from "../navigation/main-navigation";
import UserDropdownMenuItem from "../navigation/user-dropdown-menu";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
   
  const [anchorElUser, setAnchorElUser] = useState(null);

  const theme = useTheme()
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
  const navigationItems = MainNavigation();  //Nav items
  const userDropdownItems = UserDropdownMenuItem() //Dropdown items
  const logoutHandler = () => {
    signOut();
  };
  return (
    <AppBar position="static">
      <Container maxWidth="x1">
        <Toolbar disableGutters>
          {/* Logo here */}
          <IconButton>
            <Link href={"/"}>
              <svg
                width={35}
                height={29}
                version="1.1"
                viewBox="0 0 30 23"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    id="Artboard"
                    transform="translate(-95.000000, -51.000000)"
                  >
                    <g id="logo" transform="translate(95.000000, 50.000000)">
                      <path
                        id="Combined-Shape"
                        fill={theme.palette.secondary.main}
                        d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="22.7419355 8.58870968 30 12.7417372 30 16.9537453"
                        transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "
                      />
                      <polygon
                        id="Rectangle"
                        opacity="0.077704"
                        fill={theme.palette.common.black}
                        points="22.7419355 8.58870968 30 12.6409734 30 15.2601969"
                        transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "
                      />
                      <path
                        id="Rectangle"
                        fillOpacity="0.15"
                        fill={theme.palette.common.white}
                        d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"
                      />
                      <path
                        id="Rectangle"
                        fillOpacity="0.35"
                        fill={theme.palette.common.white}
                        transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) "
                        d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
