/** @format */
// import { BrowserRouter as Router } from "react-router-dom";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import "./App.css";
import AppRouter from "./Router";
import { useContext, useEffect } from "react";
import { auth } from "./Utility/firebase";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        // console.log(authuser);
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return <AppRouter />;
}

export default App;
