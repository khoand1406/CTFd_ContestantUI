import { ROUTE_LOGIN } from "@/constants/routes";
import { KEY_USERINFO } from "@/constants/storage-keys";
import { StorageUtils } from "@/utils/storage.utils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    StorageUtils.removeItem(KEY_USERINFO, "local");
    window.location.reload();
    navigate(ROUTE_LOGIN);
  });

  return <></>;
};

export default LogoutPage;
