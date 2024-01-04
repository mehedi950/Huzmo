import { FaImages } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
import React from "react";

const Message = () => {
  return (
    <div className="">
      <div className="bg-color_dark mx-3 border-2 rounded-lg h-screen overflow-y-auto relative">
        {/* top section start  */}
        <div className="bg-color_dark py-1 border-b-2 border-b-color_light pl-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div>
                <div className="w-14 h-14 rounded-full overflow-hidden bg-color_secondary"></div>
              </div>
              <div>
                <span className="block text-color_white">Display Name</span>
                <span className="block text-color_white text-sm text-color_white/40">
                  Active 2 hours ago
                </span>
              </div>
            </div>
            <div className="text-color_white capitalize font-medium mr-5 flex cursor-pointer ">
              <span className="pr-1">!</span>
              info
            </div>
          </div>
        </div>
        {/* top section end  */}
        {/* middle section start  */}
        <div className="px-2 overflow-y-auto h-[80vh]">
          <div>
            {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */} {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */} {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */} {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */} {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */} {/* receiver message start  */}
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer text-color_white/50">
                  2 hours ago
                </div>
              </div>
            </div>
            {/* receiver message end  */}
            {/* sender message start  */}
            <div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs text-color_white/50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer text-color_white/50">
                  Seen at 12:46
                </div>
              </div>
            </div>
            {/* sender message end */}
          </div>
        </div>
        {/* middle section end  */}
        {/* bottom section start  */}
        <div className="bg-color_dark w-full py-1 border-t-2 border-t-color_light pl-2 absolute bottom-0 left-0 ">
          <div className="flex justify-between px-2 py-1 text-color_white items-center">
            <div className="flex gap-4  items-center">
              <div className="text-color_white text-2xl cursor-pointer">
                <FaImages />
              </div>
              <div className="text-color_white text-2xl cursor-pointer">
                <MdKeyboardVoice />
              </div>
              <div className="text-color_white text-2xl cursor-pointer">
                <BsFillEmojiSmileFill />
              </div>
            </div>
            <div className="w-[350px]">
              <input
                type="text"
                placeholder="Message"
                className="input input-bordered input-info w-full  text-color_dark"
              />
            </div>
            <div className="flex gap-2 items-center ">
              <div>
                <button className="btn btn-square text-2xl">
                  <BsFillSendFill />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* bottom section end  */}
      </div>
    </div>
  );
};

export default Message;
