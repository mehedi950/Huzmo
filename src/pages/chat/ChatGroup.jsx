import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

const ChatGroup = () => {
  const db = getDatabase();
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        list.push({ ...item.val(), id: item.key });
      });
      setGroupsList(list);
    });
  }, []);
  // console.log(groupsList);

  return (
    <div>
      {groupsList.map((item, i) => {
        return (
          <div key={i}>
            <div className="border-b border-color_white/40 flex gap-2 py-1 pl-1 cursor-pointer ">
              <div className=" rounded-full overflow-hidden bg-color_secondary">
                <div className="flex">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary z-30">
                      {item.groupName[2]}
                    </span>

                    {/* <ProfilePicture
                                imgId={
                                  data.uid === item.blockById
                                    ? item.blockedId
                                    : item.blockById
                                }
                              /> */}
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {item?.groupName[1]}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {item?.groupName[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-color_white font-medium text-base">
                  {item.groupName}
                </span>
                <span className="block text-color_white/60 text-sm ">
                  {item.groupAbout}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatGroup;
