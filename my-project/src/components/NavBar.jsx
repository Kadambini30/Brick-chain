import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { set } from "firebase/database";

const NavBar = () => {
  const [loggedin, setLoggedin] = useState(null);

  const [user] = useAuthState(auth);
  console.log(user);

  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
  console.log(userSession);
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("/signin");
  const [profileDialogue, setProfileDialogue] = useState(false);

  //fetching user data
  useEffect(() => {
    const fetchData = async () => {
      if (userSession) {
        setLoggedin(true);
        console.log("User is logged in");
        const docRef = doc(db, "users", userSession);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
          setAbout("/profile");
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    };

    fetchData();
  }, [user]);

  //profile button click
  const profileClicked = () => {
    if (!loggedin) {
      window.location.href = "/signin";
    }
    else{
      setProfileDialogue(!profileDialogue);
    }
  }
  return (
    <div className="w-full py-4 px-2 h-16 bg-black fixed z-20">
      {/* Desktop Navbar */}
      <div className="pt-1 md:flex justify-between text-white text-md flex-wrap w-full h-full hidden cursor-pointer">
        <div className="w-1/3 flex justify-around">
          <div>HOME</div>
          <div>BUY</div>
          <div>SELL</div>
          <div>RENT</div>
        </div>
        <div className="font-bold text-lg">BRICK-CHAIN</div>
        <div className="w-1/3 flex justify-around">
          <div>CONTACT US</div>
          <button className="bg-[#D9D9D9] text-black rounded-sm py-1 px-3 flex gap-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 10.5256L10.4993 3.49031C11.382 2.83656 12.618 2.83656 13.5007 3.49031L23 10.5256M4.66667 7.81001V18.6724C4.66667 19.9579 5.76108 21 7.11111 21H8.33333H15.6667H16.8889C18.2389 21 19.3333 19.9579 19.3333 18.6724V3.54266M9.55556 21V14.0171C9.55556 13.3743 10.1028 12.8532 10.7778 12.8532H13.2222C13.8972 12.8532 14.4444 13.3743 14.4444 14.0171V21"
                  stroke="#111111"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="font-bold">REGISTER AS SELLER</div>
          </button>
          <button
            onClick={profileClicked}
            className="bg-[#D9D9D9] text-black rounded-full py-1 px-4 flex gap-2"
          >
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2130_449)">
                  <path
                    d="M19.6077 19.1937C19.2111 18.4166 18.6877 17.6875 18.0374 17.0373C14.7031 13.7029 9.29705 13.7029 5.96272 17.0373C5.31247 17.6875 4.78903 18.4166 4.3924 19.1937M1 12C1 5.92487 5.92487 0.999999 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 0.999999 18.0751 1 12ZM16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10Z"
                    stroke="#111111"
                    stroke-width="2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2130_449">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="font-bold">{loggedin ? userName : "LOGIN"}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
