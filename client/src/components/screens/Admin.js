import React, { useEffect } from "react";
import styles from "./Admin.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Admin = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (!user || !user.role || !user.role === "admin") {
      navigate("/");
      alert.error("You are not authorized to access this page");
    }
  }, [isAuthenticated, alert, user, navigate]);

  return <div>Admin</div>;
};

export default Admin;
