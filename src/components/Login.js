import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
// import socketIO from "socket.io-client"

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const history = useHistory();
    // const socket = socketIO.connect("https://polling-backend-ze8u.onrender.com")

    const handleOnChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }
    const preventRefresh = async (e) => {
        e.preventDefault();
        console.log(form);

        const result = await axios.post("https://polling-backend-ze8u.onrender.com/auth/login", form)
        console.log('result', result);
        if (result.data.status_code === 200) {
            const token = result.data.token;
            const id = result.data.id;
            const name = result.data.data.name;
            localStorage.setItem("userName", name);
            localStorage.setItem("userid", id)
            // socket.emit("newUser", { name, socketID: socket.id })
            localStorage.setItem("token", token)
            if (form.email !== '' && form.password !== '') {
                history.push('/polls');
                message.success('Login Success', 3)
            }
        }
        else {
            message.error(result.data.message, 5)
        }
    };

    return (
        <div className="wrapper signIn">
            {/* <div className="illustration">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREujJwyaMGywC403E0bvRW7gD69ES7GLysDQ&usqp=CAU" alt="illustration" />
			</div> */}
            <div className="form">
                <div className="heading">LOGIN</div>
                <form className="form-signin" onSubmit={preventRefresh}>
                    <div>
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" placeholder="Enter you mail" onChange={(e) => handleOnChange("email", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={(e) => handleOnChange("password", e.target.value)} />
                    </div>

                    <button type="submit">
                        Submit
                    </button>
                </form>
                <p>
                    Don't have an account ? <Link to="/signup"> Sign In </Link>
                </p>
            </div>
        </div>
    );
}
