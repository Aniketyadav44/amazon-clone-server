import React, { useRef, useEffect, useState } from "react";
import styles from "./EditAddresses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import MetaData from "../layouts/MetaData";

const NewAddress = () => {
  const name = useRef();
  const [country, setCountry] = useState("");
  const phone = useRef();
  const pcode = useRef();
  const flat = useRef();
  const area = useRef();
  const landmark = useRef();
  const town = useRef();
  const state = useRef();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (isUpdated) {
      alert.success("Address added successfully");
      dispatch(loadUser());
      dispatch({ type: "UPDATE_PROFILE_RESET" });
      navigate(-1);
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERROR" });
    }
  }, [isAuthenticated, navigate, isUpdated, dispatch, loading, alert, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const inputName = name.current.value;
    const inputCountry = country.current.value;
    const inputPhone = phone.current.value;
    const inputPcode = pcode.current.value;
    const inputFlat = flat.current.value;
    const inputArea = area.current.value;
    const inputLandmark = landmark.current.value;
    const inputTown = town.current.value;
    const inputState = state.current.value;
    const address = {
      name: inputName,
      country: inputCountry,
      phone: inputPhone,
      pincode: inputPcode,
      flat: inputFlat,
      area: inputArea,
      landmark: inputLandmark,
      city: inputTown,
      state: inputState,
    };
    dispatch(updateProfile({ address: [...user.address, address] }));
  };
  return (
    <div className={styles.newadd_div}>
      <MetaData title="Add New Address" />
      <h2>Add a new address</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="country">Country/Region</label>
        <select
          id="country"
          required
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option>Country</option>
          {Country.getAllCountries().map((item) => {
            return (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            );
          })}
        </select>
        <label htmlFor="name">Full name</label>
        <input id="name" ref={name} required />
        <label htmlFor="phone">Mobile number</label>
        <input type="tel" id="phone" ref={phone} required />
        <label htmlFor="pcode">Pincode</label>
        <input
          id="pcode"
          placeholder="6 digits [0-9] PIN code"
          ref={pcode}
          required
        />
        <label htmlFor="flat">
          Flat, House no., Building, Company, Apartment
        </label>
        <input id="flat" ref={flat} required />
        <label htmlFor="area">Area, Street, Sector, Village</label>
        <input id="area" ref={area} required />
        <label htmlFor="landmark">Landmark</label>
        <input
          id="landmark"
          placeholder="E.g. near apollo hospital"
          ref={landmark}
        />
        <label htmlFor="town">Town/City</label>
        <input id="town" ref={town} required />
        {country && (
          <>
            <label htmlFor="state">State</label>
            <select id="state" required ref={state}>
              <option>State</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}
        <button type="submit" className={styles.submitBtn}>
          Add address
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
