import { API_R_200 } from "@/constants/res-codes";
import { IUserChangePasswordRequest } from "@/interfaces/auth";
import { AuthService } from "@/services/auth.service";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("translation");

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const [isChangePwdError, setChangePwdError] = useState<boolean>(false);

  const handleCurrentPwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPwd(e.target.value);
  };

  const handleNewPwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPwd(e.target.value);
  };

  const onChangePwd = async () => {
    setChangePwdError(false);
    const payload: IUserChangePasswordRequest = {
      current_password: currentPwd,
      new_password: newPwd,
    };
    console.log("bruh");
    const response = (await AuthService.changePassword(
      payload
    )) as AxiosResponse;

    if (response.status === API_R_200) {
     
      console.log("change pwd success!");
    } else {
      setChangePwdError(true);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h2" sx={{ m: 2, fontWeight: "bold" }}>
        {t("profile.title")}
      </Typography>
      <Typography>{t("profile.changePassword.title")}</Typography>
      {isChangePwdError ? (
        <Alert sx={{ my: 2 }} severity="error">
          {t("error.changePasswordFailed")}
        </Alert>
      ) : (
        <></>
      )}
      <Box>
        <TextField
          type="password"
          value={currentPwd}
          placeholder={t("profile.changePassword.enterPassword")}
          onChange={handleCurrentPwdInput}
          variant="outlined"
        />
      </Box>
      <Box>
        <TextField
          type="password"
          value={newPwd}
          placeholder={t("profile.changePassword.repeatPassword")}
          onChange={handleNewPwdInput}
          variant="outlined"
        />
      </Box>
      <Button onClick={onChangePwd} variant="contained" color="success">
        {t("profile.changePassword.submit")}
      </Button>
    </Box>
  );
};

export default ProfilePage;
