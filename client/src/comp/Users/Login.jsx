import React, { useState } from 'react'
import './Users.scss'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [missingInfo, setMissingInfo] = useState(false)
    const [missingInfoMessage, setMissingInfoMessage] = useState('')

    const navigate = useNavigate()


    const login = async () => {
        const res = await fetch('http://localhost:1001/users/login', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, userPassword }),
            credentials: 'include'
        })
        const data = await res.json()
        setMissingInfoMessage(data.err)
        if (data.msg) {
            localStorage.userName = data.user
            navigate('/')
            window.location.reload();
        }
    }
    return (
        <div className="Login">
            <div className="LoginBox">
                <h1>Login</h1>
                <input type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input type="password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <button className="LoginButton" onClick={() => {
                    login()
                    setMissingInfo(true)
                }}>Login</button>
                {/* <h4 className="MissingInfoMessage">Missing Info Message</h4> */}
                {missingInfo ? <h4 className="MissingInfoMessage">{missingInfoMessage} !!</h4> : null}
                <br />
                <div className='RegisterBox'>
                    <button className="RegisterButton" onClick={() => navigate('/register')}>Create New Account</button>
                </div>
            </div>
        </div >
    )
}