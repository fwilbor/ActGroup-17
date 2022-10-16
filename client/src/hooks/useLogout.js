import { useAuthContext } from "./useAuthContext"
import { useMessagesContext } from "./useMessagesContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: messagesDispatch } = useMessagesContext()


    const logout = () => {
        // remove user from storage
        localStorage.removeItem("user")

        // dispatch logout action
        dispatch({type: "LOGOUT"})
        messagesDispatch({type: "SET_MESSAGES", payload: null})

    }

    return {logout}
}