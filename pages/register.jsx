import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
// import PhoneInput from "react-phone-input-2";
// import PopUpContainer from "../components/popup-container";
import Stepper from "../components/stepper/stepper.jsx";
import { useEffect } from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
// import { countries } from "../components/country";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
// import axios from "axios";
import {
  LoginScreenIcon,
  StepOneIcon,
  StepTwoIcon,
  StepThreeIcon,
  StepFourIcon,
} from "../components/svgs";
// import { Col, Divider, Row, Select, Input as AntdInput, Space } from "antd";
// import Text from "antd/lib/typography/Text";
import vectorImage from "../public/assets/vectorImage.png";
// const { Option } = Select;
const Dot = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="6" fill="#E2E2E2" />
  </svg>
);
const ActiveRect = () => (
  <svg
    width="44"
    height="12"
    viewBox="0 0 44 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="44" height="12" rx="6" fill="#5D5FEF" />
  </svg>
);

const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8622 11.9497L19.6026 17.6901C20.131 18.2185 20.131 19.0752 19.6026 19.6036C19.0743 20.132 18.2176 20.132 17.6892 19.6036L11.9487 13.8632L6.20822 19.6036C5.67983 20.132 4.82313 20.132 4.29473 19.6036C3.76634 19.0752 3.76634 18.2185 4.29473 17.6901L10.0352 11.9497L4.29473 6.2092C3.76634 5.6808 3.76634 4.82411 4.29473 4.29571C4.82313 3.76732 5.67983 3.76732 6.20822 4.29571L11.9487 10.0362L17.6892 4.29571C18.2176 3.76732 19.0743 3.76732 19.6026 4.29571C20.131 4.82411 20.131 5.6808 19.6026 6.2092L13.8622 11.9497Z"
      fill="#1A1A1A"
    />
  </svg>
);

