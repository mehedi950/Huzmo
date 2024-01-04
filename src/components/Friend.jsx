import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { Button_v_2, Button_v_3 } from "./Buttons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";
import { FaYenSign } from "react-icons/fa";

const Friend = () => {
  const db = getDatabase();
  const [friendsList, setFriendsList] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // console.log(friendsList);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          item.val().senderId === data?.uid ||
          item.val().receiverId === data?.uid
        ) {
          list.push({ ...item.val(), id: item?.key });
        }
      });
      setFriendsList(list);
    });
  }, []);

  //Unfriend from firebase start

  const handleUnfriend = (item) => {
    remove(ref(db, "friends/" + item.id)).then(() => {
      // console.log("success");
    });
  };
  //Unfriend from firebase end

  //block user start

  const handleBlock = (item) => {
    if (data?.uid === item?.senderId) {
      set(push(ref(db, "blockUser")), {
        blockedId: item.receiverId,
        blockedName: item.receiverName,
        blockedEmail: item.receiverEmail,
        blockById: item.senderId,
        blockByName: item.senderName,
        blockByEmail: item.senderEmail,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else if (data?.uid === item?.receiverId) {
      set(push(ref(db, "blockUser")), {
        blockedId: item.senderId,
        blockedName: item.senderName,
        blockedEmail: item.senderEmail,
        blockById: item.receiverId,
        blockByName: item.receiverName,
        blockByEmail: item.receiverEmail,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };
  //block user end

  return (
    <div>
      <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg">
        <h1 className="text-2xl font-bold text-color_dark uppercase text-center ">
          Friend List
        </h1>
      </div>
      {friendsList.length == 0 ? (
        <div className="text-color_white/70 flex justify-center">
          <span className="font-medium text-lg inline-block mt-40">
            Empty Space
          </span>
        </div>
      ) : (
        <div>
          <div className="text-orange-500"></div>

          <div className="px-2 pt-3  overflow-y-auto h-[550px]">
            {friendsList.map((item) => {
              return (
                <div key={item?.id} className="single_user">
                  <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                    <div className="flex gap-2 items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-color_secondary">
                        <ProfilePicture
                          imgId={
                            item.senderId == data.uid
                              ? item.receiverId
                              : item.senderId
                          }
                        />
                        {/* <img src={item.profile_picture} alt="" /> */}
                      </div>
                      <div>
                        <h4 className="text-base Capitalize font-bold">
                          {item.senderId == data.uid
                            ? item.receiverName
                            : item.senderName}
                        </h4>
                        <span className="text-sm">
                          {item.senderId == data.uid
                            ? item.receiverEmail
                            : item.senderEmail}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex ">
                        <div onClick={() => handleUnfriend(item)}>
                          <Button_v_2>UnFriend</Button_v_2>
                        </div>
                        <div onClick={() => handleBlock(item)}>
                          <Button_v_2>Block</Button_v_2>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {console.log(item)} */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Friend;
