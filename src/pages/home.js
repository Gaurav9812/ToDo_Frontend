import { useAuth } from "../hooks/index";
import { Link, Navigate } from "react-router-dom";
import styles from "../styles/home.module.css";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
function Home() {
  const auth = useAuth();
  const { addToast } = useToasts();
  let tasks;
  const [tasksToDis, setTaskToD] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  let perPage = 3;
  if (auth.user) console.log(tasksToDis.length, auth.user.tasks.length);
  if (auth.user && tasksToDis.length != auth.user.tasks.length) {
    console.log("not equal length");
    tasks = auth.user.tasks;
    setTaskToD(tasks.slice(0, perPage));
    setTotalPage(Math.ceil(tasks.length / perPage));
  }

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it!")) {
      let response = await auth.deleteTask(id);
      if (response.success) {
        addToast("seccessfully deleted task", {
          appearance: "success",
        });
      } else {
        addToast(response.message, {
          appearance: "failure",
        });
      }
    }
  };
  const handleNextClick = () => {
    if (page < totalPage - 1) {
      let pages = page + 1;
      setPage(pages);

      setTaskToD(
        auth.user.tasks.slice(pages * perPage, pages * perPage + perPage)
      );
    }
  };
  const handlePreviousClick = () => {
    if (page > 0) {
      let pages = page - 1;
      setPage(pages);

      setTaskToD(
        auth.user.tasks.slice(pages * perPage, pages * perPage + perPage)
      );
    }
  };
  return (
    <div id={styles.outerContainer}>
      <Link to="/create-task" className={styles.btn}>
        Create Task
      </Link>
      <div id={styles.tableContainer}>
        <h1>Task List</h1>
        {tasksToDis.length != 0 ? (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Started at </th>
                  <th>Finished at</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasksToDis.map((task) => {
                  return (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.startedAt.substring(0, 10)}</td>
                      <td>{task.finishedAt.substring(0, 10)}</td>
                      <td>{task.status ? "Done" : "Not done"}</td>
                      <td>
                        <button>
                          <Link to={`/task/${task._id}`}>EDIT</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(task._id);
                          }}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <button
                onClick={handlePreviousClick}
                disabled={page === 0 ? true : false}
              >
                {page === 0 ? "First Page" : "prev"}
              </button>
              <button
                onClick={handleNextClick}
                disabled={page === totalPage - 1 ? true : false}
              >
                {page === totalPage - 1 ? "Last Page" : "Next"}
              </button>
            </div>
          </>
        ) : (
          "NO TASKS TRY ADDING SOME TASKS"
        )}
      </div>
    </div>
  );
}
export default Home;
