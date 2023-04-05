import React from "react";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
export default function (props) {
  const [dataForm, setDataForm] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", user)
      .then((response) => setDataForm(response.data))
      .catch((err) => console.log(err));
  };
  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <div className="FormContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          İsim Soyisim:
          <input
            id="name"
            name="name"
            value={user.name}
            type="text"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            name="email"
            value={user.email}
            type="email"
            onChange={handleChange}
          ></input>
        </label>
        <label htmlFor="password">
          Şifre:
          <input
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="terms">
          <input
            id="terms"
            name="terms"
            value={user.terms}
            type="checkbox"
            onChange={handleChange}
          ></input>
          Kullanım koşullarını kabul ediyorum.
        </label>
      </form>
      <button>GÖNDER</button>
    </div>
  );
}
