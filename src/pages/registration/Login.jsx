import Lottie from "lottie-react";
import loginAni from "../../assets/animation/loginAni.json";
import { Button_v_1 } from "../../components/Buttons";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../../reducer/userSlice/userSlice";

const Login = () => {
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
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // input info start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // input info end

  // input error start
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // input error end

  // show password start
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // show password end

  // get input value start
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  // get input value end

  // email,name regex start
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // email,name regex end

  //   signin start
  const handleRegistration = (e) => {
    setLoader(true);
    e.preventDefault();

    if (!email) {
      setEmailError("Email required");
      setLoader(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Email not valid");
      setLoader(false);
    } else if (!password) {
      setPasswordError("Password required");
      setLoader(false);
    }
    if (email && emailRegex.test(email) && password) {
      // firebase signin start
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.info("Login successfull");
          setLoader(false);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(userLoginInfo(user));
          navigate("/home");
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // if (errorCode.includes("auth/email-already-in-use")) {
          //   setEmailError("Email already in use");
          //   toast.warning("Email already in use");
          // }
          if (errorCode === "auth/invalid-login-credentials") {
            setPasswordError("password doesn't match");
          }

          setLoader(false);
        });
      // firebase signin end
    }
  };
  //   signin end

  return (
    <div className="bg-color_body min-h-screen pb-3 ">
      <div className="register_container">
        <div className="register_wrapper h-screen">
          <div className="register_form_wrapper">
            <form onSubmit={handleRegistration} className="register_form">
              <h1>Sign In</h1>
              <div className="register_input_wrapper">
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

                {loader ? (
                  <div className="flex justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                ) : (
                  <Button_v_1 type="submit">Login</Button_v_1>
                )}
              </div>
              <div className="pt-3 w-full px-5 font-poppins flex justify-end text-sm font-semibold text-color_primary">
                <Link to={"/forgotPassword"}>Forgot Password</Link>
              </div>
              <div className="pt-3 w-full pl-5 pr-2 text-color_secondary font-poppins">
                <h4>
                  Dont have any Account?{" "}
                  <Link to="/" className="text-color_primary pl-1 font-bold">
                    Register
                  </Link>
                </h4>
              </div>
            </form>
          </div>
          <div className="register_animation_wrapper">
            <div className="register_ani_heading">Welcome to Huzmo</div>
            <div className="register_ani">
              <Lottie animationData={loginAni}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
