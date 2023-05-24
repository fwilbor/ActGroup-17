import LogoutListener from "./components/LogoutListener";
import Chat from "./pages/ChatRoom";

function ChatPage() {
  return (
    <>
      <LogoutListener timeoutInMinutes={1} />
      <Chat />
    </>
  );
}

export default ChatPage;