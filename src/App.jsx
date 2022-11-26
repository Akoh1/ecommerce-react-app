import "./App.css";
// import "./assets/css/admin.css";
import Body from "@/components/Body";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCRSFToken, setAuth } from "@/store/slice/AuthStore";
import axios from "axios";

function App() {
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Cookies: ", document.cookie);
    const userData = localStorage.getItem("userData");
    dispatch(setCRSFToken(cookies.csrftoken));
    if (userData) {
      console.log("There is user data: ", userData.email);
      dispatch(setAuth());
    }
  }, [cookies]);

  return (
    <div className="App">
      {/* <Header /> */}
      <Body />
    </div>
  );
}

export default App;
