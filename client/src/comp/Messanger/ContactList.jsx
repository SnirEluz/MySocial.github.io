import React from 'react'
import user from './image/user.jpeg'

export default function ContactList() {
    return (
        <div className="ContactList">
            <div className="Contact">
                <div className="ContactPicture">
                    <img src={user} alt="" />
                </div>
                <div className="ContactInfo">
                    <h2>Snir Eluz</h2>
                    <h3>Hey what's up</h3>
                </div>
                <div className="ContactStatus">
                    <div className="Status">
                        <h4>Active</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
