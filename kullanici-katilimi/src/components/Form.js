import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import KayitliKullanici from "./KayitliKullanici";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "İsim 5 karakterden fazla olmalı.")
    .required("İsim girmek zorunludur"),
  surname: yup
    .string()
    .min(5, "Soyisim 5 karakterden fazla olmalı")
    .required("Soyisim girmek zorunludur"),
  email: yup
    .string()
    .email()
    .required("Mail girmek zorunludur")
    .notOneOf(["waffle@syrup.com"], "Bu e-posta daha önce eklenmiş."),
  password: yup
    .string()
    .min(6, "Şifre 6 karakterden uzun olmalı.")
    .required("Şifre gerekli"),
  terms: yup.mixed().oneOf([true], "Hizmet şartlarını kabul etmelisiniz"),
});

export default function Form() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: false,
  });

  const [kayitliKullanici, setkayitliKullanici] = useState([]);
  const [buttonDisabledMi, setButtonDisabledMi] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    terms: "",
  });
  const handleReset = () => {
    setUser({
      name: "",
      surname: "",
      email: "",
      password: "",
      terms: "",
    });
    setErrors({
      name: "",
      surname: "",
      email: "",
      password: "",
      terms: "",
    });
  };
  const checkFormErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    let newValue = type === "checkbox" ? checked : value;
    setUser({ ...user, [name]: newValue });
    checkFormErrors(name, newValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", user)
      .then((response) =>
        setkayitliKullanici([...kayitliKullanici, response.data])
      )
      .catch((error) => console.log("Error!", error));
  }

  useEffect(() => {
    formSchema.isValid(user).then((response) => setButtonDisabledMi(!response));
  }, [user]);

  return (
    <div className="FormContainer">
      <form onSubmit={handleSubmit} buttonDisabledMi={buttonDisabledMi}>
        <label>
          İsim:
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />
          {errors.name !== "" && (
            <div className="field-error">{errors.name}</div>
          )}
        </label>
        <label>
          Soyisim:
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={user.surname}
            onChange={handleChange}
          />
          {errors.surname !== "" && (
            <div className="field-error">{errors.surname}</div>
          )}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email !== "" && (
            <div className="field-error">{errors.email}</div>
          )}
        </label>
        <label>
          Şifre:
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password !== "" && (
            <div className="field-error">{errors.password}</div>
          )}
        </label>
        <label>
          <input
            type="checkbox"
            name="terms"
            value={user.terms}
            onChange={handleChange}
            checked={user.terms}
            class="larger"
          />
          Kabul şartlarını kabul ediyorum.
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={buttonDisabledMi}
        >
          GÖNDER
        </button>
        <button type="reset" onClick={handleReset}>
          Temizle
        </button>
      </form>
      <KayitliKullanici kayitliKullanici={kayitliKullanici} />
    </div>
  );
}
