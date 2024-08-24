import '../styles/scss/Chat.scss'
import AppContext from '../Components/appcontext'
import { useState, useContext, useEffect } from 'react'
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import ChatContainer from '../Components/chatcontainer'
import MessageContainer from '../Components/messagecontainer'

const ChatPage = () => {
    const { user } = useContext(AppContext);
    const [conn, setConnection] = useState();
    const [chatRoom, setChatRoom] = useState("");
    const [joinedChatRoom, setJoinedChatRoom] = useState([])
    const [chatHistory, setChatHistory] = useState([])
    const [message, setMessage] = useState()
    const [focusedChatRoomId, setFocusedChatRoomId] = useState()

    useEffect(() => {
        const userChatRoom = async () => {
            await fetch(`http://localhost:5198/api/userchatroom/${user.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setJoinedChatRoom(data)
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
        userChatRoom();
    }, [user])

    useEffect(() => {
        const connectToHub = async () => {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("http://localhost:5198/chat", {
                        accessTokenFactory: () => user.token,
                    })
                    .configureLogging(LogLevel.Information)
                    .build();

                connection.on("ReceiveJoinChatRoom", (userChatRoom) => {
                    setJoinedChatRoom(joinedChatRoom => [userChatRoom, ...joinedChatRoom])
                });

                connection.on("ReceiveMessage", (newMessage) => {
                    setChatHistory(chatHistory => [...chatHistory, newMessage])
                });

                await connection.start();
                setConnection(connection);
            } catch (e) {
                console.log(e);
            }
        };
        connectToHub();
    }, [user.token]);

    async function JoinChatRoom(e) {
        e.preventDefault();
        try {
            await conn.invoke("JoinSpecificChatRoom", { ChatRoom: chatRoom })
        }
        catch (e) {
            console.log(e);
        }
    }
    async function ClickChatContainer(id) {
        await fetch(`http://localhost:5198/api/chatmessage/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setChatHistory(data)
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        setFocusedChatRoomId(id)
    }
    async function SendMessage(e) {
        e.preventDefault();
        try {
            await conn.invoke("SendMessage", message, focusedChatRoomId)
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <section className="chat-container">
            <div className="left-side">
                <div className="head-left-side">
                    <img alt="" src="./images/avatar.jpg"></img>
                    <div className="user-info">
                        <span>Username</span>
                        <span>name</span>
                    </div>
                </div>
                <div className="user-chat">
                    <form onSubmit={(e) => JoinChatRoom(e)} method="POST" className="search-container">
                        <input value={chatRoom} onChange={(e) => setChatRoom(e.target.value)} name="search" id="search" type="text" placeholder="Thêm nhóm mới"></input>
                        <button type="submit">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </form>
                    <div className="chat-list">
                        {
                            joinedChatRoom.map((ele, index) => <ChatContainer ClickChatContainer={ClickChatContainer} key={index} info={ele}></ChatContainer>)
                        }
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="head-right-side">
                    <img alt="" src="./images/avatar.jpg"></img>
                    <div className="user-info">
                        <span>Username</span>
                    </div>
                </div>
                {chatHistory && chatHistory.length > 0 ? (
                    <MessageContainer messages={chatHistory} user={user} />
                ) : (
                    <p>No messages available</p>
                )}
                <form onSubmit={e => SendMessage(e)} method="POST" className="foot-right-side">
                    <input value={message} onChange={(e) => setMessage(e.target.value)} id="message" name="message" type="text" placeholder="Nhập tin nhắn"></input>
                    <button type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </section>
    )
}
export default ChatPage;