<<<<<<< HEAD
export const host ="http://kidzsnap-heroku.herokuapp.com";
=======
export const host ="http://localhost:4000";
>>>>>>> main
export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/signup`;
export const getAllChildren = `${host}/api/user/children`;
export const registerChild = `${host}/api/user/child`;
export const logoutRoute = `${host}/api/user/logout`;
export const allUsersRoute = `${host}/api/user/allusers`;
export const getAllFriends = `${host}/api/user/allfriends`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/user/setavatar`;
export const getChildMessages = `${host}/api/messages/getmsg/:username`;
export const addFriend = `${host}/api/user/addfriend`;
export const addImage = `${host}/api/uploads/addimage`;
export const checkIfEmailExists = `${host}/api/user/checkemail/:email`;
export const checkIfUsernameExists = `${host}/api/user/checkusername/:username`;
export const checkIfPasswordMatch = `${host}/api/user/checkpasswordmatch/:username/:password`;
export const getSessionTime = `${host}/api/user/getsession/:id`;
export const deleteMessage = `${host}/api/messages/deleteMsg`;
export const childTimeLimit = `${host}/api/user/timelimit/:id`;
export const checkIfUserLogin = `${host}/api/user/checkuserlogin/:username`;
export const continueSession = `${host}/api/user/continuesession`;
export const getUserInfo = `${host}/api/user/userinfo/:id`;

