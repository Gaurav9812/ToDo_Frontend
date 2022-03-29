// import { useState } from "react";
import { useFormInputs } from "../utils";
import styles from "../styles/signup.module.css";
import { useAuth } from "../hooks/index";
import { Navigate, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function Signup() {
  const { addToast } = useToasts();
  const auth = useAuth();
  const navigate = useNavigate();
  const username = useFormInputs("");
  const password = useFormInputs("");
  const email = useFormInputs("");
  const phone = useFormInputs("");
  const sQuestion = useFormInputs("");
  const sAnswer = useFormInputs("");
  const regEXPhone = /(0|91)?[7-9][0-9]{9}/;
  const regEXEmail = /[A-Za-z0-9]+@gmail\.com/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regEXPhone.test(phone.value)) {
      return addToast("invalid Phone number", {
        appearance: "error",
      });
    }
    if (!regEXEmail.test(email.value)) {
      return addToast("invalid Email", {
        appearance: "error",
      });
    }

    let body = {
      username: username.value,
      password: password.value,
      email: email.value,
      phone: phone.value,
      sQuestion: sQuestion.value,
      sAnswer: sAnswer.value,
    };
    async function call() {
      let response = await auth.signup(body);
      if (response.success) {
        navigate("/login");
      }
    }
    call();
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.signup}>
      <h1>Signup Form</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          maxLength={10}
          className={styles.fields}
          required
          {...username}
        />
        <input
          type="password"
          placeholder="Password"
          maxLength={20}
          className={styles.fields}
          required
          {...password}
        />
        <input
          type="email"
          placeholder="Email"
          maxLength={50}
          className={styles.fields}
          required
          {...email}
        />
        <input
          type="number"
          placeholder="Phonenumber"
          maxLength={11}
          className={styles.fields}
          required
          {...phone}
        />
        <select className={styles.fields} required {...sQuestion}>
          <option value="" disabled selected>
            Choose one Security Question{" "}
          </option>
          <option>What is your favourite Sports</option>
          <option>What is your favourite movie</option>
          <option>What is your favourite youtuber</option>
          <option>What is your favourite subject</option>
          <option>What is your favourite location to visit</option>
        </select>
        <textarea
          placeholder="Security Question Answer"
          maxLength={255}
          className={styles.fields}
          required
          {...sAnswer}
        />
        <input type="submit" value="Register" className={styles.btn} />
      </form>
    </div>
  );
}
export default Signup;
