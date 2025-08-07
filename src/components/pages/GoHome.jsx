/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function GoHome({ token, children }) {
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default GoHome;
