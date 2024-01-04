import React, { useEffect, useState } from "react";
import Friend from "../../components/Friend";
import FriendRequest from "../../components/FriendRequest";
import Navbar from "../../components/Navbar";

const Friends = () => {
  return (
    <div className="grid gap-3 grid-cols-3 bg-color_dark/95">
      <Navbar />
      <div className=" ">
        <Friend />
      </div>
      <div>
        <FriendRequest />
      </div>
    </div>
  );
};

export default Friends;
