import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import ChatBox from "../components/chat/ChatBox";
import "../pages/Chat.css";
import { FcPlus } from "react-icons/fc";
import CreateChat from "./CreateChat";
const Chat = () => {
  const { user, token } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, testWithName } =
    useContext(ChatContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keySearch, setKeySearch] = useState([]);
  const [start, setStart] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };
  console.log(keySearch);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const kq = testWithName.filter((user) =>
      user?.name.startsWith(e.target.value)
    );
    setKeySearch(kq);
    setStart(false);
  };

  return (
    <Container
      style={{
        width: "1320px",
        height: "700px",
      }}
    >
      {userChats?.length < 0 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            <Stack className="userchat_containers">
              <div className="userchat_header">
                <h4>Chat</h4>
                <FcPlus
                  style={{ height: "30px", width: "40px" }}
                  onClick={openModal}
                />
              </div>
              {isModalOpen && (
                <div>
                  <CreateChat onClose={closeModal} />
                </div>
              )}

              <div className="searchUser">
                {/* Thanh tìm kiếm */}
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search users..."
                  onChange={handleSearch}
                />
              </div>
              {start &&
                userChats?.map((chat, index) => {
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
              {!start &&
                userChats?.map((chat, index) => {
                  {
                    if (keySearch?.some((k) => k.idChat === chat._id)) {
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
                    }
                  }
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
