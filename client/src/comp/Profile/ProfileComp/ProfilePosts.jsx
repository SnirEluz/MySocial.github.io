import React, { useState } from 'react'
import postMenu from './image/postMenu.png'
import user from './image/user.jpeg'
import likePost from './image/likePost.png'
import unLikePost from './image/unLikePost.png'
import sharePost from './image/sharePost.png'
import commentPost from './image/commentPost.png'

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom'

export default function ProfilePosts({
    post,
    userSession,
    userSessionProfile,
    setUpdatePosts }) {
    const [like, setLike] = useState([false, unLikePost])
    const navigate = useNavigate()
    //#region
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //#endregion
    const handleLike = async (type, boolean, picType) => {
        console.log("dsa")
        const res = await fetch(`http://localhost:1001/posts/likePost/${type}?postId=${post.postId}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
        const data = await res.json()
        setLike([boolean, picType])
        setUpdatePosts(a => !a)
    }

    return (
        <div className="ProfilePosts">
            <div className="postProfileInfo">
                <div className="ProfileP">
                    <div className="ProfilePicP">
                        <img src={post.userProfilePic} alt="" onClick={() => { navigate(`/users/${post.userName}`) }} />
                    </div>
                    <div className="ProfileInfoP">
                        <h1 onClick={() => { navigate(`/users/${post.userName}`) }}>{post.userFullName}</h1>
                        <h2>{post.postDate}</h2>
                    </div>
                </div>
                <div className="ToolsP">
                    <img src={postMenu} alt="" />
                </div>
            </div>

            <div className="postBody">
                <p>{post.postBody}</p>
                <img src={post.postImg} alt="" />
            </div>

            <div className="LikesAndComments">
                <div className="Likes">
                    <h4>{post.postLikes} likes</h4>
                </div>
                <div className="Comments">
                    <h4>{post.postLikes.length} Comments</h4>
                </div>
            </div>

            <div className="postActions">
                <div className="likePost"
                    onClick={async () => {
                        if (like[0] === false) {
                            handleLike("like", true, likePost)
                        } else {
                            handleLike("unLike", false, unLikePost)
                        }
                    }}>
                    <img src={like[1]} alt="" />
                    <h1>Like</h1>
                </div>
                <div className="commentPost"
                    onClick={() => { document.getElementById(post.postId).focus(); return false; }}>
                    <img src={commentPost} alt="" />
                    <h1>Comment</h1>
                </div>
                <div className="sharePost">
                    <img src={sharePost} alt="" />
                    <h1>Share</h1>
                </div>
            </div>

            <div className="PostComments">
                <div className="CommentProfileP">
                    <img src={user} alt="" />
                </div>
                <div className="CommentInfoP">
                    <h1>Snir Eluz</h1>
                    <p>Here is my first comment</p>
                    <h2>3 Hours</h2>
                </div>
                <div className="ToolsP">
                    <img src={postMenu} alt="" onClick={handleClick} />
                    <Popover
                        className="Popover"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}>
                        <Button
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'flex-start',
                                padding: "15px",
                                width: '220px',
                                border: "none",
                                color: "gray",
                                fontSize: "11px",
                                fontWeight: 400
                            }}
                            variant="outlined"
                            onClick={() => { setAnchorEl(handleClose()) }}
                            startIcon={<DeleteOutlineOutlinedIcon />}>
                            Delete Comment
                        </Button>
                        <Button
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: 'flex-start',
                                padding: "15px",
                                width: '220px',
                                border: "none",
                                color: "gray",
                                fontSize: "11px",
                                fontWeight: 400
                            }}
                            variant="outlined"
                            onClick={() => { setAnchorEl(handleClose()) }}
                            startIcon={<ModeEditOutlineOutlinedIcon />}>
                            Edit Comment
                        </Button>
                    </Popover>
                </div>
            </div>

            <div className="CreateComment">
                <div className="ProfilePic">
                    <img src={userSession.userProfilePic} alt="" />
                </div>
                <div className="CreateCommentInput">
                    <input id={post.postId} type="text" placeholder="Write comment" />
                </div>
            </div>
        </div>
    )
}

