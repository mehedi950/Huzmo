import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button_v_2, Button_v_3 } from "./Buttons";

const Group = () => {
  const [groupsList, setGroupsList] = useState([]);
  const [groupJoinRequistList, setGroupJoinRequistList] = useState([]);
  const [groupMembersList, setGroupMembersList] = useState([]);
  const [groupSearchResult, setGroupSearchResult] = useState([]);
  const db = getDatabase();

  //get data from redux
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  //get groups data from firebase start
  useEffect(() => {
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (item.val().adminId !== data.uid) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupsList(list);
    });
  }, []);
  //get groups data from firebase end

  //create group join request list in firebase start
  const handleGroupJoinRequest = (item) => {
    set(push(ref(db, "groupJoinRequest")), {
      groupId: item.id,
      groupName: item.groupName,
      groupAbout: item.groupAbout,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: data.uid,
      userName: data.displayName,
      userEmail: data.email,
      id: item.id,
    });

    // console.log(item);
  };
  //create group join request list in firebase end

  //get groupJoinRequest from firebase start
  useEffect(() => {
    const groupJoinReqRef = ref(db, "groupJoinRequest");
    onValue(groupJoinReqRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        list.push(item.val().userId + item.val().groupId);
      });
      setGroupJoinRequistList(list);
    });
  }, []);
  //get groupJoinRequest from firebase end

  //get group members list from firebase start
  useEffect(() => {
    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        list.push(item.val().groupId + item.val().userId);
      });
      setGroupMembersList(list);
    });
  }, []);
  //get group members list from firebase end

  //handle group search start
  const handleGroupSearch = (e) => {
    let list = [];
    groupsList.filter((item) => {
      if (
        item.groupName
          .toLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        list.push(item);
      }
    });
    setGroupSearchResult(list);
  };
  //handle group search end
  // console.log(groupSearchResult);

  return (
    <div>
      <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg">
        <h1 className="text-2xl font-bold text-color_dark uppercase text-center ">
          Group List
        </h1>
      </div>

      <div className="w-full pt-3 pb-3 ">
        <div>
          <input
            onChange={handleGroupSearch}
            type="text"
            placeholder="Search here"
            className="w-full py-2 rounded-lg outline-none pl-3 focus:border focus:border-orange-500 bg-[#ddd]/20 text-color_white"
          />
        </div>
      </div>

      <div>
        {groupSearchResult.length > 0
          ? //search group result start
            groupSearchResult.map((item, i) => {
              return (
                <div key={i} className="single_user">
                  <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                    <div className="flex gap-2 items-center">
                      <div className="flex">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                          <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
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
                            {item.groupName[1]}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                          <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                            {item.groupName[0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base Capitalize font-bold">
                          {item.groupName}
                        </h4>
                        <span className="text-sm">{item.groupAbout}</span>
                      </div>
                    </div>
                    <div>
                      {groupJoinRequistList.includes(item.id + data.uid) ||
                      groupJoinRequistList.includes(data.uid + item.id) ? (
                        <div className="">
                          <div>
                            <span className="text-sm text-color_dark">
                              request sent
                            </span>
                          </div>
                        </div>
                      ) : groupMembersList.includes(item.id + data.uid) ||
                        groupMembersList.includes(data.uid + item.id) ? (
                        <div>
                          <span className="text-sm font-bold text-color_dark">
                            Joined
                          </span>
                        </div>
                      ) : (
                        <div onClick={() => handleGroupJoinRequest(item)}>
                          <Button_v_2>Join</Button_v_2>
                        </div>
                      )}
                      {/* <div className="flex ">
                              {data.uid === item.blockById ? (
                                <div onClick={() => handleUnblock(item)}>
                                  <Button_v_2>Unblock</Button_v_2>
                                </div>
                              ) : (
                                <div>
                                  <Button_v_2>Blocked</Button_v_2>
                                </div>
                              )}
                            </div> */}
                    </div>
                  </div>
                </div>
              );
            })
          : //search group result end
            groupsList.map((item, i) => {
              return (
                <div key={i} className="single_user">
                  <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                    <div className="flex gap-2 items-center">
                      <div className="flex">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                          <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
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
                            {item.groupName[1]}
                          </span>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                          <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                            {item.groupName[0]}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base Capitalize font-bold">
                          {item.groupName}
                        </h4>
                        <span className="text-sm">{item.groupAbout}</span>
                      </div>
                    </div>
                    <div>
                      {groupJoinRequistList.includes(item.id + data.uid) ||
                      groupJoinRequistList.includes(data.uid + item.id) ? (
                        <div className="">
                          <div>
                            <span className="text-sm text-color_dark">
                              request sent
                            </span>
                          </div>
                        </div>
                      ) : groupMembersList.includes(item.id + data.uid) ||
                        groupMembersList.includes(data.uid + item.id) ? (
                        <div>
                          <span className="text-sm font-bold text-color_dark">
                            Joined
                          </span>
                        </div>
                      ) : (
                        <div onClick={() => handleGroupJoinRequest(item)}>
                          <Button_v_2>Join</Button_v_2>
                        </div>
                      )}
                      {/* <div className="flex ">
                              {data.uid === item.blockById ? (
                                <div onClick={() => handleUnblock(item)}>
                                  <Button_v_2>Unblock</Button_v_2>
                                </div>
                              ) : (
                                <div>
                                  <Button_v_2>Blocked</Button_v_2>
                                </div>
                              )}
                            </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Group;
