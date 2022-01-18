import React from 'react'
import './Feed.scss'
import Messanger from '../Messanger/Messanger'
import FeedMain from './FeedComp/FeedMain'

export default function Feed({
    userSession,
    setUserSession,
    updatePosts,
    setUpdatePosts }) {
    return (
        <div className="Feed">
            <Messanger />
            <FeedMain
                userSession={userSession}
                updatePosts={updatePosts}
                setUpdatePosts={setUpdatePosts} />
        </div>
    )
}