const resendOTP = async () => {
  var number = localStorage.getItem("phoneNumber");
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/verifications`,
      {
        phoneNumber: number,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const StepOne = ({ onClick, nextStep, setNumber }) => {
  const [value, setValue] = useState("+91");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("india");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      value,
      disabled: i === 10,
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const goToStep2Handler = async () => {
    var newValue = value + phone;
    console.log("CHECK: ", newValue);
    setIsFetching(true);
    if (newValue.length !== 13) {
      setError("The entered number is not valid.");
      setIsFetching(false);
      return;
    }
    try {
      setError(false);
      const response = await axios.post(
        `${process.env.SERVER_URL}/verifications`,
        {
          phoneNumber: newValue,
        }
      );
      localStorage.setItem("phoneNumber", newValue);
      setIsFetching(false);
      setNumber(newValue);
      onClick();
    } catch (err) {
      setError("An error occurred. Please contact the administrator.");
      console.log(err);
    }
  };
  return (
    <div className="font-lexend flex flex-col items-center justify-center">
      <h1 className="text-main-dark-blue text-2xl mt-12 text-center ">
        Please verify if the entered
        <br />
        number is correct
      </h1>
      <p className="font-normal text-grey mt-5 text-center ">
        This number needs to match the number
        <br /> registered in your society.
      </p>
      <div className="my-10">
        <OutlinedInput
          style={{ backgroundColor: "white", height: 48 }}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          startAdornment={
            <InputAdornment position="start">
              <Select
                defaultValue={value}
                onChange={(e) => setValue(e)}
                optionLabelProp="code"
                bordered={false}
                dropdownMatchSelectWidth={false}
                dropdownRender={(menu) => (
                  <div style={{ width: "100%", padding: 8 }}>
                    <div>
                      <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Select Country Code
                      </Text>
                      <AntdInput
                        className="ph-search"
                        prefix={<img src="/assets/Search.png" />}
                        placeholder="Search"
                        style={{
                          flex: "auto",
                          marginTop: 12,
                          marginBottom: 12,
                          borderRadius: 100,
                          height: 36,
                        }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    {menu}
                  </div>
                )}
              >
                {countries
                  .filter((x) =>
                    JSON.stringify(x)
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .map((x) => (
                    <Option key={x.code} value={x.dial_code}>
                      <Row
                        align="middle"
                        justify="space-between"
                        gutter={[8, 16]}
                        style={{ marginBottom: 8, marginTop: 8 }}
                      >
                        <Col>
                          <Space size={12}>
                            <img
                              src={
                                "/assets/flags/" + x.code.toLowerCase() + ".svg"
                              }
                              style={{
                                height: 24,
                                width: 24,
                                borderRadius: "50%",
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: "Lexend",
                                fontWeight: 400,
                                fontSize: 16,
                              }}
                            >
                              {x.name} {x.dial_code}
                            </Text>
                          </Space>
                        </Col>
                        {x.dial_code == value ? (
                          <Col>
                            <img src="/assets/correct.png" />
                          </Col>
                        ) : null}
                      </Row>
                    </Option>
                  ))}
              </Select>
            </InputAdornment>
          }
        />

        {/* <PhoneInput
          className='react-tel'
          placeholder='Enter phone number'
          country={"in"}
          disableSearchIcon
          enableSearch={true}
          value={value}
          onChange={setValue}
          dropdownStyle={{
            backgroundColor: '#F8F8F8'
          }}
        /> */}
        {error && (
          <div style={{ width: "100%", textAlign: "center", marginTop: 4 }}>
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
      </div>
      <button
        className="px-10 py-3 bg-iris rounded-full font-lexend"
        onClick={goToStep2Handler}
        disabled={isFetching}
      >
        <p className="text-white">
          {isFetching ? (
            <CircularProgress
              color="white"
              size="20px"
              className="self-center"
            />
          ) : (
            "GET OTP"
          )}
        </p>
      </button>
      {/* <p className=' font-lexend font-normal mt-8'>
        Need help with your number? <span className='font-bold'>Get hint</span>
      </p> */}
      <div className="fixed bottom-0 right-0">
        <StepOneIcon />
      </div>
    </div>
  );
};

const StepTwo = ({ number, onClick, nextStep, prevStep }) => {
  // var number = useRef("")
  const router = useRouter();
  // if (typeof window != "undefined") {
  //   number.current = localStorage.getItem("phoneNumber")
  // }

  // console.log(number.current)
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [counter, setCounter] = useState(4);
  const [time, setTime] = useState(10);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const handleOtpInputChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx == index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const otpTimerChange = () => {
    let timer = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };

  const goToStep3Handler = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    var totalOtp = "";
    for (var i = 0; i < otp.length; i++) {
      totalOtp = totalOtp + otp[i];
    }
    console.log(totalOtp);
    if (totalOtp.length < 4) {
      setError("Invalid OTP format!");
      setIsFetching(false);
      return;
    }
    try {
      const response = await axios.post(`${process.env.SERVER_URL}/approvals`, {
        phoneNumber: number,
        code: totalOtp,
      });
      console.log(response.data);
      const message = response.data;
      if (message === "User Approved") {
        setIsFetching(false);
        setError(false);
        nextStep();
      } else {
        setIsFetching(false);
        console.log("CHECK ERROR!", message, message == "Incorrect OTP.");
        if (message == "Incorrect OTP.") setCounter(counter - 1);
        setError(
          message != false
            ? message
            : "An error occurred. Please contact the administrator."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeNumberHandler = () => {
    console.log("hell");
    prevStep();
  };
  useEffect(() => {
    if (time == 10) otpTimerChange();
  }, [time]);
  return (
    <div className="font-lexend flex flex-col items-center justify-center">
      <h1 className="text-main-dark-blue text-2xl mt-12 text-center ">
        Enter OTP
      </h1>
      <p className="font-lexend font-light mt-5">
        Enter the one time password sent to
        <span className="font-bold">{` *****${number.slice(5)} `}</span>
      </p>
      <button onClick={() => changeNumberHandler()}>
        <p className=" font-lexend mt-5">Change Number</p>
      </button>
      <form className="my-10 text-center" onSubmit={goToStep3Handler}>
        <div>
          {otp.map((data, index) => {
            return (
              <input
                className={`w-10 h-10 mr-4 mb-16 text-center rounded-xl outline-none`}
                style={error ? { border: "1px solid red" } : {}}
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleOtpInputChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
          {error && (
            <div className="mb-10 font-bold text-sm">
              <span className="text-red-600">{error}</span>
              {error == "Incorrect OTP."
                ? ` Try again, only ${counter} attempts left.`
                : null}
            </div>
          )}
        </div>
        {time > 0 && (
          <p className="text-xs font-bold mb-4">
            Resend OTP in: <span>{time}</span>
            <span>secs</span>
          </p>
        )}
        {time <= 0 && (
          <a>
            <div
              onClick={() => {
                resendOTP();
                setTime(10);
              }}
            >
              <p>Resend OTP</p>
            </div>
          </a>
        )}
        <button
          type="submit"
          className={`px-10 w-56 h-14 ${
            counter ? "bg-iris" : "bg-grey"
          } text-white rounded-full font-lexend mt-5`}
          disabled={isFetching || !counter}
          onClick={onClick}
        >
          {isFetching ? (
            <CircularProgress color="white" size="20px" />
          ) : counter ? (
            "CONFIRM OTP"
          ) : (
            "DISABLED"
          )}
        </button>
      </form>
      <div className="fixed bottom-0 right-0">
        <StepTwoIcon />
      </div>
    </div>
  );
};

const StepThree = ({ nextStep }) => {
  const router = useRouter();
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailUnique, setIsEmailUnique] = useState(true);

  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
  });
  const confirmPasswordRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const errorMessage = useRef();

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handlePasswordChange = (prop) => (event) => {
    setError(null);
    setPasswordValues({
      ...passwordValues,
      [prop]: event.target.value,
    });
    if (event.target.value.length >= 8) {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
    const regex = /\d/;
    if (regex.test(event.target.value)) {
      setCheck2(true);
    } else {
      setCheck2(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      showConfirmPassword: !confirmPasswordValues.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (prop) => (event) => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      [prop]: event.target.value,
    });
  };

  const handleFormInput = async (e) => {
    e.preventDefault();
    if (passwordValues.password !== confirmPasswordValues.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!check1 || !check2) {
      setError("Password does not follow the rules!");
      return;
    }
    setError(false);
    try {
      let res = await axios.post(`${process.env.SERVER_URL}/check-email`, {
        email: emailRef.current.value,
      });
      console.log("IAM WORKING");
      if (res && res.status == 200 && res.data) {
        console.log("no");
        if (res.data?.unique_email == false) {
          console.log("here!");
          setIsEmailUnique(false);
          return;
        }
        setIsEmailUnique(res.data.unique_email);
        localStorage.setItem("email", emailRef.current.value);
        localStorage.setItem("password", passwordValues.password);
        nextStep();
        return;
      }
      setIsEmailUnique(false);
      errorMessage.current = res.data.msg;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="font-lexend flex flex-col items-center justify-center">
      <h1 className="text-main-dark-blue text-2xl mt-12 text-center ">
        Create password
      </h1>
      <p className="font-lexend font-light mt-5">
        Enter a new password for your Appreaz account
      </p>
      <form
        className="flex flex-col items-start mt-5 w-full"
        onSubmit={handleFormInput}
      >
        <div className="mb-10 flex flex-col w-full">
          <label
            className="text-sm font-normal mb-2"
            htmlFor="email"
            style={{ color: "#515151" }}
          >
            Email ID:
          </label>
          <input
            type="email"
            ref={emailRef}
            className="w-full h-10 rounded-md pl-2 text-xs outline-none"
            style={{ backgroundColor: "#EAEAEA" }}
            name="email"
            id="email"
            required
          ></input>
          {!isEmailUnique && (
            <p className="text-xs text-red-500 font-sans mt-2">
              This email already exists!
            </p>
          )}
        </div>
        <label
          htmlFor="new-password"
          className="text-sm font-normal mb-2"
          style={{ color: "#515151" }}
        >
          New Password:
        </label>
        {/* <input
                type="password"
                className="w-80 h-8 rounded-md pl-2 mb-2"
                name="new-password"
                id="new-password"
              ></input> */}
        <Input
          className="w-full h-10 rounded-md pl-2 text-xs outline-none"
          style={{
            backgroundColor: "#EAEAEA",
            fontSize: "0.75rem",
            lineHeight: "1rem",
          }}
          type={passwordValues.showPassword ? "text" : "password"}
          disableUnderline={true}
          onChange={handlePasswordChange("password")}
          ref={passwordRef}
          value={passwordValues.password}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {passwordValues.showPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
        <div className="flex flex-col items-start text-xs my-6">
          <div className="flex items-center mb-4">
            {!check1 && (
              <img src="/assets/incorrect.png" className="mr-2 w-4 h-4" />
            )}
            {check1 && (
              <img src="/assets/correct.png" className="mr-2 w-4 h-4" />
            )}
            <p style={{ color: "#515151" }}>
              should contain at least 8 characters
            </p>
          </div>
          <div className="flex items-center justify-center mb-6">
            {!check2 && (
              <img src="/assets/incorrect.png" className="mr-2 w-4 h-4" />
            )}
            {check2 && (
              <img src="/assets/correct.png" className="mr-2 w-4 h-4" />
            )}
            <p style={{ color: "#515151" }}>should contain a number</p>
          </div>
        </div>
        <label
          className="text-sm font-normal mb-2"
          htmlFor="confirm-password"
          style={{ color: "#515151" }}
        >
          Confirm New Password:
        </label>
        <Input
          className="w-full h-10 rounded-md pl-2 text-xs outline-none mb-10"
          style={{
            backgroundColor: "#EAEAEA",
            fontSize: "0.75rem",
            lineHeight: "1rem",
          }}
          type={confirmPasswordValues.showConfirmPassword ? "text" : "password"}
          disableUnderline={true}
          onChange={handleConfirmPasswordChange("confirmPassword")}
          ref={confirmPasswordRef}
          value={confirmPasswordValues.confirmPassword}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
              >
                {confirmPasswordValues.showConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <button
          // disabled={check1 || check2}
          className="self-center bg-blue-700 w-3/4 py-3 rounded-3xl text-white text-xs font-medium mb-5"
        >
          CREATE PASSWORD
        </button>
      </form>
      <div className="fixed bottom-0 right-0">
        <StepThreeIcon />
      </div>
    </div>
  );
};

const StepFour = () => {
  var email;
  var location;
  var password;
  const router = useRouter();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const residentRef = useRef();
  const [resident, setResident] = useState("notSelected");

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  if (typeof window != "undefined") {
    email = localStorage.getItem("email");
    location = localStorage.getItem("location");
    password = localStorage.getItem("password");
  }
  const registerHandler = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    setError(false);
    if (resident === "notSelected") {
      setIsFetching(false);
      setError("Please select resident type.");
      return;
    } else {
      try {
        console.log("CHECK!", username, email, password);
        let res = await axios.post(
          `${process.env.SERVER_URL}/auth/local/register`,
          {
            username: usernameRef.current.value,
            email: email,
            password: password,
            apartmentNumber: emailRef.current.value,
            location: location,
            residentType: resident === "rented" ? 0 : 1,
            phone: localStorage.getItem("phoneNumber"),
          }
        );

        // Call to create memberprofile
        let { user, jwt } = res.data;
        const profileData = await axios(
          `${process.env.SERVER_URL}/member-profiles`,
          {
            method: "POST",
            headers: {
              Authorization: `bearer ${jwt}`,
            },
            data: {
              first_name: usernameRef.current.value,
              last_name: " ",
              apartment_number: emailRef.current.value,
              resident_type: resident,
              current_address: `${emailRef.current.value} ,${location}`,
            },
          }
        );

        if (res && res.status == 200) {
          window.localStorage.setItem("token", jwt);
          router.replace("/dashboard");
          return;
        }
        // const response = await axios.post(`${process.env.SERVER_URL}/auth/local`, {
        //   identifier: email,
        //   password: password,
        // });
      } catch (err) {
        setError(err);
        setIsFetching(false);
      }
    }
  };

  const residentChangeHandler = (e) => {
    setResident(e.target.value);
  };
  console.log(resident);
  const handleSelector = (e) => {
    setResident(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <form className="flex justify-center w-full" onSubmit={registerHandler}>
          <div className="flex flex-col items-center pr-24 pb-10 pl-24 pt-8 rounded-2xl">
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-main-dark-blue text-2xl mt-10 text-center ">
                Complete your profile
              </h1>
              <p className="font-lexend font-light mt-5">
                Enter a new password for your apperaz account
              </p>
              <div className="flex flex-col justify-center w-full mt-10">
                <label
                  htmlFor="username"
                  className="text-sm font-normal mb-2"
                  style={{ color: "#515151" }}
                >
                  Name(needs to match renter/owner documents)
                </label>
                <input
                  ref={usernameRef}
                  className="w-full h-10 rounded-md pl-2 text-xs outline-none"
                  style={{ backgroundColor: "#EAEAEA" }}
                  name="username"
                  id="username"
                  required
                ></input>

                <label
                  htmlFor="apartment-number"
                  className="text-sm font-normal mb-2 mt-10"
                  style={{ color: "#515151" }}
                >
                  Apartment Number
                </label>
                <input
                  ref={emailRef}
                  className="w-full h-10 rounded-md pl-2 text-xs outline-none"
                  style={{ backgroundColor: "#EAEAEA" }}
                  name="apartment-number"
                  id="apartment-number"
                  type="text"
                  required
                ></input>
              </div>
              <div className="flex flex-col mb-4 self-start items-start mt-10">
                <label
                  htmlFor="selectCategory"
                  className="text-sm font-normal mb-2"
                  style={{ color: "#515151" }}
                >
                  Resident Type
                </label>
                {/* <select
                  onChange={handleSelector}
                  className="mb-8 w-80 text-xs p-1 outline-none"
                  name="selectCategory"
                  id="selectCategory"
                >
                  <option value="rented">Rented</option>
                  <option value="owner">Owner</option>
                </select> */}
                <div
                  className="flex items-center w-40 justify-between text-xs font-medium mb-4"
                  style={{ color: "#515151" }}
                  onChange={residentChangeHandler}
                >
                  <div className="flex items-center">
                    <input
                      className="mr-1 cursor-pointer"
                      type="radio"
                      name="selectCategory"
                      value="rented"
                      selected
                    />
                    Rented
                  </div>
                  <div className="flex items-center">
                    <input
                      className="mr-1 cursor-pointer"
                      type="radio"
                      name="selectCategory"
                      value="owner"
                    />
                    Owner
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="self-center bg-blue-700 w-4/5 h-12 rounded-3xl text-white font-medium text-xs mb-4 "
              >
                {isFetching ? (
                  <CircularProgress
                    color="white"
                    size="20px"
                  ></CircularProgress>
                ) : (
                  "CONFIRM DETAILS"
                )}
              </button>
              {error && (
                <div
                  style={{ width: "100%", textAlign: "center", marginTop: 4 }}
                >
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              <br />
              <p className="text-xs">
                Incorrect Details? <span className="font-bold">Click here</span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 right-0">
        <StepFourIcon />
      </div>
    </>
  );
};
const OtpSendModal = ({ number, onResolveIssue, nextStep }) => (
  <div className="px-8 py-14 bg-white rounded-2xl w-full max-w-lg text-center flex flex-col items-center">
    <p className=" font-lexend font-light">
      The mobile number linked to your Appreaz
      <br /> account ends with{" "}
      <span className="font-bold">{`*****${number.slice(5)} `}</span>
    </p>
    <button
      className="px-10 py-3 bg-iris rounded-full font-lexend mt-10 "
      onClick={nextStep}
    >
      <p className="text-white">Okay</p>
    </button>
    <button className="mt-4" onClick={onResolveIssue}>
      <p className="font-lexend font-light">
        Issue with this number? <span className="font-bold">Click here</span>
      </p>
    </button>
  </div>
);

const PostIssueModal = ({ onClose }) => (
  <div className="px-8 py-8 bg-white rounded-2xl w-full max-w-lg text-center flex flex-col items-center">
    <div className="w-full flex items-center justify-between mb-10">
      <p className="font-lexend text-2xl">Help</p>
      <button onClick={onClose}>
        <XIcon />
      </button>
    </div>
    <p className="font-lexend font-light mb-8">
      Please tell us your issue in a few words and we&apos;ll try our best to
      resolve it at the earliest
    </p>
    <div className="h-96 w-full rounded-xl overflow-hidden ">
      <textarea
        className="w-full h-full bg-purple-bg box-border p-4 font-lexend font-normal outline-none"
        placeholder="Enter your message here"
      />
    </div>
    <button
      className="px-10 py-3 w-full bg-iris rounded-full font-lexend mt-10 "
      onClick={onClose}
    >
      <p className="text-white">Send</p>
    </button>
  </div>
);

const BaseModal = () => {
  const [step, setStep] = useState(0);
  const [trigger, setTrigger] = useState(false);
  return (
    <div className="w-full max-w-3xl border border-[#E0E0E0] p-5 rounded-2xl flex flex-col items-center">
      <h2 className="text-gray-400 text-base font-normal">
        <span className="uppercase text-iris font-lexend font-normal">{`step ${
          step + 1
        }`}</span>
        /4
      </h2>
      {/* <Stepper activeStep={step}>
          <StepOne
            onClick={() => {
              setTrigger(true);
              setPopIndex(0);
            }}
            nextStep={() => {
              setStep(1);
            }}
            setNumber={(number) => {
              setNumber(number);
            }}
          />
          <StepTwo
            number={number}
            nextStep={() => {
              setStep(2);
            }}
            prevStep={() => {
              console.log("hell");
              setStep(0);
            }}
          />
          <StepThree
            nextStep={() => {
              setStep(3);
            }}
          />
          <StepFour />
        </Stepper> */}
      {/* <PopUpContainer trigger={trigger} index={popUpIndex}>
          <OtpSendModal
            number={number}
            onResolveIssue={() => {
              setPopIndex(1);
            }}
            nextStep={() => {
              setTrigger(false);
              setStep(1);
            }}
          />
          <PostIssueModal
            onClose={() => {
              setTrigger(false);
            }}
          />
        </PopUpContainer> */}
    </div>
  );
};

export default function RegisterScreen() {
  const [step, setStep] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [popUpIndex, setPopIndex] = useState(0);
  const [number, setNumber] = useState("");
  const [image1, setImage1] = useState("/assets/Rectangle1.png");
  const [image2, setImage2] = useState("/assets/Rectangle2.png");
  const [image3, setImage3] = useState("/assets/Rectangle2.png");
  const [active, setActive] = useState(false);

  const image1Handler = () => {
    setImage1("/assets/Rectangle1.png");
    setImage2("/assets/Rectangle2.png");
    setImage3("/assets/Rectangle2.png");
  };
  const image2Handler = () => {
    setImage1("/assets/Rectangle2.png");
    setImage2("/assets/Rectangle1.png");
    setImage3("/assets/Rectangle2.png");
  };
  const image3Handler = () => {
    setImage1("/assets/Rectangle2.png");
    setImage2("/assets/Rectangle2.png");
    setImage3("/assets/Rectangle1.png");
  };

  const clickHandler = () => {
    setActive(true);
  };

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="flex items-center h-16 absolute top-2 left-4">
        <h1 className="ml-4 font-lexend text-3xl font-bold text-black">
          Appreaz
        </h1>
      </div>
      {!active && (
        <>
          <div className="w-full max-w-3xl bg-purple-bg p-5 rounded-2xl flex flex-col items-center">
            <img src={vectorImage.src} className={"w-80"} />
          </div>
          <div className="w-full max-w-3xl bg-purple-bg p-5 rounded-2xl flex flex-col items-center">
            <p className="font-lexend text-xl font-medium">
              One-stop-shop for all your{" "}
            </p>
            <p className="font-lexend text-xl font-medium">
              society-related administrative work
            </p>
          </div>
          <div className="w-full max-w-3xl bg-purple-bg p-5 rounded-2xl flex justify-center items-center">
            <img className={`mr-1`} src={image1} onClick={image1Handler} />
            <img className={`mr-1`} src={image2} onClick={image2Handler} />
            <img className={`mr-1`} src={image3} onClick={image3Handler} />
          </div>
          <button
            onClick={clickHandler}
            className="bg-[#676767] mt-5 px-28 py-3 text-center rounded-full cursor-pointer"
          >
            <p className="text-white font-lexend font-semibold tracking-normal">
              Next
            </p>
          </button>
        </>
      )}
      {active && (
        <>
          <BaseModal />
        </>
      )}
    </div>
  );
}
