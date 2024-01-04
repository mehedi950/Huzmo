import React, { useEffect, useState } from "react";
import { Button_v_2 } from "../../components/Buttons";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "../../components/ProfilePicture";

const BlockUser = () => {
  const [blockList, setBlockList] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  //get block user from firebase start

  useEffect(() => {
    const blockRef = ref(db, "blockUser");
    onValue(blockRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          data.uid === item.val().blockedId ||
          data.uid === item.val().blockById
        ) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setBlockList(list);
    });
  }, []);

  //get block user from firebase end

  //unblock user from firebase start

  const handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      id: item.id,
      receiverId: item.blockedId,
      receiverName: item.blockedName,
      receiverEmail: item.blockedEmail,
      senderId: item.blockById,
      senderName: item.blockByName,
      senderEmail: item.blockByEmail,
    }).then(() => {
      remove(ref(db, "blockUser/" + item.id));
    });
  };

  //unblock user from firebase end

  return (
    <div>
      <div>
        <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg">
          <h1 className="text-2xl font-bold text-color_dark uppercase text-center ">
            Block List
          </h1>
        </div>
        <div className="px-2 pt-3  overflow-y-auto h-[550px]">
          {blockList.map((item, i) => {
            return (
              <div key={i} className="single_user">
                <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-color_secondary">
                      <ProfilePicture
                        imgId={
                          data.uid === item.blockById
                            ? item.blockedId
                            : item.blockById
                        }
                      />
                    </div>
                    <div>
                      <h4 className="text-base Capitalize font-bold">
                        {data.uid === item.blockById
                          ? item.blockedName
                          : item.blockByName}
                      </h4>
                      <span className="text-sm">
                        {data.uid === item.blockById
                          ? item.blockedEmail
                          : item.blockByEmail}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex ">
                      {data.uid === item.blockById ? (
                        <div onClick={() => handleUnblock(item)}>
                          <Button_v_2>Unblock</Button_v_2>
                        </div>
                      ) : (
                        <div>
                          <Button_v_2>Blocked</Button_v_2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
