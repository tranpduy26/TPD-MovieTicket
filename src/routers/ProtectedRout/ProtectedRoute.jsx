import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();
  console.log(location);
  if (!currentUser) {
    // user chưa đăng nhập => redirect về trang signin
    const url = `/signin?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  // if (currentUser !== "QuanTri") {
  //   return <Navigate to={`/404`} />;
  // }
  return children || <Outlet />;
}

/*
    TH1:

    <Route path="..." element{
        <ProtectedRoute>
            <Component />
        </ProtectedRoute>}


    TH2:
    <Route element={<ProtectedRoute/>}>
        <Route path="..." element={<Component />}/>
        * Định nghĩ các Route khác muốn được protect

    </ProtectedRoute>
*/
