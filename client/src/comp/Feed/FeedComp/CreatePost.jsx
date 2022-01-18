import React, { useState } from 'react'
import createPostImage from './image/createPostImage.png'
import { v4 } from "uuid";



export default function CreatePost({ userSession, setUpdatePosts }) {
    const [postBody, setPostBody] = useState("")
    const [postImg, setPostImg] = useState("")
    const creatPost = async () => {
        await fetch('http://localhost:1001/posts/creatPost', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId: v4(),
                userName: userSession.userName,
                userFullName: userSession.userFullName,
                userProfilePic: userSession.userProfilePic,
                // postDate: "date From Server",
                postBody: postBody,
                postImg: postImg,
                postLikes: 0,
                postLikesBy: '',
                postComments: ''
            }),
            credentials: 'include'
        })
        setUpdatePosts(a => !a)
    }
    return (
        <div className="CreatePost">
            <div className="CreatePostProfile">
                <img src={userSession.userProfilePic} alt="" />
                <h1>{userSession.userFullName}</h1>
            </div>
            <div className="CreatePostBody">
                <div className="ShareComment">
                    <textarea onChange={(e) => { setPostBody(e.target.value) }} name="" value={postBody} id="" cols="30" rows="10"></textarea>
                </div>
                <div className="ShareImage">
                    <div>
                        <img src={createPostImage} alt="" />
                        <h2>Image</h2>
                    </div>
                    <input onChange={(e) => { setPostImg(e.target.value) }} type="text" value={postImg} placeholder="Image Url" />
                </div>
            </div>
            <div className="CreatePostShare">
                <button
                    disabled={!postBody && !postImg ? true : false}
                    onClick={() => {
                        creatPost()
                        setPostImg('')
                        setPostBody('')
                    }}>Publish</button>
            </div>
        </div>
    )
}
