import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user, token } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  return (
    <Container
      style={{
        display: "flex", // Sắp xếp các user chat theo hàng ngang
        flexDirection: "column", // Dàn layout theo chiều dọc
        gap: "10px", // Khoảng cách giữa các user chat
        padding: "10px", // Padding cho khung lớn
        border: "1px solid #ccc", // Khung viền
        borderRadius: "8px", // Độ cong góc
        background: " azure"
      }}
    >
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            <Stack
              className="userchat_containers"
              style={{
                display: "flex", // Sắp xếp các user chat theo hàng ngang
                flexDirection: "column", // Dàn layout theo chiều dọc
                gap: "10px", // Khoảng cách giữa các user chat
                padding: "10px", // Padding cho khung lớn
                border: "1px solid #ccc", // Khung viền
                borderRadius: "8px", // Độ cong góc
                background: "linear-gradient(90deg, rgb(186, 245, 245) 0%, #dae5f9 150% )"
              }}
            >
              {userChats?.map((chat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateCurrentChat(chat);
                    }}
                  >
                    <UserChat chat={chat} user={user} token={token} />
                  </div>
                );
              })}
            </Stack>
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
