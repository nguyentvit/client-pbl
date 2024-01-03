import {useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";
import { AuthContext } from "../context/AuthContext";

export const useFecthLatestMessage = (chat) =>
{
    const {newMessage, notifications} = useContext(ChatContext);
    const {token} = useContext(AuthContext);
    const [latestMessage, setLatestMessage] = useState(null);
    useEffect (()=> {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/room/${chat?._id}`, token);
            
            if (response.error)
            {
            return console.log("Error getting messages...");
        }
        const lastMessage = response?.conversation[response?.conversation.length - 1];
        setLatestMessage(lastMessage);
    };
    getMessages();
}, [newMessage, notifications]);
return {latestMessage};
};
