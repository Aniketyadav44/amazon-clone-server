import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import styles from "./EditAddresses.module.css";
import NewAddress from "./NewAddress";

const EditAddresses = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }

    if (window.location.pathname === "/edit-addresses") {
      setShowAddForm(false);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.routesDiv}>
        <MetaData title="Your Addresses" />
        <p
          className={styles.routesDiv_p}
          onClick={() => {
            navigate("/account");
          }}
        >
          Your Account&nbsp;
        </p>
        <p style={{ fontSize: "14px", color: "black" }}>{"> "}</p>
        <p
          className={
            showAddForm ? styles.yourAddresses_newForm : styles.yourAddresses
          }
          onClick={() => {
            navigate(-1);
          }}
        >
          {" "}
          &nbsp;Your Addresses&nbsp;
        </p>
        {showAddForm && (
          <>
            <p style={{ fontSize: "14px", color: "black" }}>{"> "}</p>
            <p className={styles.yourAddresses}> &nbsp;New Address</p>
          </>
        )}
      </div>

      {!showAddForm && (
        <>
          <h1>Your Addresses</h1>
          <div className={styles.address_row}>
            <div
              className={styles.address_div}
              onClick={() => {
                navigate("new-address");
                setShowAddForm(true);
              }}
            >
              <div className={styles.add_div}>
                <h1>Add address</h1>
              </div>
            </div>
            {user.address && user.address.map((a,index) => {
              return (
                <div key={index} className={styles.user_address}>
                  <h3>{a.name}</h3>
                  <p>
                    {a.flat}, {a.area}
                    <br />
                    landmark: {a.landmark}
                    <br />
                    {a.city}, {a.state} {a.pindoce}
                    <br />
                    {a.country}
                    <br />
                    Phone number:{a.phone}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
      <Routes>
        <Route path="new-address" element={<NewAddress />} />
      </Routes>
    </div>
  );
};

export default EditAddresses;
