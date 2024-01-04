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
import { toast } from "react-toastify";
import { Button_v_2 } from "./Buttons";
import ProfilePicture from "./ProfilePicture";

const OwnGroup = () => {
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [groupsList, setGroupsList] = useState([]);
  const [groupJoinRequestList, setGroupJoinRequistList] = useState([]);
  const [ownGroupModal, setOwnGroupModal] = useState(false);
  const [confirmGroupDelete, setConfirmGroupDelete] = useState(false);
  const [showGroupJoinRequest, setShowGroupJoinRequest] = useState(false);
  const [groupInfoModal, setGroupInfoModal] = useState(false);
  const [groupMembersList, setGroupMembersList] = useState([]);
  const db = getDatabase();

  //get redux data

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  //   console.log(data);

  //empty error
  const [groupNameError, setGroupNameError] = useState("");
  const [groupAboutError, setGroupAboutError] = useState("");

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameError("");
  };
  const handleGroupAbout = (e) => {
    setGroupAbout(e.target.value);
    setGroupAboutError("");
  };

  //group create start
  const handleGroupCreate = (e) => {
    e.preventDefault();

    if (groupName === "") {
      setGroupNameError("group name required");
    } else if (groupAbout === "") {
      setGroupAboutError("group about required");
    } else {
      toast.success("group created successfully");
      setShow(false);
      set(push(ref(db, "groups")), {
        groupName: groupName,
        groupAbout: groupAbout,
        adminName: data.displayName,
        adminId: data.uid,
        adminEmail: data.email,
      });
    }
  };
  //group create end

  //get groups data from firebase start
  useEffect(() => {
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (item.val().adminId === data.uid) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupsList(list);
    });
  }, []);
  //get groups data from firebase end

  //   console.log(groupsList);

  //group modal show hide
  const handleOwnGroupModal = () => {
    setOwnGroupModal(!ownGroupModal);
  };

  //group confirm delete modal
  const handleConfirmGroupDeleteModal = () => {
    setConfirmGroupDelete(!confirmGroupDelete);
    setOwnGroupModal(false);
  };

  //group join request show modal
  const handleGroupJoinRequestShowModal = (group) => {
    setShowGroupJoinRequest(true);
    setOwnGroupModal(false);

    //get group join request from firebase start
    const groupJoinRequestRef = ref(db, "groupJoinRequest");
    onValue(groupJoinRequestRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item) => {
        if (
          item.val().adminId === data.uid &&
          item.val().groupId === group.id
        ) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupJoinRequistList(list);
    });
    //get group join request from firebase end
    // console.log(groupJoinRequestList);
    // console.log(group);
  };

  //delete group from firebase start
  const handleGroupDelete = (item) => {
    remove(ref(db, "groups/" + item.id));
    setConfirmGroupDelete(false);
    // console.log(item);
  };
  //delete group from firebase end

  //delete group join request delete from firebase start
  const handleGroupJoinRequestDelete = (item) => {
    remove(ref(db, "groupJoinRequest/" + item.id));
    // console.log(item);
  };
  //delete group join request delete from firebase end

  //create group members list in firebase start
  const handleAcceptGroupJoinRequest = (item) => {
    set(push(ref(db, "groupMembers")), {
      groupId: item.groupId,
      groupName: item.groupName,
      groupAbout: item.groupAbout,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: item.userId,
      userName: item.userName,
      userEmail: item.userEmail,
    }).then(() => {
      remove(ref(db, "groupJoinRequest/" + item.id));
    });
    // console.log(item);
  };
  //create group members list in firebase end

  //handle group info start
  const handlegroupInfo = (itemInfo) => {
    setGroupInfoModal(true);
    setOwnGroupModal(false);

    //get group members list from firebase start

    const groupMembersRef = ref(db, "groupMembers");
    onValue(groupMembersRef, (snapshot) => {
      let list = [];
      snapshot.forEach((item, i) => {
        if (item.val().groupId == itemInfo.id) {
          list.push({ ...item.val(), id: item.key });
        }
      });
      setGroupMembersList(list);
    });

    //get group members list from firebase end
    // console.log(itemInfo);
  };
  //handle group info end

  // console.log(groupMembersList);

  return (
    <div>
      <div className="bg-color_white w-full py-5 rounded-bl-lg rounded-br-lg">
        <h1 className="text-2xl font-bold text-color_dark uppercase text-center ">
          My Group
        </h1>
      </div>
      <div className="flex justify-end pt-3 pb-3 bg-color_dark/95">
        <h1
          onClick={() => setShow(!show)}
          className="bg-color_secondary text-white inline-block px-4 py-2 rounded-lg text-xs cursor-pointer"
        >
          {show ? <span className=" font-bold">X</span> : "Create Group"}
        </h1>
      </div>
      {
        //create group start
        show ? (
          <div className="">
            <form onSubmit={handleGroupCreate} className="">
              <div className="px-4">
                <input
                  onChange={handleGroupName}
                  type="text"
                  placeholder="Group Name"
                  className="input input-bordered input-success mt-2 block h-11 w-full "
                />
                <span className="text-[#ddd] pl-3">{groupNameError}</span>
                <input
                  onChange={handleGroupAbout}
                  type="text"
                  placeholder="About"
                  className="input input-bordered input-success mt-2 block h-11 w-full"
                />
                <span className="text-[#ddd] pl-3">{groupAboutError}</span>
              </div>
              <div className="pt-3 px-32">
                <button className="btn  block w-full bg-color_light text-color_white hover:text-color_dark">
                  Create
                </button>
              </div>
            </form>
          </div>
        ) : //create group start

        showGroupJoinRequest ? (
          //group join request start
          <div className="bg-color_dark border-t ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {groupJoinRequestList[0]?.groupName[2]}
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
                      {groupJoinRequestList[0]?.groupName[1]}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {groupJoinRequestList[0]?.groupName[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-color_white px-2 block">
                    {groupJoinRequestList[0]?.groupName}
                  </span>
                  <span className="text-color_white/60 pl-3 block text-sm lowercase ">
                    {groupJoinRequestList[0]?.groupAbout}
                  </span>
                </div>
              </div>
              <span
                onClick={() => setShowGroupJoinRequest(false)}
                className="bg-orange-500 text-color_white rounded-lg text-sm py-1 px-2 inline-block mr-4 mt-4 mb-4 cursor-pointer"
              >
                close
              </span>
            </div>
            <div>
              {/* ............................... */}
              {groupJoinRequestList.length === 0 ? (
                <div>
                  <span className="block pt-20 pb-32 text-color_white/60 text-center">
                    No request found
                  </span>
                </div>
              ) : (
                groupJoinRequestList.map((item, i) => {
                  return (
                    <div key={i} className="single_user relative">
                      <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                        <div className="flex gap-2 items-center">
                          <div className="flex">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                              <ProfilePicture imgId={item.userId} />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-base Capitalize font-bold">
                              {item.userName}
                            </h4>
                            <span className="text-sm">{item.userEmail}</span>
                          </div>
                        </div>
                        <div className="flex">
                          <div
                            onClick={() => handleAcceptGroupJoinRequest(item)}
                          >
                            <Button_v_2>Accept</Button_v_2>
                          </div>

                          <div
                            onClick={() => handleGroupJoinRequestDelete(item)}
                          >
                            <Button_v_2>delete</Button_v_2>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {/* ............................... */}
            </div>
          </div>
        ) : //group join request end
        //group info modal start
        groupInfoModal ? (
          <div className="bg-color_dark border-t">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {groupMembersList[0]?.groupName[2]}
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
                      {groupMembersList[0]?.groupName[1]}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary -ml-10 border border-color_white uppercase">
                    <span className="flex justify-center items-center translate-y-1/2 text-base font-bold text-color_white bg-color_secondary">
                      {groupMembersList[0]?.groupName[0]}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-color_white px-2 block">
                    {groupMembersList[0]?.groupName}
                  </span>
                  <span className="text-color_white/60 pl-3 block text-sm lowercase ">
                    {groupMembersList[0]?.groupAbout}
                  </span>
                </div>
              </div>
              <span
                onClick={() => setGroupInfoModal(false)}
                className="bg-orange-500 text-color_white rounded-lg text-sm py-1 px-2 inline-block mr-4 mt-4 mb-4 cursor-pointer"
              >
                close
              </span>
            </div>
            {groupMembersList.length === 0 ? (
              <span className="block pt-20 pb-32 text-color_white/60 text-center">
                No Members found
              </span>
            ) : (
              //group info modal end
              //group member list start
              groupMembersList.map((item, i) => {
                return (
                  <div key={i} className="single_user relative">
                    <div className="w-full py-2 bg-color_white rounded-lg px-1 flex justify-between items-center mt-3">
                      <div className="flex gap-2 items-center">
                        <div className="flex">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-color_secondary border border-color_white uppercase">
                            <ProfilePicture imgId={item.userId} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base Capitalize font-bold">
                            {item.userName}
                          </h4>
                          <span className="text-sm">{item.userEmail}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <Button_v_2>Band</Button_v_2>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          //group member list end
          //groups list start
          <div className="">
            {groupsList.map((item, i) => {
              return (
                <div key={i} className="single_user relative">
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
                    <div className="flex flex-end">
                      <div
                        onClick={handleOwnGroupModal}
                        className="cursor-pointer"
                      >
                        {ownGroupModal ? (
                          <span className=" text-lg py-1  block">X</span>
                        ) : (
                          <span className="font-bold text-lg py-1 rotate-90 block">
                            ...
                          </span>
                        )}
                      </div>
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
                  {ownGroupModal ? (
                    <div className="absolute top-0 right-5 w-9/12 h-full border border-color_white box-border p-1 bg-color_light text-color_white z-30 rounded-lg flex items-center justify-center">
                      <div onClick={() => handlegroupInfo(item)}>
                        <Button_v_2>info</Button_v_2>
                      </div>
                      <div
                        onClick={() => handleGroupJoinRequestShowModal(item)}
                      >
                        <Button_v_2>request</Button_v_2>
                      </div>
                      {/* <Button_v_2>invite</Button_v_2> */}
                      <div onClick={handleConfirmGroupDeleteModal}>
                        <Button_v_2>delete</Button_v_2>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {confirmGroupDelete ? (
                    <div className="absolute top-0 right-0 border border-color_primary w-1/2 h-full block bg-color_white rounded-lg z-40">
                      <div className="block">
                        <h1 className="text-center">
                          Sure you want to delete?
                        </h1>
                        <div className="flex gap-5 justify-center">
                          <span
                            onClick={() => handleGroupDelete(item)}
                            className="inline-block bg-color_primary text-color_white rounded-lg py-1 px-2 text-sm cursor-pointer"
                          >
                            Yes
                          </span>
                          <span
                            onClick={() => setConfirmGroupDelete(false)}
                            className="inline-block bg-color_primary text-color_white rounded-lg py-1 px-2 text-sm cursor-pointer"
                          >
                            No
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        )
        //groups list end
      }
    </div>
  );
};

export default OwnGroup;
