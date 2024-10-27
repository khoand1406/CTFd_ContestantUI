import { CommonUtils } from "@/utils/common.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTE_CHALLENGES, ROUTE_LOGIN, ROUTE_ROOT } from "@/constants/routes";

const NavBarComponent: React.FC = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<boolean>(CommonUtils.isLoggedIn());

  interface PageLink {
    pageName: string;
    dstURL: string;
  }

  const pages: Array<PageLink> = [
    { pageName: t("navBar.challenges"), dstURL: ROUTE_CHALLENGES },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FontAwesomeIcon icon="flag" />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={ROUTE_ROOT}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            fCTF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <FontAwesomeIcon icon="bars" />
            </IconButton>
            <Menu
              id="menu-appbar"
              open={false}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={RouterLink}
                  to={page.dstURL}
                  key={page.pageName}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FontAwesomeIcon icon="flag" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            fCTF
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                to={page.dstURL}
                key={page.pageName}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Tooltip title="Open profile">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                component={RouterLink}
                to={ROUTE_LOGIN}
                color="secondary"
                variant="contained"
              >
                {t("auth.login")}
              </Button>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              open={false}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBarComponent;
