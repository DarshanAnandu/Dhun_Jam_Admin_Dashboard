import React, { useState } from "react";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };
    const handleSignIn = async () => {
        try {
            const url = 'https://stg.dhunjam.in/account/admin/';
            const response = await fetch(`${url}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                console.log('Bad Response for sign in, The Response', response);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData && responseData.status === 200 && responseData.data) {
                const id = responseData.data.id;
                const token = responseData.data.token;
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('id', id);
                console.log(process.env.PUBLIC_URL);
                navigate('/Dashboard', { state: { id, token } });
            } else {
                console.error('Unexpected response structure:', responseData);
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="login-page">
            <h1 className="headings">Venue Admin Login</h1>
            <div className="login-form">
                <div className="user">
                    <input
                        type="text"
                        value={username}
                        className="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="password-input-wrap">
                    <input
                        type={type}
                        name="password"
                        className="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <span className="password-icon" onClick={handleToggle}>
                        <Icon className="icon" icon={icon} size={25} />
                    </span>
                </div>
                <button className="sgn-btn" onClick={() => { handleSignIn() }}>Sign In</button>
                <span className="reg">New Register ?</span>
            </div>
        </div>
    );
};

export default Login;
