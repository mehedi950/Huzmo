import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../../reducer/userSlice/userSlice";
import { useEffect } from "react";
import Home from "../home/Home";

const Logout = () => {
  //dont have permission to enter without user start

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });
  //dont have permission to enter without user end

  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  //logout the user start
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        toast.success("Logout successful");
        dispatch(userLoginInfo(null));
        localStorage.removeItem("user");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  //logout the user end

  return (
    <div className="relative pt-0 mt-0">
      <div className="absolute to-1/2 left-1/2 flex justify-center items-center">
        <div className=" bg-color_white p-20 inline-block rounded-lg -translate-x-1/2 translate-y-full text-color_dark z-50 border">
          <div>
            <h1 className="text-2xl font-medium ">
              Sure do you want to logout?
            </h1>
          </div>
          <div className="flex justify-around pt-6">
            <button
              onClick={() => navigate("/home")}
              className="py-1 px-6 border border-gray-300 rounded-md hover:bg-gray-600 hover:text-white hover:duration-300"
            >
              No
            </button>
            <button
              onClick={handleLogout}
              className="py-1 px-6 border border-gray-300 rounded-md hover:bg-gray-600 hover:text-white hover:duration-300"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <Home />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black opacity-40 text-white m-0 w-full h-full z-40"></div>
    </div>
  );
};

export default Logout;
