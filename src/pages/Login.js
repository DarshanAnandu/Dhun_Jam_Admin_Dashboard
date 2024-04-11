import React, { useState, useEffect } from "react";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();
    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            handleSignIn();
            event.preventDefault();
            // callMyFunction();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);
    


    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };
    const handleSignIn = () => {
        if (username === 'sample' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('name', name);
            navigate('/Dashboard');
        } else {
            alert('User Credentials are not valid, Enter Correctly')
        }
    }
    // const handleSignIn = async () => {
    //     try {
    //         const url = 'https://stg.dhunjam.in/account/admin/';
    //         const response = await fetch(`${url}login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username: username,
    //                 password: password,
    //             }),
    //         });
    //         if (!response.ok) {
    //             console.log('Bad Response for sign in, The Response', response);
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const responseData = await response.json();
    //         if (responseData && responseData.status === 200 && responseData.data) {
    //             const id = responseData.data.id;
    //             const token = responseData.data.token;
    //             localStorage.setItem('loggedIn', 'true');
    //             localStorage.setItem('id', id);
    //             console.log(process.env.PUBLIC_URL);
    //             navigate('/Dashboard', { state: { id, token } });
    //         } else {
    //             console.error('Unexpected response structure:', responseData);
    //         }
    //     } catch (error) {
    //         console.error('Login Error:', error);
    //     }
    // };

    return (
        <div className="login-page">
            <h1 className="headings">Venue Admin Login</h1>
            <div className="login-form">
                <div className="user">
                    <input
                        type="text"
                        value={name}
                        className="username border-[#fff] border"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="user">
                    <input
                        type="text"
                        value={username}
                        className="username border-[#fff] border"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="password-input-wrap">
                    <input
                        type={type}
                        name="password"
                        className="password border-[#fff] border"
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
            <div className="w-[25%] py-[55px] mt-[25px] flex flex-col bg-[#292727] hover:shadow-2xl rounded-2xl px-[22px]">
                <h1 className="font-semibold my-[14px]">It is an Interview Assignment, and it is hosted to showcase the talent of individual, the initial api wont work, so I hardcoded many features, please dont mind.</h1>
                <span>Username: sample</span>
                <span>Password: password</span>
            </div>
        </div>
    );
};

export default Login;
