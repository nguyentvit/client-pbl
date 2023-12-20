import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const {token} = useContext(AuthContext);

    const recipientId = chat?.userIds?.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async() => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`, token);

            if(response.error) {
                return setError(error)
            }
            setRecipientUser(response);
        }

        getUser();

    }, [recipientId])

    return {recipientUser};
}