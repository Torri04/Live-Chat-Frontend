import { useState } from "react"

const WaitingRoom = ({ joinChatRoom }) => {
    const [userName, setUserName] = useState()
    const [chatRoom, setChatRoom] = useState()

    return <form onSubmit={e => {
        e.preventDefault()
        joinChatRoom(userName, chatRoom)
    }}>
        <input type="text" name="username" onChange={e => setUserName(e.target.value)}></input>
        <input type="text" name="chatroom" onChange={e => setChatRoom(e.target.value)}></input>
        <button type="submit"></button>
    </form>
}
export default WaitingRoom