import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import "../pages/Chat.css";
import "../pages/CreateChat.css"
import { FcPlus } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import CreateChat from "./CreateChat";
const Chat = () => {
  const { user, token } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <Container
      style={{
      //   display: "flex", // Sắp xếp các user chat theo hàng ngang
      //   flexDirection: "column", // Dàn layout theo chiều dọc
      //   gap: "10px", // Khoảng cách giữa các user chat
      //   padding: "10px", // Padding cho khung lớn
      //   border: "1px solid #ccc", // Khung viền
      //   borderRadius: "8px", // Độ cong góc
      //   background: " azure",
      width: "1320px",
           height: "700px"
      }}

    >
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            <Stack className="userchat_containers">
              <div className="userchat_header">
              <h4>Chat</h4>
              <FcPlus style={{height: "30px", width: "40px"}} onClick={openModal}/>
              
              </div>
              {isModalOpen && (
              <div>
                <CreateChat onClose={closeModal}/>
              </div>)}
              
             
              <div className="searchUser">
                {/* Thanh tìm kiếm */}
                <input
                  className="search-input"
                  type="text"
                  placeholder="  Search users..."
                /> <IoIosSearch />
               
              </div>
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
