import React from "react";
import Navbar from "../../components/Navbar";
import BlockUser from "./BlockUser";

const Block = () => {
  return (
    <div className="grid gap-3 grid-cols-3 bg-color_dark/95">
      <Navbar />
      <div className=" ">
        <BlockUser />
      </div>
    </div>
  );
};

export default Block;
