import { useEffect, useState } from "react";
import { Button_v_2, Button_v_3 } from "./Buttons";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";

const User = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [userSearchResult, setUserSearchResult] = useState([]);

  // console.log(data);

  // console.log(friendRequestList);

  //get user List from users collection start
  useEffect(() => {
    const userRef = ref(db, "users");

    onValue(userRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          list.push({ ...item.val(), id: item.key });
        }

        // list.push(item.val());
      });
      setUserList(list);
    });
  }, []);
  //get user List from users collection end

  //friend request send start
  const handleFriendRequestSend = (item) => {
    set(push(ref(db, "friendRequest")), {
      senderId: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      receiverId: item.id,
      receiverName: item.username,
      receiverEmail: item.email,
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let request = [];
      snapshot.forEach((item) => {
        request.push(item.val().senderId + item.val().receiverId);
      });
      setFriendRequestList(request);
    });
  }, []);
  //friend request send end

  //   console.log(userList);

  // get friends list from firebase start

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        list.push(item.val().senderId + item.val().receiverId);
      });
      setFriendsList(list);
    });
  }, []);

  // get friends list from firebase end
  // console.log(friendsList);

  // const handleFriendRequestCancel = (item) => {
  //   remove(ref(db, "friendRequest/" + item.id)).then(() => {
  //     console.log("success");
  //   });
  // };

  //get block user from firebase start

  useEffect(() => {
    const blockRef = ref(db, "blockUser");
    onValue(blockRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        list.push(item.val().blockById + item.val().blockedId);
      });
      setBlockList(list);
    });
  }, []);

  //get block user from firebase end

  //handle user search result start
  const handleUserSearchResult = (e) => {
    let list = [];
    userList.filter((item) => {
      if (
        item.username.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      ) {
        list.push(item);
      }
    });
    setUserSearchResult(list);
  };
  //handle user search result end

  return (
    <div className="">
      <div>
        <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg">
          <h1 className="text-2xl font-bold text-color_dark uppercase text-center ">
            Users List
          </h1>
        </div>
        <div className="w-full pt-3 pb-3 ">
          <div>
            <input
              onChange={handleUserSearchResult}
              type="text"
              placeholder="Search here"
              className="w-full py-2 rounded-lg outline-none pl-3 focus:border focus:border-orange-500 bg-[#ddd]/20 text-color_white"
            />
          </div>
        </div>
        <div className="px-2 pt-3  overflow-y-auto h-[550px]">
          {userSearchResult.length > 0
            ? //user search results start
              userSearchResult.map((item, i) => {
                // console.log(item);
                return (
                  <div key={i} className="single_user">
                    <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                      <div className="flex gap-2 items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-color_secondary">
                          <ProfilePicture imgId={item.id} />
                          {/* <img src={item.profile_picture} alt="" /> */}
                        </div>
                        <div>
                          <h4 className="text-base Capitalize font-bold">
                            {item.username}
                          </h4>
                          <span className="text-sm">{item.email}</span>
                        </div>
                      </div>
                      <div>
                        {friendsList.includes(item.id + data.uid) ||
                        friendsList.includes(data.uid + item.id) ? (
                          <div>
                            <Button_v_2>Friends</Button_v_2>
                          </div>
                        ) : friendRequestList.includes(data.uid + item.id) ||
                          friendRequestList.includes(item.id + data.uid) ? (
                          <div className="flex ">
                            <div className="mb-2">
                              <Button_v_3>Pending..</Button_v_3>
                            </div>
                            {/* <div onClick={() => handleFriendRequestCancel(item)}>
                            <Button_v_2>Cancel</Button_v_2>
                          </div> */}
                          </div>
                        ) : blockList.includes(data.uid + item.id) ||
                          blockList.includes(item.id + data.uid) ? (
                          <div>
                            <Button_v_2>Blocked</Button_v_2>
                          </div>
                        ) : (
                          <div onClick={() => handleFriendRequestSend(item)}>
                            <Button_v_2>Add Friend</Button_v_2>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {console.log(item)} */}
                  </div>
                );
              })
            : //user search results end
              userList.map((item, i) => {
                // console.log(item);
                return (
                  <div key={i} className="single_user">
                    <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                      <div className="flex gap-2 items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-color_secondary">
                          <ProfilePicture imgId={item.id} />
                          {/* <img src={item.profile_picture} alt="" /> */}
                        </div>
                        <div>
                          <h4 className="text-base Capitalize font-bold">
                            {item.username}
                          </h4>
                          <span className="text-sm">{item.email}</span>
                        </div>
                      </div>
                      <div>
                        {friendsList.includes(item.id + data.uid) ||
                        friendsList.includes(data.uid + item.id) ? (
                          <div>
                            <Button_v_2>Friends</Button_v_2>
                          </div>
                        ) : friendRequestList.includes(data.uid + item.id) ||
                          friendRequestList.includes(item.id + data.uid) ? (
                          <div className="flex ">
                            <div className="mb-2">
                              <Button_v_3>Pending..</Button_v_3>
                            </div>
                            {/* <div onClick={() => handleFriendRequestCancel(item)}>
                            <Button_v_2>Cancel</Button_v_2>
                          </div> */}
                          </div>
                        ) : blockList.includes(data.uid + item.id) ||
                          blockList.includes(item.id + data.uid) ? (
                          <div>
                            <Button_v_2>Blocked</Button_v_2>
                          </div>
                        ) : (
                          <div onClick={() => handleFriendRequestSend(item)}>
                            <Button_v_2>Add Friend</Button_v_2>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {console.log(item)} */}
                  </div>
                );
              })}

          {/* ........................ */}

          {/* ........................ */}
        </div>
      </div>
    </div>
  );
};

export default User;
