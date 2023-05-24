import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
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

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const LogoutTimer = ({ timeoutInMinutes }) => {
  const navigate = useNavigate();
  const [isLogoutCalled, setIsLogoutCalled] = useState(false);
  const [startInactiveTimer, setStartInactiveTimer] = useState(true);
  const [startTime, setStartTime] = useState(null); // Move startTime to state
  const [beginInitTimer, setBeginInitTimer] = useState(true);
  //const rootElement = document.getElementById("root");
  //const root = useMemo(() => createRoot(rootElement), []);
  const timerIdRef = useRef(null);
  const intervalIdRef = useRef(null);
   
  // const userTimeLimit = async () => {
  //   const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  //   console.log(user.timeLimit)
  // }

  // userTimeLimit();

  const handleLogout = async () => {
    console.log('handleLogout called')
    console.log('timerIdRef.current1', timerIdRef.current)
    setIsLogoutCalled(true);
    const logout_user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    // Might need a if statement to check user.isLogin
    // This code must clear startTimer do I need to call startTimer and if yes add if statement
    // to startTimer to return nothing. If startTimer doesn't need to be call then figure out why
    // setStartInactiveTimer(true); and clearTimeout(timerIdRef.current); doesn't clear old timer
    try {
      setStartInactiveTimer(true);
      clearTimeout(timerIdRef.current);
      clearInterval(intervalIdRef.current);
      console.log('timerIdRef.current2', timerIdRef.current)
      await axios.get(`${logoutRoute}/${logout_user._id}`);
      localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
      
      navigate("/login");
      window.location.reload();
  } catch (ex) {
    console.log(ex);
  }
};

const startTimer = () => {
  const checkUserLogin = () => {
      const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if (!user || !user.isLogin) {
        console.log('startTimer Logout cause user is gone');
        clearTimeout(timerIdRef.current);
        clearInterval(intervalIdRef.current);
        console.log('timerIdRef.current64', timerIdRef.current)
        console.log('timerIdRef.current64', startInactiveTimer)
        return;
      }

    if (startInactiveTimer) {
      setStartTime(Date.now());
      clearTimeout(timerIdRef.current); // clear timerId from previous call
      console.log('startTimer');
      timerIdRef.current = setTimeout(() => {
        handleSessionExpiration();
      }, 1 * 60 * 1000);
      setStartInactiveTimer(false);
      //localStorage.setItem('lastUsername', user.username);
    }
   };

    checkUserLogin();

    intervalIdRef.current = setTimeout(checkUserLogin, 3000);
  };

  const handleContinueSession = () => {
    setIsLogoutCalled(true)
    clearTimeout(timerIdRef.current);
    startTimer();
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
    console.log('Interaction called: ', timerIdRef.current)

    
    const handleInteraction = () => {
      console.log('Interaction called: 239234678217')
      clearTimeout(timerIdRef.current);
      setStartInactiveTimer(true);
      startTimer();
    };

    // const handleReset = () => {
    //   console.log('HandleReset called: 89237517845')
    //   clearTimeout(timerIdRef.current);
    //   setStartInactiveTimer(true);
    //   handleBeforeUnload(null, timerIdRef.current);
    // };

    const handleBeforeUnload = (event) => {
      console.log('handleBeforeUnload called');
      if (!isLogoutCalled) {
        let timerId = null
        clearTimeout(timerId);
        timerIdRef.current = null
        clearTimeout(timerIdRef.current);
        const loggedInUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        console.log(loggedInUser)
        if (loggedInUser) {
          handleLogout();
          handleContinueSession()
        }
        delete event['returnValue'];
      }
    };
  
    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(intervalIdRef.current);
      let timerId = null
      clearTimeout(timerId);
      // timerIdRef.current = null
      // clearTimeout(timerIdRef.current);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, timeoutInMinutes, handleLogout, isLogoutCalled, beginInitTimer, startTime]);

  useEffect(() => {
    return () => {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [timerIdRef]);


  return null;
};

export default LogoutTimer;