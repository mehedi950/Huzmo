import React from "react";
import Navbar from "../../components/Navbar";
import Group from "../../components/Group";
import OwnGroup from "../../components/OwnGroup";

const Groups = () => {
  return (
    <div className="flex gap-3 bg-color_dark/95">
      <Navbar />

      <div className=" w-full grid grid-cols-3">
        <div className="">
          <Group />
        </div>
        <div className=" ml-3">
          <OwnGroup />
        </div>
        {/* <div className="bg-orange-500 ml-3">dklsdf</div>  */}
      </div>
    </div>
  );
};

export default Groups;
