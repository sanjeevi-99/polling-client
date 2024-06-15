// import { data } from 'jquery'
import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])
    const id = localStorage.getItem('userid');

    useEffect(() => {
        socket.on("newUserResponse", data => {
            const filteredItems = data.filter(function (item) {
                return item.id !== id
            })
            setUsers(filteredItems);
            localStorage.setItem('socketid', socket.id)
            console.log('active users', data);
            console.log('active users', filteredItems);
        })
    }, [socket, users])

    return (
        <div className='chat__sidebar'>
            <h2>Open Chat</h2>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {users.map(user => <p key={user.id}>{user.name}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatBar