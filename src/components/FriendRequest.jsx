import React, { useEffect, useState } from "react";
import { Button_v_2, Button_v_3 } from "./Buttons";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendRequestList, setFriendRequestList] = useState([]);

  // console.log(data);

  // console.log(friendRequestList);

  //get friend request list from firebase  start
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (item?.val().receiverId === data?.uid) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestList(list);
    });
  }, []);

  //get friend request list from firebase  end

  //Accept friends request  in firebase start

  const handleAcceptFriendRequest = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.id));
    });
  };
  //Accept friends request  in firebase end

  //Cancel friend request in firebase start

  const handleCancelFriendRequest = (item) => {
    remove(ref(db, "friendRequest/" + item.id)).then(() => {
      console.log("success");
    });
  };

  //Cancel friend request in firebase end

  // console.log(friendRequestList);

  return (
    <div>
      <div className="pr-3">
        <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg ">
          <h1 className="text-2xl font-bold text-color_dark Capitalize text-center ">
            Friend Request List
          </h1>
        </div>
        <div className="px-2 pt-3  overflow-y-auto h-[550px]">
          {friendRequestList.map((item) => {
            return (
              <div key={item?.id} className="single_user">
                <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-color_secondary">
                      <ProfilePicture imgId={item?.senderId} />
                      {/* <img src={item.profile_picture} alt="" /> */}
                    </div>
                    <div>
                      <h4 className="text-base Capitalize font-bold">
                        {item.senderName}
                      </h4>
                      <span className="text-sm">{item.senderEmail}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex ">
                      <div
                        onClick={() => handleCancelFriendRequest(item)}
                        className="mb-2"
                      >
                        <Button_v_3>Cancel</Button_v_3>
                      </div>
                      <div onClick={() => handleAcceptFriendRequest(item)}>
                        <Button_v_2>Accept</Button_v_2>
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
    </div>
  );
};

export default FriendRequest;
