import { useEffect } from 'react'

const MessageContainer = ({ messages, user }) => {
    const result = [];
    let temp = null;

    messages.forEach((ele) => {
        if (temp && ele.user.userId === temp.user.userId) {
            temp.mes.push(ele.message);
        } else {
            if (temp) {
                result.push(temp);
            }
            temp = {
                user: ele.user,
                mes: [ele.message]
            };
        }
    });

    if (temp) {
        result.push(temp);
    }

    useEffect(() => {
        const scrollToBottom = () => {
            const container = document.querySelector('.messages-list');
            container.scrollTop = container.scrollHeight;
        }
        scrollToBottom();

    }, [messages])

    return (<div className="messages-list">
        {
            result.map((ele, index) => {
                if (user.userId === ele.user.userId)
                    return (<div key={index} className="message-container-right">
                        <div className="messages">
                            {ele.mes.map((mes, index) => {
                                return (<div key={index} className="mes">{mes}</div>)
                            })}
                        </div>
                        <img alt="" src="./images/avatar.jpg"></img>
                    </div>)
                else {
                    return (<div key={index} className="message-container-left">
                        <img alt="" src="./images/avatar.jpg"></img>
                        <div className="messages">
                            {ele.mes.map((mes, index) => {
                                return (<div key={index} className="mes">{mes}</div>)
                            })}
                        </div>
                    </div>)
                }
            })
        }
    </div>)
};

export default MessageContainer;
