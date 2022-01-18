import React from 'react'
import ProfileBirthday from './image/ProfileBirthday.png'
import ProfilePhone from './image/ProfilePhone.png'
import ProfileLocation from './image/ProfileLocation.png'
import ProfileJoined from './image/ProfileJoined.png'
import ProfileUrl from './image/ProfileUrl.png'
import postMenu from './image/postMenu.png'

export default function ProfileSection({ posts, userSessionProfile }) {
    return (
        <div className="ProfileSection">
            <div className="ProfileCover">
                <div className="CoverPic">
                    <img src={userSessionProfile.userProfilePic} alt="" />
                </div>
                <div className="ProfilePic">
                    <img src={userSessionProfile.userProfilePic} alt="" />
                </div>
                <div className="Gradient">

                </div>
            </div>
            <div className="ProfileInformation">
                <h4>{userSessionProfile.userFullName}</h4>
                <div className="ProfileActions">
                    <button>Follow</button>
                    <img src={postMenu} alt="" />
                </div>
                <div className="ProfileInfo">
                    <div>
                        <img src={ProfileBirthday} alt="" />
                        <p>{userSessionProfile.userBirthday}</p>
                    </div>
                    <div>
                        <img src={ProfilePhone} alt="" />
                        <p>{userSessionProfile.userPhoneNum}</p>
                    </div>
                    <div>
                        <img src={ProfileLocation} alt="" />
                        <p>{userSessionProfile.userLocation}</p>
                    </div>
                    <div>
                        <img src={ProfileJoined} alt="" />
                        <p>{userSessionProfile.userJoinDate}</p>
                    </div>
                    <div>
                        <img src={ProfileUrl} alt="" />
                        <p>{userSessionProfile.userName}</p>
                    </div>
                </div>
            </div>
            <div className="ProfileStats">
                <div className="Followers">
                    <h5>0</h5>
                    <h3>Followers</h3>
                </div>
                <div className="Following">
                    <h5>0</h5>
                    <h3>Following</h3>
                </div>
                <div className="Posts">
                    <h5>{posts.length}</h5>
                    <h3>Posts</h3>
                </div>
            </div>
        </div>
    )
}
