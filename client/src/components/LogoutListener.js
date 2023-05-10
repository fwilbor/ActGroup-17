import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logoutRoute, continueSession } from "src/utils/APIRoutes";
import axios from "axios";

const SessionExpirationPopup = ({ onContinue, onLogout, startTime }) => {
  const [showPopup, setShowPopup] = useState(true);
  console.log('showPopup in SessionExpirationPopup:', showPopup);
  return (
    <div>
      <p>Your session is about to expire. Do you want to continue?</p>
      <button onClick={() => { onContinue(); window.location.reload(); }}>Continue Session</button>
      <button onClick={() => { onLogout(); window.location.href = '/login'; }}>Logout</button>
    </div>
  );
};

const SessionExpirationHandler = ({ onContinue, onLogout, isLogoutCalled, startTime }) => {
  //const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [timeRemaining, setTimeRemaining] = useState(null);
  console.log('showPopup in SessionExpirationHandler:', showPopup)

  useEffect(() => {
    let timerId = setTimeout(() => {
      setShowPopup(true);
    }, 3 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!showPopup) {
      console.log('do something when popup is hidden')
    }
  }, [showPopup]);

  const handleContinue = async () => {
    setShowPopup(false);
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    console.log(user)
  let currentTime = Date.now();
  // if (startTime === null) {
  //   const timeOffset = 63 * 1000; // 63 seconds in milliseconds
  //   startTime = currentTime + timeOffset;
  // }
  let timeElapsed = (currentTime - startTime);
  let remainingTime = (user.timeLimit) + timeElapsed;
  console.log(remainingTime)

  try {
    // Make the axios call with the timeRemaining value
    console.log('handleContinue')
    await axios.get(`${continueSession}/${user._id}?timeLimit=${remainingTime}`);

    // Update user.timeLimit with the new value
    const newTime = Math.max(0, remainingTime);
    user.timeLimit = newTime;
    console.log(newTime)
    localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));


    // Reload the page
    //navigate("/chat");
      //window.location.reload()

  } catch (error) {
    console.log(error);
  }
    startTime = currentTime; // update startTime

    
    
    onContinue();
    return null;
  };

  const handleLogout = () => {
    console.log('showPopup in handleLogout:', showPopup)
    setShowPopup(false);
    console.log('showPopup in handleLogout after setShowPopup:', showPopup)
    onLogout();
  };

  return (
    <>
      {showPopup && (
        <SessionExpirationPopup
          onContinue={handleContinue}
          onLogout={handleLogout}
          startTime={startTime}
        />
      )}
    </>
  );
};

const LogoutTimer = ({ timeoutInMinutes }) => {
  const navigate = useNavigate();
  const [isLogoutCalled, setIsLogoutCalled] = useState(false);
  const [startInactiveTimer, setStartInactiveTimer] = useState(true);
  const [startTime, setStartTime] = useState(null); // Move startTime to state
  const [beginInitTimer, setBeginInitTimer] = useState(true);
  const rootElement = document.getElementById("root");
  const root = useMemo(() => createRoot(rootElement), []);
  
  // const userTimeLimit = async () => {
  //   const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  //   console.log(user.timeLimit)
  // }

  // userTimeLimit();

  const handleLogout = async () => {
    setIsLogoutCalled(true);
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    // Might need a if statement to check user.isLogin
    try {
      await axios.get(`${logoutRoute}/${logout_user._id}`);
      localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
      navigate("/login");
      window.location.reload()
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleContinueSession = () => {
    let timerId = null
    setIsLogoutCalled(true)
    clearTimeout(timerId);
    startTimer();
  };

  const startTimer = () => {
    
  //   const currentLocation = window.location.pathname;

  // if (!user.isLogin || currentLocation !== "/chat") {
  //   return;
  // }

    if (startInactiveTimer) {
      setStartTime(Date.now());
      let timerId = null;
      clearTimeout(timerId);
      //console.log(timeoutInMinutes)
      timerId = setTimeout(() => {
        handleSessionExpiration();
      }, 1 * 60 * 1000);
      setStartInactiveTimer(false);
    }
  };

  const startLogoutTimer = () => {
    let timerId = null;
    timerId = setTimeout(() => {
      handleLogout();
    }, 30 * 1000);
  };

  const handleSessionExpiration = () => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    if (user && user.isLogin) {
    console.log('Confirm handleSessionExpiration')
    root.render(<SessionExpirationHandler onContinue={handleContinueSession} onLogout={handleLogout} isLogoutCalled={isLogoutCalled} startTime={startTime}/>);
    startLogoutTimer()
  } else {
    console.log('User is not logged in');
  }
  };

  

  useEffect(() => {
    startTimer();
    


    const handleInteraction = () => {
      console.log('Confirm handleInteraction')
      let timerId = null
      clearTimeout(timerId);
      setStartInactiveTimer(true);
      startTimer();
    };

    const handleBeforeUnload = (event) => {
      console.log('handleBeforeUnload called');
      if (!isLogoutCalled) {
        let timerId = null
        clearTimeout(timerId);
        const loggedInUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        console.log(loggedInUser)
        if (loggedInUser) {
          handleLogout();
        }
        delete event['returnValue'];
      }
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      let timerId = null
      clearTimeout(timerId);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, timeoutInMinutes, handleLogout, isLogoutCalled, beginInitTimer, startTime]);

  return null;
};

export default LogoutTimer;