import { useFormInputs } from "../utils";
import styles from "../styles/signup.module.css";
import { useAuth } from "../hooks";
import { useNavigate, Navigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
function Signin() {
  const { addToast } = useToasts();
  const auth = useAuth();
  const navigate = useNavigate();
  const username = useFormInputs("");
  const password = useFormInputs("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    let body = {
      username: username.value,
      password: password.value,
    };
    async function get() {
      setLoading(true);
      let response = await auth.login(body);
      if (response.success) {
        addToast("successfully signed in", {
          appearance: "success",
        });
        navigate("/");
      } else {
        addToast("wrong username or password", {
          appearance: "error",
        });
      }
      console.log(loading);
      setLoading(false);
    }
    get();
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.signup}>
      <h1>signin </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.fields}
          type="text"
          placeholder="Username"
          maxLength={10}
          required
          {...username}
        />
        <input
          className={styles.fields}
          type="password"
          placeholder="password"
          maxLength={20}
          required
          {...password}
        />
        <input
          type="submit"
          value={loading ? "logging in" : "login"}
          className={styles.btn}
          disabled={loading}
        />
      </form>
    </div>
  );
}
export default Signin;
