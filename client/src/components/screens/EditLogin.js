import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./EditLogin.module.css";
import validator from "validator";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import {
  loadUser,
  updateProfile,
  updatePassword,
} from "../../actions/userAction";
import Loader from "../layouts/Loader/Loader";

const EditLogin = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, error, isUpdated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const oldPass = useRef();
  const newPass = useRef();
  const confirmNewPass = useRef();

  const [nameError, setNameError] = useState([false, ""]);
  const [emailError, setEmailError] = useState([false, ""]);
  const [phoneError, setPhoneError] = useState([false, ""]);
  const [passError, setPassError] = useState([false, ""]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({type:"CLEAR_ERROR"});
      return;
    }

    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      dispatch({ type: "UPDATE_PROFILE_RESET" });
    }
  }, [isAuthenticated, navigate, isUpdated, error, alert, dispatch]);

  const handleEditName = () => {
    const inputName = name.current.value;
    setNameError([false, ""]);
    if (!inputName) {
      setNameError([true, "Name is required"]);
      setEditName(!editName);
      return;
    }
    dispatch(updateProfile({ name: inputName }));
  };

  const handleEditEmail = () => {
    const inputEmail = email.current.value;
    setEmailError([false, ""]);
    if (!validator.isEmail(inputEmail)) {
      setEmailError([true, "Email is invalid"]);
      setEditEmail(!editEmail);
      return;
    }
    dispatch(updateProfile({ email: inputEmail }));
  };

  const handleEditPhone = () => {
    const inputPhone = phone.current.value;
    setPhoneError([false, ""]);
    if (!validator.isMobilePhone(inputPhone)) {
      setPhoneError([true, "Phone is invalid"]);
      setEditPhone(!editPhone);
      return;
    }
    dispatch(updateProfile({ phone: inputPhone }));
  };

  const handleEditPassword = () => {
    const inputOldPass = oldPass.current.value;
    const inputNewPass = newPass.current.value;
    const inputConfirmNewPass = confirmNewPass.current.value;
    setPassError([false, ""]);
    if (!inputOldPass || !inputNewPass || !inputConfirmNewPass) {
      setPassError([true, "Password is required"]);
      setEditPass(!editPass);
      return;
    }
    if (inputNewPass.length < 6) {
      setPassError([true, "Password must be at least 6 characters"]);
      setEditPass(!editPass);
      return;
    }
    dispatch(
      updatePassword({
        enteredPassword: inputOldPass,
        newPassword: inputNewPass,
        confirmPassword: inputConfirmNewPass,
      })
    );
  };

  return (
    <div className={styles.mainDiv}>
      <MetaData title="Edit Account" />
      <div className={styles.routesDiv}>
        <p
          className={styles.routesDiv_p}
          onClick={() => {
            navigate("/account");
          }}
        >
          Your Account&nbsp;
        </p>
        <p style={{ fontSize: "14px", color: "black" }}>{"> "}</p>
        <p> &nbsp;Login & Security</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <div className={styles.editDiv}>
            <div className={styles.editRowDiv}>
              <div className={styles.editRowLeft}>
                <p>Name:</p>
                <p>{user.name}</p>
                {editName && (
                  <input type="text" placeholder={user.name} ref={name} />
                )}
                {nameError[0] && (
                  <p className={styles.error_text}>{nameError[1]}</p>
                )}
              </div>
              <div className={styles.editRowRight}>
                <button
                  onClick={() => {
                    setEditName(!editName);
                    editName && handleEditName();
                  }}
                >
                  {editName ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className={styles.editRowDiv}>
              <div className={styles.editRowLeft}>
                <p>E-mail:</p>
                <p>{user.email}</p>
                {editEmail && (
                  <input type="text" placeholder={user.email} ref={email} />
                )}
                {emailError[0] && (
                  <p className={styles.error_text}>{emailError[1]}</p>
                )}
              </div>
              <div className={styles.editRowRight}>
                <button
                  onClick={() => {
                    setEditEmail(!editEmail);
                    editEmail && handleEditEmail();
                  }}
                >
                  {editEmail ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            {user.phone && (
              <div className={styles.editRowDiv}>
                <div className={styles.editRowLeft}>
                  <p>Phone:</p>
                  <p>{user.phone}</p>
                  {editPhone && (
                    <input type="text" placeholder={user.phone} ref={phone} />
                  )}
                  {phoneError[0] && (
                    <p className={styles.error_text}>{phoneError[1]}</p>
                  )}
                </div>
                <div className={styles.editRowRight}>
                  <button
                    onClick={() => {
                      setEditPhone(!editPhone);
                      editPhone && handleEditPhone();
                    }}
                  >
                    {editPhone ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            )}
            <div className={styles.editRowDiv}>
              <div className={styles.editRowLeft}>
                <p>Password:</p>
                {editPass && (
                  <div className={styles.passDiv}>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      ref={oldPass}
                    />
                    <input
                      type="password"
                      placeholder="Enter New Password"
                      ref={newPass}
                    />
                    <input
                      type="password"
                      placeholder="Enter Confirm Password"
                      ref={confirmNewPass}
                    />
                  </div>
                )}
                {passError[0] && (
                  <p className={styles.error_text}>{passError[1]}</p>
                )}
              </div>
              <div className={styles.editRowRight}>
                <button
                  onClick={() => {
                    setEditPass(!editPass);
                    editPass && handleEditPassword();
                  }}
                >
                  {editPass ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        )
      )}
      <button
        className={styles.doneBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        Done
      </button>
    </div>
  );
};

export default EditLogin;
