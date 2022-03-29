// import { useState } from "react";
import { useFormInputs } from "../utils";
import styles from "../styles/signup.module.css";
import { useAuth } from "../hooks/index";
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const username = useFormInputs("");
  const password = useFormInputs("");
  const email = useFormInputs("");
  const phone = useFormInputs("");
  const sQuestion = useFormInputs("");
  const sAnswer = useFormInputs("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          maxLength={10}
          className={styles.fields}
          {...username}
          required
        />
        <input
          type="password"
          placeholder="Password"
          maxLength={20}
          className={styles.fields}
          {...password}
          required
        />
        <input
          type="email"
          placeholder="Email"
          maxLength={50}
          className={styles.fields}
          {...email}
          required
        />
        <input
          type="number"
          placeholder="Phonenumber"
          maxLength={11}
          className={styles.fields}
          {...phone}
          required
        />
        <select className={styles.fields} {...sQuestion} required>
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
          {...sAnswer}
          required
        />
        <input
          type="submit"
          value="Register"
          className={styles.btn}
          onClick={handleSubmit}
          required
        />
      </form>
    </div>
  );
}
export default Signup;
