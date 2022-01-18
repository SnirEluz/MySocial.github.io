import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Feed from './Feed/Feed'
import Profile from './Profile/Profile'
import Login from './Users/Login'
import Register from './Users/Register'

export default function Main({
    userSession,
    setUserSession,
    updatePosts,
    setUpdatePosts
}) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Feed
                    userSession={userSession}
                    setUserSession={setUserSession}
                    updatePosts={updatePosts}
                    setUpdatePosts={setUpdatePosts} />} />
                <Route path="/users/:profileName" element={<Profile
                    userSession={userSession}
                    updatePosts={updatePosts}
                    setUpdatePosts={setUpdatePosts} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}
