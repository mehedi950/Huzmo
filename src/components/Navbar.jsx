import React, { useState, createRef } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { IoMdNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { FaUserAltSlash } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { userLoginInfo } from "../reducer/userSlice/userSlice";
import { set } from "firebase/database";
// import "./Demo.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const storage = getStorage();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [file, setFile] = useState(null);
  const [profileUpdateLoader, setProfileUpdateLoader] = useState(false);

  //cropper state start
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  //cropper state end

  const menus = [
    { name: "Home", link: "/home", icon: GoHomeFill },
    { name: "Notification", link: "/home", icon: IoMdNotifications },
    { name: "Friends", link: "/friends", icon: FaUserFriends, margin: true },
    { name: "Chat", link: "/chat", icon: IoIosChatbubbles },
    { name: "Users", link: "/users", icon: PiUserListBold, margin: true },
    { name: "Groups", link: "/groups", icon: MdGroups2 },
    { name: "Blocked", link: "/block", icon: FaUserAltSlash },
    {
      name: "Logout",
      link: "/logout",
      icon: HiOutlineLogout,
      gap: true,
    },
  ];

  const handleProfilePic = () => {
    setProfilePic(true);
  };

  //cropper code start
  const handleUpdateProfilePic = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    // console.log(files);
  };
  const getCropData = () => {
    setProfileUpdateLoader(true);
    // console.log("hello");
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // console.log(cropData);
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url")
        .then((snapshot) => {
          getDownloadURL(storageRef).then((downloadUrl) => {
            updateProfile(auth.currentUser, {
              photoURL: downloadUrl,
            })
              .then(() => {
                setProfileUpdateLoader(false);
                setProfilePic(false);

                dispatch(userLoginInfo({ ...data, photoURL: downloadUrl }));
                localStorage.setItem(
                  "user",
                  JSON.stringify({ ...data, photoURL: downloadUrl })
                );

                toast.success("Profile picture updated successfully.");
              })
              .then(() => {
                // .................................
                set(ref(db, "users/" + auth.currentUser.uid), {
                  username: fullName,
                  email: email,
                  profile_picture: downloadUrl,
                });
                // .................................
              })
              .catch((error) => {})
              .catch((error) => {});
          });
        })
        .catch((error) => {
          console.log(error);
          setProfileUpdateLoader(false);
        });
    }
  };

  //cropper code end
  // console.log(cropData);
  // console.log(auth.currentUser.uid);

  // console.log(image);
  // console.log(data);
  return (
    <div
      className={`bg-color_dark min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 relative`}
    >
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-end  text-color_white cursor-pointer px-3 py-3 mr-2"
      >
        <HiMenuAlt1 size={26}></HiMenuAlt1>
      </div>
      <div className="flex gap-3 items-center w-full">
        <div
          className={`${
            open ? "w-24 h-24" : "w-12 h-12"
          } w-12 h-12 rounded-full bg-gray-800 mx-2 mt-5 mb-2 duration-300 overflow-hidden relative cursor-pointer group`}
        >
          <img
            className="w-full h-full object-cover"
            src={data?.photoURL}
            alt=""
          />
          <div
            onClick={handleProfilePic}
            className="w-full h-full bg-gray-300 z-40 absolute top-0 left-0 flex  justify-center items-center opacity-0 group-hover:opacity-100 duration-300"
          >
            <TbCloudUpload className="text-2xl font-bold"></TbCloudUpload>
          </div>
        </div>
        <div className={`${!open && "hidden "} duration-300`}>
          <h1 className="whitespace-pre text-color_white text-xl bold">
            {data?.displayName}
          </h1>
          <h3 className="text-gray-500 text-sm pt-1">{data?.email}</h3>
        </div>
      </div>
      <div className=" text-color_white mt-4 flex flex-col gap-4">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={`group flex gap-3 mx-2 p-2 font-medium text-sm hover:bg-gray-800 rounded-md items-center relative ${
              menu?.gap && "mt-7"
            } ${menu?.margin && "mt-2"}`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={` whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-16 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } whitespace-pre bg-white text-gray-900 rounded-md absolute w-0  left-32 px-0 py-0 overflow-hidden drop-shadow-lg group-hover:py-1 group-hover:px-2  group-hover:left-14 group-hover:w-fit group-hover:duration-300 opacity:0 group-hover:opacity-100`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
      {profilePic && (
        <div className="absolute top-0 left-0 w-screen h-full">
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-50 opacity-100 py-10 px-10 ">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
                <div className="img-preview w-full h-full rounded"></div>
              </div>
              <h4 className="text-lg font-semibold">
                Update your Profile Picture
              </h4>
            </div>
            <div className="mt-4 form-control w-full max-w-xs pb-4">
              <input
                onChange={handleUpdateProfilePic}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            {file ? (
              <div className="mx-auto flex justify-center items-center">
                <Cropper
                  ref={cropperRef}
                  style={{ height: 200, width: "40%", objectFit: "cover" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              </div>
            ) : (
              ""
            )}

            <div className=" flex justify-around pt-6 ">
              <button
                onClick={() => setProfilePic(false)}
                className="py-1 px-3 text-base border border-gray-300 hover:bg-gray-500 hover:text-color_white duration-300 rounded-lg shadow-lg font-semibold"
              >
                Cancel
              </button>
              {profileUpdateLoader ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <button
                  onClick={getCropData}
                  className={`${
                    !file &&
                    "disabled text-gray-400 border-none hover:text-gray-400 hover:bg-color_white shadow-none"
                  } py-1 px-3 text-base border border-gray-300 hover:bg-gray-500 hover:text-color_white duration-300 rounded-lg shadow-lg font-semibold`}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
