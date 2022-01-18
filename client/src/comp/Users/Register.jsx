import React, { useState } from 'react'
import $ from 'jquery';
import './Users.scss'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [userFullName, setUserFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userProfilePic, setUserProfilePic] = useState('https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1642282260~hmac=6984426168f5db18ea905579cc25084c')

    const [userBDay, setUserBDay] = useState('')
    const [userBMonth, setUserBMonth] = useState('')
    const [userBYear, setUserBYear] = useState('')
    const [userBirthday, setUserBirthday] = useState('')
    const [userPhoneNum, setUserPhoneNum] = useState('')
    const [userCountry, setUserCountry] = useState('')

    const [missingInfo, setMissingInfo] = useState(false)
    const [missingInfoMessage, setMissingInfoMessage] = useState('')

    const navigate = useNavigate()

    const register = async () => {
        const res = await fetch('http://localhost:1001/users/register', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userFullName: userFullName,
                userName: userName,
                userPassword: userPassword,
                userProfilePic: userProfilePic,
                userPhoneNum: userPhoneNum,
            }),
            credentials: 'include'
        })
        const data = await res.json()
        setMissingInfoMessage(data.err)
        if (data.msg) {
            navigate('/login')
        }
    }
    return (
        <div className="Register">
            <div className="RegisterBox">
                <h1>Register</h1>
                <input type="text"
                    required
                    placeholder="*Full Name"
                    className='FullName'
                    onChange={(e) => setUserFullName(e.target.value)} />
                <input type="text"
                    required
                    placeholder="*Username"
                    className='Username'
                    onChange={(e) => setUserName(e.target.value)} />
                <input type="password"
                    required
                    placeholder="*Password"
                    className='Password'
                    onChange={(e) => setUserPassword(e.target.value)} />
                <input type="text"
                    placeholder="Profile Picture"
                    onChange={(e) => setUserProfilePic(e.target.value)} />
                <div className="Birthday">
                    <h4>Date of birth</h4>
                    <div className="BirthdayInp">
                        <input type="text"
                            placeholder='Day'
                            onChange={(e) => {
                                setUserBDay(e.target.value)}} />
                        <select name="" id=""
                            onChange={(e) => setUserBMonth(e.target.value)}>
                            <option defaultValue value='Janaury'>Janaury</option>
                            <option value='February'>February</option>
                            <option value='March'>March</option>
                            <option value='April'>April</option>
                            <option value='May'>May</option>
                            <option value='June'>June</option>
                            <option value='July'>July</option>
                            <option value='August'>August</option>
                            <option value='September'>September</option>
                            <option value='October'>October</option>
                            <option value='November'>November</option>
                            <option value='December'>December</option>
                        </select>
                        <input type="text"
                            placeholder='Year'
                            onChange={(e) => {setUserBYear(e.target.value)}} />
                    </div>

                    <div className='NumberAndCountry'>
                        <input type="text"
                            placeholder="Country"
                            onChange={(e) => setUserCountry(e.target.value)}
                        />
                        <input type="text"
                            placeholder="Phone Number"
                            onChange={(e) => setUserCountry(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="RegisterButton"
                    onClick={() => {
                        console.log(userBirthday)
                        setUserBirthday(userBDay + userBMonth + userBYear)
                        setMissingInfo(true)
                        if (userFullName && userName && userPassword) {
                            register()
                        } else {
                            setMissingInfoMessage("Missing some info")
                        }
                        if (!userFullName) { $('.FullName').css("border", "red solid 1px"); } else { $('.FullName').css("border", "#cecece solid 1px"); }
                        if (!userName) { $('.Username').css("border", "red solid 1px"); } else { $('.Username').css("border", "#cecece solid 1px"); }
                        if (!userPassword) { $('.Password').css("border", "red solid 1px"); } else { $('.Password').css("border", "#cecece solid 1px"); }
                    }}>Register</button>
                {missingInfo ? <h4 className="MissingInfoMessage">{missingInfoMessage} !!</h4> : null}
                <br />
                <div className="LoginBox">
                    <button className='LoginButton' onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </div >
    )
}

// i would like to know how can i push array into column
// here is example how i want to get it

// [enter image description here][1]

// there is option to insert(push) to this field every time that i click on button ?
//     like to get[London, Paris, Los Angles]



// [1]: https://i.stack.imgur.com/YkC77.png