import { Container, Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import avatar from "../../assets/avatar.svg";
import "./ChatBox.css";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFecthLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useFecthLatestMessage(chat);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter((n) => {
    return n.postedByUser._id === recipientUser?.user._id;
  });

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?.user?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <Stack
      direction="horizontal"
      className="user-card "
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="user-chat">
          <img src={avatar} />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.user.name}</div>
          <div className="text">
            {latestMessage?.message?.messageText && (
              <span>{truncateText(latestMessage?.message?.messageText)} </span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
