import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

const Home = ({ props }) => {
    const navigate = useHistory()
    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        navigate.push("/chat", { params: userName })
    }
    return (
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>Enter Name to Start chat</h2>
            <label htmlFor="username">Username</label>
            <input type="text"
                minLength={4}
                name="username"
                id='username'
                className='username__input'
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            <button className='home__cta'>Start Chat</button>
        </form>
    )
}

export default Home