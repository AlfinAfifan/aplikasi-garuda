import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const authCheck = () => {
    // CEK EXPIRE
    const currentTime = new Date().getTime();
    const loginTime = sessionStorage.getItem("login_time");
    const expire = parseInt(loginTime, 10) + 24 * 60 * 60 * 1000;

    if (currentTime > expire) {
      sessionStorage.removeItem("user");
    }

    const getUser = JSON.parse(sessionStorage.getItem("user"));
    const allowedUserIDs = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 23,
    ];
    if (getUser.access_token) {
      try {
        const userData = jwtDecode(getUser.access_token);
        if (allowedUserIDs.includes(userData.userid)) {
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
    return false;
  };

  if (authCheck()) {
    return children;
  } else {
    window.location.href = "/";
  }
};

export default PrivateRoute;
