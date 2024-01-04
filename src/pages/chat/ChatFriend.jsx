import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "../../components/ProfilePicture";

const ChatFriend = () => {
  const db = getDatabase();
  const [friendsList, setFriendsList] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          data.uid === item.val().receiverId ||
          data.uid === item.val().senderId
        ) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setFriendsList(list);
    });
  }, []);

  console.log(friendsList);

  return (
    <div className="">
      {friendsList.map((item, i) => {
        return (
          <div key={i}>
            <div className="border-b border-color_white/40 flex gap-2 py-1 pl-1 cursor-pointer ">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary">
                <ProfilePicture
                  imgId={
                    item?.senderId === data?.uid
                      ? item.receiverId
                      : item.senderId
                  }
                />
              </div>
              <div>
                <span className="block text-color_white font-medium text-base">
                  {data?.uid === item?.senderId
                    ? item?.receiverName
                    : item.senderName}
                </span>
                <span className="block text-color_white/60 text-sm ">
                  {data?.uid === item?.senderId
                    ? item?.receiverEmail
                    : item.senderEmail}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatFriend;
