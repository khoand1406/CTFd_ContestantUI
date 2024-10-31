import { API_R_200 } from "@/constants/res-codes";
import { ROUTE_ROOT } from "@/constants/routes";
import { KEY_USERINFO } from "@/constants/storage-keys";
import { IUserLoginRequest, IUserLoginResponse } from "@/interfaces/auth";
import { AuthService } from "@/services/auth.service";
import { CommonUtils } from "@/utils/common.utils";
import { StorageUtils } from "@/utils/storage.utils";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
  Link,
  Fade,
  Alert,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation("translation");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginError, setLoginError] = useState<boolean>(false);

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    checkIfTheresUser();
  });

  const navigate = useNavigate();

  const checkIfTheresUser = () => {
    if (CommonUtils.isLoggedIn()) {
      navigate(ROUTE_ROOT);
    }
  };

  const onLogin = async () => {
    setLoginError(false);
    const payload: IUserLoginRequest = {
      username: username,
      password: password,
    };

    const response = (await AuthService.login(payload)) as AxiosResponse;

    if (response.status === API_R_200) {
      const data = response!.data as IUserLoginResponse;
      StorageUtils.setItem(KEY_USERINFO, JSON.stringify(data), "local");
      console.log("login success!");
      window.location.reload();
    } else {
      setLoginError(true);
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(179,228,254,1) 0%, rgba(31,154,214,1) 100%)",
        }}
      >
        <Grid2 container sx={{ p: 16 }}>
          <Grid2 size={{ xs: 12, md: 8 }}></Grid2>
          <Grid2
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card variant="outlined" sx={{ p: 2, width: "100%" }}>
              <CardContent sx={{ justifyContent: "center" }}>
                <Typography
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                  variant="h4"
                >
                  {t("auth.login")}
                </Typography>
                {isLoginError ? (
                  <Alert sx={{ my: 2 }} severity="error">
                    {t("error.loginFailed")}
                  </Alert>
                ) : (
                  <></>
                )}
                <Box>
                  <TextField
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={handleUsernameInput}
                    sx={{ my: 2, width: "100%" }}
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    sx={{ my: 2, width: "100%" }}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Link href="#" underline="none">
                    <Typography variant="h6">
                      {t("auth.forgotPassword")}
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={onLogin}
                    sx={{ mt: 2 }}
                    size="large"
                    variant="contained"
                  >
                    {t("auth.login")}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </Fade>
  );
};

export default LoginPage;
