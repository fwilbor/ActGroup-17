import { MessagesContext } from "../context/MessageContext";
import { useContext } from "react";

export const useMessagesContext = () => {
    const context = useContext(MessagesContext)

    if (!context) {
        throw Error("useMessagesContext must be used inside a MessagesContextProvider")
    }

    return context
}