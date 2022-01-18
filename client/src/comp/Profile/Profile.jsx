import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Messanger from '../Messanger/Messanger'
import './Profile.scss'
import ProfileMain from './ProfileComp/ProfileMain'

export default function Profile({
    userSession,
    updatePosts,
    setUpdatePosts
}) {
    const [posts, setPosts] = useState([])
    const [userSessionProfile, setUserSessionProfile] = useState([])
    const {profileName} = useParams()
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:1001/users/${profileName}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const data = await res.json()
            await setUserSessionProfile(data)
            const postRes = await fetch('http://localhost:1001/posts', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const podtData = await postRes.json()
            const newData = await podtData.filter(p => p.userName === data.userName)
            await setPosts(newData.reverse())
        })();
    }, [updatePosts])
    
    return (
        <div className="Profile">
            <Messanger />
            <ProfileMain
                posts={posts}
                setUpdatePosts={setUpdatePosts}
                userSession={userSession}
                userSessionProfile={userSessionProfile}
            />
        </div>
    )
}
