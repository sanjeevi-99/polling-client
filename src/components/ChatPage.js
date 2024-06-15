import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useLocation } from 'react-router-dom'
import socketIO from "socket.io-client"
import '../styles/Chat.css'
const ChatPage = ({ props }) => {
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);
    const socket = socketIO.connect("https://polling-backend-ze8u.onrender.com")
    const location = useLocation();
    const name = location.state.params;
    const id = localStorage.getItem('userid');

    let socketid = socket.id;
    useEffect(() => {
        const socket_id = localStorage.getItem('socketid');
        if (!socket_id) {
            socket.emit("newUser", { name, id, socketID: socketid })
        }
        else {
            console.log('already connected');
        }
    }, [])

    useEffect(() => {
        socket.on("messageResponse", data => setMessages([...messages, data]))
    }, [socket, messages])

    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])



    //   useEffect(() => {
    //     // 👇️ scroll to bottom every time messages change
    //     lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    //   }, [messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className='chat__main'>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}

export default ChatPage