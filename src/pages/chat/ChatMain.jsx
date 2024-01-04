import React from "react";
import Navbar from "../../components/Navbar";
import ChatFriend from "./ChatFriend";
import ChatGroup from "./ChatGroup";
import Message from "./Message";

const ChatMain = () => {
  return (
    <div className="bg-color_dark/95">
      <div className="flex gap-2">
        <Navbar />
        <div className="flex gap-2">
          <div className="">
            <div className="bg-color_dark border-b-orange-500   py-2 border border-color_light rounded-lg mt-1 h-[310px] overflow-hidden">
              <h1 className="text-orange-500 font-bold text-xl w-64 pl-2 pb-2 border-b border-color_white/40 ">
                Friends
              </h1>

              <div className="h-[263px] overflow-x-auto">
                <ChatFriend />
              </div>
            </div>
            <div className="bg-color_dark  py-2 border border-color_light rounded-lg mt-1 h-[310px] overflow-hidden">
              <h1 className="text-orange-500 font-bold text-xl w-64 pl-2 pb-2 border-b border-color_white/40 ">
                Groups
              </h1>

              <div className="h-[263px] overflow-x-auto">
                <ChatGroup />
              </div>
            </div>
          </div>
        </div>
        {/* message section start */}
        <div className="w-full block">
          <Message />
        </div>
        {/* message section end */}
      </div>
    </div>
  );
};

export default ChatMain;
