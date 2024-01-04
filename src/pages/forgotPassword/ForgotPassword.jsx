import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Check your Email");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

  return (
    <div>
      <div className="forgot_wrapper flex justify-center items-center h-screen w-[52]">
        <form
          onSubmit={handleForgotPassword}
          action=""
          className=" p-8 bg-color_primary rounded-lg relative block"
        >
          <div className="absolute -top-4 -right-4">
            <Link to={"/login"}>
              <ImCross></ImCross>
            </Link>
          </div>
          <div className="forgot_form_wrapper">
            <h1 className="text-2xl font-bold text-color_white text-center pb-8">
              Forgot Password
            </h1>

            <div className="">
              <div>
                <input
                  className="w-full rounded-lg py-1 pl-3 outline-none focus:border border border-transparent focus:border-color_orange"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <span className="inline-block text-color_white opacity-70 pl-3 pt-1">
                {emailError}
              </span>

              <button
                type="submit"
                className="w-full rounded-lg bg-color_secondary py-2 mt-2 text-bold text-color_white"
              >
                Send
              </button>
              <div></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
