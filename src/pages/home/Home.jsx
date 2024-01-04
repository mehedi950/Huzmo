import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  });

  return (
    <div className="flex gap-6 bg-color_dark/95">
      <Navbar />
      <div>This is Home Component</div>
    </div>
  );
};

export default Home;
