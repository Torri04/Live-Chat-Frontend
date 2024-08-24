const ChatContainer = ({ info, ClickChatContainer }) => {
    return (<div onClick={() => ClickChatContainer(info.chatRoom.chatRoomId)} className="chat_container">
        <img alt="" src="./images/avatar.jpg"></img>
        <div className="user-info">
            <span>{info.chatRoom.roomName}</span>
            <span>name</span>
        </div>
    </div>)
}
export default ChatContainer;