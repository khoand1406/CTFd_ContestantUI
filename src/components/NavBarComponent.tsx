import { CommonUtils } from "@/utils/common.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
 
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ROUTE_CHALLENGES,
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_PROFILE,
  ROUTE_ROOT,
  ROUTE_SCOREBOARD,
  ROUTE_TICKETS,
} from "@/constants/routes";

const NavBarComponent: React.FC = () => {
  const { t } = useTranslation();

  const [user, ] = useState<boolean>(CommonUtils.isLoggedIn());

  interface PageLink {
    pageName: string;
    dstURL: string;
  }

  const pages: Array<PageLink> = [
    { pageName: t("navBar.challenges"), dstURL: ROUTE_CHALLENGES },
    { pageName: t("navBar.scoreboard"), dstURL: ROUTE_SCOREBOARD },
    { pageName: t("navBar.tickets"), dstURL: ROUTE_TICKETS },
  ];

  const userMenus: Array<PageLink> = [
    { pageName: t("navBar.userMenus.profile"), dstURL: ROUTE_PROFILE },
    { pageName: t("navBar.userMenus.logout"), dstURL: ROUTE_LOGOUT },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <>
                <Typography
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  Welcome, user!
                </Typography>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {userMenus.map((m) => (
                    <MenuItem
                      component={RouterLink}
                      to={m.dstURL}
                      onClick={handleClose}
                    >
                      {m.pageName}
                    </MenuItem>
                  ))}
                </Menu>
              </>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBarComponent;
