import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./EditLogin.module.css";
import validator from "validator";
import MetaData from "../layouts/MetaData";

const EditLogin = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const oldPass = useRef();
  const newPass = useRef();

  const [nameError, setNameError] = useState([false, ""]);
  const [emailError, setEmailError] = useState([false, ""]);
  const [phoneError, setPhoneError] = useState([false, ""]);
  const [passError, setPassError] = useState([false, ""]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleEditName = () => {
    const inputName = name.current.value;
    setNameError([false, ""]);
    if (!inputName) {
      setNameError([true, "Name is required"]);
      setEditName(!editName);
      return;
    }
    console.log("edit name", inputName);
  };

  const handleEditEmail = () => {
    const inputEmail = email.current.value;
    setEmailError([false, ""]);
    if (!validator.isEmail(inputEmail)) {
      setEmailError([true, "Email is invalid"]);
      setEditEmail(!editEmail);
      return;
    }
    console.log("edit email", inputEmail);
  };

  const handleEditPhone = () => {
    const inputPhone = phone.current.value;
    setPhoneError([false, ""]);
    if (!validator.isMobilePhone(inputPhone)) {
      setPhoneError([true, "Phone is invalid"]);
      setEditPhone(!editPhone);
      return;
    }
    console.log("edit phone", inputPhone);
  };

  const handleEditPassword = () => {
    const inputOldPass = oldPass.current.value;
    const inputNewPass = newPass.current.value;
    setPassError([false, ""]);
    if (!inputOldPass || !inputNewPass) {
      setPassError([true, "Password is required"]);
      setEditPass(!editPass);
      return;
    }
    console.log("edit pass", inputOldPass, inputNewPass);
  };

  return (
    <div className={styles.mainDiv}>
    <MetaData title="Edit Login"/>
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
              <p>E-mail:</p>
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
                <input type="text" placeholder="Enter Password" ref={oldPass} />
                <input
                  type="text"
                  placeholder="Enter New Password"
                  ref={newPass}
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
      <button className={styles.doneBtn} onClick={()=>{navigate(-1)}}>Done</button>
    </div>
  );
};

export default EditLogin;
