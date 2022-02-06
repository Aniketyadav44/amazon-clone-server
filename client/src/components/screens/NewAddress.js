import React, { useRef } from "react";
import styles from "./EditAddresses.module.css";

const NewAddress = () => {
  const name = useRef();
  const country = useRef();
  const phone = useRef();
  const pcode = useRef();
  const flat = useRef();
  const area = useRef();
  const landmark = useRef();
  const town = useRef();
  const state = useRef();

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
    console.log(address);
  };
  return (
    <div className={styles.newadd_div}>
      <h2>Add a new address</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="country">Country/Region</label>
        <input id="country" ref={country} />
        <label htmlFor="name">Full name</label>
        <input id="name" ref={name} />
        <label htmlFor="phone">Mobile number</label>
        <input id="phone" ref={phone} />
        <label htmlFor="pcode">Pincode</label>
        <input id="pcode" placeholder="6 digits [0-9] PIN code" ref={pcode} />
        <label htmlFor="flat">
          Flat, House no., Building, Company, Apartment
        </label>
        <input id="flat" ref={flat} />
        <label htmlFor="area">Area, Street, Sector, Village</label>
        <input id="area" ref={area} />
        <label htmlFor="landmark">Landmark</label>
        <input
          id="landmark"
          placeholder="E.g. near apollo hospital"
          ref={landmark}
        />
        <label htmlFor="town">Town/City</label>
        <input id="town" ref={town} />
        <label htmlFor="state">State</label>
        <input id="state" ref={state} />
        <button type="submit" className={styles.submitBtn}>
          Add address
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
