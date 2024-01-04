import { getDownloadURL, getStorage, ref } from "firebase/storage";

import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePicture = ({ imgId }) => {
  const [profilePicture, setProfilePicture] = useState("");
  const storage = getStorage();

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  //   console.log(data);
  const pictureRef = ref(storage, imgId);
  getDownloadURL(pictureRef)
    .then((url) => {
      setProfilePicture(url);
    })
    .catch((error) => {
      //   console.log(error);
    });

  return (
    <div className="w-full h-full">
      {profilePicture ? (
        <img className="w-full h-full" src={profilePicture} alt="" />
      ) : (
        <img
          className="w-full h-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6yOLD4RBkg8yILT6C9KYdehTfDO7rLtqVOH6Yq-Dk1uNVlqFhOyc7FSvUP9_ASm7PrA&usqp=CAU"
          alt=""
        />
      )}
    </div>
  );
};

export default ProfilePicture;
