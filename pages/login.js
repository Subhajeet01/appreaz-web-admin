import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

const login = ({ errorType }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const [image1, setImage1] = useState("/assets/Ellipse1.png");
  const [image2, setImage2] = useState("/assets/Ellipse2.png");
  const [image3, setImage3] = useState("/assets/Ellipse2.png");

  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotExist, setEmailNotExist] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [passwordEntryCount, setPasswordCountEntry] = useState(0);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const emailChangedHandler = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const image1Handler = () => {
    setImage1("/assets/Ellipse1.png");
    setImage2("/assets/Ellipse2.png");
    setImage3("/assets/Ellipse2.png");
  };
  const image2Handler = () => {
    setImage1("/assets/Ellipse2.png");
    setImage2("/assets/Ellipse1.png");
    setImage3("/assets/Ellipse2.png");
  };
  const image3Handler = () => {
    setImage1("/assets/Ellipse2.png");
    setImage2("/assets/Ellipse2.png");
    setImage3("/assets/Ellipse1.png");
  };

  const goToStep1Handler = () => {
    console.log("clicked");
    router.push("/getStarted");
  };

  const submitLoginFormHandler = () => {
    console.log("clicked");
  };

  return (
    <>
      <div className={` ${styles.logoName}`}>
        {/* <img src="/assets/logoAppreaz.png" className={styles.logoImage} /> */}
        <p className={styles.logoName1}>Appreaz</p>
      </div>
      <div
        className={`w-screen h-screen flex items-center ${styles.cloudbackground}`}
      >
        <div
          className={`w-1/2 flex flex-col items-center justify-center ${styles.backgroundLoginColorLeft} `}
        >
          <img className="mb-6" src="/assets/vectorImage.png" />
          <div className="flex justify-between mb-6">
            <img
              className={`mr-1 ${styles.imageMove}`}
              src={image1}
              onClick={image1Handler}
            />
            <img
              className={`mr-1 ${styles.imageMove}`}
              src={image2}
              onClick={image2Handler}
            />
            <img
              className={`mr-1 ${styles.imageMove}`}
              src={image3}
              onClick={image3Handler}
            />
          </div>
          <p className="font-medium">
            One-stop-shop for all your society-related{" "}
          </p>
          <p className="mb-6 font-medium">administrative work.</p>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="w-1/4"
          >
            <button
              className={`w-full h-8 rounded-3xl border border-[#979797] mb-5 text-sm font-medium ${styles.cloudButton}`}
            >
              Watch Video
            </button>
          </a>
        </div>
        <div
          className={`w-1/2 h-screen flex flex-col items-center justify-center ${styles.backgroundLoginColor}`}
        >
          <p
            onClick={goToStep1Handler}
            className={`absolute top-4 right-4 text-base font-semibold underline ${styles.createAccountMessage}`}
            style={{ cursor: "pointer" }}
          >
            Don&apos;t have an appreaz account?
          </p>
          <div className="flex flex-col justify-center w-full items-center">
            <div className="flex flex-col justify-center w-full max-w-sm">
              <h1 className="text-3xl leading-10 font-[lexend] font-semibold mb-6">
                Log In
              </h1>
              <label htmlFor="email" className="text-xs mb-2">
                Email ID or Phone
              </label>
              <input
                ref={emailRef}
                className="w-full h-10 rounded-2xl pl-4 text-black mb-4 bg-[#D8D8D8]/[0.2] focus:outline-none font-medium text-base leading-5 z-0  no-underline"
                name="email"
                id="email"
                value={emailValue}
                onChange={emailChangedHandler}
                type="email"
                required
                style={{ fontSize: "0.875rem" }}
              ></input>
              {emailNotExist && (
                <p
                  className="text-xs mb-4 w-80"
                  style={{
                    color: `rgba(255, 69, 69, 1)`,
                    lineHeight: "1.5",
                  }}
                >
                  We couldn’t find an account linked to this email ID. Please
                  recheck the email ID or try another
                </p>
              )}
              <label htmlFor="password" className="text-xs mb-2">
                Password
              </label>
              {/* <input
              ref={passwordRef}
              className="w-full h-10 rounded-2xl pl-4 text-black mb-4 bg-[#D8D8D8]/[0.2] focus:outline-none font-medium text-base leading-5 z-0  no-underline"
              type="password"
              name="password"
              id="password"
            ></input> */}
              <Input
                className="w-full h-10 rounded-2xl pl-4 text-black mb-4 bg-[#D8D8D8]/[0.2] focus:outline-none font-medium text-base leading-5 z-0  no-underline"
                type={values.showPassword ? "text" : "password"}
                disableUnderline={true}
                onChange={handlePasswordChange("password")}
                style={
                  incorrectPassword
                    ? {
                        fontSize: "0.875rem",
                        border: "1px solid rgba(255, 69, 69, 1)",
                      }
                    : { fontSize: "0.875rem" }
                }
                ref={passwordRef}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div className="flex items-center justify-between w-full">
                <p
                  className="text-xs mb-8"
                  style={
                    incorrectPassword
                      ? {
                          color: `rgba(255,69,69,1)`,
                          opacity: 1,
                        }
                      : {
                          color: `rgba(255,69,69,1)`,
                          opacity: 0,
                        }
                  }
                >
                  Incorrect Password . {3 - passwordEntryCount} attempts left
                </p>
                <Link href={`/forgot-password?email=${emailValue}`}>
                  <a>
                    <p className="text-sm mb-8 font-semibold">
                      Forgot Password
                    </p>
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                className={`w-80 h-8 rounded-3xl text-white mb-6 font-medium bg-[#676767]`}
                onClick={submitLoginFormHandler}
              >
                Log In
              </button>
            </div>
            <div className="mb-10 flex items-center justify-between w-96">
              <hr
                style={{
                  height: 1,
                  width: 160,
                }}
              />
              <p className="mb-1 text-sm">or</p>
              <hr
                style={{
                  height: 1,
                  width: 160,
                }}
              />
            </div>
            <div>
              <a href={`${process.env.SERVER_URL}/connect/google`}>
                <button className="flex items-center justify-center w-80 h-10 rounded-3xl border border-[#979797] text-black mb-4">
                  <p className="text-sm font-[lexend] font-semibold leading-5 p-2">
                    Continue with Google
                  </p>
                </button>
                {/* className={`w-full h-8 rounded-3xl border border-[#979797] mb-5 text-sm font-medium ${styles.cloudButton}`} */}
              </a>
            </div>
          </div>
          <a href={`${process.env.SERVER_URL}/connect/facebook`}>
            <button className="flex items-center justify-center w-80 h-10 rounded-3xl border border-[#979797] text-black mb-4">
              <p className="text-sm font-[lexend] font-semibold leading-5 p-2">
                Continue with Facebook
              </p>
            </button>
          </a>
          {errorType === "GoogleNotExist" && (
            <div className="mt-7 bg-[#F68080]/[0.2] rounded-xl py-4 px-6">
              <p
                className="text-xs"
                style={{
                  lineHeight: "1.5",
                }}
              >
                We couldn’t find an account linked to your Google account
              </p>
            </div>
          )}
          {errorType === "FacebookNotExist" && (
            <div className="mt-7 bg-[#F68080]/[0.2] rounded-xl py-4 px-6">
              <p
                className="text-xs"
                style={{
                  lineHeight: "1.5",
                }}
              >
                We couldn’t find an account linked to your Facebook account
              </p>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="30rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export async function getServerSideProps(context) {
  const { errorType = null } = context.query;
  // console.log("errorType", errorType);

  return {
    props: { errorType }, // will be passed to the page component as props
  };
}

export default login;
