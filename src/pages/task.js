import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/createTask.module.css";

export function useFormInput(initialvalue) {
  const [value, setValue] = useState(initialvalue);
  function Change(e) {
    setValue(e.trim());
  }
  return {
    value,
    Change: Change,
  };
}
function Task() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { taskId } = useParams();
  const [task, setTask] = useState("");
  const title = useFormInput("");
  const [description, setDescription] = useState("");
  const startDate = useFormInput("");
  const endDate = useFormInput("");
  const [status, setStatus] = useState(false);
  let [boolea, setB] = useState(true);
  useEffect(() => {
    console.log("here", auth.user);
    if (auth.user) {
      auth.user.tasks.forEach((task) => {
        if (task._id == taskId) {
          setTask(task);
        }
      });
    }
  }, [auth, taskId]);
  if (!auth.user) {
    console.log("here");
    return <Navigate to="/login" />;
  }
  if (task && boolea) {
    title.Change(task.title);
    setDescription(task.description);
    setStatus(task.status);
    startDate.Change(task.startedAt);
    endDate.Change(task.finishedAt);
    setB(false);
  }
  const handleClick = (e) => {
    e.preventDefault();
    setStatus(!status);
  };
  const onChangeDes = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    async function call() {
      let body = {
        title: title.value,
        description: description.trim(),
        startDate: startDate.value,
        endDate: endDate.value,
        status: status,
      };
      console.log(body, taskId);
      let response = await auth.editTask(body, taskId);
      if (response.success) {
        console.log("here");
        return navigate("/");
      }
    }
    call();
  };
  return (
    <div id={styles.outerContainer}>
      <h1>EDIT Task</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.labFiel}>
          <label>Title</label>
          <input
            type="text"
            maxLength={20}
            required
            value={title.value}
            onChange={(e) => title.Change(e.target.value)}
          />
        </div>
        <div className={styles.labFiel}>
          {" "}
          <label>Description</label>
          <textarea
            maxLength={255}
            required
            value={description}
            onChange={onChangeDes}
          />
        </div>
        <div className={styles.labFiel}>
          <label>Statues</label>{" "}
          <button id={styles.btn} onClick={handleClick}>
            {status ? "Done" : "not done"}
          </button>
        </div>
        <div className={styles.labFiel}>
          <label>Started At</label>
          <input
            type="date"
            required
            value={startDate.value.substring(0, 10)}
            onChange={(e) => startDate.Change(e.target.value)}
          />
        </div>
        <div className={styles.labFiel}>
          <label>Finshed At</label>
          <input
            type="date"
            required
            value={endDate.value.substring(0, 10)}
            onChange={(e) => endDate.Change(e.target.value)}
          />
        </div>

        <input type="submit" value="EDIT TASK" id="submit" />
      </form>
    </div>
  );
}
export default Task;
