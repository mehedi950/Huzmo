import Lottie from "lottie-react";
import RegisterAni from "../../assets/animation/registrationAni.json";
import { Button_v_1 } from "../../components/Buttons";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  //dont have permission to enter if have user start
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  });
  //dont have permission to enter if have user end

  const navigate = useNavigate();
  const auth = getAuth();
  const [loader, setLoader] = useState(false);
  // input info start
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const db = getDatabase();
  // input info end

  // input error start
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  // input error end

  // show password start
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // show password end

  // get input value start
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
    setRePasswordError("");
  };
  // get input value end

  // email,name regex start
  const fullNameRegex = /^[a-z ,.'-]+$/i;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // email,name regex end

  //   registration start
  const handleRegistration = (e) => {
    setLoader(true);
    e.preventDefault();

    if (!fullName) {
      setFullNameError("Full Name required");
      setLoader(false);
    } else if (!fullNameRegex.test(fullName)) {
      setFullNameError("Name not valid");
      setLoader(false);
    } else if (!email) {
      setEmailError("Email required");
      setLoader(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Email not valid");
      setLoader(false);
    } else if (!password) {
      setPasswordError("Password required");
      setLoader(false);
    } else if (rePassword !== password) {
      setRePasswordError("!password does not match");
      setLoader(false);
    }
    if (
      fullName &&
      fullNameRegex.test(fullName) &&
      email &&
      emailRegex.test(email) &&
      password &&
      rePassword &&
      password === rePassword
    ) {
      // firebase signup start
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6yOLD4RBkg8yILT6C9KYdehTfDO7rLtqVOH6Yq-Dk1uNVlqFhOyc7FSvUP9_ASm7PrA&usqp=CAU",
          })
            .then(() => {
              toast.info("registration successfull");
              setLoader(false);
              navigate("/login");

              // console.log(user);
            })
            .then(() => {
              set(ref(db, "users/" + auth.currentUser.uid), {
                username: fullName,
                email: email,
                profile_picture:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6yOLD4RBkg8yILT6C9KYdehTfDO7rLtqVOH6Yq-Dk1uNVlqFhOyc7FSvUP9_ASm7PrA&usqp=CAU",
              });
            })
            .catch((error) => {})
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setEmailError("Email already in use");
            toast.warning("Email already in use");
          }
          setLoader(false);
        });
      // firebase signup end
    }
  };
  //   registration end

  return (
    <div className="bg-color_body min-h-screen pb-3 ">
      <div className="register_container">
        <div className="register_wrapper">
          <div className="register_form_wrapper">
            <form onSubmit={handleRegistration} className="register_form">
              <h1>Register</h1>
              <div className="register_input_wrapper">
                <input
                  value={fullName}
                  onChange={handleFullName}
                  type="text"
                  placeholder="Full Name"
                />
                <span className="input_error">{fullNameError}</span>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Email"
                />
                <span className="input_error">{emailError}</span>

                <div className="register_input_wrapper relative">
                  <input
                    value={password}
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <BsEyeFill
                      onClick={handleShowPassword}
                      className=" absolute top-0 cursor-pointer right-4 translate-y-1/2"
                    ></BsEyeFill>
                  ) : (
                    <BsEyeSlashFill
                      onClick={handleShowPassword}
                      className=" absolute top-0 cursor-pointer right-4 translate-y-1/2"
                    ></BsEyeSlashFill>
                  )}
                </div>
                <span className="input_error ">{passwordError}</span>
                <div className="register_input_wrapper relative">
                  <input
                    value={rePassword}
                    onChange={handleRePassword}
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-Password"
                  />
                  {showPassword ? (
                    <BsEyeFill
                      onClick={handleShowPassword}
                      className=" absolute top-0 cursor-pointer right-4 translate-y-1/2"
                    ></BsEyeFill>
                  ) : (
                    <BsEyeSlashFill
                      onClick={handleShowPassword}
                      className=" absolute top-0 cursor-pointer right-4 translate-y-1/2"
                    ></BsEyeSlashFill>
                  )}
                </div>

                <span className="input_error">{rePasswordError}</span>

                {loader ? (
                  <div className="flex justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                ) : (
                  <Button_v_1 type="submit">Submit</Button_v_1>
                )}
              </div>
              <div className="pt-5 w-full pl-5 pr-2 text-color_secondary font-poppins">
                <h4>
                  Already have an Account?{" "}
                  <Link
                    to="/login"
                    className="text-color_primary pl-1 font-bold"
                  >
                    Login
                  </Link>
                </h4>
              </div>
            </form>
          </div>
          <div className="register_animation_wrapper">
            <div className="register_ani_heading">Welcome to Huzmo</div>
            <div className="register_ani">
              <Lottie animationData={RegisterAni}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
