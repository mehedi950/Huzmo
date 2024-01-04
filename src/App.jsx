import "./App.css";
import firebase from "../src/firebase.config";

import Registration from "./pages/registration/Registration";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/registration/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Logout from "./pages/logout/Logout";
import Users from "./pages/users/Users";
import Friends from "./pages/friends/Friends";
import Block from "./pages/blockUser/Block";
import Groups from "./pages/groups/Groups";
import ChatMain from "./pages/chat/ChatMain";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/block" element={<Block />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
