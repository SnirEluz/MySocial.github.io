import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'

export default function FeedMain({
    userSession,
    updatePosts,
    setUpdatePosts
}) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:1001/posts', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const data = await res.json()
            setPosts(data.reverse())
        })()
    }, [updatePosts])
    return (
        <div className="FeedMain">
            <CreatePost userSession={userSession} setUpdatePosts={setUpdatePosts}/>
            {posts.map((post, i) => <Post key={i} post={post} userSession={userSession} setUpdatePosts={setUpdatePosts}/>)}
        </div>
    )
}
