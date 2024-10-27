import { Navigate } from "react-router-dom";
import { CommonUtils } from "../../utils/common.utils";
import { ROUTE_LOGIN } from "@/constants/routes";
import React from "react";

interface Prop {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Prop> = (props) => {
  if (!CommonUtils.isLoggedIn()) {
    return <Navigate to={ROUTE_LOGIN} replace />;
  }
  return props.children;
};
