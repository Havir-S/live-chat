import React, {useEffect, useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setmessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message', messageData)
            setmessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        // socket.on('receive_message', (data) => {
        //     setmessageList((list) => [...list, data])
        // })
        socket.off('receive_message').on('receive_message', (data) => {
            setmessageList((list) => [...list, data])
        })
    }, [socket])

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
                {messageList.map((messageContent, index) => {
                    return <div key={index} className={messageContent.author === username ? 'message you' : 'message other'}>
                                <div>
                                    <div className='message-content'>  
                                    <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>  
                                    <p className='time'>{messageContent.time}</p>
                                    <p className='author'>{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder="Type.." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(ev) => {ev.key === 'Enter' && sendMessage()}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}
