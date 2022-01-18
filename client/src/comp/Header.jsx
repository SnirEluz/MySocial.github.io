import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import settingHeader from './image/settingHeader.png'
import notficationHeader from './image/notficationHeader.png'

import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';



export default function Header({ userSession, setUserSession, setUpdatePosts }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const { pathname } = useLocation()
    if (pathname === '/login' || pathname === '/register') return null;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const logout = async () => {
        const res = await fetch('http://localhost:1001/users/logout', {
            method: 'delete',
            credentials: 'include'
        })
        const data = await res.json()
        if (data.err) {
            console.log(data.err)
        } else {
            localStorage.removeItem('userName')
            navigate('/login')
        }
    }
    return (
        <div className="Header">
            <div className="SubHeader">
                <div className="Logo" onClick={() => { navigate('/') }}>
                    <h1>Social Place</h1>
                </div>
                <div className="HeaderOptions">
                    <div className="settingHeader" >
                        <img src={settingHeader} alt="" onClick={handleClick} />
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
                                    width: '180px',
                                    border: "none",
                                    color: "gray",
                                    fontSize: "11px",
                                    fontWeight: 400
                                }}
                                variant="outlined"
                                onClick={() => { setAnchorEl(handleClose()) }}
                                startIcon={<DeleteOutlineOutlinedIcon />}>
                                Setting
                            </Button>
                            <Button
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: 'flex-start',
                                    padding: "15px",
                                    width: '180px',
                                    border: "none",
                                    color: "gray",
                                    fontSize: "11px",
                                    fontWeight: 400
                                }}
                                variant="outlined"
                                onClick={() => {
                                    logout()
                                    setAnchorEl(handleClose())
                                }}
                                startIcon={<ModeEditOutlineOutlinedIcon />}>
                                Logout
                            </Button>
                        </Popover>
                    </div>
                    <div className="notficationHeader" >
                        <img src={notficationHeader} alt="" />
                        <div className="notfication"><h6>1</h6></div>
                    </div>
                    <div className="userProfilePic" onClick={() => {
                        setUpdatePosts(a=>!a)
                        navigate(`/users/${userSession.userName}`)
                        }}>
                        {/* <a href={`/users/${userSession.userName}`}> */}
                        <img src={userSession.userProfilePic} alt="" />
                        {/* </a> */}
                    </div>
                    <h1>Me</h1>
                </div>
            </div>
        </div>
    )
}

