import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { useAuth } from "../hooks";
import { Home, Login, Signup, Task, CreateTask } from "../pages";
import Navbar from "./navbar";

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }

//         return <Redirect to="/login" />;
//       }}
//     />
//   );
// }

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  // const auth = useAuth();

  // console.log("auth", auth);
  // if (auth.loading) {
  //   return <Loader />;
  // }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Signup />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/task/:taskId" element={<Task />} />

          {/* <PrivateRoute  path="/settings">
            <Settings />
          </PrivateRoute>

          <PrivateRoute  path="/user/:userId">
            <UserProfile />
          </PrivateRoute> */}

          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
