import { useState } from "react"

const SendMessageForm = ({ SendMessage }) => {
    const [message, setMessage] = useState();

    return <form onSubmit={(e) => {
        e.preventDefault();
        SendMessage(message);
        setMessage("");
    }}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
        <button type="submit"></button>
    </form>
}

export default SendMessageForm;