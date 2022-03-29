import { useState } from "react";
import styles from "../styles/createTask.module.css";
import { useFormInputs } from "../utils/index";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
function CreateTask() {
  const navigate = useNavigate();
  const title = useFormInputs("");
  const description = useFormInputs("");
  const startDate = useFormInputs("");
  const endDate = useFormInputs("");
  const [status, setStatus] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  const handleSumbit = (e) => {
    e.preventDefault();

    if (intoTime(endDate.value) < intoTime(startDate.value)) {
      return addToast("end date has to be greater than start date", {
        appearance: "error",
      });
    }
    async function call() {
      let body = {
        title: title.value,
        description: description.value,
        startDate: startDate.value,
        endDate: endDate.value,
        status: status,
      };
      let response = await auth.createTask(body);
      if (response.success) {
        addToast("Added successfully", {
          appearance: "success",
        });
        navigate("/");
      } else {
        addToast(response.message, {
          appearance: "error",
        });
      }
    }
    call();
  };

  const intoTime = (date) => new Date(date).getTime();
  const changeStatus = (e) => {
    e.preventDefault();
    setStatus(!status);
  };
  return (
    <div id={styles.outerContainer}>
      <h1>Add Task</h1>
      <form>
        <div className={styles.labFiel}>
          <label>Title</label>
          <input type="text" maxLength={20} {...title} required />
        </div>
        <div className={styles.labFiel}>
          {" "}
          <label>Description</label>
          <textarea maxLength={255} {...description} required />
        </div>
        <div className={styles.labFiel}>
          <label>Statues</label>{" "}
          <button id={styles.btn} onClick={changeStatus}>
            {status ? "Done" : "not done"}
          </button>
        </div>
        <div className={styles.labFiel}>
          <label>Started At</label>
          <input type="date" {...startDate} required />
        </div>
        <div className={styles.labFiel}>
          <label>Finshed At</label>
          <input type="date" {...endDate} required />
        </div>

        <input
          type="submit"
          value="ADD TASK"
          id="submit"
          onClick={handleSumbit}
        />
      </form>
    </div>
  );
}
export default CreateTask;
