import React from "react";
import Navbar from "../../components/Navbar";
import User from "../../components/User";

const Users = () => {
  return (
    <div className="grid gap-3 grid-cols-3 bg-color_dark/95">
      <Navbar />
      <div className=" ">
        <User />
      </div>
    </div>
  );
};

export default Users;
