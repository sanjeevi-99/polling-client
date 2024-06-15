import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const history = useHistory();

    const handleOnChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }
    const preventRefresh = async (e) => {
        e.preventDefault();
        console.log(form);

        const result = await axios.post("https://polling-backend-ze8u.onrender.com/auth/signup", form)
        if (result.data.status_code === 200) {
            if (form.email !== '' && form.password !== '') {
                history.push('/');
                message.success(result.data.message, 3)
            }
            // navigate("/table")
        }
        else {
            message.error(result.data.message, 3)
        }    

    };

    return (
        <div className="wrapper signUp">
            {/* <div className="illustration">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREujJwyaMGywC403E0bvRW7gD69ES7GLysDQ&usqp=CAU" alt="illustration" />
      </div> */}
            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>
                <form className="form-signin" onSubmit={preventRefresh}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" onChange={(e) => handleOnChange("name", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="name">E-Mail</label>
                        <input type="text" id="email" placeholder="Enter your email" onChange={(e) => handleOnChange("email", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter you password"
                            onChange={(e) => handleOnChange("password", e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <h2 align="center" className="or">
                        OR
                    </h2>
                </form>
                <p>
                    Have an account ? <Link to="/"> Login </Link>
                </p>
            </div>
        </div>
    );
}
