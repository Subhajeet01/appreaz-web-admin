import React, { useState } from "react";
// import AutoComplete from "react-google-autocomplete";
import { useRouter } from "next/router";
import { useRef } from "react";
import oval1 from "../public/assets/Oval1.png";
import oval2 from "../public/assets/Oval2.png";

function About() {
  const router = useRouter();
  const locationRef = useRef();
  const [error, setError] = useState(false);
  const goToStep1 = (e) => {
    e.preventDefault();
    console.log(locationRef.current.value);
    if (!locationRef.current.value) {
      setError("Please enter your location to proceed!");
    } else {
      setError(false);
      if (typeof window != "undefined") {
        localStorage.setItem("location", locationRef.current.value);
        router.push("/register");
      }
    }
  };

  console.log(oval1.src);
  return (
    <div className="bg-white relative h-screen w-screen">
      <div className="w-full flex items-center justify-center flex-col pt-16 text-center z-50">
        <h1 className="text-5xl font-bold font-lexend mb-5">
          Welcome to Appreaz
        </h1>
        <p className="font-lexend text-black font-light text-xl mb-5">
          The one stop destination for all your society needs
        </p>
        <form
          className="flex-col flex items-center justify-center w-96 z-50"
          onSubmit={goToStep1}
        >
          <div
            className="h-16 w-full max-w-4xl rounded-xl overflow-hidden mb-5 pl-20 flex justify-center items-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <div className="w-auto">
              <PlaceIcon />
            </div>
            <input
              type="text"
              placeholder="Enter Your Location"
              ref={locationRef}
              className="h-full flex-grow box-border px-2 outline-none font-lexend text-sm font-normal"
              style={{ backgroundColor: "#F5F5F5" }}
            ></input>
          </div>

          {error && (
            <div className="mb-10 font-bold text-sm">
              <span className="text-red-600">{error}</span>
            </div>
          )}
          {/* <AutoComplete
            apiKey="AIzaSyCWAVqoINJK0aaRSTlCAIIBxtprqWZVd24"
            onPlaceSelected={(place) => console.log(place)}
          /> */}
          <button
            type="submit"
            onClick={goToStep1}
            className="bg-[#676767] mt-5 px-28 py-3 text-center rounded-full cursor-pointer"
          >
            <p className="text-white font-lexend font-semibold tracking-normal">
              Get Started
            </p>
          </button>
        </form>
      </div>
      <img src={oval2.src} className="absolute bottom-0 right-0" />
      <img src={oval1.src} className="absolute bottom-0" />
    </div>
  );
}

const PlaceIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z"
      fill="#000000"
    />
  </svg>
);

export default About;
