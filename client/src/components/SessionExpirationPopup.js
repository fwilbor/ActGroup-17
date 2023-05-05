const SessionExpirationPopup = ({ onContinue, onLogout }) => {
    return (
      <div>
        <p>Your session is about to expire. Do you want to continue?</p>
        <button onClick={onContinue}>Continue Session</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    );
  };
  
  export default SessionExpirationPopup;