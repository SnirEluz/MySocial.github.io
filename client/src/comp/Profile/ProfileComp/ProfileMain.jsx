import React from 'react'
import ProfileCreatePost from './ProfileCreatePost'
import ProfilePosts from './ProfilePosts'
import ProfileSection from './ProfileSection'

export default function ProfileMain({ posts, setUpdatePosts, userSession, userSessionProfile }) {
    return (
        <div className="ProfileMain">
            <ProfileSection posts={posts} userSessionProfile={userSessionProfile} />
            {userSession.userName == userSessionProfile.userName ?
                <ProfileCreatePost
                    userSession={userSession}
                    setUpdatePosts={setUpdatePosts} />
                :
                null
            }
            {posts.map((post, i) => <ProfilePosts
                key={i} post={post}
                userSession={userSession}
                userSessionProfile={userSessionProfile}
                setUpdatePosts={setUpdatePosts}
            />)}
        </div>
    )
}
