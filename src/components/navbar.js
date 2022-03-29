import { render } from "react-dom";
import { Link, Navigate } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { useAuth } from "../hooks/index";

function Navbar() {
  const auth = useAuth();
  const handleClick = () => {
    auth.logout();
    return <Navigate to="/login" />;
  };
  return (
    <div className={styles.nav}>
      <span>
        <Link to="/login" className={styles.link}>
          Todo App
        </Link>
      </span>
      <span>
        {!auth.user && (
          <Link to="/register" className={styles.link}>
            signup
          </Link>
        )}
        {!auth.user && (
          <Link to="/login" className={styles.link}>
            login
          </Link>
        )}
        {auth.user && (
          <span className={styles.link} onClick={handleClick}>
            {" "}
            Logout
          </span>
        )}
      </span>
    </div>
  );
}
export default Navbar;
